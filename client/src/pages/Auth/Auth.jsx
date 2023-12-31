import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="bg">
        <div className="container Auth">
            {/* left side */}
            <div className="row">
                <div className=" col-md-6  a-left">
                  <img src={Logo} alt="" />

                  <div className="Webname">
                    <h1>Akinola Adewole</h1>
                    <h6>Explore the ideas throughout the world</h6>
                  </div>
                </div>
           

            {/* right form side */}

            <div className=" col-md-6 a-right">
              <form className="infoForm authForm" onSubmit={handleSubmit}>
                <h3>{isSignUp ? "Register" : "Login"}</h3>
                {isSignUp && (
                  <div>
                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        placeholder="First Name"
                        className="infoInput form-control"
                        name="firstname"
                        value={data.firstname}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        required
                        type="text"
                        placeholder="Last Name"
                        className="infoInput form-control"
                        name="lastname"
                        value={data.lastname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    className="infoInput form-control"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <div className="mb-3">
                    <input
                      required
                      type="password"
                      className="infoInput form-control"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                  {isSignUp && (
                   <div className="mb-3">
                     <input
                      required
                      type="password"
                      className="infoInput form-control"
                      name="confirmpass"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                    />
                   </div>
                  )}
                </div>

                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                    marginRight: "5px",
                    display: confirmPass ? "none" : "block",
                  }}
                >
                  *Confirm password is not same
                </span>
                <div>
                  <span
                    style={{
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      resetForm();
                      setIsSignUp((prev) => !prev);
                    }}
                  >
                    {isSignUp
                      ? "Already have an account Login"
                      : "Don't have an account Sign up"}
                  </span>
                  <button
                    className="button infoButton"
                    type="Submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Auth;
