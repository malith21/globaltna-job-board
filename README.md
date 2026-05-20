🚀 GlobalTNA Job Board - Full Stack Intern Assignment
A full-stack service request board built for GlobalTNA internship assignment

Homeowners can post service requests, and tradespeople can browse, update status, and manage requests.


📊 Tech Stack
Layer	Technology
Frontend	Next.js 14 (App Router) + Tailwind CSS
Backend	Node.js + Express.js
Database	MongoDB + Mongoose (local with Compass)
HTTP Client	Axios

📂 Project Structure

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
│   │   ├── page.js (Job List)
│   │   ├── create/
│   │   │   └── page.js (Create Job)
│   │   └── jobs/
│   │       └── [id]/
│   │           └── page.js (Job Detail)
│   ├── .env.local
│   └── package.json
│
└── README.md



🚀 Setup Instructions
Prerequisites
Before you begin, ensure you have the following installed:

✅ Node.js v18 or higher

✅ MongoDB Compass (with local MongoDB Server running)


Step 1: Clone the Repository
git clone https://github.com/malith21/globaltna-job-board.git
cd globaltna-job-board

Step 2: Environment Variables
🔧 Backend (Create backend/.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/globaltna

🎨 Frontend (Create frontend/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Step 3: Install & Run Backend
cd backend
npm install
npm run dev

Step 4: Install & Run Frontend (Open New Terminal)
cd frontend
npm install
npm run dev

Step 5: Open Your Browser
Application	URL
Frontend (App)	http://localhost:3000
Backend (API)	http://localhost:5000/api/jobs

Step 6: MongoDB Compass (Optional)
1.Open MongoDB Compass
2.Connect to: mongodb://localhost:27017
3.Database: globaltna
4.Collection: jobrequests


📡 API Endpoints
Method	Endpoint	Description	Query Params
GET	/api/jobs	Get all jobs	?category , ?status
GET	/api/jobs/:id	Get single job	-
POST	/api/jobs	Create new job	-
PATCH	/api/jobs/:id	Update status	-
DELETE	/api/jobs/:id	Delete job	-


📧 Contact Information
Author	Malith Yasintha
GitHub	https://github.com/malith21
Project Repository	https://github.com/malith21/globaltna-job-board
Demo (Local)	http://localhost:3000

📅 Submission Information
Assignment	Full-Stack Developer Intern
Company	Global Training Network Alliances (GlobalTNA)
Submission Date	May 20, 2026

🙏 Acknowledgments
1.GlobalTNA for this opportunity
2.Next.js, Express, and MongoDB communities

⭐ Thank you for reviewing my assignment! ⭐

