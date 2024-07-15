"use server";
import {
  createSession,
  deleteSession,
  getSession,
  updateSession,
} from "@/app/lib/session";
import postLogin from "@/utils/api/auth/login";
import putUser from "@/utils/api/users/putUser";

export const HandleLogin = async (credentials) => {
  const data = await postLogin(credentials);
  if (!data.error) await createSession(data);

  return data;
};
export const HandleGoogleLogin = async (data) => {
  await createSession(data);

  return data;
};

export const HandleChangeProfile = async (id, data) => {
  console.log("HandleChangeProfile", id, data);

  const profile = await putUser(id, data);
  if (!data.error) await updateSession(profile);

  return data;
};

// export const HandleChangePass = async (credentials: IChangePassForm) => {

//   const data = await PutUpdateUser(credentials);
//   if (!data.error) await createSession(data);

//   return data;
// }

export const getServerSession = async () => {
  const data = await getSession();
  return data;
};

export const HandleLogout = async () => {
  await deleteSession();
};
