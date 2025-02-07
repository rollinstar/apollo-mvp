import app from './app';
import { PORT } from './constants/index';

const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

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
