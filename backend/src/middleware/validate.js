import ApiError from '../utils/ApiError.js';

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issue = result.error.issues[0];
      return next(new ApiError(400, issue ? issue.message : 'Invalid request payload.'));
    }
    req.body = result.data;
    return next();
  };
}
