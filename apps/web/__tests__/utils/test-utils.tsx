import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Simple render function without providers for now
// Providers can be added per-test as needed
const customRender = (ui: ReactElement, options?: RenderOptions) => render(ui, options);

export * from '@testing-library/react';
export { customRender as render };
