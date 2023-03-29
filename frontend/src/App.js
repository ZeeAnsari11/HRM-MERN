import React from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login"
import ResetPassword from "./screens/ResetPassword";
function App() {
  return (
    <div className="flex w-screen h-screen">
      {/* <Navbar />
      <Topbar /> */}
      {/* <ForgotPassword /> */}
      <ResetPassword />
      {/* <Login showOtherLoginTypes={true}/> */}
      {/* <div className="h-screen text-black flex-1 p-7 relative top-[5rem] z-20 left-[18rem]">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div> */}
    </div>
  );
}

export default App;
