import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemonName = 'pokemon-name';
describe('Testando a Página Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const textoh2 = screen.getByText(/Encountered pokémons/i);
    expect(textoh2).toBeInTheDocument();
  });
  // eslint-disable-next-line max-len
  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnProxPoke = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(btnProxPoke);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const quantiPoke = screen.getAllByTestId(pokemonName);
    expect(quantiPoke).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    const numFilter = 7;
    expect(btnFilter).toHaveLength(numFilter);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /electric/i })).toHaveLength(
      1,
    );
    expect(screen.getAllByRole('button', { name: /fire/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /bug/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /poison/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /psychic/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /normal/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /dragon/i })).toHaveLength(1);
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const btnAllTypes = screen.getByRole('button', { name: /all/i });
    expect(btnAllTypes).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Pikachu/);
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/);
  });
});
