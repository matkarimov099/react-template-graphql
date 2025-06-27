import { useDebounce } from '@/hooks/use-debounce.tsx';
import { useState } from 'react';
import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useGetUsers } from '@/features/users/hooks/use-users.ts';

export function useUsersData() {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 25,
	});

	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 300);

	// Derived values from pagination and sorting for easier access
	const currentPage = pagination.pageIndex + 1;
	const pageSize = pagination.pageSize;

	// Handlers for pagination changes
	const handlePageChange = (page: number) => {
		setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
	};

	const handlePageSizeChange = (size: number) => {
		setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 0 }));
	};

	// Handler for sorting changes
	const handleSortingChange = (
		updaterOrValue: SortingState | ((prev: SortingState) => SortingState),
	) => {
		const newSorting =
			typeof updaterOrValue === 'function'
				? updaterOrValue(sorting)
				: updaterOrValue;
		setSorting(newSorting);
		// Reset to first page when sorting changes
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	// Handler for search changes
	const handleSearchChange = (searchValue: string) => {
		setSearch(searchValue);
		// Reset to first page when search changes
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	const {
		data: usersResponse,
		loading: isFetching,
		refetch,
	} = useGetUsers({
		page: currentPage,
		limit: pageSize,
		...(debouncedSearch.length >= 3 ? { search: debouncedSearch } : {}),
		// Add sorting parameters if needed
		...(sorting.length > 0
			? {
					sort_by: sorting[0].id,
					sort_order: sorting[0].desc ? 'desc' : 'asc',
				}
			: {}),
	});

	return {
		// Data
		users: usersResponse?.users.data ?? [],
		total: usersResponse?.users.total ?? 0,
		isFetching,
		refetch,

		// Pagination state and handlers
		pagination,
		setPagination,
		currentPage,
		pageSize,
		onPageChange: handlePageChange,
		onPageSizeChange: handlePageSizeChange,

		// Sorting state and handlers
		sorting,
		setSorting,
		onSortingChange: handleSortingChange,

		// Search state and handlers
		search,
		setSearch,
		onSearchChange: handleSearchChange,
	};
}
