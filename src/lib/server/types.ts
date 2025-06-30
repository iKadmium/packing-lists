export interface DataSource<T extends object, KeyType extends string | number | symbol = string> {
	getAll(): Promise<Record<KeyType, T>>;
	get(id: KeyType): Promise<T | undefined>;
	post(data: T): Promise<KeyType>;
	put(key: KeyType, data: T): Promise<void>;
	delete(key: KeyType): Promise<void>;
	putMany(data: Record<KeyType, T>): Promise<void>;
}

export type DataSourceProvider = 'nodefs' | 'netlifyblobs';
export type RuntimeEnvironment = 'node' | 'netlify';
