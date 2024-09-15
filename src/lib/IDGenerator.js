import crypto from "node:crypto";

export default class IDGenerator {
  static generate() {
    if (!this.id) {
      this.id = crypto.randomBytes(20);
      Buffer.from("-SM01-").copy(this.id, 0);
    }
    return this.id;
  }
}
