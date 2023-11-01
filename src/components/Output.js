import './Output.css'
import { marked } from 'marked';
import "react-markdown-editor-lite/lib/index.css";

export default function Output({html}) {
 
  return (
    <div className='output_window section-container' id='to-print'>
      <div className='output custom-html-style' dangerouslySetInnerHTML={{ __html: marked.parse(html) }} >
      </div>
    </div>
  )
}
