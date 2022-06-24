import { HttpException } from '@exceptions/HttpException';
import { Matcher, ValhallaMatchedPoint } from '@/interfaces/matcher.interface';
import { readFileSync } from 'fs';
import fileUpload from 'express-fileupload';
import GpxParser, { Track, Point } from 'gpxparser';
import axios from 'axios';

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

    const req_body = {
      shape: matcher.gpsPoints,
      search_radius: 300,
      shape_match: 'map_snap',
      costing: 'auto',
      format: 'osrm',
      use_timestamps: true,
    };

    await axios
      .post('127.0.0.1:8002/trace_attributes', req_body)
      .then(res => {
        res.data.matched_points.forEach((matchedPoint: ValhallaMatchedPoint) => {
          matcher.matchedGpsPoints.push(matchedPoint);
        });
      })
      .catch(new HttpException(500, 'Server error'));

    return matcher;
  }
}

export default MatcherService;
