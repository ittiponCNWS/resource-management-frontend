export interface IRoleRes {
  roleID: number;
  roleName: string;
  roleDescription: string;
}

// Base for create/update/response
interface IRolePermissionBase {
  roleName: string;
  roleDescription: string;
  permissions: IPermission[];
}

// Create Request
export interface IRolePermissionCreateReq extends IRolePermissionBase {}

// Update Request
export interface IRolePermissionUpdateReq extends IRolePermissionBase {
  roleID: number;
}

// Response (often includes ID)
export interface IRolePermissionRes extends IRolePermissionUpdateReq {}

export interface IPermission {
  pageID: number;
  pageName: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}
