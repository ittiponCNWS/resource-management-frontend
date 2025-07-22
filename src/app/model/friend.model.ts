import {
  Friend,
  IFriendCreateReq,
  IDeletePayload,
} from '../../interface/friend.interface';

export class FriendFactory {
  public createFriend(data?: Friend): IFriendCreateReq {
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

  public editFriend(data: Friend, id: number): IFriendCreateReq {
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

  public deleteFriendReq(friendList: Friend[]): IDeletePayload {
    return {
      idList: [
        ...friendList.map((friend) => {
          return friend.id;
        }),
      ],
    };
  }
}
