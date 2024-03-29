import { apiRoutes } from "../config/api";
import $api, { $authApi } from "./index";

export const searchGames = async (q) => {
  try {
    const response = await $api(`${apiRoutes.SEARCH_GAMES}?query=${q}&page=1`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGames = async () => {
  try {
    const response = await $api(`${apiRoutes.ACTIONS_GAMES}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGamesWhereIHaveLots = async () => {
  try {
    const response = await $authApi(`${apiRoutes.GET_GAMES_WHERE_I_HAVE_LOTS}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGamesWhereUserHasLots = async (userId) => {
  try {
    const response = await $authApi(
      `${apiRoutes.GET_GAMES_WHERE_USER_HAS_LOTS}/${userId}`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getOneGame = async (slug) => {
  try {
    const response = await $authApi.get(`${apiRoutes.ACTIONS_GAMES}/${slug}`);
    // console.log(response?.data?.body)
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getGamePlatform = async (gameId) => {
  try {
    const response = await $api(`${apiRoutes.GET_GAMES_PLATFORM}/${gameId}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getGameRegions = async (gameId) => {
  try {
    const response = await $api(`${apiRoutes.GET_GAMES_REGIONS}/${gameId}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getGameServersByGameID = async (gameId) => {
  try {
    const response = await $api(
      `${apiRoutes.GET_GAMES_SERVERS_BY_GAME}/${gameId}`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getGameServers = async (regionId) => {
  try {
    const response = await $api(`${apiRoutes.GET_GAMES_SERVERS}/${regionId}`);
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = async (gameId) => {
  try {
    const response = await $api(`${apiRoutes.GET_GAMES_CATEGORIES}/${gameId}`);
    console.log(response?.data?.body)
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryParameters = async (categoryId) => {
  try {
    const response = await $api(
      `${apiRoutes.GET_PARAMS_CATEGORIES}/${categoryId}`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};

export const getGoldParameters = async (categoryId) => {
  try {
    const response = await $api(
      `${apiRoutes.GET_PARAMS_CATEGORIES}/${categoryId}`
    );
    return response?.data?.body;
  } catch (error) {
    console.log(error);
  }
};
