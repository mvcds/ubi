# Hubi [![Build Status](https://travis-ci.org/mvcds/hubi.svg?branch=master)](https://travis-ci.org/mvcds/hubi) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/mvcds/hubi/badge.svg?branch=master)](https://coveralls.io/github/mvcds/hubi?branch=master)

> Teach `hubi` your [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) and it will write relevant source files for you

:warning: this is a work in progress, so it may not atend all your needs yet

The humanitarian ubiquitous language helper, or `hubi` for short, reads [domain files](https://mvcds.github.io/hubi/#domain-file) and generates whatever you teach it, using your [domain language](https://mvcds.github.io/hubi/#ubiquitous-language) so you don't have to manually change your [Joi Schemas](https://github.com/mvcds/hubi/issues/17), [Sequelize Models](https://github.com/mvcds/hubi/issues/26), [GraphQL types](https://github.com/mvcds/hubi/issues/27), [C# classes](https://github.com/mvcds/hubi/issues/28), etc.

## Getting started

For some reason, NPM is not showing the link to the [github repository](https://github.com/mvcds/hubi) 🤷

### Install

Use your favorite package manager to install `hubi` locally, mine is [`yarn`](https://yarnpkg.com/).

```
yarn add hubi --dev
```

You may also use `npm` to install it, the only important part is that it should be installed with the developer flag, so packages depending on yours won't download it.

> In case you're working on a personal project, it is okay to have it installed globally but with teams, the ideal is that everyone is using the same version, thus a local installation is best recommended.

### Define an ubiquitous language

Teaching `hubi` your ubiquitous language is a matter of creating domain files (YAML) using `hubi`'s own domain file as a [sample](src/Domain/Entities/DomainFile/domain-file.yml).

Let's pretend our ubiquitous language has an npm-package [token](https://mvcds.github.io/hubi/#ubiquitous-token):

```yaml
# src/domain/entities/npm-package.yml
name: NPM Package
description: A node project distributed through NPM
attributes:
  - name: name
    description: The unique package name, e.g. `hubi`
    type: string # if type is ommited, then "string" is used
    required: true
  - name: version
    description: The package's lastest version
    required: true
```

### Generate relevant source files

Add a new npm script to your `package.json`, so you can run it on a whim:

```json
{
  ...
  "hubi": "hubi save --pattern src/**/*.yml --output domain --translator log"
  ...
}
```

And from the command line call it to generate files you can use:

```shell
yarn hubi
```

## CLI

At the moment, `hubi` can only be used via command line

### log

Logs the ubiquitous language entities to the console, in order to allow you to read it before saving it

* `--pattern | -p` is a glob pattern to your domain files, defaults to `src/**/*.yml`
* `--translator | -t` which [translator](https://mvcds.github.io/hubi/#translator) will be use to put the domain files into the console, defaults to `log`, a value used when developing the proof of concept but rather useless - at this version, a better choice for you is `site` or `joi`.
* `--verbose | -v` which allows debugging

### save

Saves the ubiquitous language entities into source files, the whole point of this project!

* the same arguments as `log`, plus
* `--output | -o` is the folder to which files will be saved, defaults to `domain`, it is literally a single folder at the moment 😞 - in the future you should be able tell `hubi` where to save files with more precision

## More

### Contributing

Showing the project to your peers is itself an amazing way of contribute but as `hubi` is an open-source project, you are also able to submit issues and pull requests. [Take a look at our contributing guide.](CONTRIBUTING.md)

Even **if you don't want to code**, you can always feedback us about non-clear documentation, showcase your domain and even inform us about bugs.

One of our most urgent needs are that we [miss useful Translators](https://github.com/mvcds/hubi/projects/2), so people may not use `hubi` because it does not attend their needs **yet**.

Improving the [HTML generated by the site translator](https://github.com/mvcds/hubi/issues/35) is also a wonderful initiative!

### For those who don't know/use [domain-driven design [DDD]](https://airbrake.io/blog/software-design/domain-driven-design)

I don’t know if Eric Evans, the author of domain-driven design book, coined the term “ubiquitous language” or if he only used it as his books’s initial seed. But I see *the-language-to-rule-them-all* as a communication tool that simply states that we should encode domain knowledge (terms, phrases, etc) into the codebase in order to bridge the gap between developers and domain-experts.

But you can still use ubiquitous language regardless of DDD, because it stands on its own. So, even if you don't know/use DDD you can still use `hubi` to reap the benefits of speaking a single language - at the same time you [document your code](https://developers.redhat.com/blog/2017/06/21/documentation-as-code/).

### Should I pronounce the "h"?

No. The package name was supposed to be "ubi" (as in ubiquitous) but the name was already taken on npm, so I've used the only mute letter we have in Portuguese.

By pronouncing the "h" most Brazilians will never understand if you're referring to the Ruby programming language or this project. That sound ~~in that position~~ is not natural for us, so most of us simply can't tell "rot" and "hot", or "ruby" and "hubi", apart, for instance.
