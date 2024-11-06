import { SearchIcon } from '../icons/Search';
import { InstagramIcon } from '../icons/Instagram';
import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';

export default function SearchAndInstagram() {
  
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

  return (
    <div className='flex flex-row justify-end px-[40px] py-[20px] gap-[20px] z-20'>
      <form onSubmit={handleSubmit}>
        <div className='relative z-20 hover:cursor-pointer' onClick={handleSearchClick}>
          <SearchIcon color={`${isSearchOpen ? '#E22613': '#FFEFD3'}`}/>
        </div>
        <input
          placeholder="Find your projects!"
          className={`absolute z-10 outline-none pl-[24px] top-[110px] right-[102px] text-[24px] bg-[#FFEFD3] p-[10px] text-[#E22613] rounded-full transition-all duration-500 ease-in-out placeholder:text-[20px] placeholder:text-placeholder ${isSearchOpen ? 'w-[380px] opacity-100' : 'w-0 opacity-0'
            }`}
          onChange={handleChange}
          value={input}
        />
      </form>
      <Link href="https://www.instagram.com/snudesignweek/" className='hover:cursor-pointer z-10'>
        <InstagramIcon />
      </Link>
    </div>
  )
};