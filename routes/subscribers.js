const express = require('express');
const router = express.Router();
const Subscriber = require('../model/subscribers');

// Middleware to get subscriber by ID
async function getSubscribers(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}

// Getting all subscribers
router.get('/', async (req, res) => {
    console.log("Getting all", req.baseUrl);
    try {
        const mysubscribers = await Subscriber.find();
        res.json(mysubscribers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Getting one subscriber
router.get('/:id', getSubscribers, (req, res) => {
    console.log("Getting one");
    res.json(res.subscriber);
});

// Creating one subscriber
router.post('/', async (req, res) => {
    console.log("Creating one");
    const mysubscriber = new Subscriber({
        name: req.body.name,
        subscriberTochannel: req.body.subscriberTochannel,
    });

    try {
        const newSub = await mysubscriber.save();
        res.status(201).json(newSub);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// Updating one subscriber
router.patch('/:id', getSubscribers, async (req, res) => {
    console.log("Updating one");

    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscriberTochannel != null) {
        res.subscriber.subscriberTochannel = req.body.subscriberTochannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one subscriber
router.delete('/:id', getSubscribers, async (req, res) => {
    console.log("Deleting one");

    try {
        await res.subscriber.remove();
        res.json({ message: "Deleted subscriber" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
