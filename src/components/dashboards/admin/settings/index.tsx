import getBrands from '@/utils/api/brands/getBrands'
import SettingsTabs from './SettingTabs'
import getAttributes from '@/utils/api/attributes/getAttributes'
import getCategories from '@/utils/api/categories/getCategories'

const Settings = async () => {

  const allBrands = await getBrands();
  const allAttributes = await getAttributes();
  const allCategories = await getCategories();

  return (
    <SettingsTabs
      allBrands={allBrands}
      allAttributes={allAttributes}
      allCategories={allCategories}
    />
  )
}
export default Settings