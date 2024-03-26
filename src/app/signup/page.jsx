"use client"

import React, { useState, useRef, useEffect } from "react";
import {Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import useAuth from "../../Hooks/useAuth";
import {successToast, errorToast} from "../../toast";


const email_regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const Signupform = () => {
  //////////////////////////////// Terms and condition modal //////////////////////////////
  const [openModal, setOpenModal] = useState();
  const [showTerms, setShowTerms] = useState(false);

  /////////////////////////////// Other States ///////////////////////////////////
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth } = useAuth();
  const [display, setdisplay] = useState(true);
  const [icon, setIcon] = useState("visibility");

  //  reset formErrors when input changes
  useEffect(() => {
    setFormErrors({});
  }, [ email, pswd, confirmPswd]);

 
  const emailRef = useRef(null);
  const pswdRef = useRef(null);
  const confirmPswdRef = useRef(null);

  const navigate = useNavigate();

  const validateInputs = () => {
    const err = {};

    if (confirmPswd !== pswd) {
      confirmPswdRef.current.focus();
      err.confirmPswd = "password does not match";
    }
    if (pswd.length < 8) {
      pswdRef.current.focus();
      err.pswd = "password should atleast 8 characters";
    }
    if (!pswd) {
      pswdRef.current.focus();
      err.pswd = "password is required";
    }
    if (!email_regex.test(email)) {
      emailRef.current.focus();
      err.email = "email is invalid";
    }
    if (!email) {
      emailRef.current.focus();
      err.email = "email is required";
    }
    setFormErrors(err);
    return err;
  };

  const SetTerms = (e) => {
    e.preventDefault();

    setShowTerms((prev) => !showTerms);
    setOpenModal("dismissible");
  };

  const showPassword = (e) => {
    setdisplay((prevstate) => !display);
    e.preventDefault();
    if (display) {
      setIcon("visibility_off");
    } else {
      setIcon("visibility");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInputs();
    const result = validateInputs();
    if (!Object.keys(result).length) {
      setIsLoading(true);
      const data = {
        emailAddress: email,
        password: pswd,
      
      };
      // submit to api
      try {
        const response = await api.post("/register", data);
        successToast(response.data.message);
  
        navigate("/login");
      } catch (error) {
        errorToast(
          error.response ? error.response.data.message : error.message
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

 

  return (
    <>
      <div className="grid justify-center place-content-center place-items-center h-screen w-screen">
        <form
          onSubmit={handleSubmit}
          className="text-slate-500 h-5/6 m-auto grid place-content-center place-items-center justify-center py-4 w-full"
        >
          <h1 className="sm:text-4xl text-3xl text-blue-400 font-bold tracking-wide uppercase sm:capitalize">
            Create account
          </h1>
          <p className="text-slate-300 font-semibold text-sm mb-5">
            Get started by creating an account
          </p>
          <div className="grid gap-3 w-full">
            {/* email */}
            <div className="w-full">
              <label
                className="block text-base font-bold text-slate-500"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="sm:px-4 text-base py-[4px] border-slate-500 mt-[3px] outline-none border-2 rounded-xl text-slate-500 w-full"
                placeholder="Enter your email"
                ref={emailRef}
              />
              <p className="text-xs text-red-600">{formErrors.email}</p>
            </div>
            {/* password */}
            <div className="w-full">
              <label
                className="block text-base font-bold text-slate-500"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={display ? "password" : "text"}
                  id="password"
                  onChange={(e) => setPswd(e.target.value)}
                  className="sm:px-4 text-base py-[4px] border-slate-500 mt-[3px] outline-none border-2 rounded-xl text-slate-500 w-full"
                  placeholder="Enter your password"
                  ref={pswdRef}
                />{" "}
                <span
                  className="material-symbols-outlined absolute right-3 bottom-1"
                  onClick={showPassword}
                >
                  {icon}
                </span>
              </div>
              <p className="text-xs text-red-600">{formErrors.pswd}</p>
            </div>
            {/* confirm password */}
            <div className="w-full">
              <label
                className="block text-base font-bold text-slate-500"
                htmlFor="confirm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={display ? "password" : "text"}
                  id="confirm"
                  onChange={(e) => setConfirmPswd(e.target.value)}
                  className="sm:px-4 text-base py-[4px] border-slate-500 mt-[3px] outline-none border-2 rounded-xl text-slate-500 w-full"
                  placeholder="Enter your password"
                  ref={confirmPswdRef}
                />
                <span
                  className="material-symbols-outlined absolute right-3 bottom-1"
                  onClick={showPassword}
                >
                  {icon}
                </span>
              </div>
              <p className="text-xs text-red-600">{formErrors.confirmPswd}</p>
            </div>
          </div>

          <button
            className="disabled:bg-slate-100 bg-blue-400 w-full my-3 text-white font-bold rounded-xl mt-6 py-[4px]"
            type="submit"
          >
            CREATE ACCOUNT
          </button>
          <p className="text-center mt-3">
            Already created an account?{" "}
            <Link to="/login" className="text-blue-400 font-bold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signupform;
