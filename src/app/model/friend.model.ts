import { IDeletePayload } from '../../../shared/interface/shared.interface';
import { IFriendRes, IFriendCreateReq } from '../../interface/friend.interface';

export class FriendFactory {
  public createFriend(data?: IFriendRes): IFriendCreateReq {
    return {
      id: data?.id ?? 0,
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      isFavorite: data?.isFavorite ?? false,
      birthDay:
        data?.birthDay?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      phoneNumber: data?.phoneNumber ?? '',
      gender: data?.gender ?? '',
      remark: data?.remark ?? '',
    };
  }

  public editFriend(data: IFriendRes, id: number): IFriendCreateReq {
    return {
      id: id ?? 0,
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      isFavorite: data?.isFavorite ?? false,
      birthDay:
        data?.birthDay?.toLocaleDateString('en-CA') ??
        new Date().toLocaleDateString('en-CA'),
      phoneNumber: data?.phoneNumber ?? '',
      gender: data?.gender ?? '',
      remark: data?.remark ?? '',
    };
  }

  public deleteFriendReq(friendList: IFriendRes[]): IDeletePayload {
    return {
      idList: [
        ...friendList.map((friend) => {
          return friend.id;
        }),
      ],
    };
  }
}
