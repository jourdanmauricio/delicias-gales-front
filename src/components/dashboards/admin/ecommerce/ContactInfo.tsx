import Spinner2 from '@/components/shared/Spinner2'
import useContactInfo from './useContactInfo'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'
import Link from 'next/link'

const ContactInfo = ({ settings }) => {

  const { contacts, loading, errors, handleSubmit, handleChange } = useContactInfo({ settings })

  console.log("contacts", contacts)
  return (

    <form id='user-form' onSubmit={handleSubmit} noValidate className='mt-8'>
      {loading && <Spinner2 />}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
        {contacts.map(contact => (

          <div key={contact.id} className="">
            <label className="label-form" htmlFor={contact.name}>{capitalizeFirstLetter(contact.name)}:</label>
            <input
              id={contact.name}
              name={contact.name}
              type="text"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={contact.value || ''}
            />
            <p className={`input-error ${errors[contact.name] ? 'opacity-100' : 'opacity-0'}`}>
              {errors[contact.name]}
            </p>
          </div>
        ))}

      </div>
      <div className="col-span-2 flex justify-between">
        <Link
          href="/dashboard/admin"
          className="btn btn-cancel">
          Cancelar
        </Link>
        <button type="submit" className="btn btn-confirm">Modificar</button>
      </div>
    </form>

  )
}
export default ContactInfo