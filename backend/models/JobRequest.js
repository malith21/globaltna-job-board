const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: [
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'UI/UX Design',
      'QA Testing',
      'DevOps',
      'Data Science',
      'Mobile Development'
    ], 
    required: true 
  },
  location: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { 
    type: String, 
    required: true,
    match: /.+\@.+\..+/ 
  },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Closed'], 
    default: 'Open' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);