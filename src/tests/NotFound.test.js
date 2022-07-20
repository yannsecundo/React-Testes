import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testando a pagina NotFound', () => {
  it('teste se a página contém um heading h2 com o texto Page requested not found', (
  ) => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imageNotFOund = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imageNotFOund.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
