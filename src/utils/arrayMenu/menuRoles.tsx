import { HomeIcon, OrdersIcon, ProductIcon, SettingsIcon, UsersIcon } from '@/icons';

const menuRole = {
  admin: [
    { id: 1, name: "Home", href: "/dashboard/admin", icon: HomeIcon },
    {
      id: 2,
      name: "Configuración",
      href: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
    {
      id: 5,
      name: 'Usuarios',
      href: '/dashboard/admin/users',
      icon: UsersIcon,
    },
    {
      id: 6,
      name: "Productos",
      href: "/dashboard/admin/products",
      icon: ProductIcon,
    },
    {
      id: 7,
      name: "Pedidos",
      href: "/dashboard/admin/orders",
      icon: OrdersIcon,
    },
  ],
  seller: [
    { id: 1, name: "Home", href: "/dashboard/seller", icon: HomeIcon },
    // {
    //   id: 2,
    //   name: "Configuración",
    //   href: "/",
    //   icon: SettingsIcon,
    // },
    {
      id: 3,
      name: "Ordenes",
      href: "/dashboard/seller/seller-orders",
      icon: OrdersIcon,
    },
    {
      id: 4,
      name: "Clientes",
      href: "/dashboard/seller/customers",
      icon: UsersIcon,
    },
    // {
    //   id: 5,
    //   name: "Cartera",
    //   href: "/",
    //   icon: UsersIcon,
    // },
  ],
  employee: [
    { id: 1, name: "Home", href: "/dashboard/employee", icon: HomeIcon },
    // {
    //   id: 2,
    //   name: "Configuración",
    //   href: "/",
    //   icon: SettingsIcon,
    // },
    {
      id: 3,
      name: "Ordenes",
      href: "/dashboard/employee/employee-orders",
      icon: OrdersIcon,
    },
    {
      id: 4,
      name: "Inventario",
      href: "/dashboard/employee/inventory",
      icon: ProductIcon,
    },
    // {
    //   id: 5,
    //   name: "Cartera",
    //   href: "/",
    //   icon: UsersIcon,
    // },
  ],
};

export default menuRole;
