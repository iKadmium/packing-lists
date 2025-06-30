import { building } from '$app/environment';
import { RUNTIME_ENVIRONMENT } from '$env/static/private';
import { FakeDataSource } from './fake-data-source';
import { NetlifyBlobsDataSource } from './netlify-blobs-data-source';
import { NodeFSDataSource } from './node-fs-data-source';
import type { DataSource, DataSourceProvider } from './types';

/**
 * Factory function to create a DataSource implementation based on environment
 * @param filename The filename for the data store
 * @param keyProperty The property name to use as the key (defaults to 'name')
 * @param useNetlifyBlobs Whether to use Netlify Blobs (default: false for Node.js filesystem)
 * @returns A DataSource implementation
 */
export function createDataSource<T extends object, KeyType extends string = string>(filename: string, provider?: DataSourceProvider): DataSource<T, KeyType> {
	if (building) {
		return new FakeDataSource<T, KeyType>();
	}
	const dataSourceProvider: DataSourceProvider = provider || (RUNTIME_ENVIRONMENT === 'node' ? 'nodefs' : 'netlifyblobs');

	switch (dataSourceProvider) {
		case 'netlifyblobs':
			return new NetlifyBlobsDataSource<T, KeyType>(filename);
		default:
		case 'nodefs':
			return new NodeFSDataSource<T, KeyType>(filename);
	}
}
