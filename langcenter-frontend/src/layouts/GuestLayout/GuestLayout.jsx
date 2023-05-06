import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UseStateContext } from '../../context/ContextProvider'

export default function GuestLayout() {
  const {token} = UseStateContext();
  if(token)
  {
    <Navigate to="/" />
  }
  return (
    <div>Guest Layout
      <Outlet/>
    </div>
  )
}
