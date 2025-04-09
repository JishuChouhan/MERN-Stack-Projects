import React from "react";
import { HighlightText } from './HighlightText';

const LearningLanguageSection = () => {
  return(
    <div className="mt-10">
        <div className="flex flex-col gap-5">
            <div className="">
                Your Swiss Knife for
                <HighlightText text={'learning any language'}/>
            </div>
            <div className="text-center text-richblack-400 mx-auto text-base">
                Using spin making learning multiple languages easy, with 20+ Languages realistic voice-over, progress tracking, custom schedule and more. 
            </div>
        </div>
    </div>
  )
};

export default LearningLanguageSection;
