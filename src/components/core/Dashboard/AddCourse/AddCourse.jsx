import React from 'react'
import RenderSteps from './RenderSteps'
import CodeTips from './CodeTips'

const AddCourse = () => {
  return (
    <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">Add Course</h1>
          <div className="flex-1">
                    <RenderSteps/> 
                </div>
            </div>
            <div>
                <CodeTips/>
            </div>

    </div>
   
  )
}

export default AddCourse