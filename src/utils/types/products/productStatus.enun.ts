export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PAUSED = 'paused'
}

export const PRODUCT_STATUS = [
  { id: ProductStatus.PAUSED, value: ProductStatus.PAUSED },
  { id: ProductStatus.ACTIVE, value: ProductStatus.ACTIVE },
  { id: ProductStatus.INACTIVE, value: ProductStatus.INACTIVE },

];

export const tradStatus = (value) => {
  switch (value) {
    case ProductStatus.PAUSED:
      return "Pausado";
    case ProductStatus.ACTIVE:
      return "Activo";
    case ProductStatus.INACTIVE:
      return "Inactivo";
  }
}