import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders body', () => {
  const { container } = render(<App />);
  expect(container.firstChild.classList.contains("body")).toBe(true);
});