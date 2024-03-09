import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
    const [formData, setfromData] = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlechange = (e) => {
        setfromData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    console.log(formData);
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.succes === false) {
                dispatch(signInFailure(data.message));

                return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="p-3 max-w-full mx-auto h-screen flex justify-center bg-slate-800">
            <div className=" w-full md:w-[50%] md:m-5 rounded-2xl md:p-5 flex flex-col gap-5  h-[70%]">
                <h1 className=" bg-yellow-400 self-center text-black w-[150px] rounded-xl p-2 text-3xl text-center font-semibold my-7">
                    Sign In
                </h1>
                <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className=" border p-3 rounded-lg"
                        onChange={handlechange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        className=" border p-3 rounded-lg"
                        onChange={handlechange}
                    />
                    <button
                        disabled={loading}
                        className=" bg-orange-600 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
                    >
                        {loading ? "Loading" : "sign In"}
                    </button>
                    <OAuth />
                </form>
                <div className=" text-white flex gap-2 mt-5">
                    <p>dnot Have an account</p>
                    <Link to={"/sign-up"}>
                        <span className=" text-blue-700 text-lg"> Sign up</span>
                    </Link>
                </div>
                {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>
        </div>
    );
}
