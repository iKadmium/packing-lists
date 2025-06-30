import type { PackingList } from '$lib/models/packing-list';
import { createDataSource } from './data-source-factory';
import type { DataSource } from './types';

export const listDataSource: DataSource<PackingList, string> = createDataSource('lists.json');
