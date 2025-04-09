import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HighlightText } from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import { HighlightText } from './../components/core/Homepage/HighlightText';

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between ">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="group-hover:bg-richblue-900 flex flex-row items-center gap-2 rounded-full px-10 py-[5x] transition-all duration-200">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-2xl font-semibold mt-6 mb-6">
          <h1>
            Empower Your Future with Us
            <HighlightText text={"Coding Skills"} />
          </h1>
        </div>

        <div className="w-[90%] text-center text-lg font-bold text-richblack-300 max-w-maxContent">
          <p>
            Lorem d voluperiam necessitatibus earum recusandae. Libero debitis
            quas nobis voluptate nulla voluptatem architecto consequatur ut,
            impedit porro eum maiores quasi, alias corporis repellendus?
            Corrupti voluptatibus aspernatur blanditiis inventore suscipit.
          </p>
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="shadow-richblue-400 my-12 mx-60 shadow-xl">
          <video src="" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Section 2 */}
      <div className="px-32">
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-white font-bold text-2xl">
              Unlock Your
              <HighlightText text={"Coding Potential "} />
              with our online courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have yers of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n</html>`}
          codeColor={"text-yellow-25"}
          backgroundGradient={
            "bg-gradient-to-br from-[#2f2f2f]/80 via-[#1f1f1f]/90 to-black/95"
          }
        />
      </div>

      {/* Section 3 */}
      <div className="px-32">
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-white font-bold text-2xl">
              Start
              <HighlightText text={"Coding in seconds"} />
              with our online courses.
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{
            btnText: "Continue lesson",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn more",
            linkto: "/login",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n</html>`}
          codeColor={"text-yellow-25"}
          backgroundGradient={
            "bg-gradient-to-br from-[#0d1b2a]/80 via-[#1b263b]/90 to-[#1e293b]/95"
          }
        />
      </div>

      {/* Section 4 */}
      <div className="bg-white text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[120px]"></div>
            <div className="flex flex-row text-white gap-7">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore All Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5">
           <div className="flex flex-row gap-5 ">
            <div className="text-4xl font-semibold 4-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand."}/>
            </div>
           </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
