import { createContext } from 'react';
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS, StatusContext } from './StatusContext';
import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DataContext } from './DataContext';
import axios from "axios";

export const FetchContext = createContext();

export const FetchContextProvider = ({ children }) => {

    const { appStatus, setStatus, setCanFetch, setMessage } = useContext(StatusContext);
    const { user, getAccessTokenSilently } = useAuth0();
    const { setData } = useContext(DataContext);
    

    // delete file function
    function deleteFile(id) {
        if(appStatus === STATUS_LOADING){
            alert("Some operation is currently running. Try again");
            return;
        }
        setCanFetch(false);
        setStatus(STATUS_LOADING);
        getAccessTokenSilently().then(token => {
            axios.get(`${process.env.REACT_APP_API_URL}/delete/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                console.log(data);
                setStatus(STATUS_SUCCESS);
                setCanFetch(true);
            }).catch(err => {
                console.log(err);
                setStatus(STATUS_ERROR);
                setCanFetch(true);
            })
        }).catch(err => {
            console.log(err);
            setStatus(STATUS_ERROR);
        })
    }

    // save file function
    function saveFile(file) {
        if(appStatus === STATUS_LOADING){
            alert("Some operation is currently running. Try again");
            return;
        }
        setStatus(STATUS_LOADING);
        setCanFetch(false);
        getAccessTokenSilently().then(token => {
            axios.post(process.env.REACT_APP_API_URL + '/save', file, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                setStatus(STATUS_SUCCESS);
                setCanFetch(true);
                setMessage("File saved");
            }).catch(err => {
                console.log(err);
                setStatus(STATUS_ERROR);
                setCanFetch(true);
                setMessage("Error in saving file");
            })
        }).catch(err => {
            console.log(err);
            setStatus(STATUS_ERROR);
            setCanFetch(true);
        })
    }

    // rename file function
    function renameFile(fid, name) {
        if(appStatus === STATUS_LOADING){
            alert("Some operation is currently running. Try again");
            return;
        }
        setStatus(STATUS_LOADING);
        setCanFetch(false);
        getAccessTokenSilently().then(token => {
            axios.get(`${process.env.REACT_APP_API_URL}/rename?fid=${fid}&rename=${name}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                console.log(data);
                setStatus(STATUS_SUCCESS);
                setCanFetch(true);
            }).catch(err => {
                console.log(err);
                setStatus(STATUS_ERROR);
                setCanFetch(true);
            })
        }).catch(err => {
            console.log(err);
            setStatus(STATUS_ERROR);
            setCanFetch(true);
        })
    }
    // update file
    function updateFile(file) {
        if(appStatus === STATUS_LOADING){
            alert("Some operation is currently running. Try again");
            return;
        }
        setStatus(STATUS_LOADING);
        setCanFetch(false);
        getAccessTokenSilently().then(token => {
            axios.post(process.env.REACT_APP_API_URL + '/update', file, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                // alert(data.message)
                setStatus(STATUS_SUCCESS);
                setCanFetch(true);
            }).catch(err => {
                console.log(err);
                setStatus(STATUS_ERROR);
                setCanFetch(true);
            })
        }).catch(err => {
            console.log(err);
            setStatus(STATUS_ERROR);
            setCanFetch(true);
        })
    }
    // 
    async function callApipost(route, user) {
        const url = process.env.REACT_APP_API_URL + route
        try {
            setStatus(STATUS_LOADING);
            const token = await getAccessTokenSilently();
            const response = await axios.post(url, user, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = response.data
            console.log(data)
            setStatus(STATUS_SUCCESS);
        } catch (error) {
            console.log(error.message)
            setStatus(STATUS_ERROR);
        }
    }
    //
    async function callApiget(route) {
        setStatus(STATUS_LOADING);
        const url = process.env.REACT_APP_API_URL + route + "/" + user.sub
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const _data = response.data
            setData(_data);
            setStatus(STATUS_SUCCESS);
        } catch (error) {
            console.log(error)
            setStatus(STATUS_ERROR);
        }
    }

    return (
        <FetchContext.Provider value={{ callApiget, callApipost, renameFile, saveFile, deleteFile, updateFile }}>
            {children}
        </FetchContext.Provider>
    );
};
