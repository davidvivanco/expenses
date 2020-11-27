import { Expense } from './expense.interface';
import { Group } from './group.interface';
import { User } from './user.interface';

export interface Activity {
    id?: string,
    type?: string,
    userId?: string,
    userLogged?: User,
    user?: User,
    groupId?: string,
    group?: Group,
    expense?: Expense,
    groupName?: string,
    date?: Date,
    img?: string,
    message?: string
}