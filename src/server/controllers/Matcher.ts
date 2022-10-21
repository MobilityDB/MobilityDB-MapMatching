import type { NextApiRequest, NextApiResponse } from 'next'
import Controller from './Controller'
import formidable from 'formidable'
import { readFileSync } from 'fs'
import GpxParser, { Track, Point } from 'gpxparser'
import {
  Matcher,
  ValhallaMatchedPoint,
  ValhallaRequestBody,
} from '@/interfaces/matcher.interface'
import axios from 'axios'

class MatcherController extends Controller {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      this.sendJSON(res, {
        code: 200,
        message: 'Matcher GET',
      })
    } catch (err) {
      this.handleError(res, err)
    }
  }

  public match = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = formidable({ keepExtensions: true })
    form.parse(req, async (err, fields, files) => {
      if (err) {
        this.handleError(res, err)
        return
      }

      const matcher: Matcher = { gpsPoints: [], matchedGpsPoints: [] }

      const filePath: string = files.file[0].filepath

      const file: string = readFileSync(filePath, 'utf-8')

      const gpxParser: GpxParser = new GpxParser()
      gpxParser.parse(file)

      const tracks: Track[] = gpxParser.tracks
      tracks.forEach((track: Track) => {
        track.points.forEach((point: Point) => {
          matcher.gpsPoints.push(point)
        })
      })

      const reqBody: ValhallaRequestBody = {
        shape: matcher.gpsPoints,
        search_radius: 300,
        shape_match: 'map_snap',
        costing: 'auto',
        format: 'osrm',
        use_timestamps: true,
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await axios.post<ValhallaRequestBody, any>(
          'http://127.0.0.1:8002/trace_attributes',
          reqBody
        )

        data.matched_points.forEach((matchedPoint: ValhallaMatchedPoint) => {
          matcher.matchedGpsPoints.push(matchedPoint)
        })

        this.sendJSON(res, {
          code: 200,
          message: files.file.filepath,
          payload: matcher,
        })
      } catch (error) {
        this.handleError(res, error)
      }
    })
  }
}

export default new MatcherController()
