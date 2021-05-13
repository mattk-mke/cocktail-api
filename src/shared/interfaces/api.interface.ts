export interface IPaginatedResponse<T> {
    data: T[];
    hasMore: boolean;
    totalCount: number;
}
