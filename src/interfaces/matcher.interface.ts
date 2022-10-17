import { Point } from 'gpxparser'

export interface ValhallaMatchedPoint {
  distance_from_trace_point: number
  edge_index: number
  type: string
  distance_along_edge: number
  lat: number
  lon: number
}

export interface Matcher {
  gpsPoints: Point[]
  matchedGpsPoints: ValhallaMatchedPoint[]
}

export interface ValhallaRequestBody {
  shape: Point[]
  search_radius: number
  shape_match: string
  costing: string
  format: string
  use_timestamps: boolean
}
