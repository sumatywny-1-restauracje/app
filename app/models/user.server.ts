import { avatarImage } from "~/images";
import { api } from "~/utils/api";

export function getUserAvatar() {
  return avatarImage;
}

export async function getUserInformation() {
  const res = await api.get("/user/me");

  if (res.status !== 200) {
    throw new Error("Error while fetching user information");
  }

  const user = res.data;
  return user;
}

export async function signNewUser(email: string) {
  const res = await api.post("/auth/signin", {
    email: email,
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error("Error while signing new user");
  }

  const userData = res.data.userData;
  return userData;
}
