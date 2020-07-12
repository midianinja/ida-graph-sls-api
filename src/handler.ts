import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import 'dotenv/config';
import { warn } from 'console';
import Database from './database';

export const dbConn: APIGatewayProxyHandler = async (event, _context) => {
  const db = new Database({
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    host: process.env.MONGO_URL,
    port: Number(process.env.MONGO_DB_PORT),
    name: process.env.MONGO_INITDB_DATABASE,
  });

  warn('uri:', db.uri);
  warn('conn:', db.connection);

  const connection = await db.connect();
  const response = await connection.model('users').find();

  warn(event, _context);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'The database is working',
        input: response,
      },
      null,
      2,
    ),
  };
};

// export const hello: APIGatewayProxyHandler = async (event, _context) => ({
//   statusCode: 200,
//   body: JSON.stringify(
//     {
//       message:
//           'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
//       input: event,
//     },
//     null,
//     2,
//   ),
// });
