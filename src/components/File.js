import './File.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useState } from 'react';
import { Alert, Menu, MenuItem } from '@mui/material';
import { BiRename } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FileContext } from '../context/FileContext';
import { ContentContext } from '../context/ContentContext';
import { AiOutlineFileDone } from 'react-icons/ai'
import { FetchContext } from '../context/FetchContext';

export default function ({ name, id, index }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [rename, setRename] = useState("");
  const [open, setOpen] = useState(false);
  
  const { setopenfile } = useContext(FileContext);
  const { setContent } = useContext(ContentContext);
  const { data } = useContext(DataContext);
  const { deleteFile } = useContext(FetchContext);

  return (
    <div className='file-ontainer' >
      <div className='file-id' onContextMenu={(e) => {
        e.preventDefault();
        setAnchorEl(e.target);
        setOpen(true);
      }}>
        {rename? <NewFile input={name} newFile={false} id={id} cb={setRename}/> : <span onClick={() => {
          setopenfile({id: id, name: name});
          setContent(data[0].files[index].content);
        }}>{name}</span>}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => { setOpen(false); setAnchorEl(null) }}
          MenuListProps={{
            'aria-labelledby': 'button',
          }}
        >
          <MenuItem onClick={() => { deleteFile(id); setOpen(false) }} className='menu-item'><RiDeleteBin6Line /> Delete</MenuItem>
          <MenuItem onClick={() => { setRename(true); setOpen(false) }} className='menu-item'><BiRename />Rename</MenuItem>
        </Menu>
      </div>
    </div>
  )
}


export const NewFile = ({input, newFile, id, cb}) => {
  const [value, setValue] = useState(input || "");
  const { user } = useAuth0();
  const { saveFile, renameFile } = useContext(FetchContext);
  
  return <div>
    <input className='new-file' type='text' value={value} onChange={(e)=>{
      setValue(e.target.value)
      }
    }/>
    <button onClick={()=>{
      if(!newFile){
        renameFile(id, value);
        cb(false);
        return;
      }
      const file = {
        content: "",
        uid: user.sub,
        name : value,
      }
      saveFile(file);
      cb(false);
    }}>
      <AiOutlineFileDone/>
    </button>
    {value.length > 20 && <Alert severity='error'>
      length must be less than 20</Alert>}
  </div>
}