import bcrypt from "bcrypt";
import { Router } from "express";
import Joi from "joi";
import { User } from "../../model/User.js";
import { logger } from "../../util/logger.js";

export const loginRouter = Router();

const bodySchema = Joi.object<{
  id: string;
  password: string;
}>({
  id: Joi.string()
    .allow(``)
    .external((value: string, helper) => {
      const errors = User.validateId(value);
      if (errors) return helper.message({});

      return value;
    })
    .required(),
  password: Joi.string()
    .allow(``)
    .external((value: string, helper) => {
      const errors = User.validatePassword(value);
      if (errors) return helper.message({});

      return value;
    })
    .required(),
}).unknown(true);

loginRouter.post(`/`, async (req, res) => {
  try {
    const { id, password } = await bodySchema.validateAsync(req.body);
    const user = await User.findOne({ where: { id } });

    if (user === null) {
      res.status(401).end();
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).end();
      return;
    }

    req.session.user = {
      uid: user.uid,
      isAdmin: user.isAdmin,
    };

    res.status(201).end();
  } catch (error) {
    if (Joi.isError(error)) res.status(400).end();
    else {
      logger.error(error);
      res.status(500).end();
    }
  }
});