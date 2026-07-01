# Database Design Document

This document describes the MongoDB database design for the Enterprise AI Conversation Studio. It is documentation only and does not include implementation code, schemas, or Mongoose definitions.

## 1. Users

### Purpose
Store authenticated platform users who create, manage, review, and test conversation assets.

### Fields
- `userId`: Unique identifier for the user record.
- `name`: Display name of the user.
- `email`: Unique login identifier.
- `passwordHash`: Stored password credential.
- `role`: Access role such as admin, editor, reviewer, or viewer.
- `status`: Account state such as active, suspended, or invited.
- `preferences`: User-specific settings for the application.
- `createdAt`: Record creation timestamp.
- `updatedAt`: Record last updated timestamp.
- `lastLoginAt`: Most recent successful login timestamp.

### Relationships
- One user can own many Prompts.
- One user can create many PromptVersions.
- One user can create many TestRuns.
- One user can submit many Feedback entries.
- One user can generate many Analytics events or be associated with analytics summaries.

### Indexes
- Unique index on `email`.
- Index on `role` for access filtering.
- Index on `status` for account lifecycle queries.
- Index on `createdAt` for administrative sorting and reporting.

### Validation Rules
- `email` must be required, normalized, and unique.
- `passwordHash` must never be stored as plain text.
- `role` must be constrained to approved values.
- `status` must be constrained to approved values.
- `name` must be required and non-empty.
- Timestamps must be system-managed.

### Future Scalability Considerations
- Partition user-related reporting by tenant or organization if multi-tenancy is introduced.
- Keep profile preferences separate from frequently queried identity fields if growth demands it.
- Consider audit history for sensitive account actions.

## 2. Prompts

### Purpose
Store reusable prompt definitions that can be versioned, tested, and tracked across the platform.

### Fields
- `promptId`: Unique identifier for the prompt record.
- `ownerId`: Reference to the owning user.
- `title`: Human-readable prompt name.
- `description`: Optional prompt summary.
- `content`: Prompt text or structured prompt body.
- `tags`: Categorization labels.
- `status`: Lifecycle state such as draft, active, archived, or deprecated.
- `currentVersionId`: Reference to the latest published PromptVersions record.
- `createdAt`: Record creation timestamp.
- `updatedAt`: Record last updated timestamp.
- `lastUsedAt`: Most recent usage timestamp.

### Relationships
- Each Prompt belongs to one User.
- Each Prompt can have many PromptVersions.
- Each Prompt can be used in many TestRuns.
- Each Prompt can receive many Feedback entries.

### Indexes
- Index on `ownerId`.
- Index on `status`.
- Text or searchable index on `title`, `description`, and `content` depending on search requirements.
- Index on `tags` for filtering.
- Index on `updatedAt` for recency-based lists.

### Validation Rules
- `title` must be required and trimmed.
- `content` must be required.
- `ownerId` must reference a valid user.
- `status` must be limited to approved prompt lifecycle states.
- `tags` must be an array of short, sanitized strings.
- `currentVersionId` must reference an existing PromptVersions document when present.

### Future Scalability Considerations
- Store large prompt bodies efficiently to avoid oversized documents.
- Split highly active prompts from historical version data to keep reads fast.
- Prepare for tenant scoping if the platform expands beyond a single workspace.

## 3. PromptVersions

### Purpose
Store immutable prompt snapshots for version history, rollback, comparison, and auditability.

### Fields
- `promptVersionId`: Unique identifier for the version record.
- `promptId`: Reference to the parent prompt.
- `versionNumber`: Sequential version number.
- `content`: Snapshot of the prompt content.
- `changeNotes`: Human-readable summary of what changed.
- `createdBy`: Reference to the user who created the version.
- `createdAt`: Version creation timestamp.
- `isPublished`: Indicates whether this version is the active published version.
- `source`: Origin of the version such as manual edit or restore action.

### Relationships
- Each PromptVersion belongs to one Prompt.
- Each PromptVersion is created by one User.
- One Prompt can have many PromptVersions.

### Indexes
- Compound index on `promptId` and `versionNumber`.
- Index on `createdBy`.
- Index on `createdAt`.
- Index on `isPublished` for current-version lookups.

### Validation Rules
- `promptId` must reference an existing prompt.
- `versionNumber` must be required and unique within a prompt.
- `content` must be required.
- Version records should be immutable after creation.
- `isPublished` should be controlled by workflow rules.

### Future Scalability Considerations
- Keep versions append-only to simplify audit and restore flows.
- Consider archival strategies for old versions if prompt history grows significantly.
- If version comparisons become frequent, precompute diff metadata.

## 4. KnowledgeSources

### Purpose
Store external or internal knowledge repositories used to enrich prompts and model responses.

### Fields
- `knowledgeSourceId`: Unique identifier for the source.
- `ownerId`: Reference to the owning user or workspace owner.
- `name`: Source name.
- `type`: Source type such as file, URL, document repository, database, or API feed.
- `location`: Source path, URL, or connection reference.
- `status`: Lifecycle state such as active, syncing, failed, or disabled.
- `syncPolicy`: Rules for synchronization frequency or trigger mode.
- `lastSyncAt`: Most recent sync timestamp.
- `createdAt`: Record creation timestamp.
- `updatedAt`: Record last updated timestamp.

### Relationships
- Each KnowledgeSource belongs to one owner context.
- Each KnowledgeSource can contribute data to many TestRuns.
- Each KnowledgeSource can be referenced in analytics summaries about usage or sync activity.

