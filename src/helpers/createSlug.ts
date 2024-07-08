export function createSlug(productName) {
  const accents = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u',
    'ñ': 'n', 'Ñ': 'n'
  };

  let slug = productName.toLowerCase().split('').map(char => accents[char] || char).join('');
  slug = slug.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}