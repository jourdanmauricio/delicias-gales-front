import { UserStatus } from "@/utils/types/users/userStatus.enum";
import { Role } from "@/utils/types/users/usersRoles";

export const fields = {
  name: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: "Debe tener entre 3 y 150 caracteres",
    type: "text",
    required: true,
  },
  description: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ,]{3,255}$/,
    msgError: "Debe tener entre 3 y 255 caracteres",
    type: "text",
    required: true,
  },
  lastname: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: "Debe tener entre 3 y 150 caracteres",
    type: "text",
    required: true,
  },
  identification: {
    regex: /^[0-9-]{3,15}$/,
    msgError: "Debe tener entre 3 y 150 caracteres",
    type: "text",
    required: true,
  },
  address: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ,.-/#]{3,255}$/,
    msgError: "Debe tener entre 3 y 255 caracteres",
    type: "text",
    required: true,
  },
  status: {
    regex: new RegExp(`^(${Object.values(UserStatus).join("|")})$`),
    msgError: "Estado de empresa inválido",
    type: "enum",
    required: true,
  },
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    msgError: "Email inválido",
    required: true,
    type: "text",
  },
  indetification: {
    regex: /^[0-9]{7,8}$/,
    msgError: "Solo números",
    required: true,
    type: "text",
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError:
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)",
    required: true,
    type: "text",
  },
  confPassword: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError:
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)",
    required: true,
    type: "text",
  },
  picture: {
    regex: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/,
    msgError: "Debe ingresar una URL válida",
    required: false,
    type: "text",
  },
  phone: {
    regex: /^[0-9()+-]{8,15}$/,
    msgError: "Solo números y guiones",
    required: true,
    type: "text",
  },
  date: {
    regex: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/,
    msgError: "Debe ingresar una fecha válida",
    required: true,
    type: "text",
  },
  message: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ.,(){}]$/,
    msgError: "Debe tener entre 3 y 255 caracteres",
    required: false,
    type: "text",
  },
  website: {
    regex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    msgError: "Url inválida",
    required: false,
    type: "text",
  },
  image: {
    regex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    msgError: "Url inválida",
    required: false,
    type: "text",
  },
  role: {
    regex: new RegExp(`^(${Object.values(Role).join("|")})$`),
    msgError: "Role inválido",
    type: "enum",
    required: true,
  },
  sellerId: {
    required: false,
  },
  // brandId: {
  //   regex: /^[0-9a-zA-Z\s\-áéíóúÁÉÍÓÚñÑ.,(){}]$/,
  //   msgError: "Debe tener entre 3 y 255 caracteres",
  //   required: true,
  //   type: "text"
  // }
};

export const formsApp = {
  loginForm: ["email", "password"],
  registerForm: ["name", "email", "password", "confPassword"],
  profileForm: [
    "name",
    "email",
    "phone",
    "identification",
    "address",
    "website",
    "image",
  ],
  recoveryPasswordForm: ["password", "confPassword"],
  forgotPasswordForm: ["email"],
  editCategoryForm: ["name", "description", "image"],
  editBrandForm: ["name", "description", "image"],
  userForm: [
    "name",
    "email",
    "phone",
    "identification",
    "address",
    "website",
    "image",
    "role",
    "status",
  ],
};

// Formulario que modifican pass
// Validamos que pass sea igual a confPass
export const formChangePass = ["registerForm", "recoveryForm"];

export const hourOptions = [9, 10, 11, 12, 13, 14, 15, 16, 17];
