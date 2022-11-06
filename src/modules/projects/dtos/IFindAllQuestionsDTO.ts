export interface IFindAllProjectsDTO {
  page?: number;
  pageSize?: number;
  relations?: string[];
  filters: {
    q?: string;
    userId?: string;
    [key: string]: any;
  };
}
