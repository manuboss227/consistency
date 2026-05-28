import React, {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {

    const [user, setUser] =
      useState(null);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {

      const storedUser =
        localStorage.getItem(
          "currentUser"
        );

      if (storedUser) {

        setUser(
          JSON.parse(
            storedUser
          )
        );
      }

      setLoading(false);

    }, []);

    const logout = () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "currentUser"
      );

      setUser(null);

      window.location.href =
        "/login";
    };

    return (

      <AuthContext.Provider
        value={{
          user,
          setUser,
          logout,
          loading
        }}
      >

        {children}

      </AuthContext.Provider>
    );
};

export default AuthProvider;