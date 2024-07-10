import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import Spinner2 from "@/components/shared/Spinner2";
import { USER_STATUS, tradStatus } from "@/utils/types/users/userStatus.enum";
import { tradRoles, ROLES } from "@/utils/types/users/usersRoles";

const NewEditUser = ({
  loading,
  errors,
  currentData,
  handleChange,
  action,
  hadleSubmit,
  handleCancel,
  sellers,
}) => {
  return (
    <>
      <div className="text-sm">
        <button onClick={handleCancel}>Usuarios</button> /{" "}
        {action === "NEW" ? "Nuevo" : "Modificar"}
      </div>
      <form id="user-form" onSubmit={hadleSubmit} noValidate className="mt-8">
        {loading && <Spinner2 />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* name */}
          <div className="">
            <label className="label-form">Nombre completo:</label>
            <input
              name="name"
              type="text"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={currentData.name}
            />
            <p
              className={`input-error ${errors.name ? "opacity-100" : "opacity-0"
                }`}>
              {errors.name}
            </p>
          </div>
          {/* email */}
          <div className="">
            <label className="label-form">Email:</label>
            <input
              name="email"
              type="email"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={currentData.email}
            />
            <p
              className={`input-error ${errors.email ? "opacity-100" : "opacity-0"
                }`}>
              {errors.email}
            </p>
          </div>
          {/* phone */}
          <div className="">
            <label className="label-form">Teléfono:</label>
            <PhoneInput
              className="input-form"
              defaultCountry="ar"
              name="phone"
              value={currentData.phone || ""}
              onChange={(phone) => handleChange("phone", phone)}
            />
            <p
              className={`input-error ${errors.phone ? "opacity-100" : "opacity-0"
                }`}>
              {errors.phone}
            </p>
          </div>
          {/* identification */}
          <div className="">
            <label className="label-form">DNI:</label>
            <input
              name="identification"
              type="text"
              placeholder="Número de documento"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={currentData.identification || ""}
            />
            <p
              className={`input-error ${errors.identification ? "opacity-100" : "opacity-0"
                }`}>
              {errors.identification}
            </p>
          </div>
          {/* address */}
          <div className="">
            <label className="label-form">Dirección:</label>
            <div>
              <input
                name="address"
                type="text"
                placeholder="Dirección"
                className="input-form"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={currentData.address || ""}
              />
            </div>

            <p
              className={`input-error ${errors.address ? "opacity-100" : "opacity-0"
                }`}>
              {errors.address}
            </p>
          </div>
          {/* Seller */}
          {action === "NEW" ? null : (
            <div className="relative">
              <label className="label-form" htmlFor='sellerId'>Vendedor Asignado</label>
              <div>
                <select
                  id="sellerId"
                  name="sellerId"
                  className="input-form"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={currentData.sellerId || ''}>
                  {sellers.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* website */}
          <div className="">
            <label className="label-form">Sitio web:</label>
            <input
              name="website"
              type="text"
              placeholder="Sitio web"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={currentData.website || ""}
            />
            <p
              className={`input-error ${errors.website ? "opacity-100" : "opacity-0"
                }`}>
              {errors.website}
            </p>
          </div>

          <div className="relative">
            <label className="label-form">Rol:</label>
            <div className="mt-2">
              <select
                name="role"
                className="input-form"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={currentData.role}>
                {ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {tradRoles(role.value)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              <p
                className={`input-error ${errors["role"] ? "opacity-100" : "opacity-0"
                  }`}>
                {errors["role"]}
              </p>
            </div>
          </div>

          <div className="relative">
            <label className="label-form">Estado:</label>
            <div className="mt-2">
              <select
                name="status"
                className="input-form"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={currentData.status}>
                {USER_STATUS.map((status) => (
                  <option key={status.id} value={status.id}>
                    {tradStatus(status.value)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              <p
                className={`input-error ${errors.status ? "opacity-100" : "opacity-0"
                  }`}>
                {errors.status}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-between">
          <button
            onClick={handleCancel}
            type="button"
            className="btn btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn btn-confirm">
            {action === "NEW" ? "Crear" : "Modificar"}
          </button>
        </div>
      </form>
    </>
  );
};
export default NewEditUser;
