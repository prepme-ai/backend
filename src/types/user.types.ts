export enum UserTypes {
  ADMIN = "admin",
  PROFESSIONAL = "professional",
  ATTENDANT = "attendant",
  GUEST = "guest",
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
