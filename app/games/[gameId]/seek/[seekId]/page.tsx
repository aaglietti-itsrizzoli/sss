"use client"
import { useEffect, useState } from "react"
import Image from 'next/image'

export default function SeekById({ params }: { params: { seekId: string } }): JSX.Element {
  const [data, setData] = useState([""])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/pics/frames/${params.seekId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.frames)
        setLoading(false)
      })
  }, [params.seekId])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      {data.map(frame => (
        <Image
          src={`/${frame}`}
          key={frame}
          width={500}
          height={500}
          alt="Picture of the author"
        />))}
    </div>
  )
}
