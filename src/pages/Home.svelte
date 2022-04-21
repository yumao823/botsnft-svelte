<script>
import { Router, Route, Link } from "svelte-routing";
import { onMount, getContext} from 'svelte';
import { slide, fade } from 'svelte/transition';
import { address, contract, provider, nfts, balances } from '../store';
import { Swiper, SwiperSlide } from 'swiper/svelte';
import "swiper/css/pagination";
import Mask from "./mask.svelte";

    //Help import data from opensea and pass into SwiperSlide <3 
    import { 
        initProvider,
        mintHex
    } from '../utils.js';

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
    var metadata = {
  "name": "HEXELZ",
  "description": "HEXELZ is a set of impossible shapes inspired by MC Escher and The Penrose Geometry",
  "image": '',
  "external_url": ''
};

</script>


<div class="wrapper">
<div class="escher">
  <div class="backdrop">
    <img src="/8bitwave.js" alt="">
   </div>
  <div class="hero " id="hero">
    <h1 style="position:relative;z-index:2;color:rgba(132, 226, 255, 0.49);line-height:1;padding:2rem;mix-blend-mode:normal;" >b<div class="mobile-break"><br></div>0<div class="mobile-break"><br></div>+<div class="mobile-break"><br></div><b style="animation: flash3 5s ease alternate infinite;">5</b></h1>
    <Link to="/mint"><div class="mint-button-cta-box" style=""><h1>MINT ▼</h1></div></Link>
    
  </div>
</div>
  <div class="fullheight" id="about">

    <div class="area">
      <div class="text-image-row wrap-reverse">
      <div class="text-box">
        <h1>
          NFT B0+5
        </h1>
        <p>NFT b0+5 (NFT Bots) are a pixel art series created by Keegan Rice of Dream Weaver Arts in Collaboration with Geometric Energy Corporation (GEC). Inspired by classic games and fuelled by GEC’s work in crypto, AI, game development, and technology. With 100 pieces in the collection, there’s a bot for every occasion.
       
        </p>
        <Link to="/gallery"><button class="mint-button"><p>View Minted</p></button></Link>

      </div>
      <div class="image-box" style="border-radius:4px;">
        <div class="perspective-hover-1" style="border-radius:4px;background-size:cover;" src="" alt=""><img style="width:100%;height:100%;pointer-events: none;" src="/imgs/8bitBotsSample.jpeg" alt=""></div>
      </div>
    </div>

    </div>
    


    <div class="area" style="" id="roadmap" >
      <div class="text-image-row ">

        <div class="image-box" style="border-radius:4px;">
          <div class="perspective-hover-2" style="border-radius:4px;background-size:cover;" src="" alt=""><img style="width:100%;height:100%;pointer-events: none;" src="/imgs/keeganBio.jpg" alt=""></div>
        </div>

      <div class="text-box2">
        <h1>
          ABOUT THE ARTIST
        </h1>
          <p>
            Keegan H. Rice Currently Lives and Works in Calgary, Alberta. Working mostly in acrylic, spray-paint, and oil, his work puts a modern spin on ancient symbols and primal archetypes. He is currently exploring multimedia installations while continuing to work as a freelance fine-artist as well as producing concept art and NFT content for Geometric Energy Corporation. He has received training at the Victoria College of Art, and has had his work displayed at numerous events, establishments, and galleries since 2010.
        </p>
        <div class="row">
        <a href="https://www.instagram.com/dreamweaverarts/"  target="_blank" rel="noopener noreferrer"><img width="80px" style="opacity:0.7" src="/imgs/instagram.png" alt=""></a>
        <a href="https://t.co/qF2LhfTU8g" target="_blank" rel="noopener noreferrer"><img width="128px" style="opacity:0.7" src="/imgs/discord.png" alt=""></a>
        <a href="mailto:Hexelz@protonmail.com"><img height="100px" style="opacity:0.7" src="/imgs/email.png" alt=""></a>
      </div>
      </div>
    </div>

    </div>
    


  </div>


  <div class="fullheight" id="mint">
    <div class="area" style="">
      
      <div class="text-image-row wrap-reverse">
        <div class="text-box2">
          <h1>
            MINT B0+5
          </h1>
          <p class="subheader">>> 0.3 ETH</p>
          <p>Connect your Web3 metamask wallet to initiate the minting process. <br>There are 100 unique B0+5 available!</p>
        {#if !$address}
          <button on:click={connect} class="mint-button"><p>Connect Wallet</p></button>
          {:else}
            <button on:click={mint} class="mint-button"><p>Mint</p></button>
            <br><br>{addressDisplay}  
          {/if}

        </div>
        
      <div class="image-box" style="border-radius:4px;">
        <div class="perspective-hover-1" style="border-radius:4px;background-size:cover;" src="" alt=""><img style="width:100%;height:100%;pointer-events: none;" src="/imgs/botcat.jpeg" alt=""></div>
      </div>
      </div>
    </div>
  </div>
</div>



<style>
  
 .mask > svg {
  overflow:visible!important;
  max-width:512px;
}
.mask{  
    background-size: cover;
    background-position: center;
    display: flex;
    width: 512px;border-radius:4px;
    background-image: url(/imgs/botcat.jpeg);
    height: 512px;
    flex-flow: wrap;
    justify-content: center;
}

@media screen and (max-width:900px){

  #logo-container svg {
  width: 100vw;
  height: 100vw;
  margin:auto;
}
.mask{display: flex;
  flex-flow: wrap;
  justify-content: center;
height:80vw;width:80vw;}
}


