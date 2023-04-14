import express, { json, Request, Response, NextFunction } from 'express';

import Logger from '../config/logger';
import { UserRoutes } from './components/user/routes';
import { BookRoutes } from './components/book/routes';
import rateLimit from 'express-rate-limit'

export class Server {
	private readonly _app: express.Application = express();

	constructor() {
		this.registerMiddleware();
		this.registerRoutes();
		this.registerErrorHandler();
	}

	get app(): express.Application {
		return this._app;
	}

	private registerMiddleware() {
		this._app.use(json());

		// Setup default limiting
		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		})
		
		// Apply the rate limiting middleware to all requests
		this._app.use(limiter)
		
	}

	private registerRoutes() {
		this._app.get('/', (req: Request, res: Response) => res.send('Hi Friend.'));
		this._app.use('/users', new UserRoutes().router);
		this._app.use('/books', new BookRoutes().router);

	}

	private registerErrorHandler() {
		this._app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
			Logger.error(err.stack || err);
			return res.status(500).json(err.message || err);
		});
	}
}
