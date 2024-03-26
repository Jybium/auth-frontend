

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../toast";
import useAuth from "../../Hooks/useAuth";
import { api } from "../../api";

const Signinform = () => {
  const { isAuth, setAuth, setIsAuth, auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [redirect, setRedirect] = useState("");
  const redirectRef = useRef("");
  const [icon, setIcon] = useState("visibility");

  // /////////////////////////////////////////////////////////////////
  

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await api.post("/login", data);
      const { user } = response.data.data;
      const token = response.data.data.user.accessToken;
      const refreshToken = response.data.data.user.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(token, refreshToken)
      console.log(response.data);
      setAuth((prev) => {
        return {
          ...prev,
          ...user,
          token,
        };
      });

      history("/me");
      successToast("Login Successfully!");
    } catch (error) {
      errorToast(error.response ? error.response.data.message : error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////////////// LOGIC TO SHOW AND HIDE PASSWORD //////////////////////////////

  const showPassword = (e) => {
    setShow(() => !show);
    e.preventDefault();
    if (show) {
      setIcon("visibility_off");
    } else {
      setIcon("visibility");
    }
  };

  return (
    <>
      <div className="grid justify-center place-content-center place-items-center h-screen w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="text-slate-500 h-5/6 m-auto grid place-content-center place-items-center justify-center p-4">
          
            
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl text-blue-400 font-bold tracking-wider mb-2">
                Log In
              </h1>
              <p className="text-slate-500 font-semibold text-base">
                Welcome back, enter details to pick up where you left off.
              </p>
            </div>

            <div className="grid gap-3 w-full">
              <div className="grid w-full">
                <label
                  htmlFor="email"
                  className="text-bold grid text-base font-bold text-slate-500 w-full"
                >
                  Email Address
                  <input
                    type="text"
                    name="emailAddress"
                    className="px-4 text-base py-[4px] border-slate-500 outline-none border-2 rounded-xl w-full text-slate-500"
                    id="email"
                    {...register("emailAddress", {
                      required: true,
                      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
                    })}
                  />
                </label>
                {errors.email && errors.email.type === "required" && (
                  <p className="text-sm text-red-600 font-bold">
                    Email is required
                  </p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="text-sm text-red-600 font-bold">
                    Email is not valid
                  </p>
                )}
              </div>
              <div className="grid w-full">
                <label
                  htmlFor="password"
                  className="text-bold grid text-base font-bold text-slate-500 w-full relative"
                >
                  Password
                  <input
                    type={show ? "password" : "text"}
                    name="password"
                    className="px-4 py-[4px] border-slate-500 outline-none border-2 rounded-xl text-slate-500 w-full"
                    id="password"
                    {...register("password", {
                      required: true,
                      validate: {
                        checkLength: (value) => value.length >= 6,
                        matchPattern: (value) =>
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/.test(
                            value
                          ),
                      },
                    })}
                  />
                  <span
                    className="material-symbols-outlined absolute right-3 bottom-1"
                    onClick={showPassword}
                  >
                    {icon}
                  </span>
                </label>
                {errors.password && errors.password.type === "required" && (
                  <p className="text-sm text-red-600 font-bold">
                    password is required
                  </p>
                )}
                {errors.password && errors.password.type === "checkLength" && (
                  <p className="text-sm text-red-600 font-bold">
                    password is must be up to six characters
                  </p>
                )}
                {errors.password && errors.password.type === "matchPattern" && (
                  <p className="text-sm text-red-600 font-bold">
                    password is must be contain at least a number, symbol,
                    uppercase letter and lowercase letter
                  </p>
                )}
              </div>
            </div>

            {/* <Loginbutton title="Log In" className="bg-blue-400 w-full" /> */}
            <button
              className="disabled:bg-slate-100 bg-blue-400 w-full my-3 text-white font-bold rounded-xl mt-6 py-[4px]"
              type="submit"
            >
              LOG IN
            </button>

            {/* <button type="submit">Log in</button> */}
            <p className="text-center mt-4">
              Yet to create account?{" "}
              <Link to="/signup" className="text-blue-400 font-bold">
                Create account
              </Link>
            </p>
         
        </form>
      </div>
    </>
  );
};

export default Signinform;
