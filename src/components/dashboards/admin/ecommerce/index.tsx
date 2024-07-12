import getAllSettings from '@/utils/api/settings/getAllSettings'
import EcommerceTabs from './EcommerceTabs'

const Ecommerce = async () => {

  const settings = await getAllSettings();

  return (
    <EcommerceTabs settings={settings} />
  )
}
export default Ecommerce