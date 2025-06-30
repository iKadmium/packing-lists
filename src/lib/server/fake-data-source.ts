import type { DataSource } from './types';

export class FakeDataSource<T extends object, KeyType extends string | number | symbol = string> implements DataSource<T, KeyType> {
	getAll(): Promise<Record<KeyType, T>> {
		return Promise.resolve({} as Record<KeyType, T>);
	}
	get(_id: KeyType): Promise<T | undefined> {
		return Promise.resolve(undefined);
	}
	post(_data: T): Promise<KeyType> {
		throw new Error('Method not implemented.');
	}
	put(_key: KeyType, _data: T): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(_key: KeyType): Promise<void> {
		throw new Error('Method not implemented.');
	}
	putMany(_data: Record<KeyType, T>): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
