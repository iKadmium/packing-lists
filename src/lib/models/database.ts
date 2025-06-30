// Helper function to get entries with proper typing
export function getDatabaseEntries<T, K extends string | number | symbol = string>(database: Record<K, T>): [K, T][] {
	return Object.entries(database).filter(([, value]) => value !== undefined) as [K, T][];
}
