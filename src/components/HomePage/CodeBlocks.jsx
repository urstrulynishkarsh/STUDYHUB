import React from 'react'
import { CTAButton } from './CTAButton'
import { HighlightText } from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'
import { Fade } from 'react-reveal'

export const CodeBlocks = ({position,heading,subheading,ctabtn1, ctabtn2,codeblock,backgroundGradient,codecolor}) => {
  return (
    <div className={`flex ${position} my-20 gap-10  px-16 justify-between`}>

<Fade left distance='20%' duration={1500}>
        {/* section 1 */}
        <div className=' flex flex-col lg:w-[50%] xl:w-[50%] w-[100%] gap-8'>
            {heading}
            <div className='text-richblack-300 lg:text-lg xl:text-lg md:lg:text-lg text-sm font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
                    <div className="flex gap-2 items-center">
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                    </div>

                </CTAButton>

                <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active}>
                    {ctabtn2.btnText}
                </CTAButton>
                
            </div>

        </div>


        </Fade>


        {/* section 2 */}
        <Fade right distance='20%' duration={1500}>

        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
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

            <div className={`w-[90%] flex flex-col gap-2 font-bold text-[12px] font-mono ${codecolor} pr-2 `}> 
                <TypeAnimation
                sequence={[
                    codeblock,
                    5000,
                    '',
                  ]}
                repeat={Infinity}
                cursor={true}
                wrapper='div'
                style={{ whiteSpace: 'pre-line',display:"block"}}


                omitDeletionAnimation={true}
                />
            </div>

        </div>
        </Fade>

    </div>
  )
}
