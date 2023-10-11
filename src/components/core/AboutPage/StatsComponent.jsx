import React from 'react'

const Stats=[
    {
        count:"5K",
        label:"Active Students",

    },
    {
        count:"10+",
        label:"Mentors",
    },
    {
        count:"200+",
        label:"Courses",
    },
    {
        count:"50+",
        label:"Awards",
    }
]

export const StatsComponent = () => {
  return (
    <section className='bg-richblack-700 w-full py-24 mt-10'>
        
            <div className=' justify-around items-center mx-auto flex '>
                {
                    Stats.map((data,index)=>{
                        return(
                            <div key={index} className='text-center gap-y-1 flex flex-col' >
                                <h1 className='text-white lg:text-3xl xl:text-3xl md:text-3xl sm:text-2xl text-xl font-semibold' >
                                {data.count}
                                </h1>
                                <p className='text-richblack-300  font-medium lg:text-[16px] xl:text-[16px] md:text-[16px] sm:text-[16px] text-[10px]'>
                                {data.label}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
    </section>
  )
}
