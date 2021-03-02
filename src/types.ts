export type TProduct = {
	id?: number;
	title: string;
	image: string;
	description: string;
	price: number;
	ingredients?: Array<Ingredient>;
};

export type Ingredient = {
	price: string;
	title: string;
};

export type TUser = {
	username: string;
	email?: string;
};
