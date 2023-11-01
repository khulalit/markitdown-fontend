import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { FileContextProvider } from './context/FileContext';
import { StatusProvider } from './context/StatusContext';
import { DataContextProvider } from './context/DataContext';
import { ContentContextProvider } from './context/ContentContext';
import { FetchContextProvider } from './context/FetchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENTID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_UNIQUEIDENTIFIER}
      scope="openid profile email name"
    >
      <StatusProvider>
        <DataContextProvider>
          <FetchContextProvider>
            <FileContextProvider>
              <ContentContextProvider>
                <App />
              </ContentContextProvider>
            </FileContextProvider>
          </FetchContextProvider>
        </DataContextProvider>
      </StatusProvider>
    </Auth0Provider>
  </React.StrictMode>
);


