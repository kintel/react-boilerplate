#!/bin/bash

#
# Will push the given mongodump folder to the prod server
#
# Usage $0 <dump-folder/boilerplate>

# Deploying to Heroku with the mLab add-on
MONGODB_URI=$(heroku config:get MONGODB_URI -r server | awk -F// '{print $2}')

# Extract a bunch of info from the URI
DB_NAME=$(echo "$MONGODB_URI" | awk -F/ '{print $2}')
DB_PASSWORD=$(echo "$MONGODB_URI" | awk -F: '{print $2}' | awk -F. '{print $1}' | awk -F@ '{print $1}')
DB_USERNAME=$(echo "$MONGODB_URI" | awk -F: '{print $1}')
DB_HOST=$(echo "$MONGODB_URI" | awk -F@ '{print $2}' | awk -F/ '{print $1}')

# Restore to Heroku
mongorestore -h "$DB_HOST" -d "$DB_NAME" -u "$DB_USERNAME" -p "$DB_PASSWORD" --drop --dir=$1
