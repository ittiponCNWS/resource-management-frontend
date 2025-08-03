export const claimReq = {
  isAdmin: (c: any) => {
    return c.role === 'Admin';
  },
  isAnonymous: (c: any) => {
    return c.role !== null;
  },
};
