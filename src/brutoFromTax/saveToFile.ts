import * as fs from 'fs';
import * as path from 'path';
import * as types from './types';
export const save = ({
    currentPath,
    config,
    calculatedRequests
}: {
    currentPath: string,
    config: types.config,
    calculatedRequests: types.calculatedRequest[]
}) => {
    const saveAs = path.join(currentPath, "out.csv");
    const d = ",";
    let result = `NO${d}Label${d}`;
    let bracketIndex = 1;
    let bracketSummary: any = {
        tax: {},
        income: {}
    };
    const sum = {
        tax: 0,
        income: 0
    };
    for (let each of config.bracket) {
        result += `Income ${bracketIndex}${d}Tax ${bracketIndex++}${d}`;
    }
    result += `Income${d}Tax`;
    result += `\n`;
    for (let eachRequest of calculatedRequests) {
        result += `${eachRequest.index + 1}${d}${eachRequest.label}${d}`;
        let bracketIndex = 0;
        for (let eachBracket of config.bracket) {
            let requestbracket = eachRequest.brackets[bracketIndex];
            result += `${requestbracket?.income ?? 0}${d}${requestbracket?.taxValue ?? 0}${d}`;

            bracketSummary.tax[bracketIndex] = (bracketSummary.tax[bracketIndex] ?? 0) + (requestbracket?.taxValue ?? 0);
            bracketSummary.income[bracketIndex] = (bracketSummary.income[bracketIndex] ?? 0) + (requestbracket?.income ?? 0);
            sum.income += requestbracket?.income ?? 0;
            sum.tax += requestbracket?.taxValue ?? 0;
            bracketIndex++;
        }
        result += `${eachRequest.income}${d}${eachRequest.tax}`;
        result += `\n`;
    }
    result+= `${d}TOTAL${d}`;
    bracketIndex = 0;
    for (let each of config.bracket) {
        result += `${bracketSummary.income[bracketIndex]}${d}${bracketSummary.tax[bracketIndex]}${d}`;
        bracketIndex++;
    }
    result += `${sum.income}${d}${sum.tax}`;
    fs.writeFileSync(saveAs, result);
}