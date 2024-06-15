import { Role } from '@/utils/types/users/usersRoles';

export const fields = {
  name: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  description: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ,]{3,255}$/,
    msgError: 'Debe tener entre 3 y 255 caracteres',
    type: "text",
    required: true,
  },
  lastname: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  position: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },

  identification: {
    regex: /^[0-9-]{3,15}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  companyName: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  businessSector: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  quantityBeneficiaries: {
    regex: /^[0-9-]{1,4}$/,
    msgError: 'Debe ser un número entre 1 y 9999',
    type: "number",
    required: true,
  },
  totalPasses: {
    regex: /^[0-9-]{1,4}$/,
    msgError: 'Debe ser un número entre 1 y 9999',
    type: "number",
    required: true,
  },
  address: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,255}$/,
    msgError: 'Debe tener entre 3 y 255 caracteres',
    type: "text",
    required: true,
  },
  // statusCompany: {
  //   regex: new RegExp(`^(${Object.values(CompanyStatus).join('|')})$`),
  //   msgError: 'Estado de empresa inválido',
  //   type: "enum",
  //   required: true,
  // },
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    msgError: 'Email inválido',
    required: true,
    type: "text",
  },
  companyEmail: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    msgError: 'Email inválido',
    required: true,
    type: "text",
  },
  indetification: {
    regex: /^[0-9]{7,8}$/,
    msgError: 'Solo números',
    required: true,
    type: "text",
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)',
    required: true,
    type: "text",
  },
  confPassword: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)',
    required: true,
    type: "text",
  },
  birthdate: {
    regex: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/,
    msgError: 'Debe ingresar una fecha válida',
    required: false,
    type: "text",
  },
  picture: {
    regex: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/,
    msgError: 'Debe ingresar una URL válida',
    required: false,
    type: "text",
  },
  phone: {
    regex: /^[0-9()+-]{8,15}$/,
    msgError: 'Solo números y guiones',
    required: true,
    type: "text",
  },
  companyPhone: {
    regex: /^[0-9()+-]{8,15}$/,
    msgError: 'Solo números y guiones',
    required: false,
    type: "text",
  },
  date: {
    regex: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/,
    msgError: 'Debe ingresar una fecha válida',
    required: true,
    type: "text",
  },
  minute: {
    regex: /^(00|30)$/,
    msgError: 'Debe ingresar minutos válidos',
    required: true,
    type: "text",
  },
  message: {
    regex: /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚñÑ.,(){}]$/,
    msgError: 'Debe tener entre 3 y 255 caracteres',
    required: false,
    type: "text",
  },
  website: {
    regex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    msgError: 'Url inválida',
    required: true,
    type: "text",
  },
  image: {
    regex: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    msgError: 'Url inválida',
    required: false,
    type: "text",
  },
  open: {
    regex: /^([01]\d|2[0-3]):([0-5]\d)$/,
    msgError: 'Debe ingresar una hora válida',
    required: true,
    type: "text",
  },
  close: {
    regex: /^([01]\d|2[0-3]):([0-5]\d)$/,
    msgError: 'Debe ingresar una hora válida',
    required: true,
    type: "text",
  },
  capacity: {
    regex: /^[0-9]{1,3}$/,
    msgError: 'Solo números',
    required: true,
    type: "text",
  },
  country: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  state: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  city: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: 'Debe tener entre 3 y 150 caracteres',
    type: "text",
    required: true,
  },
  role: {
    regex: new RegExp(`^(${Object.values(Role).join('|')})$`),
    msgError: 'Tamaño de empresa inválido',
    type: "enum",
    required: true,
  },
  passes: {
    regex: /^[0-9]{1,4}$/,
    msgError: 'Solo números',
    type: "text",
    required: true,
  }
};

export const formsApp = {
  loginForm: ['email', 'password'],
  registerForm: ['name', 'email', 'password', 'confPassword'],
  profileForm: ['name', 'email', 'phone', 'identification', 'address', 'website', 'image'],
  recoveryPasswordForm: ['password', 'confPassword'],
  forgotPasswordForm: ['email'],
  editCategoryForm: ['name', 'description', 'image']
};

// Formulario que modifican pass
// Validamos que pass sea igual a confPass
export const formChangePass = ['registerForm', 'recoveryForm'];

export const hourOptions = [9, 10, 11, 12, 13, 14, 15, 16, 17];