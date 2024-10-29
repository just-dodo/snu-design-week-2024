import PCTitle from "components/pc-title";
import { useState } from "react";
import ExhibitionOverview from "./_components/exhibition-overview";
import VisualIdentity from "./_components/visual-identity";
import SNUDesignWeekPreparationCommittee from "./_components/snu-design-week-preparation-committee";
import ThanksTo from "./_components/thanks-to";

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState("Exhibition Overview");

  return (
    <div className="mb-[100px] w-[900px] flex flex-col items-center gap-[20px] pt-[244px] min-h-screen">
      <PCTitle imgsrc="/img/pc-title-about.svg" />
      <div className="flex flex-row justify-between w-full items-center mt-[5px] mb-[12px] mx-[20px]">
        <div onClick={() => setSelectedCategory("Exhibition Overview")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "Exhibition Overview" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">전시개요</div>
          <div className="text-[16px] font-[400] text-primary">Exhibition Overview</div>
        </div>
        <div onClick={() => setSelectedCategory("Visual Identity")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "Visual Identity" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">비주얼 아이덴티티</div>
          <div className="text-[16px] font-[400] text-primary">Visual Identity</div>
        </div>
        <div onClick={() => setSelectedCategory("SNU DESIGN WEEK Preparation Committee")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "SNU DESIGN WEEK Preparation Committee" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">졸업주간 준비위원회</div>
          <div className="text-[16px] font-[400] text-primary whitespace-pre-line text-center">{`SNU DESIGN WEEK \n Preparation Committee`}</div>
        </div>
        <div onClick={() => setSelectedCategory("Thanks to")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "Thanks to" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">도움주신 분들</div>
          <div className="text-[16px] font-[400] text-primary">Thanks to</div>
        </div>
      </div>
      <div className="w-[900px] mt-[30px]">
        {selectedCategory === "Exhibition Overview" && <ExhibitionOverview />}
        {selectedCategory === "Visual Identity" && <VisualIdentity />}
        {selectedCategory === "SNU DESIGN WEEK Preparation Committee" && <SNUDesignWeekPreparationCommittee />}
        {selectedCategory === "Thanks to" && <ThanksTo />}
      </div>
    </div>
  );
}
