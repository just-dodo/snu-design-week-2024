// Next Page : Works

import { NextPage } from 'next'
import Link from 'next/link'
import courseList from 'wordings/course'
import useWindowSize from 'utils/useWindowSize'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { AnimationDirection } from 'lottie-web'
import hoverBlueAnimation from 'assets/hover_b.json'
import hoverYellowAnimation from 'assets/hover_y.json'
import { useRef, useState } from 'react'

const DesktopClassList = () => {

  return (
    <div className='bg-white w-full flex flex-col md:grid md:grid-cols-2 md:grid-rows-6 border-b border-r'>
      <div className='border-l border-primary'>
        <p className='mt-8 ml-8 text-4xl text-primary'>
          VD
        </p>
      </div>
      <div className='border-l border-primary'>
        <p className='pt-8 pl-8 text-4xl text-primary'>
          ID
        </p>
      </div>
      {courseList.map((course, index) => {
        // course.english_text to kebab case
        const coursePath = course.path

        return (
          <Course key={`course-${coursePath}`} index={index} coursePath={coursePath} course={course} />
        )
      })}
      <div className='border-t border-l border-primary' />
      <div className='border-t border-l border-primary' />
    </div>
  );
}

const MobileClassList = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex flex-col'>
        <div className='bg-secondary w-full h-[63px] flex items-center'>
          <p className='text-2xl font-medium text-primary ml-6'>
            VD
          </p>
        </div>
        {courseList.map((course, index) => {
          // course.english_text to kebab case
          const coursePath = course.path
          if (course.type == "VD") {
            return (
              < MobileCourse
                key={`course-${coursePath}`}
                index={index}
                coursePath={coursePath}
                course={course}
                type="VD"
              />
            )
          }
        })}
      </div>
      <div className='flex flex-col'>
        <div className='bg-primary w-full h-[63px] flex items-center'>
          <p className='text-2xl font-medium text-white ml-6'>
            ID
          </p>
        </div>
        {courseList.map((course, index) => {
          // course.english_text to kebab case
          const coursePath = course.path
          if (course.type == "ID") {
            return (
              <Link className='flex items-center' key={index}
                href={`/2022/works/${coursePath}`}
              >
                <div className='bg-white w-full h-[88px] flex flex-col justify-center items-start border-t border-primary'>
                  <p className='text-xl  text-primary ml-6 font-bold pb-2'>
                    {course.korean_text}
                  </p>
                  <p className='text-xl text-primary ml-6  font-bold'>
                    {course.english_text}
                  </p>
                </div>
              </Link>
            )
          }
        })}
      </div>
    </div>
  );
}

const WorksPage: NextPage = () => {
  const windowSize = useWindowSize()
  return (
    <div className="bg-white w-full h-full flex flex-row">
      <div className='hidden md:block bg-secondary w-1/12' />
      {windowSize.width > 768 ? (
        <DesktopClassList />
      ) : (
        <MobileClassList />
      )}
      <div className='hidden md:block bg-primary w-1/12' />
    </div>
  )
}

export default WorksPage

function Course({
  index,
  coursePath,
  course,

}: { index: number, coursePath: string, course: { type: string; korean_text: string; english_text: string; path: string } }): JSX.Element {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const windowSize = useWindowSize()
  const [direction, setDirection] = useState<AnimationDirection>(1)
  const [isMobileView, setIsMobileView] = useState(false)


  function playWithDirection(direction: AnimationDirection) {
    if (lottieRef.current) {
      // lottieRef.current.stop()
      lottieRef.current.setDirection(direction)
      lottieRef.current.play()
    }
  }
  const isVD = course.type == "VD"
  return <Link className='relative pt-4 pl-8 border-t border-l border-primary bg-transparent z-10 overflow-hidden w-full h-full ' key={index}
    href={`/2022/works/${coursePath}`}
    onPointerEnter={() => {
      playWithDirection(1)
    }}
    onPointerLeave={() => {
      playWithDirection(-1)
    }}
  >
    <p className='text-xl text-primary font-bold z-20'>
      {course.korean_text}
    </p>
    <p className='text-xl text-primary font-bold z-20'>
      {course.english_text}
    </p>

    <Lottie
      className='absolute bottom-0 left-0 -z-10 w-full aspect-[640/132]'
      lottieRef={lottieRef}
      animationData={isVD ? hoverYellowAnimation : hoverBlueAnimation}
      loop={false}
      autoplay={false}
      initialSegment={[0, 12]}
    />
  </Link>
}

function MobileCourse({
  index,
  coursePath,
  course,
  type
}: { index: number, coursePath: string, course: { type: string; korean_text: string; english_text: string; path: string }, type: "VD" | "ID" }): JSX.Element {


  return <Link className='flex items-center' key={index}
    href={`/2022/works/${coursePath}`}
  >
    <div className='bg-white w-full h-[88px] flex flex-col justify-center items-start border-t border-primary'>
      <p className='text-xl  text-primary ml-6 font-bold pb-2'>
        {course.korean_text}
      </p>
      <p className='text-xl text-primary ml-6 font-bold '>
        {course.english_text}
      </p>
    </div>
  </Link>
}

