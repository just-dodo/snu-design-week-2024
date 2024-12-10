interface CategoryProps {
  kor: string,
  eng: string,
  isMobileView: boolean,
  selectedCategory: string,
  setSelectedCategory: (category: string) => void,
}


export default function Category({ kor, eng, isMobileView, selectedCategory, setSelectedCategory }: CategoryProps) {
  const isSelected = selectedCategory === eng;
  if (isMobileView) {
    return (
      <div onClick={() => setSelectedCategory(eng)} className={`flex flex-col items-center w-auto cursor-pointer px-[10px] py-[4px] rounded-[10px] border-primary border-[1.5px] ${isSelected ? 'bg-primary' : 'bg-secondary'}`}>
        <div className={`text-[18px] font-[600] ${isSelected ? 'text-secondary' : 'text-primary'}`}>{kor}</div>
      </div>
    )
  }
  return (
    <div onClick={() => setSelectedCategory(eng)} className={`flex flex-col items-center w-auto cursor-pointer px-[20px] ${isSelected ? null : 'opacity-50'}`}>
      <div className="text-[20px] font-[700] text-primary">{kor}</div>
      <div className="text-[16px] font-[400] text-primary whitespace-pre-line text-center">{eng}</div>
    </div>
  )
}