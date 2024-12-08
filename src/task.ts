import sortByOrder from './sorters/sortByOrder';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

type ParseData = (
  toParse: unknown
) => Omit<CategoryListElement, 'children' | 'showOnHome'>;

type CreateTreeFrom = { hasChildren: boolean; children: CreateTreeFrom[] };

type SortCategories = (
  a: CategoryListElement,
  b: CategoryListElement
) => number;

type CategoryTreeProps = {
  getData: () => Promise<{ data: CreateTreeFrom[] }>;
  parseData: ParseData;
  sortCategories: SortCategories;
};

export const categoryTree = async ({
  getData,
  parseData,
  sortCategories,
}: CategoryTreeProps): Promise<CategoryListElement[]> => {
  const res = await getData();

  if (!res.data) {
    return [];
  }

  const { data } = res;

  function recurse(
    category: CreateTreeFrom,
    depth: number
  ): CategoryListElement {
    const parsed = parseData(category);

    if (!category.hasChildren) {
      return { ...parsed, children: [], showOnHome: depth === 0 };
    }

    const parsedSubCategories = category.children
      .map((x) => recurse(x, depth + 1))
      .sort(sortCategories);

    return {
      children: parsedSubCategories,
      showOnHome: depth === 0,
      ...parsed,
    };
  }

  const result = data.map((category) => recurse(category, 0)).sort(sortByOrder);

  return result;
};
