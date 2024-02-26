import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';

import Icons from '../Icons';

describe('Icon component testing', () => {
  it('render Icon component', () => {
    const iconComponent = render(<Icons />);
    expect(iconComponent).toMatchSnapshot();
  });
});
