import { api } from "~/utils/api";

export async function getClientOrders() {
  const res = await api.get(`/order`);

  if (res.status !== 200) {
    throw new Error("Error while fetching orders");
  }

  const ordersData = res.data;
  return ordersData;
}

export async function createOrder(order) {
  const res = await api.post(`/order`, order);

  if (res.status !== 200) {
    throw new Error("Error while creating order");
  }

  const orderData = res.data;
  return orderData;
}

export async function getClientOrderById(orderId) {
  const res = await api.get(`/order/${orderId}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching order");
  }

  const orderData = res.data;
  return orderData;
}

export async function cancelOrder(orderId) {
  const res = await api.patch(`/order/${orderId}`);

  if (res.status !== 200) {
    throw new Error("Error while updating order");
  }

  const orderData = res.data;
  return orderData;
}

export async function getClientsPendingOrdersByRestaurant(
  restaurantId: string
) {
  const res = await api.get(`/order/restaurant/${restaurantId}/pending`);

  if (res.status !== 200) {
    throw new Error("Error while fetching orders");
  }

  const ordersData = res.data;
  return ordersData;
}

export async function ChangeOrderStatus(orderId: string, status: string) {
  const res = await api.patch(`/order/${orderId}/status?status=${status}`);

  if (res.status !== 200) {
    throw new Error("Error while updating order");
  }

  const orderData = res.data;
  return orderData;
}
