import { hasKeyword } from './text'; // replace with your actual file name

describe('hasKeyword', () => {
  it('should return true if the target keyword is in the content', () => {
    const result = hasKeyword('Testing', 'ting');
    expect(result).toBe(true);
  });

  it('should return false if the target keyword is not in the content', () => {
    const result = hasKeyword('Testing', 'moon');
    expect(result).toBe(false);
  });
});
