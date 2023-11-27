type RoutePropagator =
  | 'props/notebox'
  | 'props/search'
  | 'api/processor'
  | 'form/notes'
  | 'testing/state';

type StateWith<T> = [T, React.Dispatch<React.SetStateAction<T>>];
