import React from 'react'
import { marked } from 'marked'
import './Markdown.css'
import MdEditor from 'react-markdown-editor-lite';
import "react-markdown-editor-lite/lib/index.css";

function Markdown({value, sethtml}) {
  
  const handleEditorChange = (e) => {
    sethtml(e.text)
  };

  return (
    <div className='writing_window' id='writingwindow'>
        <MdEditor style={{ height: '100%' }} value={value} renderHTML={text => marked.parse(text)} onChange={handleEditorChange} />
    </div>
  )
}

export default Markdown