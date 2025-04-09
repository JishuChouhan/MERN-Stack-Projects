import React from "react";
import { HighlightText } from './HighlightText';

const LearningLanguageSection = () => {
  return(
    <div className="">
        <div className="flex flex-col gap-5">
            <div className="text-4xl font-semibold text-center">
                Your Swiss Knife for
                <HighlightText text={'learning any language'}/>
            </div>
            <div className="text-center text-richblack-600 mx-auto text-base">
                Using spin making learning multiple languages easy, with 20+ Languages realistic voice-over, progress tracking, custom schedule and more. 
            </div>
        </div>
    </div>
  )
};

export default LearningLanguageSection;
