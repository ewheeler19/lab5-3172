import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react'; 
import App from './App';

test('renders Home Page', () => {
  act(() => { 
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  
  const heading = screen.getByText(/Welcome to My Portfolio/i); 
  expect(heading).toBeInTheDocument();
});
