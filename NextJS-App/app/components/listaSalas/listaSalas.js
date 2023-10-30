'use client'

import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Providers'
import Link from 'next/link'

export default function ListaSalas() {
    const { user } = useContext(UserContext)
    const id = user?._id
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("../api/listarSalas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id
                    }),
                });
                const salasData = await res.json()
                setData(salasData)
            } catch (error) {
                console.log('error listing salas', error)
            }
        }
        fetchData()
    }, [id])

    return (
        <div>
            {
                data.map((item) => (
                    <Link key={item._id} href={"/salas/" + item._id} type="submit" className="w-100px text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus-ring-primary-800">
                        {item.name}
                    </Link>
                ))
            }
        </div>
    );
}
