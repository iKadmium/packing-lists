import type { Database } from '$lib/models/database';
import type { DataSource, WithId } from './types';

export class FakeDataSource<T extends object, K extends string = 'id'> implements DataSource<T, K> {
	getAll(): Promise<Database<WithId<T, K>>> {
		const db = {} as Database<WithId<T, K>>;
		return Promise.resolve(db);
	}
	get(_id: string): Promise<WithId<T, K> | undefined> {
		return Promise.resolve({} as WithId<T, K>);
	}
	post(_data: T): Promise<K> {
		throw new Error('Method not implemented.');
	}
	put(_key: string, _data: T): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(_key: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	putMany(_data: Database<T>): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getKeyFromData(_data: T): string {
		throw new Error('Method not implemented.');
	}
}
