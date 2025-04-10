import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/Homepage-Explore';
import { HighlightText } from './HighlightText';

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

      <p className='text-center text-richblack-300 text-sm '></p>
    </div>
  )
}

export default ExploreMore