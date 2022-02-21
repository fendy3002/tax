import * as types from './types';
import * as lo from 'lodash';
export const calculateValue = ({
    bracket
}: {
    bracket: types.configBracket
}): number => {
    let bracketValue = (bracket.to ?? 0) - bracket.from;
    bracketValue = Math.max(0, bracketValue);
    return bracketValue;
};

export const arrange = ({
    config
}: {
    config: types.config
}) => {
    let sortedBrackets = lo.sortBy(config.bracket, k => k.from ?? 0);
    let index = 0;
    let firstBracket: types.bracket = {
        ...sortedBrackets[0],
        index: index++,
        value: calculateValue({
            bracket: sortedBrackets[0]
        })
    };
    let lastBracket = firstBracket;
    for (let each of sortedBrackets.slice(1)) {
        let currentBracket: types.bracket = {
            ...each,
            index: index++,
            value: calculateValue({ bracket: each })
        }
        currentBracket.prev = lastBracket;
        lastBracket.next = currentBracket;
    }
    return firstBracket;
};