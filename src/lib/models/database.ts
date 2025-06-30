// Using Record<string, T | undefined> instead of custom Database interface
export type Database<T> = Record<string, T | undefined>;

// Utility type for when you know entries exist
export type DatabaseEntries<T> = [string, T][];

// Helper function to get entries with proper typing
export function getDatabaseEntries<T>(database: Database<T>): DatabaseEntries<T> {
	return Object.entries(database).filter(([, value]) => value !== undefined) as DatabaseEntries<T>;
}
