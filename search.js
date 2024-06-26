document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pokemonForm');
    const pokemonNameInput = document.getElementById('pokemonName');
    const pokemonInfoContainer = document.querySelector('.pokemon-info');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const pokemonName = pokemonNameInput.value.toLowerCase(); 

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonInfo(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                pokemonInfoContainer.textContent = 'Pokemon not found. Please try again.';
            });
    });

    function displayPokemonInfo(data) {
        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1); 
        const image = data.sprites.front_default;
        const types = data.types.map(type => type.type.name).join(', ');
        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        const baseStats = Object.entries(data.stats).map(([stat, value]) => `${stat}: ${value.base_stat}`).join(', ');
        const height =data.height;
        pokemonInfoContainer.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <p>Types: ${types}</p>
            <p>Height: ${height}</p>
            <p>Abilities: ${abilities}</p>
            <p>Base Stats: ${baseStats}</p>
            
        `;
    }
});
const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

document.addEventListener('mouseenter', () => {
	site_wide_cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
	site_wide_cursor.style.display = 'none';
});

document.addEventListener('mousemove', TrackCursor);

document.addEventListener('mousedown', () => site_wide_cursor.classList.add('active'));
document.addEventListener('mouseup', () => site_wide_cursor.classList.remove('active'));

function TrackCursor(evt) {
	const w = site_wide_cursor.clientWidth;
	const h = site_wide_cursor.clientHeight;

	site_wide_cursor.style.transform = 
		`translate(${evt.clientX - w/2}px, ${evt.clientY - h/2}px)`;
}