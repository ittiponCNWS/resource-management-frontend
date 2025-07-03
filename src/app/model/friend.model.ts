import {
  Friend,
  IFriendCreateReq,
  IFriendDeleteRequest,
} from '../../interface/friend.interface';

export class FriendFactory {
  public createFriend(data?: Friend): IFriendCreateReq {
    return {
      id: data?.id ?? 0,
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      isFavorite: data?.isFavorite ?? false,
      birthDate: data?.birthDate?.toISOString() ?? new Date().toISOString(),
      phoneNumber: data?.phoneNumber ?? '',
      gender: data?.gender ?? '',
      remark: data?.remark ?? '',
    };
  }

  public deleteFriendReq(friendList: Friend[]): IFriendDeleteRequest {
    return {
      idList: [
        ...friendList.map((friend) => {
          return friend.id;
        }),
      ],
    };
  }
}
