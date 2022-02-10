import basics from "./basics";
import secret from "./secret";
import redis from "./redis";

const config = {
  ...basics,
  ...redis,
  ...secret
};

export default config;
