import { env } from '$env/dynamic/private';
import { readFile, writeFile } from 'node:fs/promises';
import type { Database } from '../models/database';
import type { DataSource, WithId } from './types';

export class NodeFSDataSource<T extends object, K extends string = 'id'>
	implements DataSource<T, K> {
	private filename: string;
	private keyProperty: K;

	public constructor(filename: string, keyProperty: K = 'id' as K) {
		if (!env.DATA_ROOT) {
			throw new Error('DATA_ROOT environment variable is not set');
		}
		this.filename = `${env.DATA_ROOT}/${filename}`;
		this.keyProperty = keyProperty;
	}

	public getKeyFromData(data: WithId<T, K>): string {
		return data[this.keyProperty];
	}

	public async getAll(): Promise<Database<WithId<T, K>>> {
		try {
			const contents = await readFile(this.filename, { encoding: 'utf-8' });

			if (!contents) {
				throw new Error('Failed to read file');
			}

			const data = JSON.parse(contents) as Database<WithId<T, K>>;
			return data;
		} catch (error) {
			if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
				// If the file does not exist, return an empty object
				return {};
			}
			console.error('Error reading file:', error);
			return {};
		}
	}

	public async get(id: string) {
		const all = await this.getAll();
		if (id in all) {
			return all[id];
		}
		return undefined;
	}

	public async post(data: T): Promise<K> {
		try {
			const all = await this.getAll();
			const id = crypto.randomUUID() as K; // Generate a unique ID
			const withId = { ...data, [this.keyProperty]: id } as WithId<T, K>;
			all[id] = withId;

			await writeFile(this.filename, JSON.stringify(all, null, 2));
			return id;
		} catch (error) {
			console.error('Error writing file:', error);
			throw new Error('Failed to save data');
		}
	}

	public async put(key: string, data: WithId<T, K>): Promise<void> {
		const all = await this.getAll();
		if (key in all) {
			all[key] = data;
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		} else {
			throw new Error(`No data found for id: ${key}`);
		}
	}

	public async delete(key: string): Promise<void> {
		const all = await this.getAll();
		if (key in all) {
			delete all[key];
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		}
	}

	public async putMany(data: Database<WithId<T, K>>): Promise<void> {
		try {
			const all = await this.getAll();
			Object.entries(data).forEach(([key, value]) => {
				all[key] = value;
			});
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		} catch (error) {
			console.error('Error writing file:', error);
			throw new Error('Failed to save data');
		}
	}
}
