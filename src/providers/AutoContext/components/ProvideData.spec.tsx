import { render, screen } from '@testing-library/react';
import { AutoContext } from '../index';
import { StoreContext } from '../store/core';

describe('AutoContext', () => {
  describe('ProvideData', () => {
    it('should create a context when name and data is provided', () => {
      const state = { code: 'success' };
      render(
        <AutoContext.ProvideData
          data={state}
          name="testing/state"
          children="content"
        />,
      );
      expect(screen.getByText('content'));
      expect(StoreContext.hasContext('testing/state')).toBeTruthy();
    });
  });
});
