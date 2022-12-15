import { commitAndTagVersionRun } from './commit-and-tag-version-run';

export async function getCommitAndTagVersionDryRunOutput(
    flags: string[],
): Promise<string> {
    return commitAndTagVersionRun(flags.concat(['--dry-run']));
}
