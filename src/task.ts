import { Category, getCategories } from './mockedApi';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

export const categoryTree = async (): Promise<CategoryListElement[]> => {
  const res = await getCategories();

  if (!res.data) {
    return [];
  }

  const { data } = res;

  function createTree(category: Category, depth: number): CategoryListElement {
    const parsed = parseCategory(category);

    if (!category.hasChildren) {
      return { ...parsed, children: [], showOnHome: depth === 0 };
    }

    const parsedSubCategories = category.children.map((x) =>
      createTree(x, depth + 1)
    );

    parsedSubCategories.sort((a, b) => a.order - b.order);

    const { image, id, name, order } = parsed;

    return {
      children: parsedSubCategories,
      image,
      showOnHome: depth === 0,
      id,
      name,
      order,
    };
  }

  const result = data.map(createTree);

  console.log(JSON.stringify(result));

  return result;
};

function parseCategory(
  category: Category
): Omit<CategoryListElement, 'children' | 'showOnHome'> {
  const { id, MetaTagDescription, name } = category;

  return {
    id,
    name,
    order: getOrder(category),
    image: MetaTagDescription,
  };
}

function getOrder(category: Category) {
  const matchResult = category.Title.match(/\b\d+\b/);

  if (!matchResult) {
    return category.id;
  }

  return +matchResult[0];
}

categoryTree();
