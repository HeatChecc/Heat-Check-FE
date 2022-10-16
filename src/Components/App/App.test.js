import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';

test('renders learn react link', () => {
  render(<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
  const linkElement = screen.getByText(/Search/);
  expect(linkElement).toBeInTheDocument();
});
