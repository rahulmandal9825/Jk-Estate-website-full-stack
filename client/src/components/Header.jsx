import React from "react";
import {Link,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useEffect, useState } from 'react';
export default function Header() {
    const {currentUser} = useSelector((state) => state.user);
    // console.log(currentUser.rest.avatar);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);


    return (
        <header className=" bg-black shadow-mdtext-white navbar1"  >
            <div className="flex justify-between items-center max-w-7xl mx-auto p-2 ">
                <Link to="/">
                    <h1 className="transition border-b-2 border-transparent rounded-md p-1 hover:border-yellow-400 text-xl sm:text-2xl p-3 flex flex-wrap font-bold">
                        <span className=" text-yellow-400 mr-2 ">JK</span>
                        <span className="text-white">Estate</span>
                    </h1>
                </Link>
                <form  onSubmit={handleSubmit} className="p-3 shadow-xl shadow-yellow-400/20 min-w-[90px] md:w-[400px] flex rounded-lg text-white bg-gray-800 items-center">
                    <i className=" text-yellow-400 mr-3 fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-34  md:w-64 focus:outline-none bg-transparent "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form >
                <ul className="flex gap-6 text-xl align-middle">
                    <Link to="/"> 
                        <li className="  transition  sm:hover:border-b-2 rounded-md   sm:p-1 hover:border-yellow-400 text-white hidden sm:inline cursor-pointer align-middle  ">Home</li>
                    </Link>
                    <Link to="/About">
                        <li className="transition  sm:hover:border-b-2 rounded-md  sm:p-1 hover:border-yellow-400 text-white hidden sm:inline cursor-pointer align-middle ">About</li>
                    </Link>
                    <Link to={currentUser ? "/profile" : "/sign-in"}>
                        {currentUser ? (
                            <div className="bg-yellow-400  flex p-1 rounded-2xl"><img
                                className=" transition  hover:border-[1px] hover:border-yellow-400 text-white rounded-full h-8 w-[100px] object-cover md:mr-2"
                                src={currentUser.avatar}
                                alt="profile" />
                                <h1 className=" self-center hidden md:inline text-sm md:text-lg px-1">Profile</h1>
                                </div>
                            
                        ) : (
                            <li className=" min-w-[80px] cursor-pointer font-bold  hover:opacity-85 flex gap-1 bg-yellow-400 text-black rounded-lg p-2 text-sm md:text-base hover:opacity-90 mr-2 shadow-lg  shadow-yellow-400/50 ">Sign In<i class="fa-solid self-center fa-arrow-right-to-bracket"></i></li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}
