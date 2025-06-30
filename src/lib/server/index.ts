import type { PackingList } from '$lib/models/list-list';
import { createDataSource } from './data-source-factory';
import type { DataSource, WithId } from './types';

export const listDataSource: DataSource<WithId<PackingList, 'id'>> = createDataSource<
	WithId<PackingList>,
	'id'
>('lists.json');
