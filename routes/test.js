// routes/test.js

const express = require('express');
const router = express.Router();
const Test = require('../models/test');

router.get('/events', async (req, res) => {
    try {
        const eventId = req.query.id;
        if (eventId) {
            const event = await Test.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            return res.status(200).json(event);
        }

        const type = req.query.type;
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        
        if (type === 'latest') {
            const events = await Test.find()
                .sort({ schedule: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
                
            const total = await Test.countDocuments();
            
            return res.status(200).json({
                events,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalEvents: total
            });
        }
        res.status(400).json({ message: "bad parametters " });
    } catch (error) {
        res.status(500).json({ message: "error fetching them", error: error.message });
    }
});

// Create new event
router.post('/events', async (req, res) => {
    try {
        const {
            name,
            files,
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            rigor_rank,
        } = req.body;
        const lastEvent = await Test.findOne().sort({ uid: -1 });
        const uid = lastEvent ? lastEvent.uid + 1 : 1;

        const event = new Test({
            uid,
            name,
            files,
            tagline,
            schedule: new Date(schedule),
            description,
            moderator,
            category,
            sub_category,
            rigor_rank,
        });

        const savedEvent = await event.save();
        res.status(201).json({ id: savedEvent._id });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
});

// Update event
router.put('/events/:id', async (req, res) => {
    try {
        const {
            name,
            files,
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            rigor_rank,
        } = req.body;

        const updatedEvent = await Test.findByIdAndUpdate(
            req.params.id,
            {
                name,
                files,
                tagline,
                schedule: new Date(schedule),
                description,
                moderator,
                category,
                sub_category,
                rigor_rank,
            },
            { new: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error: error.message });
    }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
    try {
        const deletedEvent = await Test.findByIdAndDelete(req.params.id);
        
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
});

module.exports = router;