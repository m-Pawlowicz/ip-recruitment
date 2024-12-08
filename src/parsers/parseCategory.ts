import { Category } from '../mockedApi';

function parseCategory(category: Category) {
  const { id, MetaTagDescription, name } = category;

  return {
    id,
    name,
    order: assignOrder(category),
    image: MetaTagDescription,
  };
}

function assignOrder(category: Category) {
  const matchResult = category.Title.match(/\b\d+\b/);

  if (!matchResult) {
    return category.id;
  }

  return Number(matchResult[0]);
}

export default parseCategory;
