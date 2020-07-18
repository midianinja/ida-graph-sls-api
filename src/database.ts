import mongoose from 'mongoose';
import { warn } from 'console';
import userSchema from './user.model';

interface MongoConnection {
  user: string;
  pass: string;
  name: string;
  port: number;
  host: string;
}

class Database {
  public uri: string;

  public connection: MongoConnection;

  public isConnected: boolean;

  constructor(connection: MongoConnection) {
    if (!connection) {
      throw new Error('Não foi possível conectar ao mongodb');
    }

    this.uri = `mongodb://${connection.host}:${connection.port}`;
    this.connection = connection;
  }

  async connect(): Promise<typeof mongoose> {
    if (!this.uri) {
      throw new Error('URI não informada');
    }
    const connection = await mongoose.connect(this.uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: this.connection.user,
        password: this.connection.pass,
      },
      dbName: this.connection.name,
    });
    (await connection).model('users', userSchema);
    this.isConnected = true;
    return connection;
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      warn('Database is not connected');
    }
    await mongoose.disconnect();
  }
}

export default Database;
