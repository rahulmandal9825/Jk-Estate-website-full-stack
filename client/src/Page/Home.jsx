import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
 
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

 
  
  return (
    
    <div className='hero bg-cover '>
      {/* top */}
      <div className='h-[90vh] z-10 relative flex flex-col gap-6 p-28  px-10 max-w-6xl mx-auto'>
        <img className='hero-1 shadow-lg shadow-xl shadow-yellow-400/100' src="https://firebasestorage.googleapis.com/v0/b/jk-estate-4da31.appspot.com/o/1709809574950house%2002.jpg?alt=media&token=8855ca95-c736-4a95-91a6-1661cb747b3b" alt="hero-blackgound" />
        
        <h1 className='text-white font-bold text-4xl lg:text-6xl'>
          Find your next <span className='text-yellow-400'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className=' text-gray-300 text-base md:w-[600px] md:text-base'>
        Discover your ideal living space at JK Estate, the premier destination for finding your next perfect home.  Explore our extensive selection of properties, offering a diverse range of options to suit your preferences
        </div>
        <Link
          to={'/search'}
          className='text-lg  text-black  bg-yellow-400 p-2 w-[175px] rounded-md font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  md:text-xl md:w-[200px] shadow-lg  shadow-yellow-400/50 md:p-3 '
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}

      <div className='h-[60hv] sm:h-[70vh] w-full shadow-lg  shadow-yellow-400/50 bg-yellow-400 flex gap-3 md:gap-10 p-10 rounded-3xl overflow-hidden '>
      <div><Swiper modules={[Autoplay]} 
      autoplay className= ' w-[160px] md:w-[600px] rounded-3xl  flex justify-start ' >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[400px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
      <div className=' text-center p-1 mt-20 md:mt-4 md:p-10'>
        <h1 className= ' bg-black p-2 text-[30px] md:text-[50px] font-extrabold text-white rounded-3xl'>Unlock Your Property Potential with Our JK Estate Hub</h1>
      </div>
      </div>
     

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 '>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3 p-3'>
              <h2 className='text-[40px] font-semibold text-white'>Recent <span className='text-yellow-400'>offers</span></h2>
              <Link className='text-sm text-blue-600 font-bold hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=' rounded-2xl'>
            <div className='my-3'>
            <h2 className='text-[40px] font-bold text-white'>Recent places <span className='text-black-400'>for rent</span></h2>
            
              <Link className='text-sm text-blue-600 font-semibold hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-[40px] font-semibold text-white'>Recent places <span className='text-yellow-400'>sale</span></h2>
              <Link className='text-sm text-blue-600 hover:underline font-semibold' to={'/search?type=sale font-semibold'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="navbar h-[20vh] bg-black rounded-t-3xl flex flex-col md:flex-row justify-evenly md:justify-between p-3 md:px-[100px] text-sm md:text-base ">
        <div className=' text-gray-400 hover:text-white self-center'>
          @ 2024 Rahul Mandal
        </div>
        <div className=' text-gray-400  justify-center flex items-center '>
          <ul className='flex gap-5 '>
            <li className='cursor-pointer  hover:text-white  '>Home</li>
            <li className='cursor-pointer  hover:text-white '>About</li>
            <li className='cursor-pointer hover:text-white  '>Offers</li>
            <li className='cursor-pointer hover:text-white  '>Sale</li>
            <li className='cursor-pointer  hover:text-white '>Rent</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}