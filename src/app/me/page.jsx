"use client";

import React from "react";
import useAuth from "../../Hooks/useAuth";

const page = () => {
  const { auth } = useAuth();

  return (
    <div className="grid gap-3 text-blue-400 place-content-center place-items-center text-center py-10">
      <p>Welcome, USER</p>
      <div className="my-4 grid gap-2">
        <p className="grid gap-2">
          ID Of Logged In User: <span>{auth.id}</span>
        </p>
        <p className="grid gap-2">
          Email Address Of Logged In User: <span>{auth.email}</span>
        </p>
      </div>
    </div>
  );
};

export default page;
