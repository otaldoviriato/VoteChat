'use client'

import React from 'react'
import { useContext } from 'react'
import {UserContext} from '../../Providers'

export default async function GetSession() {
  const { user } = useContext(UserContext)

  return <div>
    <div>
          Nome: {user?.name} <span className="font-bold"></span>
        </div>
        <div>
          Email: {user?.email} <span className="font-bold"></span>
        </div>
    
  </div>
}