.color1 { fill: #333; animation: escherflow2 7s linear infinite;}

.color2 { fill: #444; animation: escherflow3 2s linear infinite;}

.color3 { fill: #555; animation: escherflow4 5s linear infinite;}


  .metamask-container {
    z-index:5;
    position:relative;
    overflow: hidden;
    height: 512px;
    width: 512px;
    border: unset;
}
  .escher{z-index:-1;
    display:flex;
    overflow: hidden;
 background-attachment: fixed;height:calc(100vh + 4rem);}
 @keyframes escherflow{
   0%{background-color: rgb(206, 206, 206);}
   50%{background-color: rgb(59, 59, 59);}
   100%{background-color: rgb(206, 206, 206);}

 } @keyframes escherflow2{
   0%{fill: #333;}
   50%{fill: #333a;}
   100%{fill: #333;}

 }@keyframes escherflow3{
   0%{fill: #444;}
   50%{fill: #444a;}
   100%{fill: #444;}

 }@keyframes escherflow4{
   0%{fill: #555;}
   50%{fill: #555a;}
   100%{fill: #555;}

 }
 .backdrop{width:calc(100vw - 164px);
    height: 100vh;
    width:100vw;
    position: fixed;
    pointer-events:none;
    z-index: -1;
    display: block;
    top: 0px;
    right: 0px;}

.hero{
  perspective: 600px;
 background-image:linear-gradient(45deg, #0003e696, #ff00aa47);z-index:5;width:100%;height:100%;display:flex;flex-flow:column;justify-content: center; overflow:hidden;   backdrop-filter:  invert(0%)brightness(0.5);transition:all 0.2s ease;
}
#svg-pattern{opacity:0.5;position:absolute;top:0px;left:0px;display:block;animation:zip 20s ease infinite;transition: transform 0.2s cubic-bezier(0.1, 0.7, 1.0, 0.1);}
.hero:hover{ backdrop-filter: invert(100%)brightness(1);cursor:crosshair;}
@keyframes zip{
  0%{transform:scale(1.5)rotateY(0deg)rotateX(0deg)rotateZ(0deg)}
  20%{transform:scale(1.4)rotateY(0deg)rotateX(0deg)rotateZ(5deg)}
  40%{transform:scale(1.3)rotateY(0deg)rotateX(5deg)rotateZ(5deg)}
  60%{transform:scale(1.2)rotateY(5deg)rotateX(5deg)rotateZ(0deg)}
  80%{transform:scale(1.3)rotateY(5deg)rotateX(0deg)rotateZ(5deg)}
  20%{transform:scale(1.4)rotateY(0deg)rotateX(0deg)rotateZ(5deg)}
  40%{transform:scale(1.3)rotateY(0deg)rotateX(-5deg)rotateZ(0deg)}
  60%{transform:scale(1.4)rotateY(-5deg)rotateX(-5deg)rotateZ(0deg)}
  80%{transform:scale(1.5)rotateY(-5deg)rotateX(0deg)rotateZ(-5deg)}
  100%{transform:scale(1.5)rotateY(0deg)rotateX(0deg)rotateZ(0deg)}}

</style>
