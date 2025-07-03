export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  isFavorite: boolean;
  birthDate: Date;
  phoneNumber: string;
  gender: string;
  remark: string;
}

export interface IFriendCreateReq {
  id: number;
  firstName: string;
  lastName: string;
  isFavorite: boolean;
  birthDate: string;
  phoneNumber: string;
  gender: string;
  remark: string;
}

export interface IFriendDeleteRequest {
  idList: number[];
}
