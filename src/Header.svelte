<script>
	import { visibleBeer } from './stores.js';
	import { aboutBeer } from './stores.js';

	let searchValue;

	function searchBeer() {
		for (let i=0; i < beers.length; i++) {
			if(searchValue == beers[i].name.toLowerCase()) {
				beerAbout = beers[i];
			}
		}
		searchValue = '';
		if (beerAbout.length == 0) {
			alert('No search results');
		}
		if (beerAbout.length != 0) {
			aboutBeer.set(beerAbout);
			visibleBeer.set(true);
		}

    }
    
    export let beers, beerAbout;
</script>

<style>
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
</style>

<div class="header">
    <h1 class="title">Beer catalog</h1>
    <form class="header__form">
        <input type="text" placeholder="Поиск по названию пива" class="form__inp" bind:value={searchValue}>
        <button class="form__btn" on:click|preventDefault={searchBeer}>Найти</button>
    </form>
</div>