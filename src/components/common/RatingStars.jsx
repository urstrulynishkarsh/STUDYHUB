import React, { useEffect, useState } from 'react'

import {TiStarFullOutline, TiStarHalfOutline, TiStarOutline} from 'react-icons/ti'

const RatingStars = ({Review_Count,Star_Size}) => {
    const [starCount,setStarCount]=useState({half:0,full:0,empty:0})
    useEffect(()=>{
        const wholeStar=Math.floor(Review_Count)||0
        setStarCount({
            full:wholeStar,
            half:Number.isInteger(Review_Count)?0:1,
            empty:Number.isInteger(Review_Count)?5-wholeStar:4-wholeStar
        })
    },[Review_Count])
  return (
    <div className='flex gap-1 text-yellow-100'>
        {
            [...new Array(starCount.full)].map((_,i)=>{
                return <TiStarFullOutline key={i} size={Star_Size ||20 }/>
            })
        }
        {
            [...new Array(starCount.half)].map((_,i)=>{
                return <TiStarHalfOutline key={i} size={Star_Size ||20 }/>
            })
        }
        {
            [...new Array(starCount.empty)].map((_,i)=>{
                return <TiStarOutline key={i} size={Star_Size ||20 }/>
            })
        }

    </div>
  )
}

export default RatingStars