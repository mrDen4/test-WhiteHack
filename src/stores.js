import { writable } from 'svelte/store';

export const visibleBeer = writable(false);
export const aboutBeer = writable(null);
export const startPage = writable(0);
export const endPage = writable(6);
