import React, {
  createContext,
  useEffect,
  useState
} from "react";

export const ThemeContext =
  createContext();

export const ThemeProvider = ({
  children
}) => {

  const [darkMode, setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem("darkMode");

      return savedTheme
        ? JSON.parse(savedTheme)
        : false;
    });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};