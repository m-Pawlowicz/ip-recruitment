import 'ava';
import test from 'ava';

import { CORRECT } from './correctResult';
import { categoryTree } from './task';

test('creates the tree with correctly sorted categories', async (t) => {
  const result = await categoryTree();

  t.deepEqual(result, CORRECT);
});
