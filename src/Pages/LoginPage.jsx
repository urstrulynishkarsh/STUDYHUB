import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/Images/login.webp"

export const LoginPage = () => {
  return (
    <Template
    title="Welcome Back"
    desc1="Build skills for today, tomorrow, and beyond."
    desc2="Education to future-proof your career."
    image={loginImg}
    formtype="login"
  />
  )
}
