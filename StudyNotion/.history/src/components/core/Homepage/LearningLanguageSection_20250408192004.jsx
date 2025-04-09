import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.png";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.png";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.png";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.png";
import timeLineImg from "../../../assets/Images/timeLineImg.jpg"

const timeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully comitted to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully comitted to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully comitted to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully comitted to the success company",
  },
];
const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-row gap-20 items-center ">
        <div className="flex flex-col w-[45%] gap-5">
          {timeLine.map((element, index) => {
            return (
              <div className="flex flex-row gap-5" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.Logo} alt="" />
                </div>

                <div className="">
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-200">
            <img className="h-[350px] w-[600px] shadow-2xl shadow-brown-900 object-cover rounded-lg" src={timeLineImg} alt="" />

            <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%]">
                <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-400 px-6">
                    <p className="text-3xl font-bold">10</p>
                    <p className="text-caribbeangreen-300 text-2xl">Years of Experience</p>
                </div>
                <div className="flex gap-5 items-center px-6">
                <p className="text-3xl font-bold">250</p>
                <p className="text-caribbeangreen-300 text-2xl">types of course</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
