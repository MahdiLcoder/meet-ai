# Meet.AI — AI-Powered Meeting Assistant Platform

<div align="center">

![Meet.AI Logo](./public/logo.svg)

**An intelligent video conferencing platform where AI agents join your meetings, take notes, and generate summaries automatically.**

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11.x-2596BE?style=flat-square)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team/)

[Features](#features) · [Tech Stack](#tech-stack) · [Architecture](#architecture) · [Getting Started](#getting-started) · [Screenshots](#screenshots)

</div>

---

## Overview

Meet.AI is a full-stack SaaS application that lets users create custom AI agents and deploy them inside video meetings. Once a meeting ends, the platform automatically transcribes the session, processes the recording, and delivers a structured summary — all without manual effort.

Built as a production-grade project, it demonstrates end-to-end full-stack development with real-time video, type-safe APIs, authentication, and AI-driven workflows.

---

## Features

### Core Functionality
- **AI Agent Management** — Create, configure, and manage custom AI agents with tailored instructions and personalities
- **Live Video Meetings** — Start, join, and manage video calls powered by Stream Video SDK
- **Automated Transcription** — Meetings are transcribed in real time with closed captions
- **AI-Generated Summaries** — Post-meeting summaries are automatically generated from transcripts using structured markdown
- **Meeting Lifecycle Tracking** — Full status pipeline: `upcoming → active → processing → completed / cancelled`

### User Experience
- **Authentication** — Email/password, Google, and GitHub OAuth via Better Auth
- **Filterable Dashboards** — Search and filter agents and meetings by name, status, and agent
- **Responsive Design** — Fully mobile-friendly with a collapsible sidebar
- **Generated Avatars** — Unique bot and initials-based avatars for agents and users via DiceBear

### Developer Experience
- **End-to-End Type Safety** — tRPC + TypeScript across client and server
- **Optimistic UI** — React Query with server-side prefetching and hydration
- **Modular Architecture** — Feature-based folder structure for maintainability at scale

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **API Layer** | tRPC 11 (type-safe API) |
| **Database** | PostgreSQL via Neon (serverless) |
| **ORM** | Drizzle ORM |
| **Auth** | Better Auth (email, Google, GitHub) |
| **Video** | Stream Video React SDK |
| **State Management** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod |
| **Avatars** | DiceBear |
| **URL State** | nuqs |

---

## Architecture

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Sign-in / Sign-up routes
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── agents/             # Agent management
│   │   └── meetings/           # Meeting management
│   └── call/[meetingId]/       # Video call room
│
├── modules/                    # Feature-based modules
│   ├── agents/                 # Agent CRUD, filters, UI
│   ├── auth/                   # Auth views
│   ├── call/                   # Video call components & lobby
│   ├── dashboard/              # Sidebar, navbar, user button
│   ├── home/                   # Home view
│   └── meetings/               # Meeting CRUD, filters, states
│
├── components/                 # Shared UI components (shadcn/ui)
├── db/                         # Drizzle schema & DB client
├── lib/                        # Auth, Stream, utility helpers
└── trpc/                       # tRPC router, init, client/server
```

### Data Flow

```
Client (React Query) → tRPC Client → API Route → tRPC Router
                                                      ↓
                                               Drizzle ORM
                                                      ↓
                                          Neon PostgreSQL (serverless)

Video Call → Stream Video SDK → Webhook → Meeting status update
                                               ↓
                                    AI Transcription & Summary
```

---

## Database Schema

The application uses 6 main tables:

- **`user`** — Authenticated user accounts
- **`session`** / **`account`** / **`verification`** — Better Auth managed tables
- **`agents`** — AI agent definitions with instructions
- **`meetings`** — Meeting records with status, transcript URL, recording URL, and AI summary

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (e.g. [Neon](https://neon.tech))
- [Stream](https://getstream.io/) account (Video API)
- GitHub and/or Google OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meet-ai.git
cd meet-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
# Database
DATABASE_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# OAuth Providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stream Video
NEXT_STREAM_VIDEO_API_KEY=
NEXT_STREAM_VIDEO_SECRET_KEY=
```

### Database Setup

```bash
# Push schema to your database
npm run db:push

# (Optional) Open Drizzle Studio
npm run db:studio
```

### Run Locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Key Implementation Details

### AI Agent Lifecycle
Each agent is configured with a custom instruction set. When added to a meeting, the agent joins the Stream Video call, listens to the transcript, and post-meeting the transcript is processed to generate a structured markdown summary using a defined system prompt.

### Type-Safe Full-Stack API
All client-server communication goes through tRPC, eliminating the need to maintain separate API contracts. Server-side prefetching with React Query ensures instant page loads.

### Authentication Flow
Better Auth handles session management with support for email/password and social providers. Protected procedures on the tRPC layer validate sessions on every request.

### Video Infrastructure
Stream Video handles WebRTC signaling, recording (1080p), and real-time transcription. Meeting calls are created programmatically via the Stream Node SDK when a meeting is scheduled.

---

## Project Status

This project is actively developed. Planned improvements include:

- [ ] Post-meeting AI chat interface (ask questions about the meeting)
- [ ] Webhook integration to auto-update meeting status after call ends
- [ ] Subscription & billing with Stripe
- [ ] Meeting analytics dashboard

---

## License

MIT © Mehdi

---

<div align="center">
Built with Next.js, tRPC, Stream, and a lot of ☕
</div>
