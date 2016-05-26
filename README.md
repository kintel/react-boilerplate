# mongodb-express-react/redux-node BoilerPlate

## Development Setup & Run


### Server

Setup:

    cd server
    npm install

Run:

    cd server
    npm run dev

### Client

Setup:

    cd client
    npm install

Run:

    cd client
    npm run dev

## Run

Deployment mode (port 5000):

    heroku local          # Path issue to babel-node
    PATH=$PWD/node_modules/.bin:$PATH heroku local

Development mode (port 9876):

    # FIXME: This will change once we integrate react-hot-loader with server reload
    npm run nodemon

## Heroku Deployment API server

### Setup (once)

    heroku login
    heroku create api-boilerplate                    # Also creates a git remote 'heroku'
    # ..or
    heroku git:remote -r server -a api-boilerplate   # Just create git remote server
    heroku addons:create mongolab:sandbox
    heroku config:set AUTH0_CLIENT_ID=<...>
    heroku config:set AUTH0_CLIENT_SECRET=<...>

### Setup (subsequent clones)

    heroku git:remote -r server -a api-boilerplate

### Deploy

FIXME: This will change once we have a separate server for test

Deploy master branch to heroku (NB! remote branch must be master):

    git push -f server `git subtree split --prefix server`:master

..or

    ./deploy_server.sh

### Database migration

If deploying for the first time to a new database instance, we need to initialize the database.
Note: username and DB name is the same on mLab for Heroku.
NB! This will drop existing databases!

Get host, username, db (same as username) and password:

    heroku config:get MONGOLAB_URI -r server

Run migration:

    mongorestore -h <hostname>:<port> -d <user> -u <user> -p <passwd> --drop --dir=boilerplate-<timestamp>-dump/boilerplate

## Heroku Deployment client

### Setup (once)

    heroku login
    heroku create boilerplate               # Also creates a git remote 'heroku'
    # ..or
    heroku git:remote -r client -a boilerplate        # Just create git remote 'heroku'
    heroku buildpacks:set git://github.com/hone/heroku-buildpack-static.git
    heroku config:set -r client API_APP_NAME=api-boilerplate    # Or another server

### Setup (subsequent clones)

    heroku git:remote -r client -a boilerplate

### Deploy

FIXME: This will change once we have a separate server for test

Deploy current branch to heroku (NB! remote branch must be master):

    git push -f client `git subtree split --prefix client`:master


..or

    ./deploy_client.sh
