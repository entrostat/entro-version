import { Command, Flags } from '@oclif/core';
import { executeCommand } from '../shared/execute-command';
import { getCommitAndTagVersionDryRunOutput } from '../shared/get-commit-and-tag-version-dry-run-output';
import { commitAndTagVersionRun } from '../shared/commit-and-tag-version-run';

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
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(Release);
        const dryRunOutput = await getCommitAndTagVersionDryRunOutput(
            flags['commit-and-tag-version-flag'],
        );
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+)/gim;
        const newVersion = (tagVersionRegex.exec(dryRunOutput) || [])[1];
        const baseBranch = flags['base-branch'] || flags['develop-branch-name'];
        const differentBaseBranch =
            flags['base-branch'] &&
            flags['base-branch'] !== flags['develop-branch-name'];

        await executeCommand(
            `git flow release start ${newVersion} ${baseBranch}`,
            this.log,
            this.warn,
        );
        if (flags['during-release-pre-hook']) {
            await executeCommand(
                flags['during-release-pre-hook'],
                this.log,
                this.error,
            );
        }

        await commitAndTagVersionRun(
            flags['commit-and-tag-version-flag'].concat([
                '--skip.tag',
                flags['no-sign'] ? '' : '--sign',
            ]),
        );

        if (flags['during-release-post-hook']) {
            await executeCommand(
                flags['during-release-post-hook'],
                this.log,
                this.error,
            );
        }

        await executeCommand(
            // See https://stackoverflow.com/a/14553458/3016520 for info on how I
            //  got this environment export
            `export GIT_MERGE_AUTOEDIT=no && git flow release finish ${newVersion} -m "${flags[
                'release-message'
            ]
                .replace(/{{version}}/g, newVersion)
                .replace(/"/g, '\\"')}"`,
            this.log,
            this.error,
        );

        if (
            differentBaseBranch &&
            !flags['skip-base-branch-merge-to-develop']
        ) {
            // In this case develop is not being used to create the release so once
            // the release exists, we need to merge it into develop
            await this.mergeMasterIntoDevelop(
                flags['master-branch-name'],
                flags['develop-branch-name'],
            );
        }

        await this.pushBranches(
            flags['master-branch-name'],
            flags['develop-branch-name'],
            flags['no-push'],
        );
    }

    private async mergeMasterIntoDevelop(
        masterBranchName: string,
        developBranchName: string,
    ) {
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log,
            this.error,
        );
        await executeCommand(
            `git merge ${masterBranchName}`,
            this.log,
            this.error,
        );
        await executeCommand(
            `git checkout ${masterBranchName}`,
            this.log,
            this.error,
        );
    }

    private async pushBranches(
        masterBranchName: string,
        developBranchName: string,
        noPush: boolean,
    ) {
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log,
            this.error,
        );
        await this.pushFollowTags(!noPush);
        await executeCommand(
            `git checkout ${masterBranchName}`,
            this.log,
            this.error,
        );
        await this.pushFollowTags(!noPush);
        await executeCommand(
            `git checkout ${developBranchName}`,
            this.log,
            this.error,
        );
    }

    private async pushFollowTags(shouldPush: boolean) {
        if (shouldPush) {
            await executeCommand(
                'git push --follow-tags',
                this.log,
                this.error,
            );
        }
    }
}
