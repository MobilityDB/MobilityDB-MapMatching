import { hash } from 'bcrypt';
import { MatcherDto } from '@/dtos/matcher.dto';
import { HttpException } from '@exceptions/HttpException';
import { Matcher } from '@/interfaces/matcher.interface';
import fileUpload from 'express-fileupload';

type UploadedFile = fileUpload.UploadedFile;

class MatcherService {
  public async matchGPXFile(file: UploadedFile): Promise<string> {
    const fileName: string = file.name;
    return fileName;
  }
}

export default MatcherService;
