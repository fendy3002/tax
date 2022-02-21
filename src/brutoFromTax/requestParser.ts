import * as types from './types';
export const parse = ({
    request
}: {
    request: string
}) => {
    let result: types.requests = [];
    for (let line of request.split("\n")) {
        let linePart = line.split(";");
        result.push({
            label: linePart[0],
            tax: parseFloat(linePart[1]),
        });
    }
    return result;
};