import * as path from 'path';
import * as fs from 'fs';
let currentPath = process.cwd();

import * as types from './types';
import * as calculate from './calculate';
import * as saveToFile from './saveToFile';
import * as requestParser from './requestParser';
import * as arrangeBracket from './arrangeBracket';

let doTask = async () => {
    let configPath = path.join(currentPath, "config.json");
    let requestPath = path.join(currentPath, "request.csv");
    let config: types.config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    let requests = requestParser.parse({ request: fs.readFileSync(requestPath, "utf-8") });
    let firstBracket = arrangeBracket.arrange({
        config: config
    });
    const calculatedResult = calculate.tax({ config, firstBracket, requests });
    saveToFile.save({
        currentPath,
        config,
        calculatedRequests: calculatedResult.calculatedRequest
    });
};
doTask();