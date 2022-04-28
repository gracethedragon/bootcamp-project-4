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
  app.delete('/trips/:id', TripsController.removeTrip);
  app.post('/existingtrips', TripsController.add)
  app.get('/mytrips', TripsController.showMine);
  app.get('/trips/:id', TripsController.showOne)
}
