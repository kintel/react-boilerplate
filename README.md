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

## Heroku Deployment API server

### Setup (once)

    heroku login
    heroku create -n kintel-api-boilerplate
    heroku git:remote -r server -a kintel-api-boilerplate
    heroku buildpacks:set -r server heroku/nodejs
    heroku addons:create -r server mongolab:sandbox
    heroku config:set -r server AUTH0_CLIENT_ID=<...>
    heroku config:set -r server AUTH0_CLIENT_SECRET=<...>

NB! You may need to push to :refs/heads/master once to correctly setup the remote master branch

### Setup (subsequent clones)

    heroku git:remote -r server -a kintel-api-boilerplate

NB! Remember to populate server/.env with the correct private info

### Deploy

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
    heroku create -n kintel-boilerplate
    heroku git:remote -r client -a kintel-boilerplate
    heroku buildpacks:add -r client heroku/nodejs
    heroku buildpacks:add -r client https://github.com/marshall-lee/heroku-buildpack-webpack#use_node_env
    heroku buildpacks:add -r client https://github.com/heroku/heroku-buildpack-static
    heroku config:set -r client API_APP_NAME=kintel-api-boilerplate

NB! You may need to push to :refs/heads/master once to correctly setup the remote master branch

### Setup (subsequent clones)

    heroku git:remote -r client -a kintel-boilerplate

### Deploy

Deploy current branch to heroku (NB! remote branch must be master):

    git push -f client `git subtree split --prefix client`:master


..or

    ./deploy_client.sh
