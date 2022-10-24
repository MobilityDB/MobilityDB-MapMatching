import { useContext, useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

import { MatcherContext } from '@/context/matcherContext'
import {
  MatcherContext as MatcherContextType,
  ValhallaMatchedPoint,
} from '@/interfaces/matcher.interface'
import { Point } from 'leaflet'

import styles from './styles.module.css'

export const Recenter = ({ lat, lng }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng])
  return null
}

const Map = () => {
  const { matchedRes } = useContext<MatcherContextType>(MatcherContext)
  const [centerPos, setCenterPos] = useState<number[]>([50.378472, 14.970598])
  const [matchedPoints, setMatchedPoints] = useState<Point[]>([])

  useEffect(() => {
    if (matchedRes.matchedGpsPoints.length > 0) {
      matchedRes.matchedGpsPoints.forEach((p: ValhallaMatchedPoint) => {
        setMatchedPoints((prev) => [...prev, new Point(p.lat, p.lon)])
      })
    }

    return () => {
      setMatchedPoints([])
    }
  }, [matchedRes.matchedGpsPoints])

  useEffect(() => {
    if (matchedPoints.length > 0)
      setCenterPos([matchedPoints[0].x, matchedPoints[0].y])
  }, [matchedPoints])

  return (
    <MapContainer
      center={[50.378472, 14.970598]}
      zoom={60}
      scrollWheelZoom={true}
      className={`${styles.map_container} border-4 border-gray-500`}
    >
      <Recenter lat={centerPos[0]} lng={centerPos[1]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {matchedPoints.map((p: Point, key: number) => (
        <Marker key={key} position={[p.x, p.y]} />
      ))}
    </MapContainer>
  )
}

export default Map
