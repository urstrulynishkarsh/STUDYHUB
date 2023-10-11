import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const Course_Card = ({course,Height}) => {

    const [avgRatings,setAvgRatings]=useState(0)
    useEffect(()=>{
        const count=GetAvgRating(course?.ratingAndReviews)
        setAvgRatings(count)
    },[course])
  return (
    <div>
        <Link to={`/courses/${course?._id}`}>
        <div className="">
          <div className="rounded-lg pr-8">
                        <img src={course?.thumbnail} className={`${Height} w-full rounded-xl object-cover `} alt={course?.courseName} />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex items-center gap-2">
              <span className="text-yellow-5">{`${avgRatings}`}</span>
              <RatingStars Review_Count={avgRatings} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default Course_Card