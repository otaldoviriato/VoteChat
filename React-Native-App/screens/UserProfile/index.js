import React from 'react'
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
