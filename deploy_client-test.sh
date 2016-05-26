#!/bin/sh

git push -f client-test `git subtree split --prefix client`:master
