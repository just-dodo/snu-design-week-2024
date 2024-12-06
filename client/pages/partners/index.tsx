// Next Page : Partners

import { NextPage } from 'next'
import partnerCardList from 'wordings/partner-card'
import Image from 'next/image'
import _useWindowSize from 'utils/useWindowSize'
import PartnerCard from './_components/partner-card'
import PCTitle from 'components/pc-title'
import SearchAndInstagram from 'components/search-and-instagram'

const PartnersPage: NextPage = () => {
  const { isMobileView } = _useWindowSize();

  const partnersDetail = (isMobileView ? 'SNU DESIGN WEEK 2024는\n다음과 같은 파트너사 / 동문의\n협력 및 후원을 통해 진행됩니다.' :
    'SNU DESIGN WEEK 2024는\n다음과 같은 파트너사 / 동문의 협력 및 후원을 통해 진행됩니다.');

  return (
    <div className='md:pt-[92px] md:mb-[88px] mb-[50px] w-full flex flex-col items-center'>
      <div className="absolute right-0">
        <SearchAndInstagram />
      </div>
      <div className='md:pt-[88px] pt-[35px] md:w-[900px] w-full md:px-0 px-[20px] flex flex-col md:items-center gap-[30px]'>
        <PCTitle imgsrc="/img/pc-title-partners.svg" width={299} height={90}/>
        <div className='text-primary md:text-center text-left font-[400] text-[15px] leading-[160%] md:tracking-[-0.165px] whitespace-pre-line'>
          {partnersDetail}
        </div>
        <div className={`flex flex-row w-full justify-center items-center md:pb-[30px] pb-[20px]`}>
          <Image
            src="/img/pc-partners.svg"
            alt="partners page partners logos"
            width={902}
            height={110}
          />
        </div>
        <div className='flex flex-col md:gap-[40px] gap-[24px]'>
          <div className='text-primary md:text-[32px] text-[20px] font-[700] leading-normal tracking-[-0.32px]'>
            Partners
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 md:gap-[20px] gap-[12px]'>
            {partnerCardList.map((partnerCard, index) => (
              <PartnerCard
                key={index}
                text={partnerCard.text}
                logoImage={partnerCard.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default PartnersPage

