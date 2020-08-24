import * as dotenv from 'dotenv'
import mongoose, { set, connect, ConnectionOptions } from 'mongoose'

dotenv.config()

class Mongo {
  async conectar() {
    ; (mongoose as any).Promise = global.Promise

    const options: ConnectionOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }

    await connect(process.env.MONGO_URL, options)
      .then(() => console.info('MONGO OK'))
      .then(() => set('debug', true))
      .catch(error => console.error(error))
  }
}

export default new Mongo()