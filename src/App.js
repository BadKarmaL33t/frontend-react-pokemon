import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Pokemon from './components/Pokemon';
import pokemonLogo from './assets/pokemonLogo.png'

// basis endpoint https://pokeapi.co/api/v2/pokemon/ geeft automatisch een array van 20 pokemons.
// .next en .previous geven de vorige/volgende 20 pokemons.

function App() {
    const [pokemons, setPokemons] = useState([])
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            setError(false);

            try {
                // deconstruct de pokemon data uit endpoint.data
                const {data} = await axios.get(endpoint);
                setPokemons(data);
                console.log(data);
            } catch (e) {
                console.error(e);
                setError(true);
            }

            toggleLoading(false);
        }

        fetchData();
    }, [endpoint]);

    return (
        <div className="pokedex">
            {/*Check of de pokemon data is opgehaald*/}
            {pokemons &&
                <>
                    <img src={pokemonLogo} alt="Pokemon logo"/>
                    <button
                        type="button"
                        disabled={!pokemons['previous']}
                        onClick={() => { setEndpoint(pokemons['previous']) }}
                    >
                        Vorige
                    </button>
                    <button
                        type="button"
                        disabled={!pokemons['next']}
                        onClick={() => { setEndpoint(pokemons['next']) }}
                    >
                        Volgende
                    </button>

                    {/*Check of de data results bevat (hierin zitten de gegevens per pokemon.) */}
                    {/*Map daarna door de lijst met pokemons en return een pokemon voor elke i.*/}
                    {/*Geef voor elke i een component Pokemon terug met unieke key pokemon.name vanaf het endpoint van deze pokemon.*/}
                    {pokemons.results && pokemons.results.map((pokemon) => {
                        return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
                    })}
                </>
            }
            {error &&
                <p>
                    Er is iets misgegaan met het ophalen van de data.
                </p>
            }
            {loading &&
                <p>
                    Loading...
                </p>
            }
        </div>
    );
}

export default App;