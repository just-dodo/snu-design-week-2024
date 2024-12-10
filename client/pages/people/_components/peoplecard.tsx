import Link from "next/link";
import _useWindowSize from "utils/useWindowSize";
import courseList from "wordings/course";

export type PeopleCardProps = {
  name: string;
  englishName: string;
  type: "visual" | "industrial";
  works: {
    id: string;
    class: string;
  }[];
};

interface Props {
  people: PeopleCardProps;
}

export default function PeopleCard({ people }: Props) {
  const { isMobileView } = _useWindowSize();

  return (
    <div className="flex flex-col items-center justify-between md:border-2 border-[1.5px] border-primary rounded-[16px] md:w-[154px] w-[165px] md:h-[203px] h-[161px] relative">
      <div className="absolute top-[10px] left-[10px] md:w-[26px] w-[18px] md:h-[26px] h-[18px] md:border-2 border-[1.5px] border-primary rounded-full"></div>
      <div className="flex flex-col mt-[22px] items-center gap">
        <div className="md:text-[20px] text-[16px] font-[700] text-primary h-[26px]">
          {people?.name}
        </div>
        <div className="md:text-[18px] text-[16px] font-[500] text-primary h-[26px]">
          {people?.englishName}
        </div>
      </div>
      <div className="flex flex-col gap-[4px] mb-[10px] md:h-[92px] h-[70px]">
        {people?.works.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="md:w-[134px] w-[142px] flex-1 bg-[#00BD84] rounded-[10px] text-secondary font-[500] md:text-[17px] text-[14px] text-center  whitespace-pre-wrap align-top justify-center items-center content-center leading-[14px] md:leading-[17px"
          >
            <p>
              {courseList.find((course) => course.path === work.class)?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
