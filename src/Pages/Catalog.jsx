import React, { useEffect, useState } from 'react'
import { Footer } from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/ApiConnector';
import { categories } from '../services/api';
import { pgaeAndComponentData } from '../services/operations/pgaeAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import { useSelector } from 'react-redux';
import Irctc from '../components/common/Irctc';
import { Error } from './Error';

const Catalog = () => {

    const {catalogName}=useParams();
    const {loading}=useSelector((state)=>state.profile)
    // console.log(catalogName)
    const [catalogPageData,setCatalogPageData]=useState(null)
    const [categoryId,setCategoryId]=useState("");
    const [active ,setActive]=useState(1)

    // fetch all category 

    useEffect(()=>{
        const getCategory=async()=>{
            const res=await apiConnector("GET",categories.CATEGORIES_API)
            const category_id=res?.data?.data?.filter((category)=>category.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategory();
    },[catalogName])


    useEffect(()=>{
        const categoryPageDetails=async()=>{
            try{
                const res=await pgaeAndComponentData(categoryId)
                // console.log("result in apge",res)
                setCatalogPageData(res);
                // console.log("my catageorgy which set data",catalogPageData)
            }
            catch(error)
            {
                console.log(error);
            }
        }
        if(categoryId){
        categoryPageDetails()
        }
        
    },[categoryId])





    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
           <Irctc/>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
  return (
    <>
    {/* Hero Section */}
    <div className=" box-content mt-24 bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">
          {`Home / Catalog / `}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-richblack-5">
          {catalogPageData?.data?.selectedCategory?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>
    </div>

    {/* Section 1 */}
    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="text-3xl text-richblack-5">Courses to get you started</div>
      <div className="my-4 flex border-b border-b-richblack-600 text-sm">
        <p
          className={`px-4 py-2 ${
            active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
          } cursor-pointer`}
          onClick={() => setActive(1)}
        >
          Most Populer
        </p>
        <p
          className={`px-4 py-2 ${
            active === 2
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
          } cursor-pointer`}
          onClick={() => setActive(2)}
        >
          New
        </p>
      </div>
      <div>
        <CourseSlider
          Courses={catalogPageData?.data?.selectedCategory?.courses}
        />
      </div>
    </div>
    {/* Section 2 */}
    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="text-3xl text-richblack-5">
        Top courses in {catalogPageData?.data?.differentCategory?.name}
      </div>
      <div className="py-8">
        <CourseSlider
          Courses={catalogPageData?.data?.differentCategory?.courses}
        />
      </div>
    </div>

    {/* Section 3 */}
    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="text-3xl text-richblack-5">Frequently Bought</div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card course={course} key={i} Height={"xl:h-[400px] lg:h-[400px] md:h-[400px]"} />
            ))}
        </div>
      </div>
    </div>

    <Footer />
  </>
  )
}

export default Catalog