import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import { API_URL } from '../../constants'
import EmailField from './components/emailField'
import NameField from './components/nameField'
import ImageField from './components/imageField'

export default function UserProfile() {

    return (
        <>
            <NameField />

            <EmailField />

            <ImageField />
        </>
    )
}
