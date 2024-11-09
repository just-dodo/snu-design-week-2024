'use client';

import { SearchIcon } from '../icons/Search';
import { InstagramIcon } from '../icons/Instagram';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Link from 'next/link';
import _useWindowSize from 'utils/useWindowSize';

export default function SearchAndInstagram() {

  const { isMobileView } = _useWindowSize();

  if (isMobileView) return null;
  
  const router = useRouter();
  const isHome = router.pathname === '/';

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Router.push(`/search?search=${input}`);
  }

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const primaryColor = isHome ? '#FFEFD3' : '#E22613';
  const secondaryColor = isHome ? '#E22613' : '#FFEFD3';

  return (
    <div className='flex flex-row justify-end px-[40px] py-[20px] gap-[20px] z-20'>
      <form onSubmit={handleSubmit} className='relative'>
        <div className='relative z-20 hover:cursor-pointer' onClick={handleSearchClick}>
          <SearchIcon color={`${!isHome ? primaryColor : isSearchOpen ? secondaryColor: primaryColor}`}/>
        </div>
        <input
          placeholder="Find your projects!"
          className={`absolute z-10 ${!isHome ? 'border-2 border-primary' : null} h-[64px] outline-none px-[22px] top-[-6px] right-[-6px] text-[20px] bg-[#FFEFD3] py-[14px] text-[#E22613] rounded-full transition-all duration-500 ease-in-out placeholder:text-[20px] placeholder:text-primary placeholder:text-opacity-50 ${isSearchOpen ? 'w-[380px] opacity-100' : 'w-0 opacity-0'
            }`}
          onChange={handleChange}
          value={input}
        />
      </form>
      <Link href="https://www.instagram.com/snudesignweek/" className='hover:cursor-pointer z-10'>
        <InstagramIcon color={primaryColor}/>
      </Link>
    </div>
  )
};