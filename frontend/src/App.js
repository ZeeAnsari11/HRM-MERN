import React from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <Topbar />
      {/* <div className="h-screen text-white flex-1 p-7 relative left-[18rem]">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div> */}
    </div>
  );
}

export default App;
