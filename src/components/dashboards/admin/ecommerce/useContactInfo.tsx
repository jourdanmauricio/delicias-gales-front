import updSettings from '@/utils/api/settings/updSettings';
import { useRouter } from 'next/navigation';

import { useState } from 'react'
import Swal from 'sweetalert2';

const useContactInfo = ({ settings }) => {
  const [contacts, setContact] = useState(settings.filter(setting => setting.feature === 'socialNetworks' || setting.feature === 'contact'));

  const router = useRouter();

  const [errors, setErrors] = useState({
    facebook: '',
    whatsapp: '',
    socialNetworks: '',
    email: '',
    telefono: ''
  })
  const [loading, setLoading] = useState(false);

  // const socialNetworks = settings.filter(setting => setting.feature === 'socialNetworks');
  // const facebook = socialNetworks.find(network => network.name === 'facebook');
  // const whatsapp = socialNetworks.find(network => network.name === 'whatsapp');
  // const instagram = socialNetworks.find(network => network.name === 'instagram');

  const handleChange = (name: string, value: string) => {
    const newContacts = contacts.map((contact) => contact.name === name ? { ...contact, value, change: true } : contact)
    setContact(newContacts);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("contacts", contacts);

    try {
      const changes = contacts.findIndex(contact => contact.change === true);
      if (changes === -1) throw ("Modifica alguno de los medios de contacto");
      setLoading(true);
      for await (let contact of contacts) {
        if (contact.change === true) {
          const { id, change, order, ...changes } = contact;
          await updSettings(id, changes)
        }
      }
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Configuración modificada",
        showConfirmButton: false,
        width: "450px",
        timer: 1500,
      });
      router.push("/dashboard/admin");
      router.refresh();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        confirmButtonColor: "#222B2D",
      });
    }
  }

  return { contacts, loading, errors, handleSubmit, handleChange }
}
export default useContactInfo