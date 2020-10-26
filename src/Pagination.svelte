<script>
	import { startPage } from './stores.js';
    import { endPage } from './stores.js';
    
	let startPage_value;
	let endPage_value;

    const unsubscribeStart = startPage.subscribe(value => {
		startPage_value = value;
	});
	const unsubscribeEnd = endPage.subscribe(value => {
		endPage_value = value;
	});

	function changePage(ev) {
        let startBeersOnPage = startPage_value;
        let endBeersOnPage =endPage_value;
		let page = Number(ev.target.innerHTML)
		startBeersOnPage = (page-1) * numBeersOnPage;
        endBeersOnPage = startBeersOnPage + numBeersOnPage;
        startPage.set(startBeersOnPage);
        endPage.set(endBeersOnPage);
    }
    
    export let paginations, numBeersOnPage;
</script>

<style>
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
</style>

<ul class="pagination">
    {#each paginations as pagination}
        <li class="pagination__item" on:click={changePage}>{pagination}</li>
    {/each}
</ul>