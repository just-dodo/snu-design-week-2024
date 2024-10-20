import Image from "next/image";

interface Props {
  imgsrc: string;
}

export default function PCTitle({ imgsrc }: Props) {
  return (
    <div className="w-auto h-auto relative">
      <Image src={imgsrc} alt="title" width={252} height={95}/>
    </div>
  );
}