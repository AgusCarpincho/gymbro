import express from "express";
const router = express.Router();
const usersController = require("./users.controller");

router.use((req, res, next) => {
  const { url, method, rawHeaders, body } = req;
  console.log(
    `Request ${new Date().toTimeString()} HTTP/1.1 [${method}] /users${url} ${
      rawHeaders[1]
    } Body: ${JSON.stringify(req.body)}>>`
  );

  next();
  console.log(
    `<< Response ${new Date().toTimeString()} ${res.statusCode.toString()} ${
      res.statusMessage
    }`
  );
});
router
  .get("/all", usersController.getAll)
  .get("/:userId", usersController.getById)
  .post("/", usersController.addNew)
  .patch("/:userId", usersController.modifyWithId)
  .delete("/:userId", usersController.deleteById);

module.exports = router;
