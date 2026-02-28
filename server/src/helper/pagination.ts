type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

interface IOptionResult {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  skip: number;
}

export const calculatePagination = (options: IOptions): IOptionResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "asc";
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};
