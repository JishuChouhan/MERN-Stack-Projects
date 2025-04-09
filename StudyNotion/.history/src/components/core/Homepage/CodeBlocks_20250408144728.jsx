import React from 'react';
import CTAButton from "../Homepage/Button";
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeBlock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-20`}>
        {/* {SECTION 1} */}
        <div className="w-[50%] flex flex-col gap-5">
            {heading}
            <div className="text-richblack-100 font-bold">
                {subheading}
            </div>

            <div className="flex gap-5 mt-5">
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className="flex gap-2 items-center">
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>

            </div>
        </div>

        {/* Section 2 */}
        <div className={`flex flex-row h-fit w-[100%] lg:w-[500px] ${backgroundGradient} outline-blue-50`}>
            <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold pr-5 ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} outline-pink-200`}>
                <TypeAnimation 
                sequence={[codeBlock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                    whiteSpace: "pre-line",
                    display: "block"
                }}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks