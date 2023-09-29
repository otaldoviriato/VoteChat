'use client'

import React from 'react';
import { signOut } from "next-auth/react"

// import { Container } from './styles';

export default function signOutButton() {
  return <button onClick={() => signOut()} type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
  Sair
</button>;
}