import 'ava';
import test from 'ava';

import { CORRECT, CorrectWithManyTopMostTrees } from '../data/correctResult';
import { INPUT_WITH_MANY_TOPMOST_ROOTS } from '../data/input';
import { getCategories } from '../mockedApi';
import parseCategory from '../parsers/parseCategory';
import sortByOrder from '../sorters/sortByOrder';
import { categoryTree } from '../task';

test('creates the tree with correctly sorted categories', async (t) => {
  const result = await categoryTree({
    getData: getCategories,
    parseData: parseCategory,
    sortCategories: sortByOrder,
  });

  t.deepEqual(result, CORRECT);
});

test('works for multiple distinct trees', async (t) => {
  async function getData() {
    return { data: INPUT_WITH_MANY_TOPMOST_ROOTS };
  }

  const result = await categoryTree({
    getData,
    parseData: parseCategory,
    sortCategories: sortByOrder,
  });

  t.deepEqual(result, CorrectWithManyTopMostTrees);
});
