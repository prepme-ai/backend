export enum UserTypes {
  ADMIN = "99",
  PROFESSIONAL = "2",
  ATTENDANT = "1",
  GUEST = "0",
}

export interface User {
  uid: string;
  _id: string;
  image: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userType: UserTypes;
  createdAt: Date;
  updatedAt: Date;
}
