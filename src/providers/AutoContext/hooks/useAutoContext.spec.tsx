import { render } from '@testing-library/react';
import { AutoContext, useAutoContext } from '../index';
import { StoreContext } from '../store/core';

describe('useAutoContext', () => {
  afterEach(() => StoreContext.deleteContext('testing/state'));

  it('should correctly propagate state to children if useStatePropagation is called', () => {
    const state = { code: 'success' };
    const TestComponent = () => {
      const data = useAutoContext('testing/state');
      expect(data).toEqual(state);
      return null;
    };
    render(
      <AutoContext.ProvideData name="testing/state" data={state}>
        <TestComponent />
      </AutoContext.ProvideData>,
    );
  });
  it('should fail when useStatePropagation is called but no wrapper with provider', () => {
    const TestComponent = () => {
      try {
        useAutoContext('testing/state');
        throw Error('useAutoContext returns a value');
      } catch (error) {
        expect(error).toEqual(Error('The provider: testing/state not exists'));
      }
      return null;
    };
    render(<TestComponent />);
  });
});
