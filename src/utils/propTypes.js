import { shape, number, string, bool } from "prop-types";

export const managerPropType = shape({
  id: number,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phone: string,
  description: string,
  isActive: bool,
  dateOfBirth: string,
  title: string,
  createdAt: string,
  updatedAt: string,
  fullName: string,
});
