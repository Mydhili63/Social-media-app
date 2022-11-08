import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../images/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch()
  const loading= useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true);
  console.log(loading)
  const [data,setData] = useState({firstname: "",lastname: "",username: "",password: "",confirmpass: ""})
  const [confirmPass,setConfirmPass] = useState(true)
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
// Form Submission
  const handleSubmit = (e) => {
    //setConfirmPass(true);
    e.preventDefault();
    if (isSignUp)
    {
     data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false); 
    }else {
      dispatch(logIn(data))
  }
};
// Reset Form
  const resetForm = () => {
    setConfirmPass(true);
    setData({firstname: "",lastname: "",username: "",password: "",confirmpass: ""});
  };
  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/*Right side*/}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Signup" : "Login"}</h3>
            
              {isSignUp &&
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="infoInput"
                    name="firstname"
                    onChange = { handleChange }
                    value={data.firstname} 
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="infoInput"
                    name="lastname"
                    onChange = { handleChange }
                    value={data.lastname} 
                    
                  />
                </div>
              }
              

        
            <div>
              <input
                type="text"
                placeholder="Username"
                className="infoInput"
                name="username"
                onChange = { handleChange }
                value={data.username} 
       
              />
            </div>
            <div>
              <input
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                onChange = { handleChange }
                value={data.password} 
              />
              {isSignUp &&  
                <input
                  type="password"
                  className="infoInput"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  onChange = { handleChange }
                  value={data.confirmpass} 
                />
              }
             
          </div>
          <span style={{display: confirmPass ? "none": "block" ,color:"red",fontSize:'12px',alignSelf:'flex-end',marginRight:"5px" }}>
            *Confirm Password is not same
          </span>

          <div>
            <span style={{fontSize: "12px",cursor:"pointer"}} onClick ={()=>{setIsSignUp((prev)=>!prev);resetForm()}} >
              {isSignUp ? "Already have an account. Login!": "Don't have an account.SignUp"}</span>
          </div>
          <button className="button infoButton"type="Submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Signup":"login"}
          </button>
        </form>
      </div>
      </div>
  );
}
export default Auth;

