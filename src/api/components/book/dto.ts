import { Request } from 'express';
import { UtilityService } from '../../../services/utility';

export type IBook = {
	/* Book identifier */
	id: number;
	/* The title of the book */
	title: string;
	/* The author's ID */
	author: string;
}

/**
 * @description DTOs (Data Transfer Objects) are used for creating new objects and therefore do not require an ID!
 */
export class BookDTO {
	title: string;
	author: string;

	constructor(title: string, author: string) {
		this.title = title;
		this.author = author;
	}

	/**
	 * @description Generates a book object from a request body.
	 * @param req The 
	 * @returns A new DTO object of the book or undefined.
	 */
	static fromRequest(req: Request) {
		if (!UtilityService.hasProperties(req, ['title', 'author'])) {
			return undefined;
		}
		return new BookDTO(req.body.title, req.body.author);
	}

	isValid() {
		return (
			this.title.length > 0 && 
			this.author.length > 0
			);
	}
}
