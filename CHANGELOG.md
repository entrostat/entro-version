# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.0.0](https://github.com/entrostat/entro-version/compare/v2.0.2...v3.0.0) (2022-12-15)


### ⚠ BREAKING CHANGES

* **defaults:** Removed the default command, this will lead to entro-version not working on repos that don't update the command usage

### Features

* **defaults:** Removed the default command, this will lead to entro-version not working on repos that don't update the command usage ([612c3e3](https://github.com/entrostat/entro-version/commit/612c3e329a208fc60878f51710068fb17e1b9929))

### [2.0.2](https://github.com/entrostat/entro-version/compare/v2.0.1...v2.0.2) (2022-12-15)


### Bug Fixes

* **build:** Set the node version to 14 ([4e176f9](https://github.com/entrostat/entro-version/commit/4e176f9491e6360d6a8f47caaec453276dbdc1bc))

### [2.0.1](https://github.com/entrostat/entro-version/compare/v2.0.0...v2.0.1) (2022-12-15)


### Bug Fixes

* **deps:** bump @oclif/plugin-help from 5.1.19 to 5.1.20 ([e8feabf](https://github.com/entrostat/entro-version/commit/e8feabf2a99880c16e8ac6fc8b8f87be7371be0f))
* **deps:** bump @oclif/plugin-plugins from 2.1.7 to 2.1.8 ([5de2eaf](https://github.com/entrostat/entro-version/commit/5de2eaf8f09a2416ff14d70d5f04acb743afe132))

## [2.0.0](https://github.com/entrostat/entro-version/compare/v1.7.0...v2.0.0) (2022-12-15)


### ⚠ BREAKING CHANGES

* **cli:** Updated the CLI to use the new Oclif version and become a multi-command CLI

### Features

* **cli:** Updated the CLI to use the new Oclif version and become a multi-command CLI ([a3d007a](https://github.com/entrostat/entro-version/commit/a3d007a106390af2e8ee4dc6f401ebc23882b2c8))


### Bug Fixes

* **release:** Bind the command to the logger because the loggers use "this" ([5786a6c](https://github.com/entrostat/entro-version/commit/5786a6c7ae89efb785ab2b02483e08cbe44ba29f))
* **release:** Used the new branch naming flag and not the alias ([ff68731](https://github.com/entrostat/entro-version/commit/ff68731e4e5064f0f895e3a7b6ab66d6122a7e12))
* **scripts:** Added the readme update ([06ed357](https://github.com/entrostat/entro-version/commit/06ed357abd66f52442e1b2eaf4019eada5edacbd))
* **scripts:** Call the release script ([99499ef](https://github.com/entrostat/entro-version/commit/99499ef8d90efd3e9a8128d8a40516b7dc52bd11))
* **scripts:** Changed the flags to use the new wording ([86e5f72](https://github.com/entrostat/entro-version/commit/86e5f72589aace61cd1a0c71670620c1f7160235))
* **scripts:** Use the master branch name for now ([dccbff1](https://github.com/entrostat/entro-version/commit/dccbff1ee791177c2e50ec162090aaa4bdeeaf72))

## [1.7.0](https://github.com/entrostat/entro-version/compare/v1.6.0...v1.7.0) (2021-11-10)


### Features

* **base-branch:** Added the ability to merge the base branch into develop and a flag to skip this action ([44efc87](https://github.com/entrostat/entro-version/commit/44efc87313eb61bec2a3df898a682cc6904511ff))

## [1.6.0](https://github.com/entrostat/entro-version/compare/v1.5.0...v1.6.0) (2021-11-10)


### Features

* **base-branch:** Added the ability to change the base branch that the release comes from ([742e5f6](https://github.com/entrostat/entro-version/commit/742e5f63a2d3b5bbbd669b3cb6eae4895a22eadc))

## [1.5.0](https://github.com/entrostat/entro-version/compare/v1.4.4...v1.5.0) (2021-09-20)


### Features

* **readme:** Added additional read-world examples of where this could be used ([39c8645](https://github.com/entrostat/entro-version/commit/39c8645ae5725f1753511ba7428f67e039a7301f))

### [1.4.4](https://github.com/entrostat/entro-version/compare/v1.4.3...v1.4.4) (2021-09-20)


### Bug Fixes

* **readme:** Removed the commands section and added additional info around how to use the tool ([2d83795](https://github.com/entrostat/entro-version/commit/2d83795999aa7bf832f4899d4d0a359fefb75240))

### [1.4.3](https://github.com/entrostat/entro-version/compare/v1.4.2...v1.4.3) (2021-09-20)


### Bug Fixes

* **changelog:** Removed the docs entries ([aab41b9](https://github.com/entrostat/entro-version/commit/aab41b937a90afe3ea295a1bfc64a5d03b19cbe9))

## [1.4.0](https://github.com/entrostat/entro-version/compare/v1.3.2...v1.4.0) (2021-09-20)


### Features

* **license:** Added the license to the project ([0e691c0](https://github.com/entrostat/entro-version/commit/0e691c036622d7cd72728a4c1240b66e16085c5b))

### [1.3.2](https://github.com/entrostat/entro-version/compare/v1.3.1...v1.3.2) (2021-09-20)


### Bug Fixes

* **release:** Simplified the default release message ([c418fa7](https://github.com/entrostat/entro-version/commit/c418fa7c39a494f734a9b677b8d0e386f6f25a4b))

### [1.3.1](https://github.com/entrostat/entro-version/compare/v1.3.0...v1.3.1) (2021-09-20)


### Bug Fixes

* **release:** Added the new lines at the end of the release message before it automatically outputs the version number ([5e6f018](https://github.com/entrostat/entro-version/commit/5e6f018bf44a40b7f74971d6e63483376208d1b2))

## [1.3.0](https://github.com/entrostat/entro-version/compare/v1.2.12...v1.3.0) (2021-09-20)


### Features

* **release:** Added the ability to specify the release message ([1977a02](https://github.com/entrostat/entro-version/commit/1977a02f151fa8d3795afe98875f18203fd79a4a))

### [1.2.12](https://github.com/entrostat/entro-version/compare/v1.2.11...v1.2.12) (2021-09-20)


### Bug Fixes

* **refactor:** Cleaned up the code a bit to make it more readable ([30af2fd](https://github.com/entrostat/entro-version/commit/30af2fd096d4acc90b1781003b4242e820acfb4b))

### [1.2.11](https://github.com/entrostat/entro-version/compare/v1.2.10...v1.2.11) (2021-09-20)


### Bug Fixes

* **push:** Added the pushing to master and develop remote ([5bde782](https://github.com/entrostat/entro-version/commit/5bde78282008a0eed9d5ef8b7c93b5c5b3a4fa00))

### [1.2.10](https://github.com/entrostat/entro-version/compare/v1.2.7...v1.2.10) (2021-09-20)


### Bug Fixes

* **release:** Don't use a message file ([a57aed6](https://github.com/entrostat/entro-version/commit/a57aed69e2ed8b8b730c41ab7587b42498385adf))
* **release:** Specify the release version ([99de432](https://github.com/entrostat/entro-version/commit/99de4323183c08843b2d4e01e4af60f602c62973))
* **release:** Trying to run releases non-interactively ([ab7628e](https://github.com/entrostat/entro-version/commit/ab7628ef98a9f3526312375d2f28dfa457dbb34c))

### [1.2.9](https://github.com/entrostat/entro-version/compare/v1.2.7...v1.2.9) (2021-09-20)


### Bug Fixes

* **release:** Don't use a message file ([a57aed6](https://github.com/entrostat/entro-version/commit/a57aed69e2ed8b8b730c41ab7587b42498385adf))
* **release:** Trying to run releases non-interactively ([ab7628e](https://github.com/entrostat/entro-version/commit/ab7628ef98a9f3526312375d2f28dfa457dbb34c))

### [1.2.8](https://github.com/entrostat/entro-version/compare/v1.2.7...v1.2.8) (2021-09-20)


### Bug Fixes

* **release:** Don't use a message file ([a57aed6](https://github.com/entrostat/entro-version/commit/a57aed69e2ed8b8b730c41ab7587b42498385adf))

### [1.2.7](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.7) (2021-09-20)


### Bug Fixes

* **release:** Adding more around the message and tag name ([489e987](https://github.com/entrostat/entro-version/commit/489e987b8c596b08d2da2ec7c0e742ef09ab193c))
* **release:** Don't run a merge without finishing the release ([22cb28d](https://github.com/entrostat/entro-version/commit/22cb28d2cd3ecec1330632e341d0a84c39a6b5bd))
* **release:** Git flow seems to hang. testing with dry run ([8783c56](https://github.com/entrostat/entro-version/commit/8783c562a9c36d815d8a7a704556c0fd9ea0ee63))
* **release:** Trying to leave out release finish to see what commands we can run there ([967e2b7](https://github.com/entrostat/entro-version/commit/967e2b70ad64f241bf981ba10986fe55b27f3780))
* **release:** Use git-flow to start and finish releases ([0e2c9c6](https://github.com/entrostat/entro-version/commit/0e2c9c6a108def0451622cb5d37a0ca0549761bc))
* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.6](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.6) (2021-09-20)


### Bug Fixes

* **release:** Don't run a merge without finishing the release ([22cb28d](https://github.com/entrostat/entro-version/commit/22cb28d2cd3ecec1330632e341d0a84c39a6b5bd))
* **release:** Git flow seems to hang. testing with dry run ([8783c56](https://github.com/entrostat/entro-version/commit/8783c562a9c36d815d8a7a704556c0fd9ea0ee63))
* **release:** Trying to leave out release finish to see what commands we can run there ([967e2b7](https://github.com/entrostat/entro-version/commit/967e2b70ad64f241bf981ba10986fe55b27f3780))
* **release:** Use git-flow to start and finish releases ([0e2c9c6](https://github.com/entrostat/entro-version/commit/0e2c9c6a108def0451622cb5d37a0ca0549761bc))
* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.5](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.5) (2021-09-20)


### Bug Fixes

* **release:** Don't run a merge without finishing the release ([22cb28d](https://github.com/entrostat/entro-version/commit/22cb28d2cd3ecec1330632e341d0a84c39a6b5bd))
* **release:** Trying to leave out release finish to see what commands we can run there ([967e2b7](https://github.com/entrostat/entro-version/commit/967e2b70ad64f241bf981ba10986fe55b27f3780))
* **release:** Use git-flow to start and finish releases ([0e2c9c6](https://github.com/entrostat/entro-version/commit/0e2c9c6a108def0451622cb5d37a0ca0549761bc))
* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.4](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.4) (2021-09-20)


### Bug Fixes

* **release:** Trying to leave out release finish to see what commands we can run there ([967e2b7](https://github.com/entrostat/entro-version/commit/967e2b70ad64f241bf981ba10986fe55b27f3780))
* **release:** Use git-flow to start and finish releases ([0e2c9c6](https://github.com/entrostat/entro-version/commit/0e2c9c6a108def0451622cb5d37a0ca0549761bc))
* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.3](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.3) (2021-09-20)


### Bug Fixes

* **release:** Use git-flow to start and finish releases ([0e2c9c6](https://github.com/entrostat/entro-version/commit/0e2c9c6a108def0451622cb5d37a0ca0549761bc))
* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.2](https://github.com/entrostat/entro-version/compare/v1.2.1...v1.2.2) (2021-09-20)


### Bug Fixes

* **tagging:** Trying to skip tagging from standard-version ([43f4615](https://github.com/entrostat/entro-version/commit/43f461540aebaaf902e175db43c4c0666c8180e8))

### [1.2.1](https://github.com/entrostat/entro-version/compare/v1.2.0...v1.2.1) (2021-09-20)


### Bug Fixes

* **push:** Rather make it a negative flag ([dd2d221](https://github.com/entrostat/entro-version/commit/dd2d221d4a5ef08d7b3fb0fca2882aedc08b9d3d))
* **release:** Removed the --push flag from the release script ([46461ca](https://github.com/entrostat/entro-version/commit/46461ca6e0a09b65583ecb5d5dd64e5669fd9ad3))

## [1.2.0](https://github.com/entrostat/entro-version/compare/v1.1.0...v1.2.0) (2021-09-20)


### Features

* **push:** Added the ability to git push while running the release ([fba5ef0](https://github.com/entrostat/entro-version/commit/fba5ef03e43cee2c5f0c7798f876aa14ab4a87c7))

## [1.1.0](https://github.com/entrostat/entro-version/compare/v1.0.6...v1.1.0) (2021-09-20)


### Features

* **release:** Added a "self" release script ([918841d](https://github.com/entrostat/entro-version/commit/918841dc54bc7273de9f5ecc529b8ac9e6bcbf63))

### [1.0.6](https://github.com/entrostat/entro-version/compare/v1.0.5...v1.0.6) (2021-09-20)


### Bug Fixes

* **keywords:** Added keywords for the npm search ([6fbbc84](https://github.com/entrostat/entro-version/commit/6fbbc84051a322b58937e03a4621285968f7dd4e))

### [1.0.5](https://github.com/entrostat/entro-version/compare/v1.0.4...v1.0.5) (2021-09-20)


### Bug Fixes

* **releases:** Merge into develop first and then master ([dbcf92e](https://github.com/entrostat/entro-version/commit/dbcf92ed1ceb5d60026cafa00594591076af0567))

### [1.0.4](https://github.com/entrostat/entro-version/compare/v1.0.3...v1.0.4) (2021-09-20)


### Bug Fixes

* **release:** Checking that the release branch is merging correctly by leaving the removal of the release branch out ([8b712f9](https://github.com/entrostat/entro-version/commit/8b712f9d75c8ecb5802b7d2062c403a8d19f12fb))

### [1.0.3](https://github.com/entrostat/entro-version/compare/v1.0.2...v1.0.3) (2021-09-20)


### Bug Fixes

* **release:** Don't use git flow to start the release ([713dcc4](https://github.com/entrostat/entro-version/commit/713dcc4bd818affcc1ff11a6e508c6a83e93c8cc))

### [1.0.2](https://github.com/entrostat/entro-version/compare/v1.0.1...v1.0.2) (2021-09-20)


### Bug Fixes

* **release:** Rather merge the release into master and develop and then delete it ([7b98413](https://github.com/entrostat/entro-version/commit/7b984135886d7b75b49a86c95d9947a10d900e83))

### [1.0.1](https://github.com/entrostat/entro-version/compare/v1.0.0...v1.0.1) (2021-09-20)


### Bug Fixes

* **flags:** Send the flags into the standard-version dry run ([4aaa254](https://github.com/entrostat/entro-version/commit/4aaa254be030a978be4ef612554330b64802868a))
* **flags:** Set the default to an empty array ([b7cc154](https://github.com/entrostat/entro-version/commit/b7cc154b1fd0fe99cfdb13e30bc7c51b9ad11b33))

## 1.0.0 (2021-09-20)
