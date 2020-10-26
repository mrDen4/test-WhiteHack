<script>
    import { aboutBeer } from './stores.js';
	import { visibleBeer } from './stores.js';
    
    let beerAbout_value;
	let visibleBeer_value;

	const unsubscribeAbout = aboutBeer.subscribe(value => {
		beerAbout_value = value;
    });
    const unsubscribeVisible = visibleBeer.subscribe(value  => {
		visibleBeer_value = value;
	});
</script>

<style>
	.beer {
		border: 1px solid lightgrey;
		border-radius: 15px;
		display: flex;
		align-items: start;
		justify-content: start;
		flex-direction: row;
		position: absolute;
		padding: 20px;
		background: #fff;
	}

	.beer .beer__img {
		height: 100%;
		margin-right: 40px;
	}

	.beer .beer__btn {
		background: none;
		border: none;
		font-size: 30px;
		cursor: pointer;
		transition: .3s;
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 0;
		margin: 0;
	}

	.beer .beer__btn:hover {
		color: red;
	}

	.img__img {
		width: 100%;
	}
</style>

{#if visibleBeer_value}
		<div class="beer">
			<button class="beer__btn" on:click={() => visibleBeer.set(false)}>&times;</button>
			<div class="beer__img">
				<img class="img__img" src={beerAbout_value.image_url} alt={beerAbout_value.name}>
			</div>
			<div class="beer__about">
				<p class="beer__text">id: {beerAbout_value.id}</p>
				<p class="beer__text">name: {beerAbout_value.name}</p>
				<p class="beer__text">tagline: {beerAbout_value.tagline}</p>
				<p class="beer__text">description: {beerAbout_value.description}</p>
				<p class="beer__text">abv: {beerAbout_value.abv}</p>
				<p class="beer__text">boil_volume: {beerAbout_value.boil_volume.value} {beerAbout_value.boil_volume.unit}</p>
				<p class="beer__text">brewers_tips: {beerAbout_value.brewers_tips}</p>
				<p class="beer__text">contributed_by: {beerAbout_value.contributed_by}</p>
				<p class="beer__text">ebc: {beerAbout_value.ebc}</p>
				<p class="beer__text">first_brewed: {beerAbout_value.first_brewed}</p>
				<p class="beer__text">food_pairing: 
					{beerAbout_value.food_pairing}
				</p>
				<p class="beer__text">ibu: {beerAbout_value.ibu}</p>
				<p class="beer__text">ph: {beerAbout_value.ph}</p>
				<p class="beer__text">srm: {beerAbout_value.srm}</p>
			</div>
		</div>
		{/if}