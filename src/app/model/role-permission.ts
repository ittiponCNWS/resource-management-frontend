import { IDeletePayload } from '../../../shared/interface/shared.interface';
import {
  IRolePermissionCreateReq,
  IRoleRes,
  IRolePermissionUpdateReq,
} from '../../interface/role-permission.interface';

export class RolePermissionFactory {
  public createRolePermissionReq(
    data?: IRolePermissionCreateReq
  ): IRolePermissionCreateReq {
    return {
      roleName: data?.roleName ?? '',
      roleDescription: data?.roleDescription ?? '',
      permissions: data?.permissions ?? [],
    };
  }

  public editRolePermissionReq(
    data: IRolePermissionCreateReq,
    id: number
  ): IRolePermissionUpdateReq {
    return {
      roleID: id,
      roleName: data?.roleName ?? '',
      roleDescription: data?.roleDescription ?? '',
      permissions: data?.permissions ?? [],
    };
  }

  public deleteRolePermissionReq(friendList: IRoleRes[]): IDeletePayload {
    return {
      idList: [
        ...friendList.map((role) => {
          return role.roleID;
        }),
      ],
    };
  }
}
