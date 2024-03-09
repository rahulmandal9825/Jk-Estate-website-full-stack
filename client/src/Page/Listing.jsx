import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import {  useSelector } from 'react-redux';
import Contact from '../components/Contact';
import Spinner from '../assets/Spinner.svg'
  

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false); 
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);



  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);



  return (
    <main className=' bg-slate-800 h-[120vh] md:h-[89.2vh]'>
      {loading && <p className='text-center my-7 text-2xl'><img src={Spinner} alt="" /></p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='flex flex-col md:flex-row '>
          <Swiper modules={[Autoplay]} 
      autoplay className='  md:w-[40%] m-1 md:m-10 rounded-2xl' >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[350px] '
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>

            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
 
           <i className="fa-solid fa-share-nodes text-slate-500" 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}></i>
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-10  gap-5'>
            <p className='text-2xl font-semibold text-white'>
              {listing.name} - <span className=' bg-green-700 p-2 rounded-xl'> ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}</span>
            </p>
            <p className='flex items-center mt-6 gap-2 text-gray-300  text-sm'>
            <i className="fa-solid fa-location-dot text-green-600"></i>
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-700 font-semibold w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-600 font-semibold w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                 ₹ {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-white'>
              <span className='font-semibold text-yellow-500'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              <i className="fa-solid fa-bed"></i>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              <i className="fa-solid fa-bath"></i>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
         </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              
              <i className="fa-solid fa-square-parking"></i>
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              <i className="fa-solid fa-couch"></i>
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-blue-700  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  shadow-lg  w-[300px] shadow-blue-400/50 font-semibold text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}