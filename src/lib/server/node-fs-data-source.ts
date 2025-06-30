import { env } from '$env/dynamic/private';
import { readFile, writeFile } from 'node:fs/promises';
import type { DataSource } from './types';

export class NodeFSDataSource<T extends object, KeyType extends string = string> implements DataSource<T, KeyType> {
	private filename: string;

	public constructor(filename: string) {
		if (!env.DATA_ROOT) {
			throw new Error('DATA_ROOT environment variable is not set');
		}
		this.filename = `${env.DATA_ROOT}/${filename}`;
	}

	public async getAll(): Promise<Record<KeyType, T>> {
		try {
			const contents = await readFile(this.filename, { encoding: 'utf-8' });

			if (!contents) {
				throw new Error('Failed to read file');
			}

			const data = JSON.parse(contents) as Record<KeyType, T>;
			return data;
		} catch (error) {
			if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
				// If the file does not exist, return an empty object
				return {} as Record<KeyType, T>;
			}
			console.error('Error reading file:', error);
			return {} as Record<KeyType, T>;
		}
	}

	public async get(id: KeyType) {
		const all = await this.getAll();
		if (id in all) {
			return all[id];
		}
		return undefined;
	}

	public async post(data: T): Promise<KeyType> {
		try {
			const all = await this.getAll();
			const id = crypto.randomUUID() as KeyType; // Generate a unique ID
			all[id] = data;

			await writeFile(this.filename, JSON.stringify(all, null, 2));
			return id;
		} catch (error) {
			console.error('Error writing file:', error);
			throw new Error('Failed to save data');
		}
	}

	public async put(key: KeyType, data: T): Promise<void> {
		const all = await this.getAll();
		if (key in all) {
			all[key] = data;
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		} else {
			throw new Error(`No data found for id: ${key}`);
		}
	}

	public async delete(key: KeyType): Promise<void> {
		const all = await this.getAll();
		if (key in all) {
			delete all[key];
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		}
	}

	public async putMany(data: Record<KeyType, T>): Promise<void> {
		try {
			const all = await this.getAll();
			Object.entries<T>(data).forEach(([key, value]) => {
				all[key as KeyType] = value;
			});
			await writeFile(this.filename, JSON.stringify(all, null, 2));
		} catch (error) {
			console.error('Error writing file:', error);
			throw new Error('Failed to save data');
		}
	}
}
