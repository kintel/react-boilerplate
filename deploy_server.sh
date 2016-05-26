#!/bin/sh

git push -f server `git subtree split --prefix server`:master
