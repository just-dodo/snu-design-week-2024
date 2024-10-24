export type PeopleCardProps = {
  name: string;
  koreanName: string;
  products: string[];
}

interface Props {
  people: PeopleCardProps;
}

export default function PeopleCard({ people }: Props) {
  return (
    <div className="flex flex-col items-center justify-between border-2 border-primary rounded-[16px] w-[154px] h-[203px] relative">
      <div className="absolute top-[10px] left-[10px] w-[26px] h-[26px] border-2 border-primary rounded-full"></div>
      <div className="flex flex-col mt-[30px] items-center gap">
        <div className="text-[20px] font-[700] text-primary h-[26px]">{people.koreanName}</div>
        <div className="text-[20px] font-[500] text-primary h-[26px]">{people.name}</div>
      </div>
      <div className="flex flex-col gap-[4px] mb-[10px]">
        {people.products.map((product) => (
          <div key={product} className="w-[134px] h-[44px] bg-[#00BD84] rounded-[10px] text-secondary font-[500] text-[17px] text-center leading-[44px]">{product}</div>
        ))}
      </div>
    </div>
  );
}