import { Command, Flags } from '@oclif/core';
import { getCommitAndTagVersionDryRunOutput } from '../../shared/get-commit-and-tag-version-dry-run-output';

export default class VersionNext extends Command {
    static description = 'Returns what the next version would be';

    static examples = [
        '<%= config.bin %> <%= command.id %>',
        `<%= config.bin %> <%= command.id %> --commit-and-tag-version-flag="--release-as=major"`,
        `<%= config.bin %> <%= command.id %> --prefix=v`,
    ];

    static flags = {
        'commit-and-tag-version-flag': Flags.string({
            char: 'f',
            description: 'Flags to add to the commit-and-tag-version command',
            multiple: true,
            default: [],
            aliases: ['standard-version-flags'],
        }),
        prefix: Flags.string({
            char: 'P',
            description: 'The version prefix to add (eg. "v")',
            default: '',
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(VersionNext);

        const dryRunOutput = await getCommitAndTagVersionDryRunOutput(
            flags['commit-and-tag-version-flag'],
        );
        const tagVersionRegex = /tagging release (v\d+\.\d+\.\d+)/gim;
        const newVersion = (tagVersionRegex.exec(dryRunOutput) || [])[1];

        if (!newVersion) {
            this.error('The new version cannot be calculated...');
        }
        const noPrefixVersion = newVersion.replace(/^v/, '');
        this.log(`${flags.prefix}${noPrefixVersion}`);
    }
}
