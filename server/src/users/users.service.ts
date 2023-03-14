import { createHmac } from "crypto";
import { UserDTO } from "./users.model";

export class UsersService {
  private collection: Array<UserDTO>;

  // Por el momento la api persiste los datos en memoria y estos viven en el objeto UsersService.
  // Lo ideal sería más adelante persistir los datos en una base de datos como la gente y cachear datos que suelan consultarse con frecuencia

  constructor() {
    this.collection = [];
  }
  public getAll() {
    return this.collection;
  }
  public getById(id: string) {
    return this.collection.find((user) => user.id.includes(id));
  }
  public addNew(user: UserDTO) {
    this.collection.push(user);
  }
  public modifyWithId(
    id: string,
    attributeToModify: string,
    newValue: string & Number
  ) {
    let user: UserDTO | undefined = this.collection.find(
      (user) => user.id === id
    );
    // should continue ...
    if (user) {
      user[attributeToModify as keyof UserDTO] = newValue;
      user.id = createHmac("sha256", "asdefg")
        .update(`${newValue}`)
        .digest("hex");
    }
    return user;
  }
  public deleteById(id: string) {
    if (
      this.collection.length ===
      this.collection.filter((user) => !user.id.includes(id)).length
    ) {
      return undefined;
    } else {
      let userRemoved = this.collection.find((user) => user.id.includes(id));
      this.collection = this.collection.filter((user) => !user.id.includes(id));
      return userRemoved;
    }
  }
}

export const usersService = new UsersService();
