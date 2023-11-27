import React, { useMemo } from 'react';
import { StoreContext } from '../store/core';

interface ParentStateProps<T> {
  children: React.ReactNode;
  name: RoutePropagator;
  data: T;
}

export const ProvideData = <T extends unknown>(props: ParentStateProps<T>) => {
  const getCTX = () => StoreContext.getOrCreateContext(props.name, props.data);
  const Context = useMemo(getCTX, [props.name]);
  return (
    <Context.Provider value={props.data}>{props.children}</Context.Provider>
  );
};
