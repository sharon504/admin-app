import jwt from "jsonwebtoken";
import { Users } from "#models";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const authHandler = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new ErrorHandler(401, "Auth token not found", null));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id: decoded.id });
    if (!user) {
      return next(new ErrorHandler(401, "Invalid JWT", null));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler(401, "Unauthorized", null));
  }
});

export default authHandler;
