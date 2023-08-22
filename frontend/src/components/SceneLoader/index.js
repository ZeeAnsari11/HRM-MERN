import HashLoader from "react-spinners/HashLoader";
import React from "react";
import { selectOrgTheme } from "../../states/reducers/slices/backend/UserSlice";
import { useSelector } from "react-redux";

export default function SceneLoader () {
    const theme = useSelector(selectOrgTheme)
    return (
        <div className="w-screen h-screen flex justify-center items-center" style={{backgroundColor: theme.primary}}>
            <HashLoader color="#36d7b7" size={"100px"}/>
        </div>
    )
}