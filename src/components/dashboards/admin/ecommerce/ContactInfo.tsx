import { useState } from 'react'

const ContactInfo = ({ settings }) => {

  const [socialNetworks, setSocialNetworks] = useState(settings.filter(setting => setting.feature === 'socialNetworks'))
  // const socialNetworks = settings.filter(setting => setting.feature === 'socialNetworks');
  // const facebook = socialNetworks.find(network => network.name === 'facebook');
  // const whatsapp = socialNetworks.find(network => network.name === 'whatsapp');
  // const instagram = socialNetworks.find(network => network.name === 'instagram');

  return (
    <div>{socialNetworks.map((network) => (
      <div key={network.id}>
        {network.value}
      </div>
    ))}</div>
  )
}
export default ContactInfo