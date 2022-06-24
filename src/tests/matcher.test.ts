import request from 'supertest';
import App from '@/app';
import { MatcherController } from '@controllers/matcher.controller';
import { Matcher } from '@interfaces/matcher.interface';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Matcher', () => {
  describe('[GET] /matcher', () => {
    it('response statusCode 200 / getMatcher', () => {
      const app = new App([MatcherController]);
      return request(app.getServer()).get('/matcher').expect(200, { data: 'Welcome to Map-Matching as service API', message: 'getMatcher' });
    });
  });
});
