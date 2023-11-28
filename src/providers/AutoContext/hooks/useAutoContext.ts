import { useContext } from 'react';
import { StoreContext } from '../store/core';

export const useAutoContext = <T extends unknown>(name: RoutePropagator): T => {
  const context = StoreContext.getContext(name);
  if (!context) throw Error(`The provider: ${name} not exists`);
  return useContext(context);
};
