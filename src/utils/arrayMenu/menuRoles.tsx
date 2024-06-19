import AttributesIcon from '@/icons/attributes';
import BrandsIcon from '@/icons/brands';
import CategoriesIcon from '@/icons/categories';
import HomeIcon from '@/icons/home';
import OrdersIcon from '@/icons/orders';
import ProductIcon from '@/icons/product';
import SettingsIcon from '@/icons/settings';
import UsersIcon from '@/icons/users';

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
      id: 3,
      name: "Marcas",
      href: "/dashboard/admin/brands",
      icon: BrandsIcon,
    },
    {
      id: 4,
      name: "Categorías",
      href: "/dashboard/admin/categories",
      icon: CategoriesIcon,
    },
    {
      id: 8,
      name: 'Atributos',
      href: '/dashboard/admin/attributes',
      icon: AttributesIcon,
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
  // adminCoworking: [
  //   { name: 'Inicio', href: '/dashboard/adminCoworking', icon: HomeIcon },
  //   {
  //     name: 'Mis Coworkings',
  //     href: '/dashboard/adminCoworking/coworkings',
  //     icon: BuildingOffice2Icon,
  //   },
  //   {
  //     name: 'Historial Reservas',
  //     href: '/dashboard/adminCoworking/bookingsList',
  //     icon: BookOpenIcon,
  //   },
  // ],
  // adminCompany: [
  //   { name: 'Inicio', href: '/dashboard/adminCompany', icon: HomeIcon },
  //   {
  //     name: 'Perfil empresa',
  //     href: '/dashboard/adminCompany/companyProfile',
  //     icon: UserCircleIcon,
  //   },
  //   {
  //     name: 'Empleados',
  //     href: '/dashboard/adminCompany/employees',
  //     icon: UsersIcon,
  //   },
  // ],
  // employee: [
  //   { name: 'Inicio', href: '/dashboard/employee/profile', icon: HomeIcon },
  //   {
  //     name: 'Historial Reservas',
  //     href: '/dashboard/employee/bookingsHistory',
  //     icon: BookOpenIcon,
  //   },
  //   {
  //     name: 'Nueva Reserva',
  //     href: '/dashboard/employee/bookings',
  //     icon: PlusCircleIcon,
  //   },
  // ],
  // coworking: [
  //   { name: 'Inicio', href: '/dashboard/coworking', icon: HomeIcon },
  //   {
  //     name: 'Historial Reservas',
  //     href: '/dashboard/coworking/bookingsList',
  //     icon: BookOpenIcon,
  //   },
  //   {
  //     name: 'Mis Reseñas',
  //     href: '/dashboard/coworking/myReviews',
  //     icon: BookOpenIcon,
  //   },
  // ],
};

export default menuRole;
