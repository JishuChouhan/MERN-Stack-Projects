import React from "react";
import { HighlightText } from './HighlightText';

const LearningLanguageSection = () => {
  return(
    <div>
        <div className="flex flex-col gap-5">
            <div className="">
                Your Swiss Knife for
                <HighlightText text={'learning any language'}/>
            </div>
        </div>
    </div>
  )
};

export default LearningLanguageSection;
