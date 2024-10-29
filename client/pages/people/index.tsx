import { NextPage } from "next";
import PeopleCard, { PeopleCardProps } from "./_components/peoplecard";
import { useState } from "react";
import PCTitle from "components/pc-title";
import usePeopleData from "utils/usePeopleData";
import peopleData from "./_components/people.json";

const visualDesignPeopleList: PeopleCardProps[] = peopleData.filter(
  (person) => person.type === "visual"
) as PeopleCardProps[];
const industrialDesignPeopleList: PeopleCardProps[] = peopleData.filter(
  (person) => person.type === "industrial"
) as PeopleCardProps[];

const People: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("visualDesign");

  const peopleList =
    selectedCategory === "visualDesign"
      ? visualDesignPeopleList
      : industrialDesignPeopleList;

  const { peopleData } = usePeopleData();

  return (
    <div className="pt-[244px] mb-[100px] w-[900px] flex flex-col items-center gap-[20px] min-h-screen">
      <PCTitle imgsrc="/img/pc-title-people.svg" />
      <div className="flex flex-row gap-[100px] items-center mt-[5px] mb-[12px]">
        <div
          onClick={() => setSelectedCategory("visualDesign")}
          className={`flex flex-col items-center w-auto cursor-pointer ${
            selectedCategory === "visualDesign" ? null : "opacity-50"
          }`}
        >
          <div className="text-[20px] font-[700] text-primary">시각디자인</div>
          <div className="text-[16px] font-[400] text-primary">
            Visual Design
          </div>
        </div>
        <div
          onClick={() => setSelectedCategory("industrialDesign")}
          className={`flex flex-col items-center w-auto cursor-pointer ${
            selectedCategory === "visualDesign" ? "opacity-50" : null
          }`}
        >
          <div className="text-[20px] font-[700] text-primary">산업디자인</div>
          <div className="text-[16px] font-[400] text-primary">
            Industrial Design
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 items-center gap-[12px]">
        {peopleList.map((people, index) => (
          <PeopleCard key={index} people={people} />
        ))}
      </div>
    </div>
  );
};

export default People;
