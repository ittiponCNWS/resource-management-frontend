export interface IUser {
  userID: number;
  userName: string;
  password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registerDate: Date;
  roleID: number;
  roleName: string;
  statusID: number;
  statusName: string;
}

export interface ICreateUserReq {
  userName: string;
  password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registerDate: string;
  roleID: number | null;
  statusID: number | null;
}

export interface IUpdateUserCreateReq {
  userID: number;
  userName: string;
  // password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registerDate: string;
  roleID: number | null;
  statusID: number | null;
}

export interface IDeletePayload {
  idList: number[];
}

export interface IResetPasswordReq {
  userID: number;
  newPassword: string;
}
