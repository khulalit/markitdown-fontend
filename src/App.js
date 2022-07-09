import Markdown from "./components/Markdown";
import Output from "./components/Output";
import Header from "./components/Header";
import {useState , useEffect} from 'react'
import './App.css'
import FileViewer from "./components/FileViewer";
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";
import StatusBar from "./components/StatusBar";


function App() {
  const [value, setValue] = useState("Write your markdown here");
  const [openfile, setopenfile] = useState(null);
  const {user,isAuthenticated,getAccessTokenSilently} = useAuth0();
  const [userdata,setuserdata] = useState(null);
  const [isloading, setisloading] = useState(true);
  const [html, sethtml] = useState('');
  const [isclicked,setisclicked] = useState(false);
  const [ismenuopen,setismenuopen] = useState(false);
  const [openstatus, setopenstatus] = useState({isopen:false,message:""});
  //
  const statushandler=()=>{
    if(openstatus){
      setTimeout(() => {
        setopenstatus({isopen:false,message:''})
        
      }, 2000);
    }
  }
  //
  async function callApipost(route,user) {

    const url = process.env.REACT_APP_API_URL+route
    try {
        const token= await getAccessTokenSilently();
        const response = await axios.post(url,user,{headers :{
          authorization : `Bearer ${token}`,
          'Content-Type': 'application/json'
        }})
        const data = response.data
        console.log(data)
    } catch (error) {
      console.log(error.message)
    }
}
  async function callApiget(route) {
    setisloading(true);
    const url = process.env.REACT_APP_API_URL+route+"/"+user.sub
    console.log(url)
    try {
        const token= await getAccessTokenSilently();
        const response = await axios.get(url,{headers :{
          authorization : `Bearer ${token}`,
          'Content-Type': 'application/json'
        }})
        const data = response.data
        setuserdata(data)
        setisloading(false)
        console.log(userdata)
    } catch (error) {
      console.log(error)
    }
}

  const buttonclickhandler = (e)=>{
    if(isclicked){
      setisclicked(false);
    }
    setisclicked(true);
  }
  useEffect(() => {
    if(isAuthenticated)
      callApiget('/get')
  }, [isAuthenticated]);


  return (
    <div>
      {openstatus.isopen ? <StatusBar message={openstatus.message} statushandler={statushandler}/> :""}
      <Header isclicked={isclicked} setisclicked = {setisclicked} id="not-print" setismenuopen={setismenuopen} openfile={openfile} setopenfile={setopenfile} setValue={setValue} ismenuopen={ismenuopen} callApiget={callApiget} callApipost={callApipost} value={value} />
      <div className="App">
        <Markdown sethtml={sethtml} value={value} setValue={setValue}/>
      </div>
      <div className="Footer">
        
        { isclicked ?<Output html = {value} setisclicked = {setisclicked}/>: ""}
        <div>
        <div className='footer-inner text-center'>
              <button onClick={buttonclickhandler} className='btn_'>Preview or Print</button>
                <span className='icon-1 '>
                <a href="https://twitter.com/khulalit" title="twitter icons">
                  <img className = "twitter" src={require("./assets/twitter.png")} alt = "twitter"/>
                </a>
                    
                </span>
                <span className='icon-2 '>
                <a href='https://github.com/khulalit' title="twitter icons">
                  <img className = "github" src={require("./assets/github-logo.png")} alt = "twitter"/>
                </a>
                </span>
                <div className='note'>This is web based MarkDown editor with login and save features.Follow me on above platform. Full code is available on <a href='https://github.com/khulalit'>Github</a>.</div>
            </div>
        </div>
      </div>
        {ismenuopen?<FileViewer ismenuopen={ismenuopen} data={userdata} setValue={setValue} setismenuopen={setismenuopen} openfile={openfile} setopenfile={setopenfile} callApiget={callApiget} setopenstatus={setopenstatus}/>:""}
    </div>
      
  );
}

export default App;
