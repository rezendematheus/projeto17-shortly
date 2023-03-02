import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    confirmPassword: Joi.ref('password')
})

export const signInSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
})