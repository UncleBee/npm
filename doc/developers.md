npm-developers(1) -- Developer Guide
====================================

## DESCRIPTION

So, you've decided to use npm to develop (and maybe publish/deploy)
your project.

Fantastic!

There are a few things that you need to do above the simple steps
that your users will do to install your program.

## About These Documents

These are man pages.  If you install npm, you should be able to
then do `man npm-thing` to get the documentation on a particular
topic.

Any time you see "see npm-whatever(1)", you can do `man npm-whatever`
or `npm help whatever` to get at the docs.

## What is a `package`

A package is:

* a) a folder containing a program described by a package.json file
* b) a gzipped tarball containing (a)
* c) a url that resolves to (b)
* d) a `<name>@<version>` that is published on the registry with (c)
* e) a `<name>@<tag>` that points to (d)
* f) a `<name>` that has a "latest" tag satisfying (e)

Even if you never publish your package, you can still get a lot of
benefits of using npm if you just want to write a node program (a), and
perhaps if you also want to be able to easily install it elsewhere
after packing it up into a tarball (b).

## The package.json File

You need to have a `package.json` file in the root of your project to do
much of anything with npm.  That is basically the whole interface.

See npm-json(1) for details about what goes in that file.  At the very
least, you need:

* name:
  This should be a string that identifies your project.  Please do not
  use the name to specify that it runs on node, or is in JavaScript.
  You can use the "engines" field to explicitly state the versions of
  node (or whatever else) that your program requires, and it's pretty
  well assumed that it's javascript.
  
  It does not necessarily need to match your github repository name.
  
  So, `node-foo` and `bar-js` are bad names.  `foo` or `bar` are better.

* version:
  A semver-compatible version.

* engines:
  Specify the versions of node (or whatever else) that your program
  runs on.  The node API changes a lot, and there may be bugs or new
  functionality that you depend on.  Be explicit.

* author:
  Take some credit.

* scripts:
  If you have a special compilation or installation script, then you
  should put it in the `scripts` hash.  See npm-scripts(1).

* main:
  If you have a single module that serves as the entry point to your
  program (like what the "foo" package gives you at require("foo")),
  then you need to specify that in the "main" field.

* directories:
  This is a hash of folders.  The best ones to include are "lib" and
  "doc", but if you specify a folder full of man pages in "man", then
  they'll get installed just like these ones.

You can use `npm init` in the root of your package in order to get you
started with a pretty basic package.json file.  See `npm-init(1)` for
more info.

## Bundling Dependencies

If you depend on something that is not published (but has a package.json
file) then you can `bundle` that dependency into your package.

* Add the `"name":"version"` to your dependency hash, as if it was a
  published package.
* Do `npm bundle install <pkg>` where `<pkg>` is the path/tarball/url to
  the unpublished package.

To bundle dependencies that ARE published (perhaps, if you will not have
access to the registry when it is installed, or if you would like to
make some modifications to them), you can use `npm bundle` (with no
other arguments) to bundle-install all your dependencies.

More info at `npm-bundle(1)`.

## Link Packages

`npm link` is designed to install a development package and see the
changes in real time without having to keep re-installing it.  (You do
need to either re-link or `npm rebuild` to update compiled packages,
of course.)

More info at `npm-link(1)`.

## Before Publishing: Make Sure Your Package Installs and Works

**This is important.**

If you can not install it locally, you'll have
problems trying to publish it.  Or, worse yet, you'll be able to
publish it, but you'll be publishing a broken or pointless package.
So don't do that.

In the root of your package, do this:

    npm install

That'll show you that it's working.  If you'd rather just create a symlink
package that points to your working directory, then do this:

    npm link

Use `npm ls installed` to see if it's there.

Then go into the node-repl, and try using require() to bring in your module's
main and libs things.  Assuming that you have a package like this:

    node_foo/
      lib/
        foo.js
        bar.js

and you define your package.json with this in it:

    { "name" : "foo"
    , "directories" : { "lib" : "./lib" }
    , "main" : "./lib/foo"
    }

then you'd want to make sure that require("foo") and require("foo/bar") both
work and bring in the appropriate modules.

## Create a User Account

Create a user with the adduser command.  It works like this:

    npm adduser

and then follow the prompts.

This is documented better in npm-adduser(1).  So do this to get the
details:

    npm help adduser

## Publish your package

This part's easy.  IN the root of your folder, do this:

    npm publish

You can give publish a url to a tarball, or a filename of a tarball,
or a path to a folder.

Note that pretty much **everything in that folder will be exposed**
by default.  So, if you have secret stuff in there, use a `.npminclude`
or `.npmignore` file to list out the globs to include/ignore, or publish
from a fresh checkout.

## Brag about it

Send emails, write blogs, blab in IRC.

Tell the world how easy it is to install your program!
