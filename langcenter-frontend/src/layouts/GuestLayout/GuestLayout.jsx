import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UseStateContext } from '../../context/ContextProvider'

export default function GuestLayout() {
  const {token} = UseStateContext();
  if(token)
  {
    return(
      <Navigate to="/dashboard" />
      );
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}
