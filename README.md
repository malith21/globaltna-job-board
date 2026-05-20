# GlobalTNA Job Board

> A full-stack service request board built for the **GlobalTNA** internship assignment. Homeowners can post service requests, and tradespeople can browse, update status, and manage requests.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose (local with Compass) |
| HTTP Client | Axios |

---

## Project Structure

```
globaltna-job-board/
│
├── backend/
│   ├── models/
│   │   └── JobRequest.js
│   ├── routes/
│   │   └── jobRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js               # Job List
│   │   ├── create/
│   │   │   └── page.js           # Create Job
│   │   └── jobs/
│   │       └── [id]/
│   │           └── page.js       # Job Detail
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Ensure the following are installed before getting started:

| Software | Version | Link |
|----------|---------|------|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| MongoDB Compass | Latest | [mongodb.com/compass](https://www.mongodb.com/products/compass) |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/malith21/globaltna-job-board.git
cd globaltna-job-board
```

### 2. Configure Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/globaltna
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Expected output:

```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### 4. Run the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Expected output:

```
▲ Next.js 14
- Local: http://localhost:3000
✓ Ready in 2.3s
```

### 5. Open in Browser

- **App:** http://localhost:3000  
- **API:** http://localhost:5000/api/jobs

### 6. MongoDB Compass (Optional)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `globaltna`
4. Collection: `jobrequests`

---

## API Reference

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/jobs` | Get all job requests | `?category=`, `?status=` |
| GET | `/api/jobs/:id` | Get single job by ID | — |
| POST | `/api/jobs` | Create new job request | — |
| PATCH | `/api/jobs/:id` | Update job status | — |
| DELETE | `/api/jobs/:id` | Delete job request | — |

### Create a Job — `POST /api/jobs`

```json
{
  "title": "Full Stack Developer Needed",
  "description": "Looking for a full stack developer for a 3-month internship",
  "category": "Full Stack Development",
  "location": "Remote",
  "contactName": "Malith Yasintha",
  "contactEmail": "malith21@gmail.com"
}
```

### Update Status — `PATCH /api/jobs/:id`

```json
{
  "status": "In Progress"
}
```

---

## Features

| Feature | Status |
|---------|--------|
| List all job requests as cards/grid | ✅ |
| Filter by category | ✅ |
| Filter by status | ✅ |
| Create new job request with validation | ✅ |
| View job details | ✅ |
| Update job status (Open / In Progress / Closed) | ✅ |
| Delete job request | ✅ |
| Responsive design with Tailwind CSS | ✅ |
| Client-side form validation | ✅ |
| RESTful API with proper HTTP status codes | ✅ |

---

## Available Categories

- Frontend Development
- Backend Development
- Full Stack Development
- UI/UX Design
- QA Testing
- DevOps
- Data Science
- Mobile Development

---

## Troubleshooting

**MongoDB connection refused**

```
MongoDB connection error: ECONNREFUSED 127.0.0.1:27017
```

Open `services.msc` (Win + R), find the MongoDB service, and start it if it's not running.

---

**Port 5000 already in use**

Update `backend/.env`:

```env
PORT=5001
```

Then update `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

**Category validation error**

Select a category from the dropdown. The value sent to the backend does not include emojis — emojis are display-only.

---

**Cannot find module**

Run `npm install` in both the `backend` and `frontend` directories.

---

## Submission Details

| Field | Info |
|-------|------|
| Assignment | Full-Stack Developer Intern |
| Company | Global Training Network Alliances (GlobalTNA) |
| Author | Malith Yasintha |
| GitHub | [github.com/malith21](https://github.com/malith21) |
| Repository | [github.com/malith21/globaltna-job-board](https://github.com/malith21/globaltna-job-board) |
| Submission Date | May 20, 2026 |

---

*Developed for educational purposes as part of the GlobalTNA internship application process.*
