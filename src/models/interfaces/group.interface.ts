export interface Group {
    id?: string,
    img?: string,
    name?: string,
    mode?: string,
    currency?: string,
    totalExpenses?: number,
    users?: Array<string>
}