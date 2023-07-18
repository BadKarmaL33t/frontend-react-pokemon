import React, {useEffect, useState} from "react";
import axios from 'axios';
import './Pokemon.css'

function Pokemon({endpoint}) {
    const [pokemon, setPokemon] = useState("");

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const {data} = await axios.get(endpoint);
                setPokemon(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemonData();
    }, [endpoint]);

    return (
        <section className="pokemon-tile">
            {Object.keys(pokemon).length > 0 &&
                <>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon['sprites']['front_default']}
                         alt="pokemon img"
                    />
                    <p><strong>Moves: </strong>{pokemon['moves'].length}</p>
                    <p><strong>Weight: </strong>{pokemon['weight']}</p>
                    <p><strong>Abilities:</strong></p>
                    <ul>
                    {pokemon['abilities'].map((ability) => {
                        return (
                            <li key={`${pokemon.name}-${ability['ability'].name}`}>
                                {ability['ability'].name}
                            </li>
                        )
                    })}
                    </ul>
                </>
            }
        </section>
    );
}

export default Pokemon;