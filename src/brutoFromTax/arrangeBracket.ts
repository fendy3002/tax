import * as types from './types';
import * as lo from 'lodash';
export const calculateValue = ({
    bracket
}: {
    bracket: types.configBracket
}): types.bracket => {
    let bracketValue = (bracket.to ?? 0) - bracket.from;
    bracketValue = Math.max(0, bracketValue);
    return {
        ...bracket,
        value: bracketValue
    };
};

export const arrange = ({
    config
}: {
    config: types.config
}) => {
    let sortedBrackets = lo.sortBy(config.bracket, k => k.from ?? 0);
    let firstBracket: types.bracket = calculateValue({
        bracket: sortedBrackets[0]
    });
    let lastBracket = firstBracket;
    for (let each of sortedBrackets.slice(1)) {
        let currentBracket: types.bracket = calculateValue({ bracket: each });
        currentBracket.prev = lastBracket;
        lastBracket.next = currentBracket;
    }
    return firstBracket;
};