import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(16).required().messages({
      "any.required": "please enter your username",
    }),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        "any.required": "please enter your email",
      }),
    password: Joi.string().required().required().messages({
      "any.required": "please enter your password",
    }),
    cpass: Joi.string().valid(Joi.ref("password")).messages({
      "any.required": "please confirm your password",
    }),
    age: Joi.number().min(10).max(100),
    gender: Joi.string().valid("male", "female"),
  }).with("password", "cpass"),
};
