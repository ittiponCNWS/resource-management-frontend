export interface IUserList {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  address: string;
  registrationDate: string;
  role: 'Admin' | 'User' | 'Guest';
  status: 'active' | 'suspended' | 'unavailable';
}
