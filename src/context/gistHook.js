import { createContext, useState, useContext } from 'react';
export const GistContext = createContext();
// Create a Gist Provider store so it can be use for user specific and  all public gists
function GistProvider({ children }) {
    const [gistInfo, setgistInfo] = useState(null);
    //destructured the response
    const changeGist = (data) => {
        setgistInfo((gistInfo) => ({
            ...gistInfo, data
        }));
    };
    //store the response
    const value = {
        gistInfo,
        changeGist
    }

    return <GistContext.Provider value={value}>{children}</GistContext.Provider>
}
//retrieve the response
const useGistInfo = () => {
    const context = useContext(GistContext);
    if (context === undefined) {
        throw new Error('use gist Info must be within an GistProvider');
    }
    return context;
}

export { GistProvider, useGistInfo };