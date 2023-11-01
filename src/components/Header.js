import './Header.css'
import { Fragment, useContext, useState } from 'react'
import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { FiMenu } from 'react-icons/fi';
import { FileContext } from '../context/FileContext';
import { Drawer } from '@mui/material';
import File from './File'
import { DataContext } from '../context/DataContext';
import NewFileIcon from '../assets/new-file.png';
import { NewFile } from './File'
import { AiOutlineSave } from 'react-icons/ai'
import { FetchContext } from '../context/FetchContext'
import { ContentContext } from '../context/ContentContext'
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlinePrinter } from 'react-icons/ai';
import UserIcon from '../assets/user.png';
import { useRef } from 'react';
import { Menu, MenuItem} from '@mui/material';

function Header({ openOutput, setOpenOutput }) {

    // state
    const [createNewFile, setCreateNewFile] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [openLoginMenu, setOpenLoginMenu] = useState(false);

    // Auth0 context
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    // App context;
    const { openfile } = useContext(FileContext);
    const { data } = useContext(DataContext);
    const { content } = useContext(ContentContext);
    const { updateFile, callApipost } = useContext(FetchContext);

    // Ref
    const anchorRef = useRef(null);

    const printclickHandler = () => {
        if (openOutput) {
            document.getElementById('not-print').style.visibility = 'hidden'
            document.getElementById('to-print').style.top = '0'
            window.print()

        }
        console.log(document.getElementById('not-print').style.visibility = 'visible')
        console.log(document.getElementById('to-print').style.top = '10vh')
    }

    const handleLoginLogout = () => {
        setOpenLoginMenu(false);
        if (isAuthenticated)
            logout({ returnTo: window.location.origin })
        else {
            loginWithRedirect().
                then(res => {
                    console.log("you are done with login" + user)
                }).then(() => {
                    setTimeout(() => {
                        console.log("you are done with login 2 " + isAuthenticated)

                    }, 2000);
                });
        }
    }

    useEffect(() => {
        if (isAuthenticated)
            callApipost('/register', user, 1);
    }, [isAuthenticated]);


    return (
        <div className='header' id='not-print' >
            <Drawer
                chor={"left"}
                open={drawer}
                onClose={() => setDrawer(false)}
                sx={{
                    width: 200,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                    },
                }}
            >
                <div className='drawer_'>
                    {!isAuthenticated ? "Login to save file." : <>
                        <div className='drawer-header'>
                            <span className='heading'>
                                File Viewer
                            </span>
                            <span onClick={() => setCreateNewFile(true)}>
                                <img src={NewFileIcon} className='icon-mini' />
                            </span>
                        </div>
                        <div className='file'>
                            {data && data[0].files && data[0].files.map((item, index) => {
                                return <Fragment key={item._id}>
                                    <File name={item.name} id={item._id} index={index} />
                                </Fragment>
                            })}
                            {createNewFile && <NewFile input={""} newFile={true} id={null} cb={setCreateNewFile} />}

                        </div>
                    </>}
                </div>
            </Drawer>
            <div className='profile'>
                <div onClick={() => setDrawer(true)}>
                    <FiMenu color='black' className='icon' />
                </div>
                <div className='filename'>
                    <span className='fileholder'>{openfile == null ? "No file Open" : openfile.name}</span>
                    <button className='btn-reset' title='Save File' onClick={() => {
                        updateFile({
                            fid: openfile.id,
                            content: content,
                        });
                    }}>
                        <AiOutlineSave width={50} height={50} className='icon' />
                    </button>
                </div>
            </div>
            <div className='title'>
                <h2>MarkDown Editor</h2>
            </div>
            <div className='options'>
                <button className='btn-reset' onClick={()=> setOpenLoginMenu(!openLoginMenu)} ref={anchorRef}>
                    <img src={user ? user.picture : UserIcon} className='icon-large' />
                    <Menu
                        id="login-menu"
                        anchorEl={anchorRef.current}
                        open={openLoginMenu}
                        onClose={()=>setOpenLoginMenu(false)}
                        MenuListProps={{
                            'aria-labelledby': 'Login-button',
                        }}
                    >
                        {isAuthenticated && <div style={{display: "flex", justifyContent: 'center', borderBottom: '1px solid #333'}}>
                           Hi, {user.given_name}
                        </div>}
                        {isAuthenticated ? 
                            <MenuItem onClick={handleLoginLogout}>Logout</MenuItem> :
                            <MenuItem onClick={handleLoginLogout}>Login</MenuItem>
                        }
                    </Menu>
                </button>

                {openOutput && <div className='btns'>
                    <button className='btn-reset' onClick={() => setOpenOutput(false)}>
                        <IoIosArrowBack className='icon' />
                    </button>
                    <button className='btn-reset' onClick={printclickHandler}>
                        <AiOutlinePrinter className='icon' />
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default Header