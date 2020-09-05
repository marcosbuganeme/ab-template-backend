import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT || 4444, () =>
  console.log('API TEMPLATE ANBETEC - OK')
);
