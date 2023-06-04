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

  const userData = res.data.userData;
  return userData;
}
