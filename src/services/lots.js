import { apiRoutes } from "../config/api";
import { $api, $authApi } from "./index";
import { socketInstance } from "./sockets/socketInstance";

export const getGameLots = async (gameId) => {
  try {
    const response = await $api(
      `${apiRoutes.GET_LOTS}/?gameId=${gameId}&page=1`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getLotsByUserAndGame = async (userId, gameId) => {
  try {
    const response = await $authApi(
      `${apiRoutes.GET_LOTS}/?userId=${userId}&gameId=${gameId}&page=1&limit=100`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getUserLots = async (
  userId,
  page,
  perPage,
  gameId,
  serverId,
  platformId
) => {
  try {
    const response = await $authApi(
      `${apiRoutes.GET_LOTS}${page}&userId=${userId}&limit=${perPage}&gameId=${gameId}&serverId=${serverId}&platformId=${platformId}`
    );
    // console.log(response?.data?.body);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getSellerLots = async (userId) => {
  try {
    const response = await $authApi.get(
      `${apiRoutes.LOTS_SELLER}/${userId}?page=1&limit=1000`
    );
    console.log(response.data?.body);
    return response.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getLotsByCategory = async (categoryId) => {
  try {
    const response = await $api.get(
      `${apiRoutes.LOTS_ACTIONS}?categoryId=${categoryId}&page=1`
    );
    // console.log(response.data?.body);
    return response.data?.body;
  } catch (error) {
    throw error;
  }
};

export const getLotsByCategoryRegionAndParams = async (
  regionId,
  serverId,
  categoryId,
  params,
  numeric,
  onlyOnline,
  query
) => {
  try {
    const response = await $api.get(
      `${apiRoutes.LOTS_ACTIONS}?regionId=${regionId}&serverId=${serverId}&categoryId=${categoryId}&onlyOnline=${onlyOnline}&query=${query}&page=1&limit=10`,
      {
        params: {
          options: "[" + params + "]",
          numericParameters: numeric,
        },
      }
    );
    // console.log(response.data?.body);
    return response.data?.body;
  } catch (error) {
    throw error;
  }
};

export const getOneLot = async (lotId) => {
  try {
    const response = await $api.get(`${apiRoutes.LOTS_ACTIONS}/${lotId}`);
    // console.log(response.data.body);
    return response.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getLot = async (id) => {
  try {
    const response = await $api(`${apiRoutes.GET_LOTS}/${id}`);
    // console.log(response?.data?.body);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getLotReviews = async (id) => {
  try {
    const response = await $api(`${apiRoutes.GET_LOT_REVIEWS}/${id}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const postLot = async (payloads) => {
  try {
    const response = await $authApi.post(apiRoutes.GET_LOTS, payloads);
    return response?.data;
  } catch (error) {
    return { status: 500, body: error };
  }
};

export const editLot = async (lotId, payloads) => {
  try {
    const response = await $authApi.patch(
      `${apiRoutes.GET_LOTS}/${lotId}`,
      payloads
    );
    return response?.data;
  } catch (error) {
    return { status: 500, body: error };
  }
};

export const purchaseLot = async (payloads) => {
  return await new Promise((resolve, reject) => {
    socketInstance?.emit("lots:buy", payloads, (response) => {
      try {
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  });
};

export const submitPurchase = async (purchaseId) => {
  try {
    const response = await $authApi.post(
      `${apiRoutes.PURCHASE_CONFIRM}/${purchaseId}`
    );
    return response?.data;
  } catch (error) {
    return { status: 500, body: error };
  }
};
