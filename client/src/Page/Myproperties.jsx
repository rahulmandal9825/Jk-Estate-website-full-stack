import React from 'react'

export default function Myproperties() {
  return (
    <div>
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
  <div className="flex flex-wrap justify-center gap-10 ">
  
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
