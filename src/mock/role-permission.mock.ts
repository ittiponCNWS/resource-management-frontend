import { IRolePermissionRes } from '../interface/role-permission.interface';

export const MOCK_ROLE_PERMISSIONS: IRolePermissionRes[] = [
  {
    roleID: 1,
    roleName: 'Admin',
    roleDescription: 'Has full access to all system features.',
  },
  {
    roleID: 2,
    roleName: 'Editor',
    roleDescription: 'Can create and update content but not delete.',
  },
  {
    roleID: 3,
    roleName: 'Viewer',
    roleDescription: 'Can only view content. No edit permissions.',
  },
  {
    roleID: 4,
    roleName: 'Moderator',
    roleDescription: 'Can manage user comments and flag content.',
  },
  {
    roleID: 5,
    roleName: 'Guest',
    roleDescription: 'Temporary access with limited permissions.',
  },
];
