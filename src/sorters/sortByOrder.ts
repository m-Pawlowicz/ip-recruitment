function sortByOrder(a: { order: number }, b: { order: number }) {
  return a.order - b.order;
}

export default sortByOrder;
