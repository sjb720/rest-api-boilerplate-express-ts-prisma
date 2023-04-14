import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { BookDTO } from './dto';
import { BookRepository } from './repository';

export class BookController {
	private readonly repo: BookRepository = new BookRepository();

	@bind
	async readBooks(req: Request, res: Response, next: NextFunction) {
		try {
			// Grab our books from our repo.
			const books = await this.repo.readAll();
			// Return a json of the books.
			return res.json(books);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	async readBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			// Asserts our id is a number.
			if (isNaN(+id)) return res.sendStatus(400);

			const book = await this.repo.readByID(+id);
			if (!book) return res.sendStatus(404);

			return res.json(book);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	async createBook(req: Request, res: Response, next: NextFunction) {
		try {
			// Generate a book object from our request body
			const dto = BookDTO.fromRequest(req);
			// Assert if our book is valid, since we made it from a request body we really don't know.
			if (dto === undefined || !dto.isValid()) return res.sendStatus(400);
			// Create our book
			const book = await this.repo.create(dto);
			// Return success with our book
			return res.status(201).json(book);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	async deleteBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			// Assert our book
			if (isNaN(+id)) return res.sendStatus(400);

			const book = await this.repo.readByID(+id);
			if (!book) return res.sendStatus(404);

			await this.repo.delete(+id);

			return res.sendStatus(204);
		} catch (err) {
			return next(err);
		}
	}
}
