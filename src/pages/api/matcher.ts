// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MatcherController from '@/server/controllers/Matcher'
import withMethod from '@/server/utils/with-method'

export default withMethod({
  GET: MatcherController.index,
  POST: MatcherController.match,
})

export const config = {
  api: {
    bodyParser: false,
  },
}
