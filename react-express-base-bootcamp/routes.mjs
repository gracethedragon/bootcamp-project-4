import { resolve } from 'path';
import db from './models/index.mjs'
import initTripsController from './controllers/trips.mjs'

export default function routes(app) {
  const TripsController = initTripsController(db)
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  app.get('/trips', TripsController.show);
  app.post('/trips', TripsController.create);
}
