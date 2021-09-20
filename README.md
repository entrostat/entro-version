entro-version
=============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![Downloads/week](https://img.shields.io/npm/dw/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![License](https://img.shields.io/npm/l/entro-version.svg?style=for-the-badge)](https://github.com/entrostat/entro-version/blob/master/package.json)

[![NPM](https://nodei.co/npm/entro-version.png)](https://nodei.co/npm/entro-version/)


It's a bit annoying when you use `git-flow` and `standard-version` in the same project because you want to know the version before you create the release branch. So you need to run `standard-version` as a dry run to get that to make the release. You also need to ensure that the release itself has the correct changes and tag so that the changelog gets generated correctly.

This CLI was made with the intention to combine them both together so that you can have proper `git-flow` releases while using `standard-version` to generate the version and changelog. You can use it in it's simplest form by running `entro-version` on the develop branch, or you can make it more complicated by adding release hooks. For instance, if you need to generate some `.yaml` files with the new version number or something like that, then you'd run a `post-hook` where it'll create the `.yaml` files and commit them before completing the release. I'm using this CLI to run releases for this CLI :P So check after `v1.2.11` in the changelog for a working example... It took me that long to get this working :P!

Each time I make a change and I'm ready for a release, I run `npm run release` which in turn runs:

```
./bin/run --during-release-post-hook="npm publish && git commit -am 'Updated the readme'"
```

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g entro-version
$ entro-version COMMAND
running command...
$ entro-version (-v|--version|version)
entro-version/1.4.1 linux-x64 node-v14.17.3
$ entro-version --help [COMMAND]
USAGE
  $ entro-version COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
