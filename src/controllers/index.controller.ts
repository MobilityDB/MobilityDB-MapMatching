import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class IndexController {
  @Get('/')
  @OpenAPI({ summary: 'Shows API welcome message and API documentation endpoint' })
  index() {
    return { data: 'Welcome to Map-Matching as service API. See API documentation at /api-docs endpoint', message: '/' };
  }
}
