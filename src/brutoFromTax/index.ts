import * as path from 'path';
import * as fs from 'fs';
let currentPath = process.cwd();

import * as types from './types';
import * as calculate from './calculate';
import * as requestParser from './requestParser';

let doTask = async() => {
    let configPath = path.join(currentPath, "config.json");
    let requestPath = path.join(currentPath, "request.csv");
    let config: types.config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    let requests = requestParser.parse({request: fs.readFileSync(requestPath, "utf-8")});

    calculate.tax({config, requests})
};
doTask();