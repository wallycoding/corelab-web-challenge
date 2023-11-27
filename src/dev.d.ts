// Utils
type VoidFn = () => void;
type GetProperty<T extends object, K extends keyof T> = T[K];

// React

type StateWith<T> = [T, React.Dispatch<React.SetStateAction<T>>];

// Jest
type TestingReRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => void;
