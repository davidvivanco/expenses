

export interface User {
    id?: string
    _id?: string
    googleId?: string
    name?: string
    lastname?: string
    totalExpenses?:number
    email?: string,
    imageUrl?: string,
    img?: string,
    fakeUser?: boolean,
    groups?: Array<string>
}

