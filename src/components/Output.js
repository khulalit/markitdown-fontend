import { marked } from 'marked';
import React from 'react'
import './Output.css'
import "react-markdown-editor-lite/lib/index.css";
 
export default function Output(props) {
  return (
    <div className='output_window section-container' id = 'to-print'>
        <div className='output custom-html-style' dangerouslySetInnerHTML={{__html : marked.parse(props.html)}} >
        </div>
    </div>
  )
}
