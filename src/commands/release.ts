import { Command, Flags } from '@oclif/core';
import { executeCommand } from '../shared/execute-command';
import { getCommitAndTagVersionDryRunOutput } from '../shared/get-commit-and-tag-version-dry-run-output';
import { commitAndTagVersionRun } from '../shared/commit-and-tag-version-run';
import { sanitiseBranchName } from '../shared/helpers/sanitise-branch-name';

export default class Release extends Command {
    static description = 'Creates a release using git-flow';

    static examples = [
        '<%= config.bin %> <%= command.id %>',
        '<%= config.bin %> <%= command.id %> --during-release-post-hook="npm run publish && git commit -am \'Updated the readme\'"',
        '<%= config.bin %> <%= command.id %> --commit-and-tag-version-flag="--prerelease=\'alpha\'"',
        '<%= config.bin %> <%= command.id %> --commit-and-tag-version-flag="--release-as=major"',
    ];

    static flags = {
        'during-release-pre-hook': Flags.string({
            char: 'p',
            description:
                'Any commands to run during the release, before standard-version',
        }),
        'during-release-post-hook': Flags.string({
            char: 'P',
            description:
                'Any commands to run during the release, after standard-version',
        }),
        'no-sign': Flags.boolean({
            char: 's',
            description: 'Do not sign during the release using your GPG key',
            default: false,
        }),
        'commit-and-tag-version-flag': Flags.string({
            char: 'f',
            description: 'Flags to add to the commit-and-tag-version command',
            multiple: true,
            default: [],
            aliases: ['standard-version-flags'],
        }),
        'main-branch-name': Flags.string({
            char: 'M',
            description: 'The name of the master branch',
            default: 'master',
            aliases: ['master-branch-name'],
        }),
        'develop-branch-name': Flags.string({
            char: 'd',
            description: 'The name of the develop branch',
            default: 'develop',
        }),
        'no-push': Flags.boolean({
            char: 'p',
            description:
                'Do not push the develop and master branches (with --follow-tags) during the release',
            default: false,
        }),
        'release-message': Flags.string({
            char: 'm',
            description:
                'The description that you would like to give your release (this shows up on the releases page in Github). This also replaces {{version}} with the newly created version if you want to include that in your message.',
            default: 'Merging release',
        }),
        'base-branch': Flags.string({
            char: 'b',
            required: false,
            description:
                'If the release must be generated from any branch other than develop (eg. master) then you would specify this base branch. Leave this empty if there it is not required.',
        }),
        'skip-base-branch-merge-to-develop': Flags.boolean({
            char: 'B',
            default: false,
            description:
                'If the --base-branch option is specified, it will automatically merge into develop after the release is completed. If you would like to skip this merge then use this flag. This might be useful if you want to create a release on a staging branch or something to that effect.',
        }),
        'target-branch': Flags.string({
            char: 't',
            required: false,
            description:
                'You may want to create a release into a different branch. If this is not the same as your main branch, it is treated as a pre-release and tagged accordingly.',
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(Release);

        // 1. Extract and type the flags
        const baseBranch: string =
            flags['base-branch'] || flags['develop-branch-name'];
        const differentBaseBranch: boolean =
            baseBranch !== flags['develop-branch-name'];
        const noSign: boolean = flags['no-sign'];
        const duringReleasePreHook: string | undefined =
            flags['during-release-pre-hook'];
        const duringReleasePostHook: string | undefined =
            flags['during-release-post-hook'];
        const commitAndTagVersionFlags: string[] =
            flags['commit-and-tag-version-flag'];
        const releaseMessage: string = flags['release-message'];
        const skipBaseBranchMergeToDevelop: boolean =
            flags['skip-base-branch-merge-to-develop'];
        const mainBranchName: string = flags['main-branch-name'];
        const developBranchName: string = flags['develop-branch-name'];
        const noPush: boolean = flags['no-push'];

        const targetBranch: string =
            flags['target-branch'] || flags['main-branch-name'];
        const isStandardRelease: boolean =
            targetBranch === flags['main-branch-name'];

        if (isStandardRelease) {
            await this.runStandardRelease(
                commitAndTagVersionFlags,
                baseBranch,
                duringReleasePreHook,
                noSign,
                duringReleasePostHook,
                releaseMessage,
                differentBaseBranch,
                skipBaseBranchMergeToDevelop,
                mainBranchName,
                developBranchName,
                noPush,
            );
        } else {
            await this.runCustomBranchRelease(
                commitAndTagVersionFlags,
                duringReleasePreHook,
                noSign,
                duringReleasePostHook,
                releaseMessage,
                developBranchName,
                noPush,
                targetBranch,
            );
        }
    }

    private async runStandardRelease(
        commitAndTagVersionFlags: string[],
        baseBranch: string,
        duringReleasePreHook: string | undefined,
        noSign: boolean,
        duringReleasePostHook: string | undefined,
        releaseMessage: string,
        differentBaseBranch: boolean,
        skipBaseBranchMergeToDevelop: boolean,
        mainBranchName: string,
        developBranchName: string,
        noPush: boolean,
    ) {
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
        const dryRunOutput = await getCommitAndTagVersionDryRunOutput(
            commitAndTagVersionFlags,
        );
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+.+)/gim;
        const newVersion: string = (tagVersionRegex.exec(dryRunOutput) ||
            [])[1];

        await executeCommand(
            `git flow release start ${newVersion} ${baseBranch}`,
            this.log.bind(this),
            this.warn.bind(this),
        );
        if (duringReleasePreHook) {
            await executeCommand(
                duringReleasePreHook,
                this.log.bind(this),
                this.error.bind(this),
            );
        }

        await commitAndTagVersionRun(
            commitAndTagVersionFlags.concat([
                '--skip.tag',
                noSign ? '' : '--sign',
            ]),
        );

        if (duringReleasePostHook) {
            await executeCommand(
                duringReleasePostHook,
                this.log.bind(this),
                this.error.bind(this),
            );
        }

        await executeCommand(
            // See https://stackoverflow.com/a/14553458/3016520 for info on how I
            //  got this environment export
            `export GIT_MERGE_AUTOEDIT=no && git flow release finish ${newVersion} -m "${releaseMessage
                .replace(/{{version}}/g, newVersion)
                .replace(/"/g, '\\"')}"`,
            this.log.bind(this),
            this.error.bind(this),
        );

        if (differentBaseBranch && !skipBaseBranchMergeToDevelop) {
            // In this case develop is not being used to create the release so once
            // the release exists, we need to merge it into develop
            await this.mergeMasterIntoDevelop(
                mainBranchName,
                developBranchName,
            );
        }

        await this.pushBranches(mainBranchName, developBranchName, noPush);
    }

    private async runCustomBranchRelease(
        commitAndTagVersionFlags: string[],
        duringReleasePreHook: string | undefined,
        noSign: boolean,
        duringReleasePostHook: string | undefined,
        releaseMessage: string,
        developBranchName: string,
        noPush: boolean,
        targetBranch: string,
    ) {
        // 1. Checkout the develop branch
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );

        // 2. Calculate the tracking prerelease name and the prerelease name
        const prereleaseName = sanitiseBranchName(targetBranch);
        const trackingPrereleaseName = `${prereleaseName}.branch`;

        const dryRunOutput = await getCommitAndTagVersionDryRunOutput(
            commitAndTagVersionFlags.concat([
                `--prerelease=${trackingPrereleaseName}`,
            ]),
        );

        // 3. Calculate the versions
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+.+)/gim;
        const newTrackingVersion: string = (tagVersionRegex.exec(
            dryRunOutput,
        ) || [])[1];
        const newVersion: string = newTrackingVersion.replace(
            `${prereleaseName}.branch`,
            prereleaseName,
        );

