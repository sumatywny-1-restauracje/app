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
  try {
    const res = await api.post(`/order`, order);
    const orderData = res.data;
    return {
      status: res.status,
      data: orderData,
    };
  } catch (e) {
    if (e.response.data.statusCode !== 405) {
      throw new Error(e);
    }
    return {
      status: e.response.data.statusCode,
      data: e.response.data.message,
    };
  }
}

export async function getClientOrderById(orderId) {
  const res = await api.get(`/order/${orderId}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching order");
  }

  const orderData = res.data?.order;
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

export async function getClientsPendingOrders() {
  const {
    data: { restaurants },
  } = await api.get(`/restaurant`);
  const ids = restaurants.map(({ restaurantId }: any) => restaurantId);
  const promises = ids.map((id: any) => api.get(`/order/restaurant/${id}`));

  const res: any = await Promise.all(promises);

  if (res.status !== 200) {
    throw new Error("Error while fetching orders");
  }

  return res.data;
}

export async function getClientsOrdersByRestaurant(restaurantId: string) {
  const res = await api.get(`/order/restaurant/${restaurantId}`);
  if (res.status !== 200) throw new Error("Error while fetching orders");
  return res.data;
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
