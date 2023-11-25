import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  let passwordInputRef=useRef();
    let emailInputRef=useRef();
    let navigate=useNavigate();
    // useEffect(()=>{
    //     emailInputRef.current.value=localStorage.getItem("email");
    //     passwordInputRef.current.value=localStorage.getItem("password");
    //     // validateCredential();
    //     },[]);
    let validateCredential=async()=>{
        axios.defaults.baseURL='';
        let dataToSend =new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        let response=await axios.post("/validateLogin",dataToSend);
        console.log(response);
        alert(response.data.msg);
  
  if(response.data.status === "success"){
    console.log(response.data);
    alert(response.data.msg)
    navigate("/Home");
  }
  };
  return (
    <div className="App">
       <form>
        <h1>login</h1>
         <div>
      <label>email:</label>
      <input ref={emailInputRef}></input>
    </div>
    <div>
      <label>password:</label>
      <input ref={passwordInputRef}></input>
    </div>
    <div>
      <button  type='button' onClick={()=>{
       

       validateCredential()
      }}>button</button>
    </div>
    </form>

    </div>
  )
  }

export default Login