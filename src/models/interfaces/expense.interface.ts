
export interface Expense {
    id?:string
    concept?: string,
    details?: string,
    expense?: number,
    groupId?: string,
    userId?: string,
    date?: Date,
    time?:Date
}