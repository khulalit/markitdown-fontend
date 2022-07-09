import React from 'react'
import './StatusBar.css'

export default function StatusBar({message,statushandler}) {
    statushandler();
  return (
    <div className='status-container'>
        <h3>{message} </h3>
    </div>
  )
}
