import type { PackingList } from '$lib/models/list-list';
import { createDataSource } from './data-source-factory';
import type { DataSource } from './types';

export const listDataSource: DataSource<PackingList, string> = createDataSource('lists.json');
