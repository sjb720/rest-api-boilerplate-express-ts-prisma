
// TODO Implement prisma.

import Logger from '../../../config/logger';

import { IUser, UserDTO } from './dto';

const fakeList: IUser[] = [{
	id: 1,
	email: "something@gmail.com",
	username: "yoman",
	created_at: new Date(),
}]

/**
 * The results here are not accurate to what a real api would do.
 * I simply filled this in returns to satisfy typescript!
 * 
 * I think it's obvious what you should do at this step and I left an
 * error handling example too.
 */

export class UserRepository {
	readAll(): Promise<IUser[]> {
		return new Promise((resolve, reject) => {
			// Example error
			let err = false;

			if (err) {
				Logger.error(`Testing errors`);
				reject('Failed to fetch users!');
			} else {
				resolve(fakeList);
			}

		});
	}

	readByID(userID: number): Promise<IUser> {
		return new Promise((resolve, reject) => {
			resolve(fakeList[0])
		});
	}

	readByEmailOrUsername(email: string, username: string): Promise<IUser> {
		return new Promise((resolve, reject) => {
			resolve(fakeList[0])
		});
	}

	create(user: UserDTO): Promise<IUser> {
		return new Promise((resolve, reject) => {
			resolve(fakeList[0])
		});
	}

	delete(userID: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			resolve(true)
		});
	}
}
