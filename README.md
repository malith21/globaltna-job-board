# 🚀 GlobalTNA Job Board - Full Stack Intern Assignment

A full-stack service request board built for **GlobalTNA** internship assignment. Homeowners can post service requests, and tradespeople can browse, update status, and manage requests.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router) + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose (local with Compass) |
| **HTTP Client** | Axios |

---

## 📁 Project Structure
globaltna-job-board/
│
├── backend/
│ ├── models/
│ │ └── JobRequest.js
│ ├── routes/
│ │ └── jobRoutes.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
└── frontend/
│ ├── app/
│ │ ├── page.js (Job List)
│ │ ├── create/
│ │ │ └── page.js (Create Job)
│ │ └── jobs/
│ │ └── [id]/
│ │ └── page.js (Job Detail)
│ ├── .env.local
│ └── package.json
│
└── README.md

text

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| MongoDB Compass | Latest | [mongodb.com/compass](https://www.mongodb.com/products/compass) |

### Step 1: Clone the Repository

```bash
git clone https://github.com/malith21/globaltna-job-board.git
cd globaltna-job-board
Step 2: Environment Variables
Backend (Create backend/.env)
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/globaltna
Frontend (Create frontend/.env.local)
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Step 3: Install Dependencies & Run Backend
bash
cd backend
npm install
npm run dev
Expected Output:

text
✅ MongoDB connected successfully
🚀 Server running on port 5000
Step 4: Install Dependencies & Run Frontend (New Terminal)
bash
cd frontend
npm install
npm run dev
Expected Output:

text
▲ Next.js 16.2.6
- Local: http://localhost:3000
✓ Ready in 2.3s
Step 5: Open Your Browser
Frontend (App): http://localhost:3000

Backend API: http://localhost:5000/api/jobs

Step 6: MongoDB Compass (Optional)
Open MongoDB Compass

Connect to: mongodb://localhost:27017

Database: globaltna

Collection: jobrequests

📡 API Endpoints
Method	Endpoint	Description	Query Parameters
GET	/api/jobs	Get all job requests	?category=Frontend%20Development
?status=Open
GET	/api/jobs/:id	Get single job by ID	-
POST	/api/jobs	Create new job request	-
PATCH	/api/jobs/:id	Update job status	-
DELETE	/api/jobs/:id	Delete job request	-
API Request Examples
Create a Job (POST /api/jobs)
json
{
  "title": "Full Stack Developer Needed",
  "description": "Looking for a full stack developer for a 3-month internship",
  "category": "Full Stack Development",
  "location": "Remote",
  "contactName": "Malith Yasintha",
  "contactEmail": "malith21@gmail.com"
}
Update Status (PATCH /api/jobs/:id)
json
{
  "status": "In Progress"
}
🎯 Features Implemented
Feature	Status
List all job requests as cards/grid	✅
Filter by category	✅
Filter by status	✅
Create new job request with validation	✅
View job details	✅
Update job status (Open/In Progress/Closed)	✅
Delete job request	✅
Responsive design with Tailwind CSS	✅
Client-side form validation	✅
RESTful API with proper HTTP status codes	✅
📂 Categories Available
Category	Emoji
Frontend Development	💻
Backend Development	⚙️
Full Stack Development	🚀
UI/UX Design	🎨
QA Testing	🐛
DevOps	☁️
Data Science	📊
Mobile Development	📱
🐛 Troubleshooting
Issue: MongoDB Connection Error
text
MongoDB connection error: ECONNREFUSED 127.0.0.1:27017
Solution:

Ensure MongoDB Server is installed

Open Services (Win + R → services.msc)

Find MongoDB service

Start the service if not running

Issue: Port 5000 Already in Use
Solution: Change port in backend/.env

env
PORT=5001
Then update frontend/.env.local:

env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
Issue: Category Validation Error
Solution: Make sure to select a category from the dropdown. Categories with emojis are for display only; the actual value sent to backend is without emojis.

Issue: Cannot Find Module
Solution: Run npm install in both backend and frontend folders.

📧 Contact
Author	Malith Yasintha
GitHub	github.com/malith21
Project Repository	github.com/malith21/globaltna-job-board
Demo (Local)	http://localhost:3000
📅 Submission Information
Assignment	Full-Stack Developer Intern
Company	Global Training Network Alliances (GlobalTNA)
Submission Date	May 20, 2026
📝 License
This project was developed for educational purposes as part of the GlobalTNA internship application process.

🙏 Acknowledgments
GlobalTNA for this opportunity

Next.js, Express, and MongoDB communities

🚀 Thank you for reviewing my assignment!
