import { Command, flags } from '@oclif/command';
import { executeCommand } from './execute-command';

class EntroVersion extends Command {
    static description = 'Calculates the version using standard-version and a release using git-flow';

    static flags = {
        'during-release-pre-hook': flags.string({
            char: 'p',
            description: 'Any commands to run during the release, before standard-version',
        }),
        'during-release-post-hook': flags.string({
            char: 'P',
            description: 'Any commands to run during the release, after standard-version',
        }),
        'no-sign': flags.boolean({
            char: 's',
            description: 'Do not sign during the release using your GPG key',
            default: false,
        }),
        'standard-version-flags': flags.string({
            char: 'f',
            description: 'Flags to add to the standard version command',
            multiple: true,
            default: [],
        }),
        'master-branch-name': flags.string({
            char: 'M',
            description: 'The name of the master branch',
            default: 'master',
        }),
        'develop-branch-name': flags.string({
            char: 'd',
            description: 'The name of the develop branch',
            default: 'develop',
        }),
        'no-push': flags.boolean({
            char: 'p',
            description: 'Do not push the develop and master branches (with --follow-tags) during the release',
            default: false,
        }),
        'release-message': flags.string({
            char: 'm',
            description:
                'The description that you would like to give your release (this shows up on the releases page in Github). This also replaces {{version}} with the newly created version if you want to include that in your message.',
            default: 'Merging release',
        }),
        'base-branch': flags.string({
            char: 'b',
            required: false,
            description:
                'If the release must be generated from any branch other than develop (eg. master) then you would specify this base branch. Leave this empty if there it is not required.',
        }),
    };

    static examples = [
        `entro-version`,
        `entro-version --during-release-post-hook="npm run publish && git commit -am 'Updated the readme'"`,
        `entro-version --standard-version-flags="--prerelease='alpha'"`,
        `entro-version --standard-version-flags="--release-as=major"`,
    ];

    static args = [];

    async run() {
        const { flags } = this.parse(EntroVersion);
        const dryRunOutput = await this.getStandardVersionDryRunOutput(flags['standard-version-flags']);
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+)/gim;
        const newVersion = (tagVersionRegex.exec(dryRunOutput) || [])[1];
        const baseBranch = flags['base-branch'] || flags['develop-branch-name'];

        await executeCommand(`git flow release start ${newVersion} ${baseBranch}`, this.log, this.warn);
        if (flags['during-release-pre-hook']) {
            await executeCommand(flags['during-release-pre-hook'], this.log, this.error);
        }

        await this.standardVersionRun(flags['standard-version-flags'].concat(['--skip.tag', flags['no-sign'] ? '' : '--sign']));

        if (flags['during-release-post-hook']) {
            await executeCommand(flags['during-release-post-hook'], this.log, this.error);
        }

        await executeCommand(
            // See https://stackoverflow.com/a/14553458/3016520 for info on how I
            //  got this environment export
            `export GIT_MERGE_AUTOEDIT=no && git flow release finish ${newVersion} -m "${flags['release-message']
                .replace(/{{version}}/g, newVersion)
                .replace(/"/g, '\\"')}"`,
            this.log,
            this.error,
        );
        await this.pushBranches(flags['master-branch-name'], flags['develop-branch-name'], flags['no-push']);
    }

    private async pushBranches(masterBranchName: string, developBranchName: string, noPush: boolean) {
        await executeCommand(`git checkout ${developBranchName}`, this.log, this.error);
        await this.pushFollowTags(!noPush);
        await executeCommand(`git checkout ${masterBranchName}`, this.log, this.error);
        await this.pushFollowTags(!noPush);
        await executeCommand(`git checkout ${developBranchName}`, this.log, this.error);
    }

    private async pushFollowTags(shouldPush: boolean) {
        if (shouldPush) {
            await executeCommand(`git push --follow-tags`, this.log, this.error);
        }
    }

    private async standardVersionExists() {
        try {
            await executeCommand('which standard-version', this.log, this.warn);
            return true;
        } catch (e) {
            return false;
        }
    }

    private async getStandardVersionDryRunOutput(flags: string[]) {
        return await this.standardVersionRun(flags.concat(['--dry-run']));
    }

    private async standardVersionRun(flags: string[] = []) {
        return await executeCommand(`${await this.standardVersionBin()} ${flags.join(' ')}`, this.log, this.warn);
    }

    private async standardVersionBin() {
        return (await this.standardVersionExists()) ? 'standard-version' : 'npx standard-version';
    }
}

export = EntroVersion;
