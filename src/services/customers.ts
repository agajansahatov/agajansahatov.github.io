import { ICustomer } from '../interfaces';

let customers: ICustomer[] = [
	{
		name: 'Meylis Sahetmammedov',
		photo: '/images/meylis.png',
		company: 'Entrepreneur',
		comment:
			'I am so happy to recommend Agajan Sahatov. He delivered an excellent website that is very beautiful, responsive and blazingly fast. He is very professional, easy to work with and has good results...',
	},
];

export function getCustomers() {
	return customers;
}
