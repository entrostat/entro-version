entro-version
=============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg?style=for-the-badge)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![Downloads/week](https://img.shields.io/npm/dw/entro-version.svg?style=for-the-badge)](https://npmjs.org/package/entro-version)
[![License](https://img.shields.io/npm/l/entro-version.svg?style=for-the-badge)](https://github.com/entrostat/entro-version/blob/master/package.json)


It's a bit annoying when you use `git-flow` and `standard-version` in the same project because you want to know the version before you create the release branch. So you need to run `standard-version` as a dry run to get that to make the release. You also need to ensure that the release itself has the correct changes and tag so that the changelog gets generated correctly.

This CLI was made with the intention to combine them both together so that you can have proper `git-flow` releases while using `standard-version` to generate the version and changelog. You can use it in it's simplest form by running `entro-version` on the develop branch, or you can make it more complicated by adding release hooks. For instance, if you need to generate some `.yaml` files with the new version number or something like that, then you'd run a `post-hook` where it'll create the `.yaml` files and commit them before completing the release. I'm using this CLI to run releases for this CLI :P So check after `v1.2.11` in the changelog for a working example... It took me that long to get this working :P!

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
entro-version --help
```

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
$ entro-version (-v|--version|version)
entro-version/1.5.0 linux-x64 node-v14.17.3
$ entro-version --help [COMMAND]
USAGE
  $ entro-version COMMAND
...
```
<!-- usagestop -->
