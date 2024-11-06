interface CategoryProps {
  kor: string,
  eng: string,
  date: string,
  selectedCategory: string,
  setSelectedCategory: (category: string) => void,
  children?: React.ReactNode,
}

export default function Category({ kor, eng, date, selectedCategory, setSelectedCategory, children }: CategoryProps) {
  const isSelected = selectedCategory === eng;
  return (
    <div className="w-full rounded-[16px] border-[1.5px] border-primary transition-all duration-500 ease-in-out overflow-hidden">
      <div onClick={() => setSelectedCategory(eng)} className={`flex flex-row w-full justify-between px-[16px] py-[16px] ${isSelected ? 'bg-primary rounded-t-[15px]' : null}`}>
        <div>
          <div className={`text-[18px] font-[700] text-primary ${isSelected ? 'text-secondary' : 'text-primary'}`}>{kor}</div>
          <div className={`text-[16px] font-[400] text-primary ${isSelected ? 'text-secondary' : 'text-primary'}`}>{eng}</div>
        </div>
        <div className='flex flex-col justify-end'>
          <div className={`text-[16px] font-[400] text-primary ${isSelected ? 'text-secondary' : 'text-primary'}`}>
            {date}
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isSelected ? "opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  )
}