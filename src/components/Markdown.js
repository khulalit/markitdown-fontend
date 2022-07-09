import React from 'react'
import { marked } from 'marked'
import './Markdown.css'
import MdEditor from 'react-markdown-editor-lite';
import "react-markdown-editor-lite/lib/index.css";

function Markdown(props) {
  
  const handleEditorChange = (e) => {
    
    props.setValue(e.text);
    props.sethtml(e.text)
  };
  return (
    <div className='writing_window' id='writingwindow'>
        {/* <textarea className='txtarea' onKeyDownCapture={changeHandler} onClick={(e)=>{console.log(e)}} ></textarea> */}
        <MdEditor style={{ height: '100%' }} value={props.value} renderHTML={text => marked.parse(text)} onChange={handleEditorChange} />
    </div>
  )
}

export default Markdown