entro-version
=============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![Downloads/week](https://img.shields.io/npm/dw/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![License](https://img.shields.io/npm/l/entro-version.svg?style=for-the-badge)](https://github.com/entrostat/entro-version/blob/master/package.json)


It's a bit annoying when you use `git-flow` and `commit-and-tag-version` in the same project because you want to know the version before you create the release branch. So you need to run `commit-and-tag-version` as a dry run to get that to make the release. You also need to ensure that the release itself has the correct changes and tag so that the changelog gets generated correctly.

This CLI was made with the intention to combine them both together so that you can have proper `git-flow` releases while using `commit-and-tag-version` to generate the version and changelog. You can use it in it's simplest form by running `entro-version` on the develop branch, or you can make it more complicated by adding release hooks. For instance, if you need to generate some `.yaml` files with the new version number or something like that, then you'd run a `post-hook` where it'll create the `.yaml` files and commit them before completing the release. I'm using this CLI to run releases for this CLI :P So check after `v1.2.11` in the changelog for a working example... It took me that long to get this working :P!

Each time I make a change and I'm ready for a release, I run `npm run release` which in turn runs:

```
./bin/run --during-release-post-hook="npm publish && git commit -am 'Updated the readme'"
```

# Installation Instructions

The easiest way to use this is to include it as a dev dependency or to install it globally. Assuming you've installed it globally:

```bash
npm install -g entro-version
```

You would now be able to use it in a `git-flow` context. So you can cd into your repo and simply run `entro-version` to release a new version. To get some examples of how the CLI can be used, run:

```bash
entro-version help
```

The default command that runs is:
```bash
entro-version release
```

But there are other commands to help with versioning that you'll see when you run `help`. The `--help` command will show help for the `release` command because that's the default.

# Some Handy Examples
Below are a few real world examples that may help you determine how to use this in your project.

## Handlebars Templates

Let's assume you use [entro-ci](https://www.npmjs.com/package/entro-ci) which allows you to compile Handlebars templates using the version of the repo. In this case, you could trigger the creation of the templates within the `git-flow` release using the following in your `package.json`:

```json
{
  "scripts": {
    "release": "entro-version --during-release-post-hook=\"entro-ci templates:update && git commit -am 'Updated the templates'\""
  }
}
```

## NPM Package Publishing

Maybe, like this package, you want to publish this to [https://npmjs.com](npmjs.com). In that case, you could trigger the publish during the release by adding the following to your `package.json`:

```json
{
  "scripts": {
    "release": "entro-version --during-release-post-hook=\"npm publish && git commit -am 'Updated the readme'\""
  }
}
```

# Usage
<!-- usage -->
```sh-session
$ npm install -g entro-version
$ entro-version COMMAND
running command...
$ entro-version (--version)
entro-version/3.0.0 linux-x64 node-v16.15.0
$ entro-version --help [COMMAND]
USAGE
  $ entro-version COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`entro-version help [COMMAND]`](#entro-version-help-command)
* [`entro-version release`](#entro-version-release)
* [`entro-version version:get`](#entro-version-versionget)
* [`entro-version version:next`](#entro-version-versionnext)

## `entro-version help [COMMAND]`

Display help for entro-version.

```
USAGE
  $ entro-version help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for entro-version.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.20/src/commands/help.ts)_

## `entro-version release`

Creates a release using git-flow

```
USAGE
  $ entro-version release [-p <value>] [-P <value>] [-s] [-f <value>] [-M <value>] [-d <value>] [-p] [-m
    <value>] [-b <value>] [-B]

FLAGS
  -B, --skip-base-branch-merge-to-develop       If the --base-branch option is specified, it will automatically merge
                                                into develop after the release is completed. If you would like to skip
                                                this merge then use this flag. This might be useful if you want to
                                                create a release on a staging branch or something to that effect.
  -M, --main-branch-name=<value>                [default: master] The name of the master branch
  -P, --during-release-post-hook=<value>        Any commands to run during the release, after standard-version
  -b, --base-branch=<value>                     If the release must be generated from any branch other than develop (eg.
                                                master) then you would specify this base branch. Leave this empty if
                                                there it is not required.
  -d, --develop-branch-name=<value>             [default: develop] The name of the develop branch
  -f, --commit-and-tag-version-flag=<value>...  [default: ] Flags to add to the commit-and-tag-version command
  -m, --release-message=<value>                 [default: Merging release] The description that you would like to give
                                                your release (this shows up on the releases page in Github). This also
                                                replaces {{version}} with the newly created version if you want to
                                                include that in your message.
  -p, --during-release-pre-hook=<value>         Any commands to run during the release, before standard-version
  -p, --no-push                                 Do not push the develop and master branches (with --follow-tags) during
                                                the release
  -s, --no-sign                                 Do not sign during the release using your GPG key

DESCRIPTION
  Creates a release using git-flow

EXAMPLES
  $ entro-version release

  $ entro-version release --during-release-post-hook="npm run publish && git commit -am 'Updated the readme'"

  $ entro-version release --commit-and-tag-version-flag="--prerelease='alpha'"

  $ entro-version release --commit-and-tag-version-flag="--release-as=major"
```

_See code: [dist/commands/release.ts](https://github.com/entrostat/entro-version/blob/v3.0.0/dist/commands/release.ts)_

## `entro-version version:get`

Retrieves the current version of the project

```
USAGE
  $ entro-version version:get [-i <value>] [-k <value>] [-P <value>]

FLAGS
  -P, --prefix=<value>  The version prefix to add (eg. "v")
  -i, --input=<value>   [default: ./package.json] The path to the JSON file to use to retrieve the version
  -k, --key=<value>     [default: version] The key in the JSON file that holds the version

DESCRIPTION
  Retrieves the current version of the project

EXAMPLES
  $ entro-version version:get

  $ entro-version version:get --input="./src/my-proj/package.json"

  $ entro-version version:get --input="./src/version.json" --key="ver"

  $ entro-version version:get --prefix="v"

  $ entro-version version:get --prefix="staging-v"
```

_See code: [dist/commands/version/get.ts](https://github.com/entrostat/entro-version/blob/v3.0.0/dist/commands/version/get.ts)_

## `entro-version version:next`

Returns what the next version would be

```
USAGE
  $ entro-version version:next [-f <value>] [-P <value>]

FLAGS
  -P, --prefix=<value>                          The version prefix to add (eg. "v")
  -f, --commit-and-tag-version-flag=<value>...  [default: ] Flags to add to the commit-and-tag-version command

DESCRIPTION
  Returns what the next version would be

EXAMPLES
  $ entro-version version:next

  $ entro-version version:next --commit-and-tag-version-flag="--release-as=major"

  $ entro-version version:next --prefix=v
```

_See code: [dist/commands/version/next.ts](https://github.com/entrostat/entro-version/blob/v3.0.0/dist/commands/version/next.ts)_
<!-- commandsstop -->
