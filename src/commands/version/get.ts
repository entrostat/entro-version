import { Command, Flags } from '@oclif/core';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';

export default class VersionGet extends Command {
    static description = 'Retrieves the current version of the project';

    static examples = [
        '<%= config.bin %> <%= command.id %>',
        `<%= config.bin %> <%= command.id %> --input="./src/my-proj/package.json"`,
        `<%= config.bin %> <%= command.id %> --input="./src/version.json" --key="ver"`,
        `<%= config.bin %> <%= command.id %> --prefix="v"`,
        `<%= config.bin %> <%= command.id %> --prefix="staging-v"`,
    ];

    static flags = {
        input: Flags.string({
            char: 'i',
            description:
                'The path to the JSON file to use to retrieve the version',
            default: './package.json',
        }),
        key: Flags.string({
            char: 'k',
            description: 'The key in the JSON file that holds the version',
            default: 'version',
        }),
        prefix: Flags.string({
            char: 'P',
            description: 'The version prefix to add (eg. "v")',
            default: '',
        }),
    };

    static args = [];

    public async run(): Promise<void> {
        const { flags } = await this.parse(VersionGet);

        const openFile = await readJSON(resolve(flags.input));
        if (!openFile[flags.key]) {
            this.error(
                `The key ${flags.key} does not exist on the file ${flags.input}`,
            );
        }
        this.log(`${flags.prefix}${openFile[flags.key]}`);
    }
}
