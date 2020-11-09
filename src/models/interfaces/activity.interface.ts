import { Expense } from './expense.interface';
import { Group } from './group.interface';
import { User } from './user.interface';

export interface Activity {
    type?: string,
    userId?: string,
    userName?: string,
    user?: User,
    groupId?: string,
    group?: Group,
    expense?: Expense,
    groupName?: string,
    date?: Date,
    img?: string,
    message?: string
}