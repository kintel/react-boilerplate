#!/bin/sh

git push -f client `git subtree split --prefix client`:master
