'use client'

import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Providers'

export default function ListFotos() {
  const { user } = useContext(UserContext)
  const id = user?._id
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("../api/getFotos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id
          }),
        });
        const fotosData = await res.json()
        setData(fotosData)
      } catch (error) {
        console.log('error listing salas', error)
      }
    }
    fetchData()
  }, [id])

  return (<>
    {
      data.map((foto) => {
        return (
          <div key={foto.path}>
            <img src={foto.path} />
          </div>
        )
      })
    }
  </>
  )
}