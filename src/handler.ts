import { APIGatewayProxyHandler } from 'aws-lambda';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';
import 'source-map-support/register';
import 'dotenv/config';
// import { warn } from 'console';
import schema from './graphql/schema';

const server = new ApolloServer(
  {
    schema: makeExecutableSchema(schema),
    introspection: true,
    playground: {
      settings: {
        'editor.theme': 'dark',
      },
      tabs: [
        {
          endpoint: '/graphql',
        },
      ],
    },
    path: '/graphql',
    context: async ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      env: event.stageVariables || {
        MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
        MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
        MONGO_URL: process.env.MONGO_URL,
        MONGO_DB_PORT: Number(process.env.MONGO_DB_PORT),
        MONGO_INITDB_DATABASE: process.env.MONGO_INITDB_DATABASE,
      },
    }),
  },
);

export const graphql: APIGatewayProxyHandler = server.createHandler({
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept',
    ],
    credentials: true,
  },
});
