import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function ListingItem({ listing }) {
    console.log(listing);
    
    const { currentUser } = useSelector((state) => state.user);
    const [landlord, setLandlord] = useState(null);
    useEffect(() => {
        const fetchLandlord = async () => {
          try {
            const res = await fetch(`/api/user/getuser/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLandlord();
      }, [listing.userRef]);
  return (
    <div className='bg-gray-800 border-2 border-white shadow-lg  shadow-yellow-400/50 transition-shadow overflow-hidden rounded-2xl w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img 
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-xl self-center'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-xl font-semibold text-white'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
          <i className=" text-green-600 fa-solid fa-location-dot"></i>
            <p className=' text-sm text-gray-300 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm h-[60px] text-white line-clamp-3'>
            {listing.description}
          </p>
          <p className='text-green-400 mt-2 font-semibold '>
          ₹
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-200 flex gap-4'>
            <div className='font-bold text-xs gap-2 flex items-center'>
            <i className="text-green-400 fa-solid fa-bed "></i>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs gap-2 flex items-center'>
            <i className=" text-green-400 fa-solid fa-bath"></i>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
           
              <div className='font-bold text-xs gap-2 flex items-center '>
              <i className=" text-green-400 fa-solid fa-couch"></i>
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </div>
          </div>
        </div>
        </Link> 
        {currentUser?.username && landlord && (
        <div className='flex bg-black justify-between cursor-pointer'>
          <div className='flex gap-3 p-2'>
            <img className='w-10 rounded-full' src={landlord.avatar} alt='' />
            <h2 className='text-white self-center'>{landlord.username}</h2>
          </div>
          <button className='px-3 bg-yellow-400 text-sm cursor-pointer p-2 font-semibold'>
            Contact Landlord
          </button>
        </div>
      )}
        
      
    </div>
  );
}