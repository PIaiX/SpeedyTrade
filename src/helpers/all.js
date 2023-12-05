// value - цена, currency - выводить валюту (true|false))
import { LiaRubleSignSolid } from "react-icons/lia";
import { FILE_URL } from "../config/api";

const customPrice = (value, currency = true) => {
  if (!value) {
    return 0 + "\u00A0₽";
  }
  value = parseInt(value).toLocaleString();
  if (currency) {
    value = (
      <>
        {value}
        <LiaRubleSignSolid className="ruble ms-2" />
      </>
    );
  }
  return value;
};
const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const getImageURL = ({ path = "", size = "mini", type = "user" }) => {
  if (path && Array.isArray(path) && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path[0].media;
    } else {
      return FILE_URL + "/" + type + "/" + path[0].media;
    }
  } else if (path && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path;
    } else {
      return FILE_URL + "/" + type + "/" + path;
    }
  }
  else if (!type || type == 'product' || type == 'sale' || type == 'banner' || type == 'category' || type == 'articles') {
    return "/imgs/img5.jpg";
  } else if (type == 'user') {
    return "/imgs/user.jpg";
  }
};

export { customPrice, getImageURL, declOfNum };
