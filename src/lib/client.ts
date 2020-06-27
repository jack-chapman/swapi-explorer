import { Planets } from "./planets";

class SWAPIClient {
  planets() {
    return new Planets()
  }
}

export default new SWAPIClient;
