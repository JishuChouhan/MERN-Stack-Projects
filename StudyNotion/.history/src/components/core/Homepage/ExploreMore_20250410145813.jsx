import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/Homepage-Explore';
import { HighlightText } from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
];
const ExploreMore = () => {
  const  [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[4]);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[4].courses[4].heading);
  const setmyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[4].courses);
    setCurrentCard(result[4].courses[4].heading);
  }
  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the 
        <HighlightText text={"Power of Code."}/>
      </div>

      <p className='text-center text-richblack-300 text-[16px] mt-3'>
        Learn to build anything you can imagine.
      </p>

      <div className="mt-5 flex flex-row rounded-full bg-richblack-900 mb-5 border-richblack-100 px-1 py-1">
        {
          tabsName.map((element, index) => {
            return (
              <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} 
              key={index}
              onClick={() => setmyCards(element)}
              >
                {element}
              </div>
            )
          })
        }
      </div>
      <div className="lg:h-[150px]"></div>
      {/* course card group -> */}
      <div className="">
        {
          courses.map((element, index) => {
            return(
              <CourseCard 
              key={index}
              cardData = {element}
              currentCard = {currentCard}
              setCurrentCard = {setCurrentCard}
              />

            )
          })
        }
      </div>
    </div>
  )
}

export default ExploreMore