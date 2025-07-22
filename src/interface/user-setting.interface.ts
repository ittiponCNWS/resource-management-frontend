export interface IUser {
  userID: number;
  username: string;
  password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registrationDate: Date;
  roleID: number;
  roleName: string;
  statusID: number;
  statusName: string;
}

export interface ICreateUserReq {
  username: string;
  password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registrationDate: string;
  roleID: number | null;
  statusID: number | null;
}

export interface IUpdateUserCreateReq {
  userID: number;
  username: string;
  password: string;
  // email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  phoneNumber: string;
  address: string;
  registrationDate: string;
  roleID: number | null;
  statusID: number | null;
}

export interface IDeletePayload {
  idList: number[];
}
