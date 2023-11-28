import { StoreContext } from './core';
import React from 'react';

describe('StoreContext', () => {
  const instance: Map<string, React.Context<any>> = Reflect.get(
    StoreContext,
    'instance',
  ).storeContext;

  beforeEach(() => {
    StoreContext.createContext('testing/state', {
      data: 'testData',
    });
  });

  afterEach(() => {
    instance.clear();
  });

  it('should create context', () => {
    instance.delete('testing/state');
    const context = StoreContext.createContext('testing/state', {
      data: 'test',
    });
    expect(context).toBeDefined();
    expect(context).toEqual(instance.get('testing/state'));
  });

  it('should fail when attempt replace context', () => {
    expect(() => {
      StoreContext.createContext('testing/state', {
        data: 'test',
      });
    }).toThrow(Error('The provider: testing/state already exists'));
  });

  it('should get context', () => {
    const context = StoreContext.getContext('testing/state');
    expect(context).toBeDefined();
    expect(context).toEqual(instance.get('testing/state'));
  });

  it('should get or create context', () => {
    const context = StoreContext.getOrCreateContext('testing/state', {
      data: 'test',
    });
    expect(context).toBeDefined();
    expect(context).toEqual(instance.get('testing/state'));
  });

  it('should check if context exists', () => {
    const hasContext = StoreContext.hasContext('testing/state');
    expect(hasContext).toBe(true);
  });

  it('should delete context', () => {
    StoreContext.deleteContext('testing/state');
    expect(instance.has('testing/state')).toBe(false);
  });
});
