import Joi from "joi";

export default class UserValidator {
    public static instance: UserValidator = new UserValidator();
    private constructor() {}

    public createUsers = Joi.object({
        users: Joi.array()
            .items(
                Joi.object({
                    username: Joi.string().alphanum().min(3).max(30).required().messages({
                        "string.base": `"username" should be a type of 'text'`,
                        "string.empty": `"username" cannot be an empty field`,
                        "string.alphanum": `"username" must only contain alpha-numeric characters`,
                        "string.min": `"username" should have a minimum length of {#limit}`,
                        "string.max": `"username" should have a maximum length of {#limit}`,
                    }),
                    fullName: Joi.string().min(2).max(50).required().messages({
                        "string.base": `"name" should be a type of 'text'`,
                        "string.empty": `"name" cannot be an empty field`,
                        "string.min": `"name" should have a minimum length of {#limit}`,
                        "string.max": `"name" should have a maximum length of {#limit}`,
                    }),
                    profilePicture: Joi.string().uri().required().messages({
                        "string.base": `"profilePicture" should be a type of 'text'`,
                        "string.uri": `"profilePicture" must be a valid URI`,
                        "string.empty": `"profilePicture" cannot be an empty field`,
                    }),
                })
            )
            .sparse()
            .required()
            .min(1),
    });

    public updatePoints = Joi.object({
        points: Joi.array()
            .items(
                Joi.object({
                    username: Joi.string().alphanum().min(3).max(30).required().messages({
                        "string.base": `"username" should be a type of 'text'`,
                        "string.empty": `"username" cannot be an empty field`,
                        "string.alphanum": `"username" must only contain alpha-numeric characters`,
                        "string.min": `"username" should have a minimum length of {#limit}`,
                        "string.max": `"username" should have a maximum length of {#limit}`,
                    }),
                    point: Joi.number().integer().min(1).required().messages({
                        "number.base": `"point" should be a type of 'number'`,
                        "number.integer": `"point" must be an integer`,
                        "number.min": `"point" should have a minimum value of {#limit}`,
                        "any.required": `"point" is a required field`,
                    }),
                })
            )
            .sparse()
            .required()
            .min(1),
    });
}
