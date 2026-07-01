# API Contract

This document defines the REST API surface for an Enterprise AI Conversation Studio. It describes endpoint behavior only and does not include implementation details.

## 1. Health

### GET /api/health

| Field | Details |
|---|---|
| Purpose | Verify that the API is running and reachable. |
| Request Body | None. |
| Success Response | `200 OK` with `{ "success": true, "message": "Server is running" }`. |
| Error Response | `500 Internal Server Error` with `{ "success": false, "message": "Internal Server Error" }`. |

## 2. Authentication

### POST /api/auth/login

| Field | Details |
|---|---|
| Purpose | Authenticate a user and return access credentials. |
| Request Body | `email`, `password`. |
| Success Response | `200 OK` with authenticated user details and tokens. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for invalid credentials, `500 Internal Server Error` for unexpected failures. |

### POST /api/auth/logout

| Field | Details |
|---|---|
| Purpose | Invalidate the current user session or refresh token. |
| Request Body | Token information when required by the client session model. |
| Success Response | `200 OK` with a logout confirmation message. |
| Error Response | `401 Unauthorized` for missing or invalid credentials, `500 Internal Server Error` for unexpected failures. |

### POST /api/auth/refresh

| Field | Details |
|---|---|
| Purpose | Exchange a valid refresh token for a new access token. |
| Request Body | `refreshToken`. |
| Success Response | `200 OK` with a new access token and related session data. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for expired or invalid refresh tokens, `500 Internal Server Error` for unexpected failures. |

### POST /api/auth/forgot-password

| Field | Details |
|---|---|
| Purpose | Initiate a password reset flow for a user account. |
| Request Body | `email`. |
| Success Response | `200 OK` with a reset initiation message. |
| Error Response | `400 Bad Request` for invalid input, `404 Not Found` if the account cannot be matched, `500 Internal Server Error` for unexpected failures. |

### POST /api/auth/reset-password

| Field | Details |
|---|---|
| Purpose | Complete a password reset using a valid reset token. |
| Request Body | `resetToken`, `newPassword`. |
| Success Response | `200 OK` with a password reset confirmation message. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for invalid or expired reset tokens, `500 Internal Server Error` for unexpected failures. |

### GET /api/auth/me

| Field | Details |
|---|---|
| Purpose | Return the currently authenticated user profile. |
| Request Body | None. |
| Success Response | `200 OK` with the current user profile. |
| Error Response | `401 Unauthorized` for missing or invalid credentials, `500 Internal Server Error` for unexpected failures. |

## 3. Prompt Management

### GET /api/prompts

| Field | Details |
|---|---|
| Purpose | List prompts available to the authenticated user or workspace. |
| Request Body | None. |
| Success Response | `200 OK` with a list of prompts. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### POST /api/prompts

| Field | Details |
|---|---|
| Purpose | Create a new prompt. |
| Request Body | Prompt metadata such as `name`, `description`, `content`, and `tags`. |
| Success Response | `201 Created` with the created prompt. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/prompts/:promptId

| Field | Details |
|---|---|
| Purpose | Retrieve a single prompt by identifier. |
| Request Body | None. |
| Success Response | `200 OK` with the requested prompt. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the prompt does not exist, `500 Internal Server Error` for unexpected failures. |

### PATCH /api/prompts/:promptId

| Field | Details |
|---|---|
| Purpose | Update prompt metadata or content. |
| Request Body | Fields to update such as `name`, `description`, `content`, or `tags`. |
| Success Response | `200 OK` with the updated prompt. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the prompt does not exist, `500 Internal Server Error` for unexpected failures. |

### DELETE /api/prompts/:promptId

| Field | Details |
|---|---|
| Purpose | Remove a prompt from the system. |
| Request Body | None. |
| Success Response | `200 OK` with a deletion confirmation message. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the prompt does not exist, `500 Internal Server Error` for unexpected failures. |

## 4. Prompt Versioning

### GET /api/prompts/:promptId/versions

