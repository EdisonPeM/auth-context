import fakeDelay from "./fakeDelay";
import logger from "./logger";

// Fake Fetch with random behavior about tokens and times
async function fakeFetch(url, options = {}) {
  // Log request
  logger.info(`[FakeFetch]`);

  // fake delay to simulate server response time
  await fakeDelay();
  return { status: 200, json: () => ({ foo: "bar" }) };
}

export default fakeFetch;
