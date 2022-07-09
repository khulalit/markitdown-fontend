import React from 'react'
import './FileViewer.css'
import File from './File'
import refresh from '../assets/refresh.png'

export default function (props) {
  function refreshHandler(){
    props.callApiget('/get');
  }
  return (
    <div className='main-container'>
        <div className='inner-container'>
            {props.data==null ? "No File Here Login and Save":props.data[0].files.map((item,index) => {
              return <File name = {item.name} unique = {item._id} key={index} setismenuopen={props.setismenuopen} setValue={props.setValue} content={item.content} setopenfile={props.setopenfile} callApiget={props.callApiget} setopenstatus={props.setopenstatus} refreshHandler={refreshHandler}/>
            })}
        </div>
        <div className='refresh'>
          <img className="icon" src={refresh} onClick={refreshHandler}></img>

        </div>
    </div>
  )
}
