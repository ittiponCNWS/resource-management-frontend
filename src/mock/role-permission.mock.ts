import { RolePermission } from '../interface/role-permission.interface';

export const MOCK_ROLE_PERMISSIONS: RolePermission[] = [
  {
    id: 1,
    roleName: 'Admin',
    remark: 'Has full access to all system features.',
  },
  {
    id: 2,
    roleName: 'Editor',
    remark: 'Can create and update content but not delete.',
  },
  {
    id: 3,
    roleName: 'Viewer',
    remark: 'Can only view content. No edit permissions.',
  },
  {
    id: 4,
    roleName: 'Moderator',
    remark: 'Can manage user comments and flag content.',
  },
  {
    id: 5,
    roleName: 'Guest',
    remark: 'Temporary access with limited permissions.',
  },
];
