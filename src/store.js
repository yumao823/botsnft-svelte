import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useSessionStorage: () => {
      const json = sessionStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        sessionStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}
export const web3Loaded = createWritableStore('web3Loaded', 0);
export const address = createWritableStore('address', undefined);
export const contract = createWritableStore('contract', undefined);
export const provider = createWritableStore('provider', undefined);
export const network = createWritableStore('network', undefined);
export const nfts = createWritableStore('nfts', undefined);
export const alreadyMinted = createWritableStore('alreadyMinted', false);
export const etherLoading = createWritableStore('etherLoading', false);
export const balances = createWritableStore('balances', [])
export const maxSupply = createWritableStore('maxSupply', 0);
export const totalSupply = createWritableStore('totalSupply', 0);
