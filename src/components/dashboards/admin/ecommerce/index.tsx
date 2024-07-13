import getAllSettings from '@/utils/api/settings/getAllSettings'
import EcommerceTabs from './EcommerceTabs'

const Ecommerce = async () => {

  const settingsData = await getAllSettings();
  console.log("settingsData", settingsData)
  const settings = settingsData.sort((a, b) => a.order - b.order)

  return (
    <EcommerceTabs settings={settings} />
  )
}
export default Ecommerce