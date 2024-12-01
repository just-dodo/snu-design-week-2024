interface SNUPrepCommitteeTeamCardProps {
  team: string;
  description: string;
  head: string;
  members: string[];
}

export default function SNUPrepCommitteeTeamCard({ team, description, head, members }: SNUPrepCommitteeTeamCardProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-[11px] md:gap-[0px] md:justify-between md:border-[2px] border-[1.5px] border-primary md:rounded-[20px] rounded-[16px] px-[16px] py-[20px] md:px-[52px] md:py-[40px]">
      <div className="flex flex-col md:gap-[16px] gap-[11px] md:w-[430px]">
        <div className="w-full text-[18px] md:text-[20px] text-primary font-[600] md:font-[700] leading-[28.8px] tracking-[-0.18px]">
          {team}
        </div>
        <div className="w-full text-[15px] text-primary font-[400] leading-[24px] break-keep">
          {description}
        </div>
      </div>
      <div className="flex flex-col md:gap-[10px] gap-[11px] md:w-[305px] justify-center">
        <div className="flex flex-row gap-[30px]">
          <div className="text-[15px] text-primary font-[700] leading-[24px] tracking-[-0.15px] text-nowrap">
            팀장
          </div>
          <div className="text-[15px] text-primary font-[400] leading-[24px]">
            {head}
          </div>
        </div>
        <div className="flex flex-row gap-[30px]">
          <div className="text-[15px] text-primary font-[700] leading-[24px] tracking-[-0.15px] text-nowrap">
            팀원
          </div>
          <div className="text-[15px] text-primary font-[400] leading-[24px] break-keep">
            {members.join(' ')}
          </div>
        </div>
      </div>
    </div>
  )
}