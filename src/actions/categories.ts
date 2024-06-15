"use server"

import newCategory from '@/utils/api/categories/newCategory';

export const HandleLogin = async (credentials) => {

  const data = await newCategory(credentials);
  return data;
  
}
