import React from 'react'
import './Header.css'
import { useAuth0} from '@auth0/auth0-react'
import axios from 'axios'
import fileicon from  '../assets/files.png'
import usericon from '../assets/user.png'

function Header(props) {
    const { user, isAuthenticated, isLoading, loginWithRedirect,logout, getAccessTokenSilently} = useAuth0();
    const handlemenu = ()=>{
        if(props.ismenuopen)
            props.setismenuopen(false)
        else{
            props.setismenuopen(true)
        }
    }
    const backclickHandler = ()=>{
        props.setisclicked(false)
    }
    const printclickHandler = ()=>{
        if(props.isclicked){
            document.getElementById('not-print').style.visibility = 'hidden'
            document.getElementById('to-print').style.top = '0'
            window.print()
            
        }
        console.log(document.getElementById('not-print').style.visibility = 'visible')
        console.log(document.getElementById('to-print').style.top = '10vh')
    }
    const handleLoginLogout = ()=>{
        if(isAuthenticated)
            logout({returnTo : window.location.origin})
        else{
            loginWithRedirect().
            then(res=>{
                console.log("you are done with login"+user)
            }).then(()=>{
                setTimeout(() => {
                    console.log("you are done with login 2 "+isAuthenticated)
                    
                }, 2000);
                // props.callApipost('/register',user)
            });
            // console.log("login")
            // props.callApipost('/register')
        }
    }
    function handleSave() {
        console.log(props.openfile)
        if(props.openfile === null){
            const file = {
                content : props.value,
                uid : user.sub
            }
            
            file.name = prompt("Enter the File name (Make sure that is unique)")
            if(file.name.length > 0){
                console.log(file)
                getAccessTokenSilently().then(token=>{
                    axios.post(process.env.REACT_APP_API_URL+'/save',file,{headers :{
                        authorization : `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }}).then(data=>{
                        alert(data.message)
                    }).catch(err=>{console.log(err)})
                }).catch(err=>{console.log(err)})
            }
        }
        else {
            const file = {
                content : props.value,
                uid : user.sub,
                fid : props.openfile
            }
            console.log(file)
            getAccessTokenSilently().then(token=>{
                axios.post(process.env.REACT_APP_API_URL+'/update',file,{headers :{
                    authorization : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }}).then(data=>{
                    console.log(data)
                }).catch(err=>{console.log(err)})
            }).catch(err=>{console.log(err)})
        }
    }
    function handleNew() {
        props.setopenfile(null);
        props.setValue("Start writing.....");
    }
    React.useEffect(() => {
        if(isAuthenticated)
            props.callApipost('/register',user,1);
    }, [isAuthenticated]);
  return (
    <div className='header'id = 'not-print' >
        <div className='profile'>
            <img className="profileimg" src={isAuthenticated? user.picture:usericon} alt='profile'></img>
            <img className='icon' onClick={handlemenu} src={fileicon} title="File Viewer"></img>
            <div className='filename'>
                Current Open File : <span className='fileholder'>{props.openfile==null?"No file Open":props.openfile}</span>

            </div>
            
        </div>
        <div className='title'>
        <h2>MarkDown Editor</h2>
        </div>
        <div className='logo'>
            {isLoading ? "Loading Please Wait...": "MarkDown Editor"}
            <span className=''></span>
        </div>
        <div className='options'>
            <button className='btn' onClick={handleLoginLogout}>

                {isAuthenticated ? "Logout": "Login"}
            </button>
            {isAuthenticated?<button className='btn' onClick={handleSave}>
                {props.openfile!==null ?"Update" : "Save"}
            </button>:""}
            {isAuthenticated?<button className='btn' onClick={handleNew}>
                New
            </button>:""}

            {props.isclicked ? <button className='btn' onClick={backclickHandler}>
                Back
            </button>  : ""}
            {props.isclicked ? <button className='btn' onClick={printclickHandler}>
                Print
            </button>  : ""}
        </div>
    </div>
  )
}

export default Header