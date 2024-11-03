// Next Page : Partners

import { NextPage } from 'next'
import partnerCardList from 'wordings/partner-card'
import { useRatio } from 'utils/useRatio'
import partnersLogoWeb from 'assets/partners-web-partners-logo.png'
import partnersLogoMobile from 'assets/partners-mobile-partners-logo.png'
import Image from 'next/image'
import _useWindowSize from 'utils/useWindowSize'
import PartnerCard from './_components/partner-card'
import PCTitle from 'components/pc-title'

const PartnersPage: NextPage = () => {
  const { isMobileView } = _useWindowSize();
  const ratio = useRatio();

  const partnersDetail = (isMobileView ? 'SNU DESIGN WEEK 2024는\n다음과 같은 파트너사 / 동문의\n협력 및 후원을 통해 진행됩니다.' :
    'SNU DESIGN WEEK 2024는\n다음과 같은 파트너사 / 동문의 협력 및 후원을 통해 진행됩니다.');

  return (
    <div className='md:pt-[244px] pt-[35px] mb-[100px] md:w-[900px] w-full md:px-0 px-[24px] flex flex-col md:items-center gap-[30px] min-h-screen'>
      <PCTitle imgsrc="/img/pc-title-partners.svg" />
      <div className='text-primary md:text-center text-left font-[400] text-[15px] leading-[160%] md:tracking-[-0.165px] whitespace-pre-line'>
        {partnersDetail}
      </div>
      <div className={`flex flex-row w-full justify-center items-center md:pt-10 md:pb-20 pb-[20px]`}>
        <Image 
          src={partnersLogoWeb}
          alt="partners page partners logos"
          width={isMobileView ? ratio.width * 345 : ratio.width * 631}
          height={isMobileView ? ratio.width * 67 : ratio.width * 131}
        />
      </div>
      <div className='flex flex-col md:gap-[40px] gap-[24px]'>
        <div className='text-primary text-[32px] font-[700] leading-normal tracking-[-0.32px]'>
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
    
  )
}

export default PartnersPage

