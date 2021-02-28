export type TProduct = {
	id?: number;
	title: string;
	image: string;
	description: string;
	price: number;
	ingredient?: Array<any>;
};

export type TUser = {
	username: string;
	email?: string;
};
