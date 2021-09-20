import { Command, flags } from '@oclif/command';

class EntroVersion extends Command {
    static description = 'Calculates the version using standard-version and a release using git-flow';

    static flags = {};

    static args = [];

    async run() {
        const { args, flags } = this.parse(EntroVersion);
    }
}

export = EntroVersion;
