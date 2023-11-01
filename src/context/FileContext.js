import { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileContextProvider = ({ children }) => {
    const [openfile, setopenfile] = useState(null);

    return (
        <FileContext.Provider value={{ openfile, setopenfile}}>
            {children}
        </FileContext.Provider>
    );
};
