import {
  ICreateUserReq,
  IDeletePayload,
  IUpdateUserCreateReq,
  IUser,
} from '../../interface/user-setting.interface';

export class AdminSettingFactory {
  public createUser(data?: IUser): ICreateUserReq {
    return {
      username: data?.username ?? '',
      password: data?.password ?? '',
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      dateOfBirth:
        data?.dateOfBirth?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      gender: data?.gender ?? null,
      phoneNumber: data?.phoneNumber ?? '',
      address: data?.address ?? '',
      registrationDate:
        data?.registrationDate?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      roleID: data?.roleID ?? null,
      statusID: data?.statusID ?? null,
    };
  }

  public updateUser(data: IUser, id: number): IUpdateUserCreateReq {
    return {
      userID: data.userID,
      username: data?.username ?? '',
      password: data?.password ?? '',
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      dateOfBirth:
        data?.dateOfBirth?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      gender: data?.gender ?? null,
      phoneNumber: data?.phoneNumber ?? '',
      address: data?.address ?? '',
      registrationDate:
        data?.registrationDate?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      roleID: data?.roleID ?? null,
      statusID: data?.statusID ?? null,
    };
  }

  public deleteUserReq(userList: IUser[]): IDeletePayload {
    return {
      idList: [
        ...userList.map((user) => {
          return user.userID;
        }),
      ],
    };
  }
}
