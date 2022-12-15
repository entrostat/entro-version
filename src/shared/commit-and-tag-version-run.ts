import { executeCommand } from './execute-command';
import { commitAndTagVersionBinaryPath } from './commit-and-tag-version-binary-path';

export async function commitAndTagVersionRun(flags: string[]): Promise<string> {
    return await executeCommand(
        `${await commitAndTagVersionBinaryPath()} ${flags.join(' ')}`,
        () => {},
        console.error,
    );
}
