import express from 'express';

import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeListLeadsController } from '../factories/makeListLeadsController';

import { routeAdapter } from './adapters/routeAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get(
  '/leads',
  (request, response, next) => {
    const authorization = request.headers.authorization;
    if (!authorization) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }
    next();
  },
  routeAdapter(makeListLeadsController())
);

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
});
