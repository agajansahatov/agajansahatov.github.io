export type HomeTestimonialId = 'meylis-sahetmammedov';

export type TestimonialContent = {
	readonly id: HomeTestimonialId;
	readonly name: string;
	readonly company: string;
	readonly comment: string;
	readonly photoAlt: string;
};

export type ResolvedHomeTestimonial = TestimonialContent & {
	readonly photo: string;
};
