// Next Page : Partners

import { NextPage } from 'next'
import partnerCardList from 'wordings/partner-card'
import { useRatio } from 'utils/useRatio'
import partnersLogoWeb from 'assets/partners-web-partners-logo.png'
import partnersLogoMobile from 'assets/partners-mobile-partners-logo.png'
import Image from 'next/image'
import useWindowSize from 'utils/useWindowSize'
import { useState } from 'react'
import PartnerCard from './_components/partner-card'
import PCTitle from 'components/pc-title'

const PartnersPage: NextPage = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;
  const ratio = useRatio();

  const partnersDetail = 'SNU DESIGN WEEK 2024는\n다음과 같은 파트너사 / 동문의 협력 및 후원을 통해 진행됩니다.';

  return (
    <div className='mt-[130px] mb-[100px] w-[900px] flex flex-col justify-center items-center gap-[30px]'>
      <PCTitle imgsrc="/img/pc-title-partners.svg" />
      <div className='text-primary text-center font-[400] text-[15px] leading-[160%] tracking-[-0.165px] whitespace-pre-line'>
        {partnersDetail}
      </div>
      <div className={`flex flex-row w-full justify-center items-center pt-10 ${isMobile ? 'pb-10' : 'pb-20'}`}>
        <Image 
          src={partnersLogoWeb}
          alt="partners page partners logos"
          width={isMobile ? ratio.width * 345 : ratio.width * 631}
          height={isMobile ? ratio.width * 67 : ratio.width * 131}
        />
      </div>
      <div className='flex flex-col gap-[40px]'>
        <div className='text-primary text-[32px] font-[700] leading-normal tracking-[-0.32px]'>
          Partners
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
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

