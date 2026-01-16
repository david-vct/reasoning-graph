# Story 1.2: Database Setup & Connection

**Epic:** [Epic 1: Foundation & Core Graph Infrastructure](../epics/epic-1-foundation.md)  
**Status:** Done  
**Agent Model Used:** Claude Sonnet 4.5

## Story

**As a** developer,  
**I want** a configured and operational MongoDB Atlas connection with Mongoose ODM,  
**so that** I can persist and retrieve user data and reasoning graphs in upcoming stories.

## Acceptance Criteria

1. MongoDB Atlas M0 free tier cluster is provisioned in AWS US-East-1 region
2. Mongoose 8.1+ is installed and configured with TypeScript support
3. Environment variables (MONGODB_URI, database name) are documented in `.env.example` and `.env.local`
4. A minimal Mongoose schema for `User` model is created with required fields: email (unique), name, passwordHash, createdAt, graphQuota, preferences
5. A connection utility at `apps/web/lib/mongodb.ts` handles singleton connection with proper pooling
6. An API route `GET /api/health` returns MongoDB connection status including: connected (boolean), database name, latency
7. Connection pooling is configured with appropriate limits (maxPoolSize: 10)
8. Connection errors are logged with context and retried appropriately
9. TypeScript types are defined for User model and exported from appropriate location

## Tasks / Subtasks

- [x] Task 1: Provision MongoDB Atlas Cluster (AC: 1)
  - [x] Create MongoDB Atlas account (if not exists)
  - [x] Provision M0 free tier cluster in AWS US-East-1
  - [x] Configure database name as `reasoning-graph`
  - [x] Create database user with read/write permissions
  - [x] Whitelist IP addresses (0.0.0.0/0 for dev, restrict in production)
  - [x] Copy connection string in format `mongodb+srv://...`

- [x] Task 2: Install and Configure Mongoose (AC: 2, 3)
  - [x] Install dependencies: `mongoose@^8.1.0`, `@types/mongoose`
  - [x] Add MONGODB_URI to `.env.example` with example format
  - [x] Add MONGODB_URI to `.env.local` with actual connection string
  - [x] Verify `.env.local` is in `.gitignore`

- [x] Task 3: Create MongoDB Connection Utility (AC: 5, 6, 7)
  - [x] Create `apps/web/lib/mongodb.ts` with singleton connection pattern
  - [x] Implement connection caching to prevent multiple connections in serverless
  - [x] Configure Mongoose options: `maxPoolSize: 10`, `serverSelectionTimeoutMS: 5000`
  - [x] Add error handling with logging for connection failures
  - [x] Export `connectDB()` function for use in API routes

- [x] Task 4: Create User Mongoose Schema (AC: 4, 9)
  - [x] Create `apps/web/models/User.ts` with Mongoose schema
  - [x] Define User schema fields per architecture specification
  - [x] Add unique index on email field
  - [x] Create and export Mongoose model
  - [x] Create TypeScript interface matching schema
  - [x] Export User type from `packages/types/src/index.ts` for reusability

- [x] Task 5: Create Health Check API Route (AC: 5, 8)
  - [x] Create `apps/web/app/api/health/route.ts`
  - [x] Implement GET handler checking MongoDB connection status
  - [x] Return JSON with connection status, database name, response time
  - [x] Add error handling for connection failures
  - [x] Test endpoint returns correct status when DB is connected/disconnected

- [x] Task 6: Testing and Validation (AC: All)
  - [x] Test MongoDB connection from local dev environment
  - [x] Verify User model can create documents
  - [x] Test `/api/health` endpoint returns 200 with correct status
  - [x] Test connection pooling under load (multiple requests)
  - [x] Verify error logging when connection fails
  - [x] Run TypeScript type-check to ensure no errors

## Dev Notes

### MongoDB Atlas Configuration

