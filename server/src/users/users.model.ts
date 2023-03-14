import { createHmac } from "crypto";

export class UserDTO {
  id: String;
  name: String;
  age: Number;
  constructor(name: String, age: Number) {
    if (name.length > 30 || age < 1) {
      throw new Error(
        `Information sended to the server is invalid or not accepted (name: ${name} age: ${age.toString()})`
      );
    }
    this.name = name;
    this.age = age;
    this.id = createHmac("sha256", "asdefg").update(`${name}`).digest("hex");
  }
}
