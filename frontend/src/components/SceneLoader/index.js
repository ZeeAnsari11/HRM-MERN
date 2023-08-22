import HashLoader from "react-spinners/HashLoader";
import React from "react";

export default function SceneLoader() {
    return (
        <div className="w-screen h-screen flex justify-center items-center dark:bg-primaryColorLight">
            <HashLoader color="#36d7b7" size={"100px"} />
        </div>
    )
}