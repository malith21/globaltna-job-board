const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET all jobs (with filters)
router.get('/', async (req, res) => {
  const { category, status } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  const jobs = await JobRequest.find(filter);
  res.json(jobs);
});

// GET single job
router.get('/:id', async (req, res) => {
  const job = await JobRequest.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// POST create job
router.post('/', async (req, res) => {
  const { title, description, category, location, contactName, contactEmail } = req.body;
  if (!title || !description || !category || !location || !contactName || !contactEmail) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const job = await JobRequest.create(req.body);
  res.status(201).json(job);
});

// PATCH update status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  if (!['Open', 'In Progress', 'Closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const job = await JobRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(job);
});

// DELETE job
router.delete('/:id', async (req, res) => {
  await JobRequest.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;