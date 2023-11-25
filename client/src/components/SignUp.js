import axios from 'axios';
import React, { useRef, useState } from 'react'
import{Link} from"react-router-dom";

function SignUp() {
let firstNameInputRef=useRef();
let lastNameInputRef=useRef();
let emailInputRef=useRef();
let passwordInputRef=useRef();
let profileInputRef=useRef();
let [profilePic,setprofilePic]=useState("./images/images.webp")

let  sendSignUpDataToServerThruAxios = async()=>{
   axios.defaults.baseURL='http://localhost:1234';
  let dataToSend = new FormData();
  dataToSend.append("fn",firstNameInputRef.current.value);
  dataToSend.append("ln",lastNameInputRef.current.value);
dataToSend.append("email",emailInputRef.current.value);
dataToSend.append("password",passwordInputRef.current.value);
for(let i=0;i<profileInputRef.current.files.length;i++){
    
dataToSend.append("profilePic",profileInputRef.current.files[i]);
}
 let response=await axios.post("/signUp",dataToSend);
console.log(response);
alert(response.data.msg)
};
  return (
    <div className='App'>
      
        <form>
            <div>
                <label>firstName:</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>lastName:</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>email:</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>password:</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>profile:</label>
                <input  type="file" ref={profileInputRef} multiple onChange={()=>{let selectedFileURL=URL.createObjectURL(  profileInputRef.current.files[0])
                setprofilePic(selectedFileURL)}}></input>
            </div>

                <img  className='profilePreview' src={profilePic} alt='#'></img>
          
            <div>
               <button type='button' onClick={()=>{
            sendSignUpDataToServerThruAxios();
               }}>SignUp</button>
            </div>
            <Link className='pop' to="/login" >Login</Link>
        </form>
    </div>
  )
}

export default SignUp