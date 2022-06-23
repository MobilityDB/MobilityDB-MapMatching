import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { MatcherController } from '@/controllers/matcher.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, MatcherController]);
app.listen();
