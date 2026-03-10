import { Admin } from "../../../generated/prisma/client";

export interface IAdminFilterQuery {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
}

export interface IAdminListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Admin[];
}
