import { createContext, useState } from 'react';

export const ContentContext = createContext();

export const ContentContextProvider = ({ children }) => {
    const [content, setContent] = useState(null);

    return (
        <ContentContext.Provider value={{ content, setContent}}>
            {children}
        </ContentContext.Provider>
    );
};
