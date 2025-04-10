import React from "react";
import { HighlightText } from './HighlightText';
import know_your_progress from "../../../assets/Images/know_your_progress.jpg";
import compare_with_other from "../../../assets/Images/compare_with_other.jpg";
import plan_your_lesson from "../../../assets/Images/plan_your.jpg"
import CTAButton from "../../../components/core/Homepage/Button"

const LearningLanguageSection = () => {
  return(
    <div className="mt-20">
        <div className="flex flex-col gap-5 items-center">
            <div className="text-4xl font-semibold text-center">
                Your Swiss Knife for
                <HighlightText text={'learning any language'}/>
            </div>
            <div className="text-center text-richblack-800 mx-auto text-base w-[70%] font-medium">
                Using spin making learning multiple languages easy, with 20+ Languages realistic voice-over, progress tracking, custom schedule and more. 
            </div>

            
            <div className="flex flex-row mt-5 h-[400px] w-[350px] gap-40 items-start"> 
                <img src={know_your_progress} alt="progress" 
                className="object-contain -mr-32"
                />
                <img src={compare_with_other} alt="progress" 
                className="object-contain"
                />
                <img src={plan_your_lesson} alt="progress" 
                className="object-contain -ml-36"
                />
            </div>
            <div className="w-fit">
                <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn more</div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
};

export default LearningLanguageSection;
