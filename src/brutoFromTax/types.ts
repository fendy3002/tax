export interface config {
    bracket: configBracket[]
};
export interface configBracket {
    from: number,
    to?: number,
    percent: number
};
export interface bracket extends configBracket {
    index: number,
    value: number,
    taxValue: number,
    prev?: bracket,
    next?: bracket
};
export interface BracketClass {
    prev(): bracket,
    current(): bracket,
    next(): bracket,
};
export interface request {
    label: string,
    tax: number
};
export interface requests extends Array<request> { };
export interface calculatedRequest {
    index: number,
    label: string,
    tax: number,
    income: number,
    brackets: {
        [index: number]: {
            taxValue: number,
            income: number
        }
    }
};