### Indexes
- Index on `ownerId`.
- Index on `type`.
- Index on `status`.
- Index on `lastSyncAt`.
- Unique or scoped unique index on `name` if names must not repeat within an owner context.

### Validation Rules
- `name`, `type`, and `location` must be required.
- `status` and `syncPolicy` must be limited to approved values.
- `location` must be validated according to the source type.
- `lastSyncAt` must only be set by sync workflows.

### Future Scalability Considerations
- Normalize high-volume sync metadata into separate operational collections if source counts grow large.
- Track source health separately if sync telemetry becomes noisy.
- Support tenant-level isolation if multiple teams share the platform.

## 5. TestRuns

### Purpose
Store execution records for playground sessions, evaluation runs, and prompt test scenarios.

### Fields
- `testRunId`: Unique identifier for the run.
- `promptId`: Reference to the tested prompt.
- `promptVersionId`: Reference to the exact prompt version used.
- `knowledgeSourceIds`: References to any knowledge sources used during the run.
- `initiatedBy`: Reference to the user who started the run.
- `mode`: Run type such as playground, evaluation, or regression.
- `input`: Input payload or message set used during the test.
- `output`: Captured model output.
- `metrics`: Measured results such as latency, token usage, or pass rate.
- `status`: Run state such as queued, running, completed, failed, or canceled.
- `startedAt`: Run start timestamp.
- `completedAt`: Run completion timestamp.
- `createdAt`: Record creation timestamp.

### Relationships
- Each TestRun belongs to one Prompt.
- Each TestRun may belong to one PromptVersion.
- Each TestRun may reference multiple KnowledgeSources.
- Each TestRun belongs to one User who initiated it.
- Each TestRun can be associated with one or more Feedback entries.

### Indexes
- Index on `promptId`.
- Index on `promptVersionId`.
- Index on `initiatedBy`.
- Index on `mode`.
- Index on `status`.
- Index on `startedAt` and `completedAt` for time-based reporting.

### Validation Rules
- `promptId` and `initiatedBy` must reference valid records.
- `mode` and `status` must be restricted to known values.
- `input` and `output` should be constrained to reasonable sizes.
- `completedAt` must not precede `startedAt`.
- `metrics` should only include approved numeric or bounded summary values.

### Future Scalability Considerations
- Test run data can grow quickly, so retention or archival policies may be required.
- Consider separating operational run state from analytical summaries if write volume becomes high.
- If workloads increase, optimize for time-range queries and workspace-level partitioning.

## 6. Feedback

### Purpose
Store user feedback on prompts, responses, test runs, and evaluation outcomes.

### Fields
- `feedbackId`: Unique identifier for the feedback record.
- `userId`: Reference to the submitting user.
- `targetType`: Feedback target such as prompt, response, test run, or evaluation.
- `targetId`: Identifier of the item being reviewed.
- `rating`: Numeric or categorical score.
- `comment`: Free-form feedback text.
- `status`: Review workflow state such as new, reviewed, resolved, or dismissed.
- `createdAt`: Feedback creation timestamp.
- `updatedAt`: Feedback last updated timestamp.
- `reviewedBy`: Reference to the reviewer when applicable.

### Relationships
- Each Feedback entry belongs to one User.
- Each Feedback entry targets one Prompt, TestRun, Evaluation result, or other supported item type.
- Each Feedback entry may be reviewed by one User.

### Indexes
- Index on `userId`.
- Compound index on `targetType` and `targetId`.
- Index on `status`.
- Index on `createdAt`.
- Index on `reviewedBy`.

### Validation Rules
- `userId`, `targetType`, and `targetId` must be required.
- `rating` must follow approved bounds or categories.
- `status` must be constrained to review workflow values.
- `comment` length should be bounded to prevent oversized documents.
- `targetType` must match supported entity types only.

### Future Scalability Considerations
- Feedback volume may increase quickly, so consider aggregation tables or summary collections later.
- Keep target references flexible enough to support additional entity types.
- If moderation workflows expand, separate review metadata from the original feedback payload.

## 7. Analytics

### Purpose
Store analytics snapshots, summaries, or event-derived metrics used for platform reporting.

### Fields
- `analyticsId`: Unique identifier for the analytics record.
- `scope`: Reporting scope such as user, workspace, prompt, test run, or global.
- `scopeId`: Identifier for the scoped entity when applicable.
- `metricType`: Type of metric being stored.
- `value`: Stored metric value or summary payload.
- `periodStart`: Start of the reporting period.
- `periodEnd`: End of the reporting period.
- `generatedAt`: Time the analytics record was produced.
- `createdAt`: Record creation timestamp.
- `updatedAt`: Record last updated timestamp.

### Relationships
- Analytics records may be associated with Users, Prompts, TestRuns, or Feedback depending on scope.
- Analytics can summarize activity across multiple collections rather than acting as a source of truth.

### Indexes
- Compound index on `scope` and `scopeId`.
- Index on `metricType`.
- Index on `generatedAt`.
- Compound index on `periodStart` and `periodEnd` for reporting windows.

### Validation Rules
- `scope` and `metricType` must be restricted to approved values.
- `periodStart` must be less than or equal to `periodEnd`.
- `value` should be bounded and structured consistently for the selected metric type.
- Analytics records should be treated as derived data.

### Future Scalability Considerations
- Analytics is likely to become read-heavy, so pre-aggregation and summary rollups may be necessary.
- High-volume event data should be stored separately from aggregated analytics if telemetry grows.
- Consider partitioning by reporting period or workspace for efficient retrieval.
