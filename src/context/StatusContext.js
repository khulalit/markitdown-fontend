import { createContext, useContext, useState } from 'react';
// status
export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCESS = 'success';
export const STATUS_ERROR = 'error';
export const STATUS_OFFLINE = 'offline';
export const STATUS_AUTHENTICATED = 'authenticated';
export const STATUS_UNAUTHENTICATED = 'unauthenticated';
export const STATUS_BUSY = 'busy';

export const StatusContext = createContext();

export const useStatus = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState(STATUS_IDLE); // posible states are idle, loading
  const [canFetch, setCanFetch] = useState(false);
  const [message, setMessage] = useState("");

  const setStatus = (newStatus) => {
    setAppStatus(newStatus);
  };

  return (
    <StatusContext.Provider value={{ appStatus, setStatus, canFetch, setCanFetch, setMessage, message }}>
      {children}
    </StatusContext.Provider>
  );
};
