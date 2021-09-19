import logger from "./logger";

function fakeDelay(seconds = 1) {
  const randomTime = parseInt(Math.random() * seconds * 1000, 10);
  logger.time(`[fakeDelay] Time`);
  return new Promise((resolve) =>
    setTimeout(() => {
      logger.timeEnd(`[fakeDelay] Time`);
      resolve();
    }, randomTime)
  );
}

export default fakeDelay;
