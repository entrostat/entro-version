/**
 * Takes a branch name and removes any characters that are not alphanumeric or a hyphen.
 * @param branchName The branch name to sanitise.
 */
export function sanitiseBranchName(branchName: string) {
    return branchName.replace(/[^a-zA-Z0-9]/g, '');
}
