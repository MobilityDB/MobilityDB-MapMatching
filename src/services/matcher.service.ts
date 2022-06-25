import { HttpException } from '@exceptions/HttpException';
import { Matcher, ValhallaMatchedPoint, ValhallaRequestBody } from '@/interfaces/matcher.interface';
import { readFileSync } from 'fs';
import fileUpload from 'express-fileupload';
import GpxParser, { Track, Point } from 'gpxparser';
import axios from 'axios';
import { logger } from '@/utils/logger';

type UploadedFile = fileUpload.UploadedFile;

class MatcherService {
  public async matchGPXFile(gpxFile: UploadedFile): Promise<Matcher> {
    const matcher: Matcher = { gpsPoints: [], matchedGpsPoints: [] };

    const file: string = readFileSync(gpxFile.tempFilePath, 'utf-8');

    const gpxParser: GpxParser = new GpxParser();
    gpxParser.parse(file);

    const tracks: Track[] = gpxParser.tracks;
    tracks.forEach((track: Track) => {
      track.points.forEach((point: Point) => {
        matcher.gpsPoints.push(point);
      });
    });

    const reqBody: ValhallaRequestBody = {
      shape: matcher.gpsPoints,
      search_radius: 300,
      shape_match: 'map_snap',
      costing: 'auto',
      format: 'osrm',
      use_timestamps: true,
    };

    try {
      const { data } = await axios.post<ValhallaRequestBody, any>('http://127.0.0.1:8002/trace_attributes', reqBody);

      data.matched_points.forEach((matchedPoint: ValhallaMatchedPoint) => {
        matcher.matchedGpsPoints.push(matchedPoint);
      });

      logger.debug('DEBUG MESSAGE');

      return matcher;
    } catch (error) {
      logger.error(error);
      return new HttpException(500, 'Server error');
    }
  }
}

export default MatcherService;