        // 4. Create a release from the develop branch
        await executeCommand(
            `git checkout -b release/${newVersion} ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );

        // 5. Run the pre hook if there is one
        if (duringReleasePreHook) {
            await executeCommand(
                duringReleasePreHook,
                this.log.bind(this),
                this.error.bind(this),
            );
        }

        // 6. Update the changelog
        await commitAndTagVersionRun(
            commitAndTagVersionFlags.concat([
                '--skip.tag',
                noSign ? '' : '--sign',
                `--prerelease=${trackingPrereleaseName}`,
            ]),
        );

        // 7. Run the post hook if there is one
        if (duringReleasePostHook) {
            await executeCommand(
                duringReleasePostHook,
                this.log.bind(this),
                this.error.bind(this),
            );
        }

        // 8. Merge the release into the target branch
        const commitMessage = releaseMessage
            .replace(/{{version}}/g, newVersion)
            .replace(/"/g, '\\"');
        await executeCommand(
            `export GIT_MERGE_AUTOEDIT=no && git merge --no-ff --no-edit --strategy-option theirs release/${newVersion} -m "${commitMessage}"`,
            this.log.bind(this),
            this.error.bind(this),
        );

        // 9. Remove the release branch
        await executeCommand(
            `git branch -D release/${newVersion}`,
            this.log.bind(this),
            this.error.bind(this),
        );

        // 10. Tag the target branch with the new tag and the develop branch with the tracking tag
        await executeCommand(
            `git tag -a ${newVersion} -m "${commitMessage}"`,
            this.log.bind(this),
            this.error.bind(this),
        );
        await executeCommand(
            `git checkout ${developBranchName} && git tag -a ${newTrackingVersion} -m "${commitMessage}"`,
            this.log.bind(this),
            this.error.bind(this),
        );

        // 11. Push changes
        await this.pushBranches(targetBranch, developBranchName, noPush);
    }

    private async mergeMasterIntoDevelop(
        masterBranchName: string,
        developBranchName: string,
    ) {
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
        await executeCommand(
            `git merge ${masterBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
        await executeCommand(
            `git checkout ${masterBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
    }

    private async pushBranches(
        masterBranchName: string,
        developBranchName: string,
        noPush: boolean,
    ) {
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
        await this.pushFollowTags(!noPush);
        await executeCommand(
            `git checkout ${masterBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
        await this.pushFollowTags(!noPush);
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log.bind(this),
            this.error.bind(this),
        );
    }

    private async pushFollowTags(shouldPush: boolean) {
        if (shouldPush) {
            await executeCommand(
                'git push --follow-tags',
                this.log.bind(this),
                this.error.bind(this),
            );
        }
    }
}
