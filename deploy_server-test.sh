#!/bin/sh

git push -f server-test `git subtree split --prefix server`:master
