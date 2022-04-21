<script>
import { onMount, getContext} from 'svelte';
import { slide, fade } from 'svelte/transition';
import { Router, Link, Route } from "svelte-routing";
import { address, contract, provider, nfts, balances } from '../store';
import Card from "../cards/dex.svelte";
import { Swiper, SwiperSlide } from 'swiper/svelte';
import Carousel from 'svelte-carousel';
let fetchJson = fetch('json/1').then(res => res.json());
    //Help import data from opensea and pass into SwiperSlide <3 
    import { 
        initProvider,
        mintHex,
    } from '../utils.js';
    let hexelz = [
      { id: '01'},
      { id: '02'},
      { id: '03'},
      { id: '04'},
      { id: '05'},
      { id: '06'},
      { id: '07'},
	];
    const app = getContext('app');
    var addressDisplay = ''
    async function connectEthProvider(reconnect=false) {
        if(!$address) {
            await initProvider(app, reconnect);
            addressDisplay = String($address).slice(0,10)+"...";
            $address = $address;
        }
    }

    function connect(event) {
        connectEthProvider(false);
    }    

    async function mint(event) {
      await mintHex(contract, provider);
    }
var nft = {
  "name": "HEXELZ",
  "description": "HEXELZ is a set of impossible shapes inspired by MC Escher and The Penrose Geometry",
  "image": '',
  "external_url": ''
};

</script>



<div class="gallery">
  <Link to="mint"><div class="mint-button-cta-box" style=""><h1>MINT ▼</h1></div></Link>
 <!--
  {#if !$address}
  <div on:click={connect} style="" class="mint-button"><p>Connect Wallet</p></div>
  {:else}-->
  <div class="carousel-constraint">
     

  <Carousel>
  {#each hexelz as { id }, i}
        {#if i < 7}
        <img transition:fade src="/imgs/bots/{i + 1}.png" style="z-index:2;position:relative;height:300px;pointer-events:none;width:300pxborder-radius:4px;" alt="">
        {:else}
        <img transition:fade src="/imgs/bots/{i + 1}.png" style="z-index:2;position:relative;height:300px;pointer-events:none;width:300pxborder-radius:4px;" alt="">
        {/if}
        {/each} 
  </Carousel>    
    <!-- 
  {#await fetchJson}
  <p>Loading JSON</p>
  {:then result}
  <p>{JSON.stringify(result)}</p>
  {/await} -->
   <!--{/if} -->
  </div>
</div>



<style>
 
.carousel-constraint{width:512px;height:512px;margin:auto;position:relative;display:flex;}
</style>

