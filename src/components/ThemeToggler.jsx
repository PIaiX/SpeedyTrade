import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../store/reducers/themeSlice";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state?.theme?.mode);

  return (
    <label className="themes-switcher">
      <input
        type="checkbox"
        id="theme-switch"
        onChange={() => dispatch(switchTheme())}
        checked={theme === "dark"}
      />
    </label>
  );
};

export default ThemeToggler;
