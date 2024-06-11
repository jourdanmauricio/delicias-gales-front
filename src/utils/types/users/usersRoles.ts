export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer',
}

export const ROLES = [
  { id: Role.ADMIN, value: Role.ADMIN },
  { id: Role.EMPLOYEE, value: Role.EMPLOYEE },
  { id: Role.CUSTOMER, value: Role.CUSTOMER },
];


export default function tradRoles(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return 'Admin';
    case Role.EMPLOYEE:
      return 'Empleado';
    case Role.CUSTOMER:
      return 'Cliente';
    default:
      return 'No definido';
  }
}
