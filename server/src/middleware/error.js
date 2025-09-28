// Centralized error handler (JSON API shape)
export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Unexpected error";
  
  res.status(status).json(
    { 
      error: { 
        code, message 
      } 
    }
  );
}
