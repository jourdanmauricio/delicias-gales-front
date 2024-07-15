"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { HandleGoogleLogin } from "@/actions/auth";

const GoogleOauth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      HandleGoogleLogin(JSON.parse(data));
      // const user = JSON.parse(state);
      // const userInfo = userDto(user.dataUser);

      // setUser(userInfo);
      // localStorage.setItem("user", JSON.stringify(userInfo));
      // setToken(user.token);
      // localStorage.setItem("token", user.token);
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div>
      <h1>cargando info usuario</h1>
    </div>
  );
};
export default GoogleOauth;
