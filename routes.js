var express = require('express');
var router = express.Router();

// Serve the Angular app
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/event-planner/index.html');
});

// Mock data
const EVENTS = [
    {
        id: 1,
        name: 'Angular Connect',
        date: new Date('9/26/2036'),
        time: '10:00 am',
        price: 599.99,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1057 DT',
            city: 'London',
            country: 'England'
        },
        sessions: [
            {
                id: 1,
                name: "Using Angular 4 Pipes",
                presenter: "Peter Bacon Darwin",
                duration: 1,
                level: "Intermediate",
                abstract: `Learn all about the new pipes in Angular 4, both 
          how to write them, and how to get the new AI CLI to write 
          them for you. Given by the famous PBD, president of Angular 
          University (formerly Oxford University)`,
                voters: ['bradgreen', 'igorminar', 'martinfowler']
            },
            // ... other sessions
        ]
    },
    // ... other events
];

const USERS = [
    { id: 1, userName: 'johnpapa', firstName: 'John', lastName: 'Papa' }
];

let currentUser = null;

// Routes
router.get('/api/events', (req, res) => {
    res.json(EVENTS);
});

router.get('/api/events/:id', (req, res) => {
    const event = EVENTS.find(e => e.id == req.params.id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

router.post('/api/events', (req, res) => {
    const newEvent = { ...req.body, id: EVENTS.length + 1 };
    EVENTS.push(newEvent);
    res.json(newEvent);
});

router.get('/api/sessions/search', (req, res) => {
    const searchTerm = req.query.search.toLowerCase();
    const sessions = [];
    EVENTS.forEach(event => {
        event.sessions.forEach(session => {
            if (session.name.toLowerCase().includes(searchTerm) ||
                session.presenter.toLowerCase().includes(searchTerm)) {
                sessions.push(session);
            }
        });
    });
    res.json(sessions);
});

router.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.userName === username);
    if (user && password === 'password') { // Simple mock
        currentUser = user;
        res.json({ user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

router.get('/api/currentidentity', (req, res) => {
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

router.post('/api/logout', (req, res) => {
    currentUser = null;
    res.json({ success: true });
});

router.put('/api/users/:id', (req, res) => {
    const user = USERS.find(u => u.id == req.params.id);
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.delete('/api/events/:eventId/sessions/:sessionId/voters/:voterName', (req, res) => {
    const event = EVENTS.find(e => e.id == req.params.eventId);
    if (event) {
        const session = event.sessions.find(s => s.id == req.params.sessionId);
        if (session) {
            session.voters = session.voters.filter(v => v !== req.params.voterName);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

router.post('/api/events/:eventId/sessions/:sessionId/voters/:voterName', (req, res) => {
    const event = EVENTS.find(e => e.id == req.params.eventId);
    if (event) {
        const session = event.sessions.find(s => s.id == req.params.sessionId);
        if (session) {
            if (!session.voters.includes(req.params.voterName)) {
                session.voters.push(req.params.voterName);
            }
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } else {
        res.status(404).json({ error: 'Event not found' });
    }
});

module.exports = function(app) {
    app.use('/', router);
};