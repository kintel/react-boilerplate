#!/usr/bin/env node
"use strict";
//
// Adds createdAt and updatedAt timestamps to all records in the given JSON array.
//
// Usage:
//  ./scripts/addTimestamps.js input.json > output.json
//

const fs = require('fs');

if (process.argv.length !== 3) {
  console.error('Usage: addTimestamps.js [file.json]');
  process.exit(1);
}

const array = JSON.parse(fs.readFileSync(process.argv[2]));
for (let record of array) {
  const time = {$date: new Date()};
  record.createdAt = time;
  record.updatedAt = time;
}
console.log(JSON.stringify(array));
