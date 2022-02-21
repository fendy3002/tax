import { Bracket } from './Bracket';
import * as types from './types';

export const calculateBracket = ({
    accumulatedTax,
    currentBracket,
    requestTaxValue
}: {
    accumulatedTax: number,
    currentBracket: types.BracketClass,
    requestTaxValue: number
}) => {
    let currentBracketTaxValue = 0;
    let currentResult: any = null;
    let additionalBracket: any = [];
    if (currentBracket.current().value > 0 && requestTaxValue + accumulatedTax > currentBracket.current().value) {
        currentBracketTaxValue = currentBracket.current().value - accumulatedTax;
        currentResult = {
            [currentBracket.current().index]: {
                taxValue: currentBracketTaxValue,
                income: currentBracketTaxValue / currentBracket.current().percent * 100
            },
        };
        currentBracket.next();

        additionalBracket = calculateBracket({
            accumulatedTax: accumulatedTax + currentBracketTaxValue,
            currentBracket: currentBracket,
            requestTaxValue: requestTaxValue - currentBracketTaxValue
        });
    } else {
        currentBracketTaxValue = requestTaxValue;
        currentResult = {
            [currentBracket.current().index]: {
                taxValue: currentBracketTaxValue,
                income: currentBracketTaxValue / currentBracket.current().percent * 100
            },
        };
    }
    return {
        ...currentResult,
        ...additionalBracket,
    };
};
export const calculate = ({
    accumulatedTax,
    currentBracket,
    request,
    index
}: {
    accumulatedTax: number,
    currentBracket: types.BracketClass,
    request: types.request,
    index: number
}): types.calculatedRequest => {
    let calculatedBrackets = calculateBracket({
        accumulatedTax: accumulatedTax,
        currentBracket: currentBracket,
        requestTaxValue: request.tax
    });
    let sumTax = 0, sumIncome = 0;
    for (let index of Object.keys(calculatedBrackets)) {
        sumTax += calculatedBrackets[index].taxValue;
        sumIncome += calculatedBrackets[index].income;
    }
    let result: types.calculatedRequest = {
        index: index,
        label: request.label,
        tax: sumTax,
        income: sumIncome,
        brackets: calculatedBrackets
    };

    return result;
};

export const tax = ({
    config, firstBracket, requests
}: {
    config: types.config,
    firstBracket: types.bracket,
    requests: types.requests
}) => {
    let accumulatedTax = 0;
    let accumulatedIncome = 0;
    let bracketClass = new Bracket(firstBracket);
    let result: types.calculatedRequest[] = [];
    let index = 0;
    for (let eachRequest of requests) {
        let calculatedBracket = calculate({
            accumulatedTax: accumulatedTax,
            currentBracket: bracketClass,
            index: index++,
            request: eachRequest
        });
        accumulatedIncome += calculatedBracket.income;
        accumulatedTax += calculatedBracket.tax;
        result.push(calculatedBracket);
    }
    return {
        income: accumulatedIncome,
        tax: accumulatedTax,
        calculatedRequest: result
    };
};