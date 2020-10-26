<script>
    import { visibleBeer } from './stores.js';
    import { aboutBeer } from './stores.js';
    import { startPage } from './stores.js';
    import { endPage } from './stores.js';
    
	let startPage_value;
	let endPage_value;
    let catalogItem;
    
    const unsubscribeStart = startPage.subscribe(value => {
		startPage_value = value;
	});
	const unsubscribeEnd = endPage.subscribe(value => {
		endPage_value = value;
	});

    function showInfoBeer(ev) {
		let beer = ev.path[1].children[0].innerHTML;

		for (let i = 0; i < beers.length; i++) {
			if( beer == beers[i].name) {
                beerAbout = beers[i];
			}
        }
        visibleBeer.set(true);
        aboutBeer.set(beerAbout);
    }
    
    export let beers;
    export let beerAbout;
</script>

<style>
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
        transition: 0.3s;
        border: 1px solid #fff;
    }

    .catalog__item:hover {
        border: 1px solid lightgrey;
        border-radius: 15px;
    }

    .item__img {
        height: 200px;
    }
</style>

<ul class="catalog">
    {#each beers as beer, i}
        {#if i >= startPage_value && i < endPage_value}
            <li
                class="catalog__item"
                bind:this={catalogItem}
                on:click={showInfoBeer}>
                <h3 class="item__name">{beer.name}</h3>
                <img class="item__img" src={beer.image_url} alt={beer.name} />
            </li>
        {/if}
    {/each}
</ul>
