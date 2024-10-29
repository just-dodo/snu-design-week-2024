import Image from "next/image";

interface Props {
  imgsrc: string;
  width?: number;
  height?: number;
}

export default function PCTitle({ imgsrc, width=252, height=95 }: Props) {
  return (
    <div className="w-auto h-auto relative hidden md:block">
      <Image src={imgsrc} alt="title" width={width} height={height}/>
    </div>
  );
}