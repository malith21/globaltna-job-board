const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET all jobs (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    const jobs = await JobRequest.find(filter);
    res.json(jobs);
  } catch (error) {
    console.error('GET error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET single job
router.get('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error('GET by ID error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST create job
router.post('/', async (req, res) => {
  try {
    console.log('📥 Received POST data:', req.body);
    
    const { title, description, category, location, contactName, contactEmail } = req.body;
    
    if (!title || !description || !category || !location || !contactName || !contactEmail) {
      console.log('❌ Missing fields');
      return res.status(400).json({ error: 'All fields required' });
    }
    
    console.log('✅ Creating job with category:', category);
    const job = await JobRequest.create(req.body);
    console.log('✅ Job created successfully');
    res.status(201).json(job);
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// PATCH update status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const job = await JobRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error('PATCH error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(204).send();
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;