| Field | Details |
|---|---|
| Purpose | List all versions for a specific prompt. |
| Request Body | None. |
| Success Response | `200 OK` with a list of versions. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the prompt does not exist, `500 Internal Server Error` for unexpected failures. |

### POST /api/prompts/:promptId/versions

| Field | Details |
|---|---|
| Purpose | Create a new version snapshot for a prompt. |
| Request Body | Version content and optional version notes. |
| Success Response | `201 Created` with the created version record. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the prompt does not exist, `500 Internal Server Error` for unexpected failures. |

### GET /api/prompts/:promptId/versions/:versionId

| Field | Details |
|---|---|
| Purpose | Retrieve a specific prompt version. |
| Request Body | None. |
| Success Response | `200 OK` with the requested version. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the prompt or version does not exist, `500 Internal Server Error` for unexpected failures. |

### POST /api/prompts/:promptId/versions/:versionId/restore

| Field | Details |
|---|---|
| Purpose | Restore a prompt to a selected version. |
| Request Body | None or optional restore note depending on workflow. |
| Success Response | `200 OK` with the restored prompt state. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the prompt or version does not exist, `500 Internal Server Error` for unexpected failures. |

## 5. Knowledge Sources

### GET /api/knowledge-sources

| Field | Details |
|---|---|
| Purpose | List knowledge sources available to the workspace or tenant. |
| Request Body | None. |
| Success Response | `200 OK` with a list of knowledge sources. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### POST /api/knowledge-sources

| Field | Details |
|---|---|
| Purpose | Register a new knowledge source. |
| Request Body | Source metadata such as `name`, `type`, `location`, and `syncPolicy`. |
| Success Response | `201 Created` with the created knowledge source. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/knowledge-sources/:sourceId

| Field | Details |
|---|---|
| Purpose | Retrieve a specific knowledge source. |
| Request Body | None. |
| Success Response | `200 OK` with the requested knowledge source. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the source does not exist, `500 Internal Server Error` for unexpected failures. |

### PATCH /api/knowledge-sources/:sourceId

| Field | Details |
|---|---|
| Purpose | Update knowledge source settings or metadata. |
| Request Body | Fields to update such as `name`, `location`, `syncPolicy`, or `status`. |
| Success Response | `200 OK` with the updated knowledge source. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the source does not exist, `500 Internal Server Error` for unexpected failures. |

### DELETE /api/knowledge-sources/:sourceId

| Field | Details |
|---|---|
| Purpose | Remove a knowledge source from the system. |
| Request Body | None. |
| Success Response | `200 OK` with a deletion confirmation message. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the source does not exist, `500 Internal Server Error` for unexpected failures. |

### POST /api/knowledge-sources/:sourceId/sync

| Field | Details |
|---|---|
| Purpose | Trigger synchronization for a knowledge source. |
| Request Body | Optional sync options when required by the workflow. |
| Success Response | `202 Accepted` with a sync initiation confirmation. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the source does not exist, `500 Internal Server Error` for unexpected failures. |

## 6. Playground

### POST /api/playground/sessions

| Field | Details |
|---|---|
| Purpose | Create a new playground session for interactive prompt testing. |
| Request Body | Session context such as `promptId`, `model`, and optional runtime settings. |
| Success Response | `201 Created` with the created playground session. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/playground/sessions/:sessionId

| Field | Details |
|---|---|
| Purpose | Retrieve a playground session and its conversation state. |
| Request Body | None. |
| Success Response | `200 OK` with the requested session. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the session does not exist, `500 Internal Server Error` for unexpected failures. |

### POST /api/playground/sessions/:sessionId/messages

| Field | Details |
|---|---|
| Purpose | Send a message into a playground session for live testing. |
| Request Body | User message and optional runtime parameters. |
| Success Response | `200 OK` with the model response and updated session state. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the session does not exist, `500 Internal Server Error` for unexpected failures. |

### DELETE /api/playground/sessions/:sessionId

