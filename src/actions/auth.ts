"use server"
import { createSession, deleteSession, getSession, updateSession } from '@/app/lib/session';
import postLogin from '@/utils/api/auth/login';
import putUser from '@/utils/api/users/putUser';
// import PutUpdateUser from '@/utils/puts/putUpdateUser';
// import IChangePassForm from '@/utils/types/auth/changePassFormInterface';
// import ILoginForm from '@/utils/types/auth/loginFormInterface';

export const HandleLogin = async (credentials) => {

  const data = await postLogin(credentials);
  if (!data.error) await createSession(data);

  return data;
}

export const UpdateProfile = async (id, data) => {
  const updUser = await putUser(id, data);

  console.log("updUser", updUser)
  if (!updUser.error) await createSession(updUser);
  
  return updUser
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