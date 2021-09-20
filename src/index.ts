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
        }),
    };

    static examples = [
        `entro-version`,
        `entro-version --during-release-post-hook="entro-ci templates:update && git add -A && git commit -am 'Updated the templates'"`,
        `entro-version --standard-version-flags="--prerelease='alpha'"`,
        `entro-version --standard-version-flags="--release-as=major"`,
    ];

    static args = [];

    async run() {
        const { flags } = this.parse(EntroVersion);
        const dryRunOutput = await this.getStandardVersionDryRunOutput(flags['standard-version-flags']);
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+)/gim;
        const newVersion = (tagVersionRegex.exec(dryRunOutput) || [])[1];

        await executeCommand(`git flow release start ${newVersion}`, this.log, this.warn);
        if (flags['during-release-pre-hook']) {
            await executeCommand(flags['during-release-pre-hook'], this.log, this.error);
        }

        if (flags['no-sign']) {
            await this.standardVersionRun(flags['standard-version-flags']);
        } else {
            await this.standardVersionRun(flags['standard-version-flags'].concat(['--sign']));
        }

        if (flags['during-release-post-hook']) {
            await executeCommand(flags['during-release-post-hook'], this.log, this.error);
        }

        try {
            await executeCommand(`git flow release finish ${newVersion}`, this.log, this.warn);
        } catch (e) {
            // At this point the release has been merged but the branch has not
            // been deleted because it failed to create the tag.
            await executeCommand(`git branch -d release/${newVersion}`, this.log, this.warn);
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
