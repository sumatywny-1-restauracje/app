import { api } from "~/utils/api";

export async function getCoupons() {
  const res = await api.get(`/coupon`);

  if (res.status !== 200) {
    throw new Error("Error while fetching coupons");
  }

  const franchiseApplicationsData = res.data?.coupons;
  return franchiseApplicationsData;
}

export async function createCoupon(coupon: any) {
  const res = await api.post(`/coupon`, coupon);

  if (res.status !== 201) {
    throw new Error("Error while creating coupon");
  }

  const franchiseApplicationData = res.data;
  return franchiseApplicationData;
}

export async function deleteCoupon(couponId: string) {
  const res = await api.delete(`/coupon/${couponId}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting coupon");
  }

  const franchiseApplicationData = res.data;
  return franchiseApplicationData;
}
