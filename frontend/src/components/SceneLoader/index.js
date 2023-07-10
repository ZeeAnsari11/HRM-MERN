import React from "react";
import HashLoader from "react-spinners/HashLoader";

export default function SceneLoader () {
    return (
        <div className="w-screen h-screen flex justify-center items-center dark:bg-primaryColorDark">
            <HashLoader color="#36d7b7" size={"100px"}/>
        </div>
    )
}