"use client"
import { useEffect, useState } from "react"
import Image from 'next/image'

function Frame({ framePath, frameIndex, zIndex }: { framePath: string, frameIndex: number, zIndex: number }): JSX.Element {
  const [display, setDisplay] = useState('block')
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: zIndex,
        display: display
      }}
    >
      <p
        style={{
          backgroundColor: 'black'
        }}
      >frameIndex {frameIndex}, zIndex {zIndex}</p>
      <Image
        src={framePath}
        width={500}
        height={500}
        alt="Picture of the author"
        onClick={() => {
          setDisplay('none')
        }}
      />
    </div>
  )
}

export default function SeekById({ params }: { params: { seekId: string, gameId: string } }): JSX.Element {
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
      <div
        style={{
          position: 'absolute',
          zIndex: -1
        }}
      >
        <h1>SET!!</h1>
        <form action={`/api/send/games/${params.gameId}/seek/${params.seekId}`}>
          <h2>WHO</h2>
          <label><input type="radio" name="who" value="maradona" />maradona</label>
          <label><input type="radio" name="who" value="pele" />pele</label>
          <h2>WHEN</h2>
          <label><input type="radio" name="when" value="1990" />1990</label>
          <label><input type="radio" name="when" value="2009" />2000</label>
          <h2>WHAT</h2>
          <label><input type="radio" name="what" value="argentina" />argentina</label>
          <label><input type="radio" name="what" value="brasile" />brasile</label>
          <br />
          <button type="submit">SENDDDDDD!!!!</button>
        </form>
      </div>
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
