import { pathExists } from 'fs-extra';
import { executeCommand } from './execute-command';
import { resolve } from 'path';

/**
 * Finds the path to the commit-and-tag-version CLI binary. If it doesn't exist,
 * it will return an npx command to get it.
 */
export async function commitAndTagVersionBinaryPath(): Promise<string> {
    // 1. Check locally for the bin file
    try {
        const localPath = resolve('./node_modules/.bin/commit-and-tag-version');
        if (await pathExists(localPath)) {
            return localPath;
        }
    } catch (error) {
        // Do nothing if there is an error
    }

    // 2. Check for a global bin
    try {
        const pathToBin = await executeCommand(
            'which commit-and-tag-version',
            () => {},
            () => {},
        );
        return pathToBin.trim();
    } catch (error) {
        // Return false if neither work
        return 'npx commit-and-tag-version';
    }
}
