// Next Page : Partners

import { NextPage } from 'next'
import partnerCardList from 'wordings/partner-card'
import { useRatio } from 'utils/useRatio'
import partnersLogoWeb from 'assets/partners-web-partners-logo.png'
import partnersLogoMobile from 'assets/partners-mobile-partners-logo.png'
import Image from 'next/image'
import useWindowSize from 'utils/useWindowSize'
import { useState } from 'react'

interface CardProps {
  text: string
  image: string
  logoImage: string
}
const PartnerCard: React.FC<CardProps> = ({ text, image, logoImage }) => {

  const [isHovered, setIsHovered] = useState<boolean>()

  return (
    <div className='flex flex-col w-[320px] h-fit mb-10 md:mb-8'>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ?
          <Image 
            src={image}
            alt="partner card"
            width={320}
            height={240}
          />
          :
          <Image
            src={logoImage}
            alt="partner card logo"
            width={320}
            height={240}
          />
        }
      </div>
      <p className='mt-5 text-myblack mytext-1'>
        {text}
      </p>
    </div>
  )
}

const PartnersPage: NextPage = () => {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width < 768
  const ratio = useRatio()

  return (
    <div className='absolute bg-white w-full top-15 flex flex-col justify-start items-center pb-40'>
      <div className={`flex flex-row w-full justify-center items-center pt-10 ${isMobile ? 'pb-10' : 'pb-20'}`}>
        <Image 
          src={partnersLogoWeb}
          alt="partners page partners logos"
          width={isMobile ? ratio.width * 345 : ratio.width * 631}
          height={isMobile ? ratio.width * 67 : ratio.width * 131}
        />
      </div>
      <div className='flex'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20'>
          {partnerCardList.map((partnerCard, index) => (
              <PartnerCard
                key={index}
                text={partnerCard.text}
                image={partnerCard.cover}
                logoImage={partnerCard.image}
              />
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default PartnersPage

