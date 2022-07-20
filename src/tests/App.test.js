import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Validando os links da pagina inicial', () => {
  it('Testando o link de holme', () => {
    renderWithRouter(<App />);
    const textLinkHome = screen.getByRole('link', { name: 'Home' });
    expect(textLinkHome).toBeInTheDocument();
  });
  it('Testando o link de Aboult', () => {
    renderWithRouter(<App />);
    const textLinkAbout = screen.getByRole('link', { name: 'About' });
    expect(textLinkAbout).toBeInTheDocument();
  });
  it('Testando o link de Pokemon Favorito', () => {
    renderWithRouter(<App />);
    const textLinkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(textLinkFavPoke).toBeInTheDocument();
  });
});
