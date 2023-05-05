export type ResultWithTotal<ResultType> = {
  data: ResultType[];
  total: number;
};

export type SearchableEntityCriteria<Entity> = Partial<Entity> & {
  search?: string;
};
