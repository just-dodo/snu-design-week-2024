import Image from "next/image";

interface Props {
  imgsrc: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PCTitle({ imgsrc, width=252, height=95, className }: Props) {
  return (
    <div className={`w-auto h-auto relative hidden md:block ${className}`}>
      <Image src={imgsrc} alt="title" width={width} height={height}/>
    </div>
  );
}