import './App.css'
import Markdown from "./components/Markdown";
import Output from "./components/Output";
import Header from "./components/Header";
import { useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useContext } from "react";
import { STATUS_ERROR, STATUS_IDLE, STATUS_SUCCESS, StatusContext } from "./context/StatusContext";
import { BiSolidPrinter } from 'react-icons/bi';
import { ContentContext } from "./context/ContentContext";
import { FetchContext } from "./context/FetchContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  // component state
  const [openOutput, setOpenOutput] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  // auth0 state
  const { isAuthenticated } = useAuth0();

  // app state
  const { appStatus } = useContext(StatusContext);
  const { content, setContent } = useContext(ContentContext);
  const { callApiget } = useContext(FetchContext);
  const { canFetch, message } = useContext(StatusContext);

  useEffect(()=>{
    setOpenMessage(true);
  },[message])

  useEffect(() => {
    if(canFetch)
      callApiget('/get');
  }, [canFetch])

  useEffect(() => {
    if(isAuthenticated)
      callApiget('/get')
  }, [isAuthenticated]);

  function showBackdrop(status) {
    if (status === STATUS_SUCCESS) return false;
    if (status === STATUS_ERROR) return false;
    if (status === STATUS_IDLE) return false;
    return true;
  }

  return (
    <div>
      {(showBackdrop(appStatus)) && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}

      <Header openOutput={openOutput} setOpenOutput={setOpenOutput} id="not-print" />

      <div className="App">
        <Markdown sethtml={setContent} value={content} />
      </div>
      <div className="Footer">

        {openOutput && <Output html={content} setOpenOutput={setOpenOutput} openOutput={openOutput} />}
        <div>
          <div className='footer-inner text-center'>
            <button onClick={() => setOpenOutput(true)} className='btn_'><BiSolidPrinter /></button>
            <span className='icon-1 '>
              <a href="https://twitter.com/khulalit" title="twitter icons">
                <img className="twitter" src={require("./assets/twitter.png")} alt="twitter" />
              </a>
            </span>
            <span className='icon-2 '>
              <a href='https://github.com/khulalit' title="twitter icons">
                <img className="github" src={require("./assets/github-logo.png")} alt="twitter" />
              </a>
            </span>
            <p className='note'>This is web based MarkDown editor with login and save features.Follow me on above platform. Full code is available on <a href='https://github.com/khulalit'>Github</a>.</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
