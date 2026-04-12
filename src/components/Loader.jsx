import React from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

//import { RotatingLines } from "react-loader-spinner";

function Loader() {
    return (
        <div className="flex justify-center items-center " style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            {/* <RotatingLines color="#00BFFF" height={80} width={80} /> */}
            {/* <ClipLoader color="blue" height={80} width={80} /> */}
            <ScaleLoader color="#000" height={40} width={5} radius={2} margin={2} />

        </div>
    );
};
export default Loader;