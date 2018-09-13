import { DBSchema } from '@ngrx/db';
import { environment } from '../src/environments/environment';
// ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
// create object stores for each feature reducer in your project in order to store state offline
export const schema: DBSchema = {
  version: 1,
  name: environment.OFFLINE_DATABASE_NAME,
  stores: {
    authentication: {
      autoIncrement: true,
      primaryKey: 'id',
    }
  },
};
// Application/Configuration constants can go here