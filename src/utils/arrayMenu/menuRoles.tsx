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
    { id: 1, name: "Home", href: "/dashboard/admin", icon: HomeIcon },
    {
      id: 2,
      name: "Configuración",
      href: "/",
      icon: SettingsIcon,
    },
    {
      id: 7,
      name: "Pedidos",
      href: "/",
      icon: OrdersIcon,
    },
    {
      id: 5,
      name: "Clientes",
      href: "/",
      icon: UsersIcon,
    },
    {
      id: 5,
      name: "Inventarios",
      href: "/",
      icon: UsersIcon,
    },
    {
      id: 5,
      name: "Cartera",
      href: "/",
      icon: UsersIcon,
    },
  ],
};

export default menuRole;
