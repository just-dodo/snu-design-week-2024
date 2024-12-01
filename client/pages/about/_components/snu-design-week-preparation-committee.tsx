import { SNUPREPCOMMITTEE } from "constants/about"
import _useWindowSize from "utils/useWindowSize"
import SNUPrepCommitteeTeamCard from "../../../components/snu-prep-committee-team-card"

export default function SNUDesignWeekPreparationCommittee() {
  const { isMobileView } = _useWindowSize()

  return (
    <div className="w-full flex flex-col md:gap-[50px] gap-[20px]">
      <div className="flex flex-col text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
        <div className="font-[600] md:font-[700]">
          2024 졸업주간 준비위원회
        </div>
        {
          !isMobileView &&
          <div className="font-[600] md:font-[700]">
            Preparation Committee
          </div>
        }
      </div>
      <div className="flex flex-row gap-[40px]">
        <div className="flex flex-col md:gap-[24px] gap-[20px]">
          <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] break-keep">
            졸업주간 준비위원회는 SNU DESIGN WEEK 2024의 기획과 운영을 담당하는 학생 위원회로, 총 31명의 학생들로 구성되어 있습니다. 졸업주간 준비위원회는 서로에게 긍정적인 영향을 줄 수 있는 건강하고 평등한 조직을 지향합니다.
          </div>
          <div className="flex flex-col md:gap-[16px] gap-[12px] pb-[10px]">
            <div className="flex flex-row gap-[56px]">
              <div className="text-[15px] font-[700] leading-[24px] tracking-[-0.15px] text-primary">
                졸업주간 준비위원장
              </div>
              <div className="text-[15px] font-[400] leading-[24px] tracking-[-0.15px] text-primary">
                최하림
              </div>
            </div>
            <div className="flex flex-row gap-[56px]">
              <div className="text-[15px] font-[700] leading-[24px] tracking-[-0.15px] text-primary">
                산업디자인 부위원장
              </div>
              <div className="text-[15px] font-[400] leading-[24px] tracking-[-0.15px] text-primary">
                엄혜영
              </div>
            </div>
            <div className="flex flex-row gap-[56px]">
              <div className="text-[15px] font-[700] leading-[24px] tracking-[-0.15px] text-primary">
                시각디자인 부위원장
              </div>
              <div className="text-[15px] font-[400] leading-[24px] tracking-[-0.15px] text-primary">
                김상엽
              </div>
            </div>
          </div>
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] text-primary text-[15px] font-[400] leading-[24px] tracking-[-0.165px]">
            The Graduation Week Preparation Committee is a student-led organization responsible for planning and managing SNU DESIGN WEEK 2024. Composed of 31 student members, the committee strives to foster a healthy and equitable environment where members can positively influence one another.
          </div>
        }
      </div>
      <div className="flex flex-col md:gap-[20px] gap-[12px]">
        {
          SNUPREPCOMMITTEE.map((team, index) => (
            <SNUPrepCommitteeTeamCard
              key={index}
              team={team.team}
              description={team.description}
              head={team.head}
              members={team.members}
            />
          ))
        }
      </div>
    </div>
  )
}