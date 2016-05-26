#!/bin/bash

mongo boilerplate --eval "db.smallitems.drop()"
# csv2json data/Small-dev.csv > data/Small-dev.json
# ./scripts/addTimestamps.js data/Small-dev.json > data/Small-dev-timestamps.json
mongoimport -h localhost:27017 -d boilerplate -c smallitems --jsonArray --file=data/Small-dev-timestamps.json

mongo boilerplate --eval "db.largeitems.drop()"
# csv2json data/Large-dev.csv > data/Large-dev.json
# ./scripts/addTimestamps.js data/Large-dev.json > data/Large-dev-timestamps.json
mongoimport -h localhost:27017 -d boilerplate -c largeitems --drop --jsonArray --file=data/Large-dev-timestamps.json 
