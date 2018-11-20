# Hubi [![Build Status][ci-badge]][ci] [![JavaScript Style Guide][js-standard-badge]][js-standard] [![Coverage Status][coverage-badge]][coverage] [![GitHub license][license-badge]][license]

`Hubi` is like a [database migration tool][ORM] but for [ubiquitous language][UbiquitousLanguage] i.e. it reads some of your versioned files to write code, data schema and documents.

<img src="./assets/hubi.gif" alt="how to use hubi" title="how to use hubi" />

## When to use `hubi`

Use it in one or more of the following situations:

1. If you want to have a documentated language for your domain, especially when it needs to be consulted by non-technical stakeholders.

2. When working on a project spread into different repositories e.g. back- and front-ends, so changes in one of them needs to be repeatead in the other ones in order to make the end-result work.

:warning: **`Hubi` does not connect, or tell you how to connect, the project's repositories.**

3. Your repositories are modeled in a way where it is possible to share domain knowledge across them interchangeably.

4. You want to reuse a repository's slice of the domain (the way you've coded the model) in another repository from different projects. This is the least advisable scenario, as each repository generally has a slightly different perspective on how the domain looks like.

## Installation

> As `hubi` is a development tool, it is recommended that each project have it installed by using the developer flag.

```
$ npm i hubi --save-dev
```

## Basic Use

Declare how your domain should look like in a YAML file, refered to as [domain file](domain-file), and then execute `hubi` with the options provided by its [API :star:](./docs/api.md).

Each one of this files is responsible for a piece of the domain. Its rules can be found at `hubi`'s [domain file guide :green_book:](./docs/domain-file-guide.md).

### Example

In an imaginary project, the stakeholders have decided that it is necessary to show the user's birthday in their profile page. So the file relative to the user concept is changed:

```diff
 # Domain file @ project/src/domain/user.yml
 name: User
 description: A person who has an account
 attributes:
   - name: name
     description: How to address the person
     required: true
   - name: eyes
     description: The color of the user's eyes
+    deprecated:
+    - message:
+        We've discovered that this is a useless information for us.
+        Will be deprecated soon
+    - error: false
-    required: true
+    required: false
+  - name: birthday
+    comment: This field was added later
+    type: date
+    required: false
```

With one command, it is possible to spread this change to the code, data schema and documentation. You decide which [translations](https://mvcds.github.io/hubi/#translation) `hubi` writes:

```
$ npm run my-custom-hubi-script
> hubi save --same-folder --translator joi & hubi save --output documents --translator site
```

In the example below, a [Joi schema](https://www.npmjs.com/package/joi) and an entry into the project's site were changed to reflect that change.

## More

### Dogfood

The term is used by technologies (ideas, products, etc) used by their own makers, here are some ways `hubi` dogfoods:

* [`hubi`'s doc site](https://mvcds.github.io/hubi#all) is generated by `hubi` itself
* The Domain File's YAML is a [sample](src/Domain/Entities/UbiquitousToken/domain-file.yml) of a domain file
* The source files `hubi` has generated are [imported into](https://github.com/mvcds/hubi/blob/523eb385e8f950224ee7791c8fd4edb47986ee4c/src/Domain/Objects/AttributeParser/Attributes/Attribute.js#L3) non-automatized source files i.e. we're using what we've done!

### Contributing

Take a look at our [:green_book: contributing guide](CONTRIBUTING.md) to a more complete version of this section.

#### With no code

Staring the project is an amazing help :star:, as well as fork it and talking to your peers about it.

We are also looking for ideas to improve `hubi`, so submiting bug reports, showcases, and clearer documentation & feature requests, are more than welcome.

Other non-code-related stuff, as logos and translations, are needed too.

#### With some code

This project relies on [useful Translators](https://github.com/mvcds/hubi/projects/2), so feel free to create your owns and open PRs about it.

We'd also like to improve the [HTML generated by the site translator](https://github.com/mvcds/hubi/issues/35) and add some functionalities on top of it.

### For those who don't know/use [domain-driven design [DDD]](https://airbrake.io/blog/software-design/domain-driven-design)

I don’t know if Eric Evans, the author of domain-driven design book, coined the term “ubiquitous language” or if he only used it as his books' initial seed. But I see *the-language-to-rule-them-all* as a communication tool that simply states that we should encode domain knowledge (terms, phrases, etc) into the codebase in order to bridge the gap between developers and domain experts.

But you can still use ubiquitous language regardless of DDD because it stands on its own. So, even if you don't know/use DDD you can still use `hubi` to reap the benefits of speaking a single language - at the same time you [document your code](https://developers.redhat.com/blog/2017/06/21/documentation-as-code/).

## What `hubi` stands for?

It simply means "humanitarian ubiquitous language [helper]", because `hubi` is a helper tool intended to make writing code using ubiquitous language easier.

### Should I pronounce the "h"?

No. The package name was supposed to be "ubi" (as in ubiquitous) but the name was already taken on npm, so I've used the only mute letter we have in Portuguese.

By pronouncing the "h" most Brazilians will never understand if you're referring to the Ruby programming language or this project. That sound ~~in that position~~ is not natural for us, so most of us simply can't tell "rot" and "hot", or "ruby" and "hubi", apart, for instance.

[ci-badge]: https://travis-ci.org/mvcds/hubi.svg?branch=master
[ci]: https://travis-ci.org/mvcds/hubi
[js-standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[js-standard]: https://standardjs.com
[coverage-badge]: https://coveralls.io/repos/github/mvcds/hubi/badge.svg?branch=master
[coverage]: https://coveralls.io/github/mvcds/hubi?branch=master
[license-badge]: https://img.shields.io/github/license/mvcds/hubi.svg?style=flat-square
[license]: https://github.com/mvcds/hubi/blob/master/LICENSE
[ORM]: https://en.wikipedia.org/wiki/Schema_migration
[UbiquitousLanguage]: https://martinfowler.com/bliki/UbiquitousLanguage.html
