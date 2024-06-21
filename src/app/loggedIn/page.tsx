"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CancelButton from "../components/cancelButton";
import SaveButton from "../components/saveButton";

// helpers
import { username, setUserId } from "../helpers/utils";

export default function LoggedPage() {
  const router = useRouter();

  const logOut = () => {
    setUserId( -1);
    router.replace("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E0E7FF]">
      <h1 className="prevent-select text-3xl font-bold text-center cursor-pointer text-black mb-10">
        Logged In
      </h1>

      <div className="bg-transparent w-[285px] sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[568px] rounded-lg flex flex-col items-center">

        <div className="w-full max-w-xs mt-[80px] flex-col justify-center text-center">
            <h1 className="text-2xl">Welcome:</h1>
            <br/>
            <h1 className="text-4xl mt-10 text-purple-500 font-bold">
                {username?.toUpperCase()}
            </h1>
        </div>

        <div className="mt-auto mb-5 w-full max-w-xs flex justify-center align-middle">
          <CancelButton />
          <SaveButton onClick={logOut} text={"Log-out"}/>
        </div>
        
      </div>

    </main>
  );
}
