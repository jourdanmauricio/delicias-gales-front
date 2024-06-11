export enum customerType {
  RETAIL = 'retail',
  WHOLESALER = 'wholesaler',
}

export const USER_STATUS = [
  { id: customerType.RETAIL, value: customerType.RETAIL },
  { id: customerType.WHOLESALER, value: customerType.WHOLESALER },
];

export const tradStatus = (value: string) => {
  switch (value) {
    case customerType.RETAIL:
      return "Minorista";
    case customerType.WHOLESALER:
      return "Mayorista";
  }
}