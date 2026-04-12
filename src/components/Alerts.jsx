import { RotatingLines } from "react-loader-spinner";
function Alerts({ errors, successm, singleerror }) {
    return (
        <>
            {errors && errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    <ul>
                        {errors.length > 0 && errors?.map((data, index) => (
                            <li key={index}>{data}</li>
                        ))}

                    </ul>
                </div>
            )}
            {singleerror && singleerror.length>0 && (
                <div className="alert alert-danger" role="alert">
                    <ul>
                        <li>{singleerror}</li>
                    </ul>
                </div>
            )}
            {successm && (
                <div className="alert alert-success" role="alert">
                    {successm}
                </div>
            )}
        </>
    );
};
export default Alerts;