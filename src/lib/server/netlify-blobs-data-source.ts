import { getStore, type GetWithMetadataResult } from '@netlify/blobs';
import type { DataSource } from './types';
import { env } from '$env/dynamic/private';

type MetadataResult<T extends object, KeyType extends string | number | symbol> = { data: Record<KeyType, T> } & GetWithMetadataResult;

export class NetlifyBlobsDataSource<T extends object, KeyType extends string = string> implements DataSource<T, KeyType> {
	private store: ReturnType<typeof getStore>;
	private key: string;
	private keyProperty: string;

	public constructor(filename: string, keyProperty: string = 'id') {
		if (env.NETLIFY_BLOBS_SITE_ID && env.NETLIFY_BLOBS_TOKEN) {
			this.store = getStore({
				name: 'data',
				siteID: env.NETLIFY_BLOBS_SITE_ID,
				token: env.NETLIFY_BLOBS_TOKEN
			});
		} else {
			this.store = getStore({ name: 'data' });
		}
		this.key = filename.replace('.json', '');
		this.keyProperty = keyProperty;
	}

	private async getAllWithMetadata(): Promise<MetadataResult<T, KeyType>> {
		const data = await this.store.getWithMetadata(this.key, {
			type: 'text',
			consistency: 'strong'
		});
		if (!data) {
			return { data: {} as Record<KeyType, T>, metadata: {} };
		}
		return {
			data: JSON.parse(data.data) as Record<KeyType, T>,
			metadata: data.metadata
		};
	}

	public async getAll(): Promise<Record<KeyType, T>> {
		try {
			const data = await this.getAllWithMetadata();
			if (!data) {
				return {} as Record<KeyType, T>;
			}
			return data.data as Record<KeyType, T>;
		} catch (error) {
			console.error('Error reading from Netlify Blobs:', error);
			return {} as Record<KeyType, T>;
		}
	}

	public async get(id: KeyType): Promise<T | undefined> {
		const all = await this.getAll();
		if (id in all) {
			return all[id];
		}
		return undefined;
	}

	private generateId(): KeyType {
		// Since KeyType is constrained to extend string, this is type-safe
		return crypto.randomUUID() as KeyType;
	}

	public async post(data: T): Promise<KeyType> {
		try {
			const all = await this.getAllWithMetadata();
			const id = this.generateId();
			all.data[id] = data;
			this.store.setJSON(this.key, all.data, { onlyIfMatch: all.etag });
			return id;
		} catch (error) {
			console.error('Error writing to Netlify Blobs:', error);
			throw error;
		}
	}

	public async put(key: KeyType, data: T): Promise<void> {
		const all = await this.getAllWithMetadata();
		if (key in all.data) {
			all.data[key] = data;
			await this.store.setJSON(this.key, all.data, { onlyIfMatch: all.etag });
		} else {
			throw new Error(`No data found for id: ${key}`);
		}
	}

	public async delete(key: KeyType): Promise<void> {
		const all = await this.getAllWithMetadata();
		if (key in all.data) {
			delete all.data[key];
			await this.store.setJSON(this.key, all.data, { onlyIfMatch: all.etag });
		}
	}

	public async putMany(data: Record<KeyType, T>): Promise<void> {
		try {
			const all = await this.getAllWithMetadata();
			for (const key in data) {
				all.data[key] = data[key];
			}
			await this.store.setJSON(this.key, all.data, { onlyIfMatch: all.etag });
		} catch (error) {
			console.error('Error writing multiple entries to Netlify Blobs:', error);
			throw error;
		}
	}
}
