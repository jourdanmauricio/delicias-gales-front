export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer',
  SELLER = 'seller',
}

export const ROLES = [
  { id: Role.ADMIN, value: Role.ADMIN },
  { id: Role.EMPLOYEE, value: Role.EMPLOYEE },
  { id: Role.CUSTOMER, value: Role.CUSTOMER },
  { id: Role.SELLER, value: Role.SELLER },
];


export function tradRoles(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return 'Admin';
    case Role.EMPLOYEE:
      return 'Empleado';
    case Role.CUSTOMER:
      return 'Cliente';
    case Role.SELLER:
      return 'Vendedor';
    default:
      return 'No definido';
  }
}
