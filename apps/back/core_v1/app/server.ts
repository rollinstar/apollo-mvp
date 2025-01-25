import app from './app';
import { PORT } from './constants/index';

const main = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main().then(() => {
  const healthCheck = { STAGE: 'local', PORT };
  console.log(healthCheck);
});
