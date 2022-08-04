import type { Express } from 'express';
import path from 'path';

import { GameManager } from '../store'

const store = GameManager.getInstance();

const handleExpress = (app: Express) => {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../', 'client/index.html'));
    });

    app.get('/api/rooms', function (req, res) {
        const games = store.getGames();
        res.json(games);
    });

    app.get('/api/users', function (req, res) {
        const games = store.getUsers();
        res.json(games);
    });
};

export default handleExpress;