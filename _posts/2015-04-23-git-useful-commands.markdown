---
layout: post
title: "GIT useful commands"
date: 2015-04-23 22:59:04 +0800
comments: true
categories: git command collections
---
This is a collections of `git` commands I use as a references when I was lazy to remember them all:

#### Create and Checkout a New Branch

Branches from currently checked out directory
```sh
$ git checkout -b <branchName>
```

#### Checkout a Remote Branch

```sh
$ git checkout -b <localBranchName> origin/<remoteBranchName>
```

#### Clone specific branch from remote

```sh
$ git clone -b <branch> <remote_repo>
```

#### Abort Changes of a File

```sh
$ git checkout -- <fileName>
```

#### Modify the Previous Commit's Message

```sh
$ git commit --amend
```

#### Partial Change Checkin

```sh
$ git add --edit
```

#### Undo the Previous Commit

```sh
$ git revert HEAD^
```

#### Temporarily Stash Changes, Restore Later

#### After changes have been made...

```sh
$ git stash
...

Do some other stuff here, like switch branches, merge other changes, etc.


Re-apply the changes
...

$ git stash pop
```

#### Rename a local branch

```sh
$ git branch -m <new branch name>
```

#### Delete a local branch

```sh
$ git branch -d the_local_branch
```

#### Delete a Remote Branch

```sh
$ git push origin :<branchName>
```

#### Add a remote branch

```sh
$ git remote add <remoteName> <gitAddress>
```

#### Get changes from that branch

```sh
$ git fetch <remoteName>
```

#### Tagging, Deleting, and Pushing Tags

#### Create a Tag

```sh
$ git tag <tagName>
```

#### Delete the tag

```sh
$ git tag -d <tagName>
```

##### Push Tags

```sh
$ git push --tags
```

#### Combining multiple commits before pushing in Git

```sh
$ git rebase -i origin/master
#(-i is for "interactive")
```

#### Fixing bugs process

```sh
$ git checkout -b issue-#001 master
# Fix the bug ...
$ git checkout master
$ git merge issue-#001
$ git push

# also push to develop branch
$ git checkout develop
$ git merge issue-#001
$ git push
$ git branch -d issue-#001

# non-fast-forward-merge
$ git merge --no-ff
```

#### Create new branch on remote repo

```sh
$ git branch develop
$ git push -u origin develop
```

#### Whenever you merge something into master, you should tag the commit for easy reference:

```sh
$ git tag -a 0.1 -m "Initial public release" master
$ git push --tags
```

#### Force pull from remote

```sh
$ git fetch --all
$ git reset --hard origin/master
```
```sh
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
```

#### Remove all deleted files before commit

```sh
$ git rm

$(git ls-files --deleted)
```
