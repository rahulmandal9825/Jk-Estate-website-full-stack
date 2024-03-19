import React from 'react'
import {  useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from '../components/Popup.jsx';




export default function Profile() {
  const {currentUser,loading, error} = useSelector((state) => state.user)
  const [formData, setfromData] = useState({});
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [trigger,setTrigger] = useState(false);
  
  
    
  useEffect(() => {
    const fetchData = async () => {
      // setShowMore(false);
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();

        // if (data.length > 8) {
        //   setShowMore(true);
        // } else {
        //   setShowMore(false);
        // }




        
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
  
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };
  
    fetchData(); // Call the function immediately
  
  }, []);


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }

  
  // const handleShowListings = async () => {
  //   try {
  //     setShowListingsError(false);
  //     const res = await fetch(`/api/user/listings/${currentUser._id}`);
  //     const data = await res.json();
  //     if (data.success === false) {
  //       setShowListingsError(true);
  //       return;
  //     }

  //     setUserListings(data);
      
  //   } catch (error) {
  //     setShowListingsError(true);
  //   }
  // };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const containerClassName = `profile1 flex text-center md:flex  gap-5 cursor-pointer flex flex-col ${isClicked ? '' : 'hidden'}`;

  // const onShowMoreClick = async () => {
  //   const numberOfListings = listings.length;
  //   const startIndex = numberOfListings;
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set('startIndex', startIndex);
  //   const searchQuery = urlParams.toString();
  //   const res = await fetch(`/api/user/listings/${currentUser._id}`);
  //   const data = await res.json();
  //   if (data.length < 9) {
  //     setShowMore(false);
  //   }
  //   setListings([...listings, ...data]);
  // };

  return (
    <div className='p-4 flex-col md:flex-row mx-auto bg-slate-900 h-[110vh] w-full flex'>
      <div className='flex flex-col gap-10 md:min-w-[280px] border-2 border-white cursor-pointer rounded-3xl p-3 bg-yellow-400  transition-scale  '>
        <div className='flex bg-black justify-evenly rounded-xl px-2 gap-10 md:gap-3 md:px-2 ' onClick={handleClick}>
              <img  src={formData.avatar || currentUser.avatar} alt="Profile" className=' rounded-full self-center h-14 w-14 object-cover cursor-pointer self-center ' />
              <h1 className='text-lg md:text-2xl  font-semibold text-white text-center  my-7'>{currentUser.username}</h1>
              <div className='md:hidden  text-white self-center'> 
               <i className=" text-[50px] self-centertext-white cursor-pointer fa-solid  fa-angle-down"></i>
               </div>
         </div>
      <div className={containerClassName} >
      <Link className=' cursor-pointer w-full opacity-85 bg-black text-white p-5 rounded-xl transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300'
      to="/profile" >Your properties</Link>

      <Link className=' cursor-pointer w-full hover:opacity-85 bg-black text-white p-5 rounded-xl transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300'
      to="/Update-account" > Update Account</Link>
      <Link className='bg-black p-5  text-white rounded-xl hover:opacity-85 text-center disabled:opacity-95 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300' to="/create-listing">Create Listing</Link>

         <span className=' cursor-pointer  w-full bg-black text-white p-5 rounded-xl hover:opacity-85 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300 ' onClick={()=>{
        setTrigger(true);
      }} 
       > Delete Account</span>

         <span className='  w-full bg-black text-white p-5 rounded-xl hover:opacity-85 cursor-pointer transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300'onClick={handleSignOut} > Sign Out</span>
      </div>
      
      </div>

      {/* <button 
       onClick={handleShowListings} 
      className='bg-yellow-400  border-2 border-white font-bold cursor-pointer w-[400px] h-[50px] p-6 rounded-xl'>
        Show My properties
      </button> */}
     <Popup trigger={trigger}>
      <div className='w-[330px] md:w-[600px] '>
      <h1 className='text-red-600 font-semibold'>Are You sure you want to Delete Your Account</h1>
      <p className='text-red-600  font-semibold'>It will Delete your all Listing </p>
      <div className='flex justify-center gap-5 p-3'>
      <button className='bg-red-600 p-1 px-5 rounded-xl text-white font-semibold' onClick={handleDeleteUser}  >Yes</button>
      <button className='bg-green-600 p-1 px-5 rounded-xl text-white font-semibold' onClick={()=>{
        setTrigger(false);
      }}>NO</button></div></div>
     </Popup>
      <div className=' p-2 '>

        {userListings.length < 1 && 
        <div className='text-white text-lg p-5 '>
          <h1 >you dont have any properties Listed Create your</h1>
          <Link to="/create-listing"><button className='bg-yellow-400 text-black font-semibold p-2 mt-5 rounded-xl transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-300 shadow-lg  shadow-yellow-400/50 '> Listing now</button></Link>
          
        </div>
        }

      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col ">
          <p className='text-red-700 '>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
          <div className="flex flex-wrap h-[90vh]  justify-start ml-10 gap-10 overflow-auto ">
          
{userListings.map((listing) => (
           
           
           <div
              key={listing._id}
              className='bg-gray-800 border-2 border-white shadow-lg  shadow-yellow-400/50 transition-shadow rounded-2xl w-full sm:w-[200px]   md:h-[280px]'
            >
              <div className='flex flex-col w-full gap-5 '>
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-[130px] sm:h-[120px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-xl self-center'
                />
              </Link>
              <Link
                className='text-white font-semibold  hover:underline truncate flex-1 self-center'
                to={`/listing/${listing._id}`}
              >
                 <p className='truncate text-xl font-semibold text-white overflow-hidden w-[180px]'>
            {listing.name}
          </p>
              </Link>
          <p className='text-sm mb-3 px-3 text-white line-clamp-1'>
            {listing.description}
          </p>
                  </div>
              <div className='flex gap-8 md:gap-4 justify-around mb-3 '>
              <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 font-bold p-2 rounded-lg  bg-white uppercase'
                >
                  Delete
                </button>
                <Link to={`/Update-listing/${listing._id}`}>
                <button className='text-green-700 font-bold p-2 rounded-lg  bg-white w-[80px] uppercase w- uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}

{showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}

          </div>
          
        </div>}
    </div>
    </div>

  )
}
