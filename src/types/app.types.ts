interface PredicateHandlerI<T> {
  predicate: () => boolean;
  handler: () => T;
}
