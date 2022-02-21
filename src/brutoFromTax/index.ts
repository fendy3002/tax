import * as path from 'path';
import * as fs from 'fs';
let currentPath = process.cwd();

import * as types from './types';
import * as calculate from './calculate';

let doTask = async() => {
    let configPath = path.join(currentPath, "config.json");
    let requestPath = path.join(currentPath, "request.csv");
    let config: types.config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    let request = fs.readFileSync(requestPath, "utf-8");

    calculate.tax({config, request})
};
doTask();