<script>
	import { onMount } from "svelte";
	import { afterUpdate } from 'svelte';
	import { element } from "svelte/internal";

	let url = 'https://api.punkapi.com/v2/beers';
	let beers = [];
	let numBeersOnPage = 6; //Количество item-ов на странице
	let startBeersOnPage = 0;
	let endBeersOnPage = 6;
	let pages = 0;
	let currentPage = 1;
	let paginations = [1,2,3,4,5];
	let catalogItem;
	let beerAbout = {};
	let visible = false;
	let searchValue;

	function changePage(ev) {
		let page = Number(ev.target.innerHTML)
		startBeersOnPage = (page-1) * numBeersOnPage;
		endBeersOnPage = startBeersOnPage + numBeersOnPage;
		console.log(startBeersOnPage, endBeersOnPage);
	}

	function showInfoBeer(ev) {
		let beerEL = document.querySelector('.beer');
		let beer = ev.path[1].children[0].innerHTML;

		for (let i = 0; i < beers.length; i++) {
			if( beer == beers[i].name) {
				beerAbout = beers[i];
			}
		}
		visible = true;
		console.log(beerAbout);
	}

	function searchBeer() {
		for (let i=0; i<beers.length; i++) {
			if(searchValue == beers[i].name.toLowerCase()) {
				console.log(beers[i].name);
				beerAbout = beers[i];
			}

			visible = true;
		}
	}

	onMount (async () => {
		const res = await fetch(url);
		beers = await res.json();
		pages = Math.ceil(beers.length / endBeersOnPage);
	})
</script>

<style>
	.wrap {
		display: flex;
		align-items: center;
	}

	.container {
		max-width: 1170px;
		padding-left: 25px;
		padding-right: 25px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.header__form {
		display: flex;
		align-items: center;
	}

	.form__inp {
		border-radius: 15px;
		width: 250px;
		padding: 5px 20px;
		margin-right: 20px;
		outline: none;
	}

	.form__btn {
		border-radius: 15px;
		background: none;
		cursor: pointer;
		padding: 5px 20px;
		transition: .3s;
	}

	.form__btn:hover {
		background: lightgrey;
		color: #fff;
	}

	.title {
		text-align: center;
	}

	.catalog {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}

	.catalog__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 300px;
		width: 30%;
		transition: .3s;
		border: 1px solid #fff;
	}

	.catalog__item:hover {
		border: 1px solid lightgrey;
		border-radius: 15px;
	}

	.item__img {
		height: 200px;
	}

	.pagination {
		display: flex;
		list-style: none;
		align-items: center;
		justify-content: center;
	}

	.pagination .pagination__item {
		border: 1px solid lightgrey;
		border-radius: 15px;
		padding: 15px;
		cursor: pointer;
		margin-right: 20px;
		transition: .3s;
	}

	.pagination .pagination__item:hover {
		background: lightgrey;
		color: #fff;
	}

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

<main class="wrap">
	<div class="container">
		<div class="header">
			<h1 class="title">Beer catalog</h1>
			<form class="header__form">
				<input type="text" placeholder="Поиск по названию пива" class="form__inp" bind:value={searchValue}>
				<button class="form__btn" on:click|preventDefault={searchBeer}>Найти</button>
			</form>
		</div>
		<ul class="catalog">
			{#each beers as beer, i}
				{#if i >= startBeersOnPage && i < endBeersOnPage }
					<li class="catalog__item" bind:this={catalogItem} on:click={showInfoBeer}>
						<h3 class="item__name">{beer.name}</h3>
						<img class="item__img" src={beer.image_url} alt={beer.name} />
					</li>
				{/if}
			{/each}
		</ul>
		<ul class="pagination">
			{#each paginations as pagination}
				<li class="pagination__item" on:click={changePage}>{pagination}</li>
			{/each}
		</ul>
		{#if visible}
		<div class="beer">
			<button class="beer__btn" on:click={() => visible=false}>&times;</button>
			<div class="beer__img">
				<img class="img__img" src={beerAbout.image_url} alt={beerAbout.name}>
			</div>
			<div class="beer__about">
				<p class="beer__text">id: {beerAbout.id}</p>
				<p class="beer__text">name: {beerAbout.name}</p>
				<p class="beer__text">tagline: {beerAbout.tagline}</p>
				<p class="beer__text">description: {beerAbout.description}</p>
				<p class="beer__text">abv: {beerAbout.abv}</p>
				<p class="beer__text">boil_volume: {beerAbout.boil_volume.value} {beerAbout.boil_volume.unit}</p>
				<p class="beer__text">brewers_tips: {beerAbout.brewers_tips}</p>
				<p class="beer__text">contributed_by: {beerAbout.contributed_by}</p>
				<p class="beer__text">ebc: {beerAbout.ebc}</p>
				<p class="beer__text">first_brewed: {beerAbout.first_brewed}</p>
				<p class="beer__text">food_pairing: 
					{beerAbout.food_pairing}
				</p>
				<p class="beer__text">ibu: {beerAbout.ibu}</p>
				<p class="beer__text">ingredients: {beerAbout.ingredients}</p>
				<p class="beer__text">method: {beerAbout.method}</p>
				<p class="beer__text">ph: {beerAbout.ph}</p>
				<p class="beer__text">srm: {beerAbout.srm}</p>
			</div>
		</div>
		{/if}
	</div>
</main>
