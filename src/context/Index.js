import { createContext, useState } from 'react';

export const RootContext = createContext();

export const FileContextProvider = ({ children }) => {
    const [openfile, setopenfile] = useState(null);

    return (
        <FileContext.Provider value={{ openfile, setopenfile}}>
            {children}
        </FileContext.Provider>
    );
};

