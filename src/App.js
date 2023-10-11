import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { SignupPage } from "./Pages/SignupPage";
import { Navbar } from "./components/common/Navbar";
import { useEffect, useState } from "react";
import { AboutPage } from "./Pages/AboutPage";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { useSelector } from "react-redux";

import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { Error } from "./Pages/Error";
import Setting from "./components/core/Dashboard/Setting";
import EnrolledCourse from "./components/core/Dashboard/EnrolledCourse/EnrolledCourse";
import Index from "./components/core/Dashboard/Cart/Index";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate an async operation (e.g., loading data)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when done loading
    }, 2000); // Simulate a 2-second loading time
  }, []);


    const {user}=useSelector((state)=>state.profile)
    
  
  return (
    
    

    // <div>
     <div className="w-screen overflow-x-hidden min-h-screen bg-richblack-900 flex flex-col font-inter ">

      <Navbar   />
 
        <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
         <Route
          path="login"
          element={
            <OpenRoute>
              <LoginPage/>
            </OpenRoute>
          }
        />

        <Route path="signup" element={<OpenRoute>
              <SignupPage />
            </OpenRoute>}/>

            <Route path="about" element={<OpenRoute>
              <AboutPage />
            </OpenRoute>}/>
     
            <Route path="contact" element={<OpenRoute>
              <Contact />
            </OpenRoute>}/>

            <Route path="forgot-password" element={<OpenRoute>
              <ForgotPassword />
            </OpenRoute>}/>

            <Route path="update-password/:id" element={<OpenRoute>
              <UpdatePassword />
            </OpenRoute>}/>


            <Route path="verify-email" element={<OpenRoute>
              <VerifyEmail />
            </OpenRoute>}/>



            <Route
             element=
             {
             <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>
             }
             >
              <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
              <Route path="/dashboard/settings" element={<Setting/>}/>


              {
                user?.accountType===ACCOUNT_TYPE.STUDENT &&(
                  <>
  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse/>}/>
              <Route path="/dashboard/cart" element={<Index/>}/>
            
                  </>
                )
              }



{
                user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
                  <>

<Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
  <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
  <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              {/* <Route path="/dashboard/wishlist" element={<Index/>}/> */}
                  </>
                )
              }
            </Route>
              
              <Route element={
                <PrivateRoute><ViewCourse/></PrivateRoute>
              }>
                  {
                    user?.accountType===ACCOUNT_TYPE.STUDENT && (
                      <>
                      <Route path="view-course/:courseId/section/:sectionId/sub-Section/:subSectionId" element={<VideoDetails/>}/>
                      </>
                    )
                  }

              </Route>
              <Route path="*" element={<Error/>}/>
{/* 
         <Route path="/" element={<Navigate to={"/"}  />} />
        <Route path="*" element={<Navigate to={"/"}  />} /> */}
        
        </Routes>
       
    

      

    </div>
  );
}

export default App;
