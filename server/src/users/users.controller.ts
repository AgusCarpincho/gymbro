import { Request, Response } from "express";
import { UserDTO } from "./users.model";
import { UsersService } from "./users.service";

class UsersController {
  static users = new UsersService();

  public getAll(req: Request, res: Response) {
    const data = UsersController.users.getAll();
    data.length == 0
      ? res
          .status(404)
          .send({ message: "There are not users registered in the system" })
      : res.status(200).send({ users: data });
  }

  public getById(req: Request, res: Response) {
    let id = req.params.userId.toString();
    const data = UsersController.users.getById(id);
    if (data === undefined) {
      res.status(204).send({ message: `User with id ${id} not found` });
    } else {
      res
        .status(201)
        .send({ user: { name: `${data.name}`, age: `${data.age}` } });
    }
  }

  public addNew(req: Request, res: Response) {
    try {
      const userDTO = new UserDTO(req.body.user.name, req.body.user.age);
      UsersController.users.addNew(userDTO);
      res.status(201).send({
        message: `User ${req.body.user.name} added`,
        idResource: `${userDTO.id}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error context:");
        console.log(error.message);
      }

      res.status(500).send({
        message: "Oops. Something went wrong on the server :(",
      });
    }
  }

  public modifyWithId(req: Request, res: Response) {
    const user = UsersController.users.modifyWithId(
      req.params.userId.toString(),
      req.body.user.attribute,
      req.body.user.newValue
    );
    if (user === undefined) {
      res.status(204).send({
        message: `User with id ${req.params.userId.toString()} not found`,
      });
    } else {
      res.status(201).send({
        message: "User modified",
        user: {
          name: user.name,
          age: user.age,
          id: user.id,
        },
      });
    }
  }

  public deleteById(req: Request, res: Response) {
    const userToRemove = UsersController.users.deleteById(
      req.params.userId.toString()
    );
    if (userToRemove) {
      res
        .status(201)
        .send({ message: `User with id: ${userToRemove.id} removed` });
    } else {
      res.status(404).send({
        message: `The user with id: ${req.params.userId} doesn't exists. Failed to delete resource`,
      });
    }
  }
}

const usersController: UsersController = new UsersController();
module.exports = usersController;
