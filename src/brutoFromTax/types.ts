export interface config {
    bracket: configBracket[]
};
export interface configBracket {
    from: number,
    to?: number,
    percent: number
};
export interface bracket extends configBracket {
    value: number,
    prev?: bracket,
    next?: bracket
};
export interface requests extends Array<{
    label: string,
    tax: number
}> { };