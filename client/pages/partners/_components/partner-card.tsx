import Image from 'next/image';

interface PartnerCardProps {
  text: string;
  logoImage: string;
}

export default function PartnerCard({ text, logoImage }: PartnerCardProps) {
  return (
    <div className="flex flex-col w-auto px-[16px] py-[20px] rounded-[16px] border-primary border-2">
      <Image src={logoImage} alt={text} width={165} height={165} />
      <div className='text-primary text-[15px] leading-[160%]'>
        {text}
      </div>
    </div>
  );
}

  