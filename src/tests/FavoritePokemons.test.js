import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando a Pagina de Favoritos', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    const linkFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFav);
    expect(history.location.pathname).toBe('/favorites');
    expect(
      screen.getByText(/no favorite pokemon found/i),
    ).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    const linkFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkboxPikachu = screen.getByText(/pokémon favoritado\?/i);

    userEvent.click(checkboxPikachu);

    userEvent.click(linkFav);
    expect(history.location.pathname).toBe('/favorites');
    expect(
      screen.getByText(/pikachu/i),
    ).toBeInTheDocument();
  });
});
