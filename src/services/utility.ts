import { Request } from 'express';

export class UtilityService {
	/**
	 * @description Returns true if our body as the following requests
	 * @param req A HTTP request
	 * @param properties The list of properties required in the request body
	 * @returns {boolean}
	 */
	static hasProperties(req: Request, properties: string[]) {
		for (const prop of properties)
			if (!(prop in req.body) || req.body[prop] === undefined || req.body[prop] === null) return false;
		return true;
	}

	/**
	 * @description Returns true if our string is a valid email address
	 * @param email An email REGEX
	 * @returns {boolean}
	 */
	static isValidEmail(email: string) {
		return new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(email.toLowerCase());
	}
}
