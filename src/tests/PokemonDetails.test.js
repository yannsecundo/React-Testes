import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

import renderWithRouter from '../renderWithRouter';

describe('Testando a Pagina PokemonDetails', () => {
  it(`Teste se as informações detalhadas dopokémon selecionado
   são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(
      screen.getByRole('heading', { name: /pikachu details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /this intelligent pokémon roasts hard berries with electricity to make them /i,
      ),
    ).toBeInTheDocument();
  });
  it(`Teste se existe na página
   uma seção com os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(
      screen.getByRole('heading', { name: /game locations of pikachu/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[0].src,
    ).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].src,
    ).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[0].alt,
    ).toBe('Pikachu location');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].alt,
    ).toBe('Pikachu location');
  });

  it(`Teste se o card do pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste pokémon. `, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const checkboxPoke = screen.getByText(/pokémon favoritado\?/i);
    expect(checkboxPoke).toBeInTheDocument();
    userEvent.click(checkboxPoke);
    userEvent.click(screen.getByRole('link', {
      name: /favorite pokémons/i,
    }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
