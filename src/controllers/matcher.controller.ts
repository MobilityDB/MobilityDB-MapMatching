import { Controller, Post, HttpCode, Req, UploadedFile } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Matcher } from '@/interfaces/matcher.interface';
import MatcherService from '@/services/matcher.service';
import fileUpload from 'express-fileupload';

type UploadedFile = fileUpload.UploadedFile;

@Controller()
export class MatcherController {
  public matcherService = new MatcherService();

  @Post('/matcher')
  @HttpCode(200)
  @OpenAPI({ summary: 'Match given GPS coordinates' })
  async matchGPSPoints() {
    return { data: 'Here is your matched points', message: 'matched' };
  }

  @Post('/matcher/gpxFile')
  @HttpCode(200)
  @OpenAPI({ summary: 'Matches the given GPX file and sends back the matched points along with original points' })
  async matchGPXFile(@Req() req: any) {
    const gpxFile: UploadedFile = req.files.gpxFile;
    const matchedRes: Matcher = await this.matcherService.matchGPXFile(gpxFile);

    return { data: matchedRes, message: 'file matched' };
  }
}
