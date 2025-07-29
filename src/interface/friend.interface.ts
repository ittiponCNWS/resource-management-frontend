export interface IFriendRes {
  id: number;
  firstName: string;
  lastName: string;
  isFavorite: boolean;
  birthDay: Date;
  phoneNumber: string;
  gender: string;
  remark: string;
}

export interface IFriendCreateReq {
  id: number;
  firstName: string;
  lastName: string;
  isFavorite: boolean;
  birthDay: string;
  phoneNumber: string;
  gender: string;
  remark: string;
}

export interface IDeletePayload {
  idList: number[];
}
