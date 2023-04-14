import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import { config } from 'dotenv';

config();

import { Server } from './api/server';
// TODO import our database connection.
// import { pool } from './config/db';
import Logger from './config/logger';


// TODO establish a connection to our database before beginning our application.
/*
pool
	.connect()
	.then(() => startApi())
	.catch((err) => {
		Logger.error(err.stack);
	});
*/

const startApi = () => {
	const app: express.Application = new Server().app;
	const server: HttpServer = createServer(app);

	// Start express server
	server.listen(process.env.NODE_PORT);

	server.on('listening', () => {
		Logger.info(`node server is listening on port ${process.env.NODE_PORT}`);
	});
}

startApi();