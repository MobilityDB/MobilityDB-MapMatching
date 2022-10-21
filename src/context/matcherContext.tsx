import React, { useState } from 'react'
import {
  Matcher,
  MatcherContext as MatcherContextType,
  MatcherResponse,
} from '@/interfaces/matcher.interface'
import axios from 'axios'

export const MatcherContext = React.createContext<MatcherContextType | null>(
  null
)

const MatcherProvider = ({ children }) => {
  const [matchedRes, setMatchedRes] = useState<Matcher>({
    gpsPoints: [],
    matchedGpsPoints: [],
  })

  const uploadGpxFile = (file: File) => {
    const formData: FormData = new FormData()
    formData.append('file', file)
    axios
      .post('/api/matcher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }: { data: MatcherResponse }) => {
        setMatchedRes({
          gpsPoints: data.payload.gpsPoints,
          matchedGpsPoints: data.payload.matchedGpsPoints,
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <MatcherContext.Provider value={{ matchedRes, uploadGpxFile }}>
      {children}
    </MatcherContext.Provider>
  )
}

export default MatcherProvider
