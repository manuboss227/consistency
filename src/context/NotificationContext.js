import React, {
  createContext,
  useState
} from "react";

export const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {

    const [
      notifications,
      setNotifications
    ] = useState([]);

    // Add Notification
    const addNotification =
      (message) => {

        const newNotification = {

          id: Date.now(),

          message,

          read: false
        };

        setNotifications(prev => [
          newNotification,
          ...prev
        ]);
      };

    // Mark Read
    const markAsRead =
      (id) => {

        setNotifications(

          notifications.map(n =>

            n.id === id
              ? {
                  ...n,
                  read: true
                }
              : n
          )

        );
      };

    return (

      <NotificationContext.Provider
        value={{
          notifications,

          addNotification,

          markAsRead
        }}
      >

        {children}

      </NotificationContext.Provider>

    );
};