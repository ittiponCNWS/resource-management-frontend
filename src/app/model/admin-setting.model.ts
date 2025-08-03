import { IDeletePayload } from '../../../shared/interface/shared.interface';
import {
  ICreateUserReq,
  IResetPasswordReq,
  IUpdateUserCreateReq,
  IUser,
} from '../../interface/user-setting.interface';

export class AdminSettingFactory {
  public createUser(data?: IUser): ICreateUserReq {
    return {
      userName: data?.userName ?? '',
      password: data?.password ?? '',
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      dateOfBirth:
        data?.dateOfBirth?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      gender: data?.gender ?? null,
      phoneNumber: data?.phoneNumber ?? '',
      registerDate:
        data?.registerDate?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      roleID: data?.roleID ?? null,
      statusID: data?.statusID ?? null,
    };
  }

  public updateUser(data: IUser, id: number): IUpdateUserCreateReq {
    return {
      userID: id,
      userName: data?.userName ?? '',
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      dateOfBirth:
        data?.dateOfBirth?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      gender: data?.gender ?? null,
      phoneNumber: data?.phoneNumber ?? '',
      registerDate:
        data?.registerDate?.toLocaleDateString('en-CA') ??
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

  public resetPasswordReq(
    userID: number,
    newPassword: string
  ): IResetPasswordReq {
    return {
      userID: userID,
      newPassword: newPassword,
    };
  }
}
