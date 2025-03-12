import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { act } from 'react';


test('renders Home Page', () => {
  render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);
  const linkElement = screen.getByText(/welcome to my portfolio/i);
  expect(linkElement).toBeInTheDocument();
});
