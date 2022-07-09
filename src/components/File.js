import React from 'react'
import './File.css'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';

export default function ({name,unique,setismenuopen,setValue,content,setopenfile,callApiget,setopenstatus, refreshHandler}) {
  const [isloading,setisloading] = React.useState(false);
  const {getAccessTokenSilently} = useAuth0();
  function clickhandler(e) {
    setValue(content)
    console.log(e.target.innerText)
    setismenuopen(false)
    setopenfile(e.target.value)
  }
  function deletehandler(e){
    getAccessTokenSilently().then(token=>{
      axios.get(`${process.env.REACT_APP_API_URL}/delete/${e.target.value}`,{headers :{
          authorization : `Bearer ${token}`,
          'Content-Type': 'application/json'
      }}).then(data=>{
          console.log(data)
      }).catch(err=>{console.log(err)})
  }).catch(err=>{console.log(err)})
    refreshHandler();
  }
  function reanamehandler(e) {
    setisloading(true)
    const name = prompt("Enter the name of the file...")
    if(name === null)
      name = "Document"
    getAccessTokenSilently().then(token=>{
      axios.get(`${process.env.REACT_APP_API_URL}/rename?fid=${e.target.value}&rename=${name}`,{headers :{
          authorization : `Bearer ${token}`,
          'Content-Type': 'application/json'
      }}).then(data=>{
          console.log(data)
      }).catch(err=>{console.log(err)})
  }).catch(err=>{console.log(err)})
    setisloading(false);
    callApiget('/get')
    setopenstatus({
      isopen : true,
      message : "File Renamed...if not reflected click refresh icon in filevier"
    })
    
  }
  return (
    <div className='file-container' >
        <div className='file-name'>
        {isloading ? "Please wait dont not click anywhere" : name}
        </div>
        
        <div className='file-id'>
            
          <button onClick={clickhandler} className="btn" value={unique}>
            Open file
          </button>
          
          <button onClick={reanamehandler} className="btn" value={unique}>
            Rename File
          </button>
          <button onClick={deletehandler} className="btn" value={unique} src={require('../assets/trash.png')} title="Delete">
            Delete
          </button>
        </div>
    </div>
  )
}
