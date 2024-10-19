import ErrorHandler, {
  asyncErrorHandler,
  errorHandler,
} from "./error-handler.js";

const middlewares = {
  asyncErrorHandler,
  errorHandler,
  ErrorHandler,
};

export default middlewares;
