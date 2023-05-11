import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UseStateContext } from '../../context/ContextProvider'

export default function GuestLayout() {
  const {user} = UseStateContext();
  if(user)
  {
    <Navigate to="/" />
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}
