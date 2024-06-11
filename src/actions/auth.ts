"use server"
import { createSession, deleteSession, getSession } from '@/app/lib/session';
import postLogin from '@/utils/api/auth/login';

export const HandleLogin = async (credentials) => {

  const data = await postLogin(credentials);
  if (!data.error) await createSession(data);

  return data;
}

// export const HandleChangePass = async (credentials: IChangePassForm) => {

//   const data = await PutUpdateUser(credentials);
//   if (!data.error) await createSession(data);

//   return data;
// }

export const getServerSession = async () => {

  const data = await getSession();
  return data;
}

export const HandleLogout = async () => {
  await deleteSession();
}