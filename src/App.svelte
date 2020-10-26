<script>
	import Header from './Header.svelte';
	import Catalog from './Catalog.svelte';
	import Pagination from './Pagination.svelte';
	import Beer from './Beer.svelte';
	import { onMount } from "svelte";

	let url = 'https://api.punkapi.com/v2/beers';
	let beers = [];
	let paginations = [1,2,3,4,5];
	let beerAbout = {};
	let numBeersOnPage = 6; //Количество item-ов на странице

	onMount (async () => {
		const res = await fetch(url);
		beers = await res.json();
		// pages = Math.ceil(beers.length / endBeersOnPage);
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
</style>

<main class="wrap">
	<div class="container">
		<Header 
		{beers}
		{beerAbout}/>
		<Catalog 
		{beers}
		{beerAbout}/>
		<Pagination
		{paginations}
		{numBeersOnPage}/>
		<Beer/>
	</div>
</main>
