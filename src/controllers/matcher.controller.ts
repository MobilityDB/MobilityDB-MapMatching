import { Controller, Body, Get, Post, HttpCode, Req, UploadedFile } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { MatcherDto } from '@/dtos/matcher.dto';
import { HttpException } from '@exceptions/HttpException';
import MatcherService from '@/services/matcher.service';
import fileUpload from 'express-fileupload';

type UploadedFile = fileUpload.UploadedFile;

@Controller()
export class MatcherController {
  public matcherService = new MatcherService();

  @Post('/matcher')
  @HttpCode(200)
  @OpenAPI({ summary: 'Match given GPS coordinates' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async matchGPSPoints(@Body() gpsData: MatcherDto) {
    // const createUserData: User = await this.matcherService.createUser(gpsData);
    return { data: 'Here is your matched points', message: 'matched' };
  }

  @Post('/matcher/gpxFile')
  @HttpCode(200)
  @OpenAPI({ summary: 'Matches the given GPX file and sens back the matched points' })
  async matchGPXFile(@Req() req: any) {
    const gpxFile: UploadedFile = req.files.gpxFile;
    const matchedRes: string = await this.matcherService.matchGPXFile(gpxFile);

    return { data: matchedRes, message: 'file matched' };
  }
}
