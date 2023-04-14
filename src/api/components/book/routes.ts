import { Router } from 'express';

import { BookController } from './controller';

export class BookRoutes {
	private readonly controller: BookController = new BookController();
	readonly router: Router = Router();

	constructor() {
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.route('/')
			.get(this.controller.readBooks)
			.post(this.controller.createBook);

		this.router.route('/:id')
			.get(this.controller.readBook)
			.delete(this.controller.deleteBook);
	}
}
