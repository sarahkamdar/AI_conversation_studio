# Server

Backend scaffold for an Express.js application with MongoDB.

## Structure

- `src/app.js`
- `src/server.js`
- `src/database/connect.js`
- `src/controllers/healthController.js`
- `src/routes/healthRoutes.js`
- `src/middlewares/errorMiddleware.js`

## Health Check

`GET /api/health`

Response:

```json
{
  "success": true,
  "message": "Server is running"
}
```
