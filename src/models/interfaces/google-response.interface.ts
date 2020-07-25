
export interface GoogleResponse {
    accessToken: string,
    displayName: string,
    email: string,
    expires: number,
    expires_in: number,
    familyName: string,
    givenName: string,
    userId: string,
    imageUrl?:string
}