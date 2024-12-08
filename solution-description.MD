## The Algorithm

Is based on DFS bottom-up tree traversal approach. We traverse each subtree until we reach recursion base case; this is when hasChildren is false. For each function invocation we parse incoming data; so it fulfills the CategoryListElement type. After reaching the base case we start returning parsed CategoryListElements and sorting yielded results in 'parent' calls. This is the bottom-up part, we sort children categories before we sort their parents. Described algorithm will be applied to each distinct tree in the incoming data array. At the end input array will also have it's direct trees sorted in order given by sortCategories function.
**notice** i've assumed showOnHome should be true for topmost roots of trees in the input array. The decision has been made based on correctResult.ts and lack of explicit requirements

## Abstractions
- A function to parse the data is passed and categoryTree interface doesn't care (almost) about incoming data type as long as parseData() returns CategoryListElement type
- Incoming data only needs to fulfill CreateTreeFrom interface in order for the recursion to work as expected. This is thanks to parseData abstraction. Technically 'hasChildren' could be omitted since we could check the length of the array for the base case. Since hasChildren was explicitly given in the input i've decided that i'll leave it in the interface.
- A function to define sorting order is required and makes sorting configurable. We sort after data has been parsed thus we can explicitly define 'CategoryListElement' for parameter type


## Regarding 4th point
I've added a test file to compare correctResult contents with yielded results. Also added a test case for an input array with multiple distinct trees. Before my changes there were no tests, not sure if it was deliberate.
