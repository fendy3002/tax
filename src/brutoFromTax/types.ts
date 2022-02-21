export interface config {
    bracket: {
        from?: number,
        to?: number,
        percent: number
    }[]
};
export interface requests extends Array<{
    label: string,
    tax: number
}> { };