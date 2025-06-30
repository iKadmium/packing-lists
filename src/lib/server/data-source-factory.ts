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
export function createDataSource<T extends object, K extends string = 'id'>(
    filename: string,
    keyProperty: K = 'id' as K,
    provider?: DataSourceProvider
): DataSource<T, K> {
    if (building) {
        return new FakeDataSource<T, K>();
    }
    const dataSourceProvider: DataSourceProvider =
        provider || (RUNTIME_ENVIRONMENT === 'node' ? 'nodefs' : 'netlifyblobs');

    console.log(`Using data source provider: ${dataSourceProvider} for file: ${filename}`);
    console.log(`RUNTIME_ENVIRONMENT: ${RUNTIME_ENVIRONMENT}`);
    switch (dataSourceProvider) {
        case 'netlifyblobs':
            return new NetlifyBlobsDataSource<T, K>(filename, keyProperty);
        default:
        case 'nodefs':
            return new NodeFSDataSource<T, K>(filename, keyProperty);
    }
}
