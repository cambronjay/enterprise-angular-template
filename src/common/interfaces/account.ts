export interface IUser {
    guid: string;
    userId: string;
    applicationID: string;
    city?: string;
    company?: string;
    department?: string;
    firstName?: string;
    fullName?: string;
    internalUser?: boolean;
    lastName?: string;
    state?: string;
    streetAddress?: string;
    telephone?: string;
    userEmail?: string;
    userName?: string;
    userRoles?: string;
    zip?: string;
    lastLoginTime?: Date;
}
export interface IUserAuth extends IUser {
    id?: string;
    imageURL?: string;
}
export class CAuthenticate implements ILogin {
    username: string;
    password: string;
}
export interface ILogin {
    username: string;
    password: string;
}

export interface IGoogleLogin {
    token: string;
    fullName: string;
    email: string;
    imageURL: string;
}

export interface ISignUp {
    fullName: string;
    address: string;
}
export class CSignUp implements ISignUp {
    fullName: string;
    address: string;
}

export interface IUserStatus {
    pending: boolean;
    approved: boolean;
}