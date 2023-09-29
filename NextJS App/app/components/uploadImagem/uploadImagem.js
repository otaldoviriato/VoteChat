'use client'

import { useState, useEffect, useRef } from 'react'

export default function UploadForm() {
  const [file, setFile] = useState()
  const [image, setImage] = useState('download.png')

  const inputFile = useRef(null)
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setImage('download.png')
      return
    }

    async function HandleSubmit() {
      setImage('loading.svg')

      if (!file) return

      try {
        const data = new FormData()
        data.set('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data
        })
        if (res.ok) {
          setTimeout(() => {

            const objectUrl = URL.createObjectURL(file)
            setImage(objectUrl)
          }, "1000")

        } else {
          console.log(res)
        }

      } catch (error) {
        console.error(error)
      }
    }

    HandleSubmit()

  }, [file])

  return (
    <form>
      <input
        type="file"
        name="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <img onClick={onButtonClick} style={{ cursor: 'pointer' }} src={image} alt="Logo" />
    </form>
  )
}