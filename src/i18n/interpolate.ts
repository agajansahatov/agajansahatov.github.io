export function interpolate(
	template: string,
	values: Readonly<Record<string, string>>,
): string {
	return Object.entries(values).reduce(
		(result, [key, value]) => result.replaceAll(`{${key}}`, value),
		template,
	);
}
