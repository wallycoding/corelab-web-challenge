import React from 'react';

export class StoreContext {
  private static instance: StoreContext = new StoreContext();
  private storeContext = new Map<string, React.Context<any>>();

  static createContext<T>(name: RoutePropagator, data: T) {
    if (this.hasContext(name))
      throw Error(`The provider: ${name} already exists`);
    const context = React.createContext(data);
    this.instance.storeContext.set(name, context);
    return context;
  }

  static getContext(name: RoutePropagator) {
    return this.instance.storeContext.get(name);
  }

  static getOrCreateContext<T>(name: RoutePropagator, data: T) {
    if (!this.hasContext(name)) return this.createContext(name, data);
    return this.getContext(name)!;
  }

  static hasContext(name: RoutePropagator) {
    return StoreContext.instance.storeContext.has(name);
  }

  static deleteContext(name: RoutePropagator) {
    this.instance.storeContext.delete(name);
  }
}
