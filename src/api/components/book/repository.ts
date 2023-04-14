
// TODO Implement prisma.

import Logger from '../../../config/logger';

import { IBook, BookDTO } from './dto';

// This stuff is just for faking reading and writing for now for my examples.
let fakeIndex = 2;

let fakeList: IBook[] = [
	{
	id: 1,
	title: "Why Programming is Fun",
	author: "Big Nerd"
},
{
	id: 2,
	title: "Believe it!",
	author: "Naruto Uzumaki"
}
]

export class BookRepository {
	
	readAll(): Promise<IBook[]> {
		return new Promise((resolve, reject) => {
			// I left this here for an example of error handling and logging to use later.
			let err = false;

			if (err) {
				Logger.error(`Testing errors`);
				reject('Failed to fetch books! :(');
			} else {
				resolve(fakeList);
			}

		});
	}

	readByID(bookID: number): Promise<IBook> {
		return new Promise((resolve, reject) => {
			
			const filter = fakeList.filter(book => book.id === bookID);

			if(filter.length === 0) {
				reject(`No book with ID ${bookID}`);
			}

			// Should only be one hit if our ID is actually a PK enforced by the DB
			resolve(filter[0])
		});
	}

	create(book: BookDTO): Promise<IBook> {
		return new Promise((resolve, reject) => {

			// Make a new entry using our body and return it.

			const newBook : IBook = {
				id: ++fakeIndex,
				title: book.title,
				author: book.author
			}

			fakeList.push(newBook)

			resolve(newBook)
		});
	}

	delete(bookID: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			// I'm lazy but just delete the entry and return true if it worked.
			// You get the point.
			resolve(true)
		});
	}
}
