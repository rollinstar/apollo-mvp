const PORT: number = Number(process.env.PORT) || 3000;
const SALT_ROUNDS = 10;
const SWAGGER_OPTIONS = {
  swagger: {
    info: {
      title: ' APOLLO PROGRAM MVP Core APIs',
      description: 'My Description.',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Default', description: 'Default' }],
  },
};
const SWAGGER_UI_OPTIONS = {
  routePrefix: '/swagger',
  exposeRoute: true,
};

export { PORT, SALT_ROUNDS, SWAGGER_OPTIONS, SWAGGER_UI_OPTIONS };
