#makers.sigfox.com

Designed as a static website (no web server required)

As it will be hosted first on Github, i'm using jekyll to manage it.

The `master` branch contains the whole source (layouts, includes & other jekyll stuff).  
The `gh-pages` branch contains only the generated static website (copy of the `_site` folder

##Dependencies

###Ruby

[RVM](https://rvm.io/rvm/install) is recommended as you won't have to deal with privileges issues & wil be able to manage the version used

####Install rvm

```
$ \curl -sSL https://get.rvm.io | bash -s stable
$ source ~/.rvm/scripts/rvm
$ rvm install 2.1
$ rvm use 2.1
```

###Jekyll

Follow the [Quick start](http://jekyllrb.com/docs/quickstart/) guide from jekyll.com

```
$ gem install jekyll
```

##Build & Run Locally

```
$ jekyll serve
```

##Release

To release only the static files, run :

```
$ sh scripts/release.sh "commit msg"
```

It will 

* Check the repo status
  * The current branch is `master`
  * There are no uncommited changes
  * There is a build present in `_site`
* Stop the jekyll process if needed
  * Will avoid the undesired side effect of deleting the build when removing the source file
* Create an orphan `gh-pages` branch if needed
* Keep only the content of `_site` & move it to `.``
* Commit & push to `gh-pages`
* Checkout back to the `master` branch
  
