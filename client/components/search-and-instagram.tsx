import { SearchIcon } from '../icons/Search';
import { InstagramIcon } from '../icons/Instagram';
import { useState } from 'react';
import Router from 'next/router';

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
    <div className='flex flex-row justify-end px-[20px] py-[20px] gap-[20px] z-10'>
      <form onSubmit={handleSubmit}>
        <div className='relative z-10 hover:cursor-pointer' onClick={handleSearchClick}>
          <SearchIcon color={`${isSearchOpen ? '#E22613': '#FFEFD3'}`}/>
        </div>
        <input
          placeholder="Find your projects!"
          className={`absolute outline-none top-[50px] right-[82px] p-3 text-[24px] bg-[#FFEFD3] text-[#E22613] rounded-full transition-all duration-500 ease-in-out placeholder:text-[24px] placeholder:text-[#E22613] ${isSearchOpen ? 'w-[513px] opacity-100' : 'w-0 opacity-0'
            }`}
          onChange={handleChange}
          value={input}
        />
      </form>
      <div className='hover:cursor-pointer'>
        <InstagramIcon />
      </div>
    </div>
  )
};