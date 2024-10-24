import { SearchIcon } from '../icons/Search';
import { InstagramIcon } from '../icons/Instagram';
import { useState } from 'react';

export default function SearchAndInstagram() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className='flex flex-row px-[20px] py-[20px] gap-[20px] z-10'>
      <div>
        <div className='relative z-10 hover:cursor-pointer' onClick={handleSearchClick}>
          <SearchIcon color={`${isSearchOpen ? '#E22613': '#FFEFD3'}`}/>
        </div>
        <input
          type="text"
          placeholder="Find your projects!"
          className={`absolute top-[19px] right-[82px] h-[52px] p-3 text-[24px] bg-[#FFEFD3] text-[#E22613] rounded-full transition-all duration-500 ease-in-out placeholder:text-[24px] placeholder:text-[#E22613] ${isSearchOpen ? 'w-[513px] opacity-100' : 'w-0 opacity-0'
            }`}
        />
      </div>
      <div className='hover:cursor-pointer'>
        <InstagramIcon />
      </div>
    </div>
  )
};