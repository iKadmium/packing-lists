import type { Database } from '../models/database';

export type WithId<T extends object, K extends string = 'id'> = T & {
	[P in K]: string;
};

export interface DataSource<T extends object, K extends string = 'id'> {
	getAll(): Promise<Database<WithId<T, K>>>;
	get(id: string): Promise<WithId<T, K> | undefined>;
	post(data: T): Promise<K>;
	put(key: string, data: WithId<T, K>): Promise<void>;
	delete(key: string): Promise<void>;
	putMany(data: Database<WithId<T, K>>): Promise<void>;
	getKeyFromData(data: WithId<T, K>): string;
}

export type DataSourceProvider = 'nodefs' | 'netlifyblobs';
export type RuntimeEnvironment = 'node' | 'netlify';
