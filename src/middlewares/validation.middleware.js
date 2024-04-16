const reqKeys = ["body", "params", "query", "headers"];

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    
    let validationErrorsArr = [];

    for (const key of reqKeys) {
      const validationResult = schema[key]?.validate(req[key], {
        abortEarly: false,
      });
      if (validationResult?.error) {
        validationErrorsArr.push(...validationResult.error.details);
      }
    }

    if (validationErrorsArr.length) {
      return res.status(400).json({
        err_msg: "validation error",
        errors: validationErrorsArr.map((ele) => ele.message),
      });
    }

    next();
  };
};