[Source: docs/architecture.md#mongodb-atlas-configuration]

**Cluster Specification:**

- **Tier:** M0 Free Tier (512MB storage)
- **Cloud Provider:** AWS
- **Region:** US-East-1 (minimize latency with Vercel functions)
- **Database Name:** `reasoning-graph`
- **Estimated Storage:** ~60 MB for MVP (452 MB margin available)

**Setup Steps:**

1. Navigate to cloud.mongodb.com
2. Create new Project: "Reasoning Graph"
3. Build Database → Shared (M0 Free)
4. Select AWS / us-east-1
5. Create cluster (takes 3-5 minutes)
6. Database Access: Add new database user (username/password)
7. Network Access: Add IP Address (0.0.0.0/0 for development)
8. Get connection string from "Connect" button

### Mongoose Connection Utility

[Source: docs/architecture.md#database]

Create singleton connection at `apps/web/lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache connection in global to prevent multiple connections in serverless
declare global {
  var mongooseCache: ConnectionCache | undefined;
}

let cached: ConnectionCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Establishes MongoDB connection with connection pooling
 * Uses singleton pattern for serverless optimization
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  console.log('✅ MongoDB connected successfully');
  return cached.conn;
}
```

**Connection Pooling Configuration:**

- `maxPoolSize: 10` - Maximum concurrent connections (suitable for M0 tier)
- `serverSelectionTimeoutMS: 5000` - Timeout for server selection (5 seconds)
- `socketTimeoutMS: 45000` - Socket timeout (45 seconds, important for serverless)

### User Mongoose Schema

[Source: docs/architecture.md#user-schema-mongoose]

Create `apps/web/models/User.ts`:

```typescript
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  graphQuota: number;
  preferences: {
    theme: 'light' | 'dark';
    connectionMode: 'drag-drop' | 'click-click';
  };
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false, // Exclude from queries by default for security
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  graphQuota: {
    type: Number,
    default: 50,
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    connectionMode: {
      type: String,
      enum: ['drag-drop', 'click-click'],
      default: 'drag-drop',
    },
  },
});

// Create unique index on email
UserSchema.index({ email: 1 }, { unique: true });

// Export Mongoose model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

**TypeScript Type Export** in `packages/types/src/index.ts`:

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  graphQuota: number;
  preferences: {
    theme: 'light' | 'dark';
    connectionMode: 'drag-drop' | 'click-click';
  };
}
```

### Health Check API Route

[Source: docs/architecture.md#api-specification]

Create `apps/web/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const startTime = Date.now();
    await connectDB();
    const latency = Date.now() - startTime;

    const isConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({
      status: 'ok',
      database: {
        connected: isConnected,
        name: mongoose.connection.name,
        latency: `${latency}ms`,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
```

### Environment Variables

**`.env.example`** (commit to repository):

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reasoning-graph?retryWrites=true&w=majority

# Node Environment
NODE_ENV=development
```

**`.env.local`** (gitignored, create locally):

```bash
MONGODB_URI=mongodb+srv://[actual-credentials]@cluster.mongodb.net/reasoning-graph?retryWrites=true&w=majority
NODE_ENV=development
```

### Project Structure

```
apps/web/
├── app/
│   └── api/
│       └── health/
│           └── route.ts          # Health check endpoint
├── lib/
│   └── mongodb.ts                # MongoDB connection utility
├── models/
│   └── User.ts                   # User Mongoose model
└── .env.local                    # Local environment variables (gitignored)

packages/types/src/
└── index.ts                      # Exported User TypeScript type
```

### Testing

**Testing Approach:** Manual verification + API testing

1. **MongoDB Connection Test:**
   - Start dev server: `npm run dev`
   - Check console for "✅ MongoDB connected successfully"
   - Verify no connection errors in logs

2. **User Model Test:**
   - Use MongoDB Compass or Atlas UI to verify database and collection created
   - Optionally create test user document to verify schema works

3. **Health Check Test:**
   - Visit http://localhost:3000/api/health
   - Verify response includes `connected: true`, database name, latency
   - Test with incorrect MONGODB_URI to verify error handling

4. **TypeScript Validation:**
   - Run `npm run type-check` to ensure no TypeScript errors
   - Verify User types are properly exported and importable

**No unit tests required** for this infrastructure setup story - focus on integration verification.

## Dev Agent Record

### Debug Log References

- None

### Completion Notes

- ✅ MongoDB Atlas cluster provisioned by user in AWS US-East-1 region
- ✅ Database name configured as `reasoning-graph`
- ✅ Mongoose 8.8.4 installed with TypeScript support
- ✅ Connection utility created at `apps/web/lib/mongodb.ts` with singleton pattern
- ✅ Connection pooling configured: maxPoolSize=10, timeouts properly set
- ✅ User Mongoose model created at `apps/web/models/User.ts` with all required fields
- ✅ Unique index on email field implemented
- ✅ User TypeScript interface exported from `packages/types/src/index.ts`
- ✅ Health check API route created at `apps/web/app/api/health/route.ts`
- ✅ Health check tested successfully: connected=true, db=reasoning-graph, latency=445ms
- ✅ User model tested: document creation and retrieval working correctly
- ✅ TypeScript compilation passes without errors
- ✅ Environment variables configured in both `.env.example` and `.env.local`

### File List

**Created:**

- `apps/web/.env.example` - Environment variables template
- `apps/web/.env.local` - Local environment configuration (gitignored)
- `apps/web/lib/mongodb.ts` - MongoDB connection utility with singleton pattern
- `apps/web/models/User.ts` - User Mongoose schema and model
- `apps/web/app/api/health/route.ts` - Health check API endpoint

**Modified:**

- `apps/web/package.json` - Added mongoose@^8.1.0 and @types/mongoose
- `packages/types/src/index.ts` - Added User interface export

### Change Log

- 2026-01-16: Installed Mongoose 8.8.4 with TypeScript types
- 2026-01-16: Created MongoDB connection utility with connection pooling
- 2026-01-16: Created User Mongoose schema with all required fields
- 2026-01-16: Created health check API endpoint
- 2026-01-16: Validated database connectivity and model functionality
- 2026-01-16: All TypeScript compilation checks passed

## Definition of Done

- [x] MongoDB Atlas M0 cluster operational in AWS US-East-1
- [x] Mongoose 8.1+ installed with TypeScript types
- [x] `.env.example` and `.env.local` configured with MONGODB_URI
- [x] User Mongoose schema created with all required fields and unique email index
- [x] Connection utility at `apps/web/lib/mongodb.ts` with singleton pattern and pooling
- [x] API route `/api/health` returns correct connection status and metadata
- [x] Connection pooling configured with maxPoolSize: 10
- [x] Connection error logging implemented
- [x] TypeScript User type exported from packages/types
- [x] All TypeScript compilation passes without errors
- [x] Manual testing confirms database connectivity

## Estimated Effort

**2 points** (4-6 hours)

## Dependencies

- Story 1.1 (Setup Project & Monorepo Structure) - **REQUIRED**

## Change Log

| Date       | Version | Description                                  | Author |
| ---------- | ------- | -------------------------------------------- | ------ |
| 2026-01-16 | 1.1     | Enriched with full context from architecture | Bob SM |
| 2026-01-16 | 1.0     | Initial story creation                       | Bob SM |
