export enum UserStatus {
  BLOCKED = 'blocked',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const USER_STATUS = [
  { id: UserStatus.BLOCKED, value: UserStatus.BLOCKED },
  { id: UserStatus.ACTIVE, value: UserStatus.ACTIVE },
  { id: UserStatus.INACTIVE, value: UserStatus.INACTIVE },

];

export const tradStatus = (value) => {
  switch (value) {
    case UserStatus.BLOCKED:
      return "Bloqueado";
    case UserStatus.ACTIVE:
      return "Activo";
    case UserStatus.INACTIVE:
      return "Inactivo";
  }
}