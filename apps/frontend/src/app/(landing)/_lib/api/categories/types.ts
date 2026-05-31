export type CategoryDto = {
  slug: string;
  label: string;
  icon?: string;
};

export type CategoriesListResponse = {
  data: CategoryDto[];
};
