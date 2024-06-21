"use client";

// npm packages
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// tsx components
import Alerts from "../components/alerts";
import CancelButton from "../components/cancelButton";
import SaveButton from "../components/saveButton";
import LoginInput from "../components/loginInput";

// helpers
import { userId, setUserId } from "../helpers/utils";
import { userLogin, userRegister } from "../api/post";

export default function LogInPage() {
  const router = useRouter();

  const [displayAlert, setDisplayAlert] = useState<string | null>(null);
  const [mode, setMode] = useState("Log-In");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId !== -1){
      router.replace("/loggedIn")
    }
  }, [])

  const changeMode = () => {
    setMode(old => old == "Log-In" ? "Register" : "Log-In")
  }

  async function login() {
    if (!username || !password) {
      setDisplayAlert("Invalid Username or Password")
      setTimeout(() => setDisplayAlert(null), 3000);
      return;
    }

    if (mode == "Log-In") {
      try {
        const response = await userLogin(username, password);

        if (response?.error) {
          setDisplayAlert(response?.error)
          setTimeout(() => setDisplayAlert(null), 3000);
          return;
        }

        setUserId(response.userId, response.username)
        router.replace("/loggedIn");
        
      } catch (error) {
        setDisplayAlert("Something went wrong please try again")
        setTimeout(() => setDisplayAlert(null), 3000);
        return;
      }
    } else {
      try {
        const response = await userRegister(username, password);

        if (response?.error) {
          setDisplayAlert(response?.error)
          setTimeout(() => setDisplayAlert(null), 3000);
          return;
        }

        console.log('response', response)
        setUserId(response.userId, response.username)
        router.replace("/loggedIn");
        
      } catch (error) {
        setDisplayAlert("Something went wrong please try again")
        setTimeout(() => setDisplayAlert(null), 3000);
        return;
      }
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E0E7FF]">
      <h1 className="prevent-select text-3xl font-bold text-center cursor-pointer text-black mb-10">
        {mode}
      </h1>

      <div className="bg-transparent w-[285px] sm:w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] h-[568px] rounded-lg flex flex-col items-center">

        <div className="w-full max-w-xs mt-[80px] flex-col">
          <LoginInput label="Username" inputType={"text"} onChange={setUsername}/>
          <LoginInput label="Passsword" inputType={"password"} onChange={setPassword}/>

          <div className="prevent-select -mt-4 ml-1">
            <label className="text-sm">
              {mode == "Log-In" ? "Dont have an account?" : "Already have an account?"} &nbsp;  
              <span onClick={changeMode} className="text-violet-600 cursor-pointer hover:underline">
                {mode == "Log-In" ? "Register" : "Log-In"}
              </span> 
            </label>
          </div>
        </div>

        <div className="mt-auto mb-5 w-full max-w-xs flex justify-center align-middle">
          <CancelButton />
          <SaveButton onClick={login} text={mode}/>
        </div>
        
      </div>

      {
        displayAlert && 
        <Alerts message={displayAlert} type="error" />
      }

    </main>
  );
}