| Field | Details |
|---|---|
| Purpose | End and remove a playground session. |
| Request Body | None. |
| Success Response | `200 OK` with a session termination confirmation. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the session does not exist, `500 Internal Server Error` for unexpected failures. |

## 7. AI Evaluation

### POST /api/evaluations

| Field | Details |
|---|---|
| Purpose | Create an evaluation job for prompts, models, or conversation outputs. |
| Request Body | Evaluation configuration such as `name`, `datasetId`, `promptId`, and `criteria`. |
| Success Response | `201 Created` with the created evaluation. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/evaluations

| Field | Details |
|---|---|
| Purpose | List evaluation jobs available to the user or workspace. |
| Request Body | None. |
| Success Response | `200 OK` with a list of evaluations. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/evaluations/:evaluationId

| Field | Details |
|---|---|
| Purpose | Retrieve a single evaluation job and its state. |
| Request Body | None. |
| Success Response | `200 OK` with the requested evaluation. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the evaluation does not exist, `500 Internal Server Error` for unexpected failures. |

### POST /api/evaluations/:evaluationId/run

| Field | Details |
|---|---|
| Purpose | Execute an evaluation job. |
| Request Body | Optional execution parameters when required by the workflow. |
| Success Response | `202 Accepted` with an evaluation run confirmation. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the evaluation does not exist, `500 Internal Server Error` for unexpected failures. |

### GET /api/evaluations/:evaluationId/results

| Field | Details |
|---|---|
| Purpose | Retrieve the results of a completed or in-progress evaluation. |
| Request Body | None. |
| Success Response | `200 OK` with evaluation results and summary metrics. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the evaluation does not exist, `500 Internal Server Error` for unexpected failures. |

## 8. Analytics

### GET /api/analytics/overview

| Field | Details |
|---|---|
| Purpose | Return a high-level usage summary for the platform. |
| Request Body | None. |
| Success Response | `200 OK` with summary analytics. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/analytics/prompts

| Field | Details |
|---|---|
| Purpose | Return prompt-related analytics such as usage and adoption. |
| Request Body | None. |
| Success Response | `200 OK` with prompt analytics. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/analytics/playground

| Field | Details |
|---|---|
| Purpose | Return analytics for playground usage and interactions. |
| Request Body | None. |
| Success Response | `200 OK` with playground analytics. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/analytics/feedback

| Field | Details |
|---|---|
| Purpose | Return feedback analytics and sentiment summaries. |
| Request Body | None. |
| Success Response | `200 OK` with feedback analytics. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

## 9. Feedback

### POST /api/feedback

| Field | Details |
|---|---|
| Purpose | Capture feedback on prompts, responses, or evaluation results. |
| Request Body | Feedback details such as `targetType`, `targetId`, `rating`, and `comment`. |
| Success Response | `201 Created` with the recorded feedback entry. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/feedback

| Field | Details |
|---|---|
| Purpose | List feedback entries available to the workspace or tenant. |
| Request Body | None. |
| Success Response | `200 OK` with a list of feedback entries. |
| Error Response | `401 Unauthorized` for missing access, `500 Internal Server Error` for unexpected failures. |

### GET /api/feedback/:feedbackId

| Field | Details |
|---|---|
| Purpose | Retrieve a single feedback entry. |
| Request Body | None. |
| Success Response | `200 OK` with the requested feedback entry. |
| Error Response | `401 Unauthorized` for missing access, `404 Not Found` if the feedback entry does not exist, `500 Internal Server Error` for unexpected failures. |

### PATCH /api/feedback/:feedbackId/status

| Field | Details |
|---|---|
| Purpose | Update the processing or review status of a feedback entry. |
| Request Body | Status update fields such as `status` and optional review notes. |
| Success Response | `200 OK` with the updated feedback entry. |
| Error Response | `400 Bad Request` for invalid input, `401 Unauthorized` for missing access, `404 Not Found` if the feedback entry does not exist, `500 Internal Server Error` for unexpected failures. |
