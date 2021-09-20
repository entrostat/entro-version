import { Command, flags } from '@oclif/command';
import { executeCommand } from './execute-command';

class EntroVersion extends Command {
    static description = 'Calculates the version using standard-version and a release using git-flow';

    static flags = {
        'during-release-hook-pre': flags.string({
            char: 'p',
            description: 'Any commands to run during the release, before standard-version',
        }),
        'during-release-hook-post': flags.string({
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

    static args = [];

    async run() {
        const { args, flags } = this.parse(EntroVersion);
        const dryRunOutput = await this.getStandardVersionDryRunOutput();
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+)/gim;
        const newVersion = (tagVersionRegex.exec(dryRunOutput) || [])[1];

        await executeCommand(`git flow release start ${newVersion}`, this.log, this.warn);
        if (flags['during-release-hook-pre']) {
            await executeCommand(flags['during-release-hook-pre'], this.log, this.error);
        }

        if (flags['no-sign']) {
            await executeCommand(`standard-version ${flags['standard-version-flags'].join(' ')}`, this.log, this.warn);
        } else {
            await executeCommand(`standard-version ${flags['standard-version-flags'].concat(['--sign']).join(' ')}`, this.log, this.warn);
        }

        if (flags['during-release-hook-post']) {
            await executeCommand(flags['during-release-hook-post'], this.log, this.error);
        }

        try {
            await executeCommand(`git flow release finish ${newVersion}`, this.log, this.warn);
        } catch (e) {
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

    private async getStandardVersionDryRunOutput() {
        if (await this.standardVersionExists()) {
            return await executeCommand('standard-version --dry-run', this.log, this.warn);
        } else {
            return await executeCommand('npx standard-version --dry-run', this.log, this.warn);
        }
    }
}

export = EntroVersion;
