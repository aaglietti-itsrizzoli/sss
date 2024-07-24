"use client"
import { useEffect, useState } from "react"
import Image from 'next/image'

function Frame({ framePath, frameIndex, zIndex }: { framePath: string, frameIndex: number, zIndex: number }): JSX.Element {
  return (
    <Image
      src={framePath}
      width={500}
      height={500}
      alt="Picture of the author"
      onClick={() => {
      }}
      style={{
        position: 'absolute',
        zIndex: zIndex
      }}
    />
  )
}

export default function SeekById({ params }: { params: { seekId: string } }): JSX.Element {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/pics/frames/${params.seekId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.frames.map((framePath: string, frameIndex: number) => ({
          framePath: `/${framePath}`,
          frameIndex,
          zIndex: data.frames.length - frameIndex
        })))
        setLoading(false)
      })
  }, [params.seekId])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div style={{
      position: 'relative'
    }}>
      {data.map((f: { framePath: string; frameIndex: number, zIndex: number }) => (
        <Frame
          framePath={f.framePath}
          frameIndex={f.frameIndex}
          zIndex={f.zIndex}
          key={f.frameIndex}
        />
      ))}
    </div>
  )
}
