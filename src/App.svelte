<script>
    import { Router, Route, Link } from "svelte-routing";
    import Home from "./pages/Home.svelte";
    import Mint from "./pages/Mint.svelte";
    import Four from "./pages/Four.svelte";    
    import Gallery from "./pages/Gallery.svelte";
    export let url = '';
    import Carousel from 'svelte-carousel';
    import { address, contract, provider, nfts, balances } from './store';
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
    import { Audio, Video } from 'svelte-audio-video';
    import { 
        initProvider,
        mintHex,
    } from './utils.js';  
    

  const track = {
    attach: (element, _track) => {
      // when fired, do whatever is needed to attach the track
      // Note: `this` refers to the `track` object
    },
 
    detach: (element, _track) => {
      // when fired, do whatever is needed to detach the track
      // Note: `this` refers to the `track` object
    },
  }
  var addressDisplay = ''
    async function connectEthProvider(reconnect=false) {
        if(!$address) {
            await initProvider(app, reconnect);
            addressDisplay = String($address).slice(0,10)+"...";
            $address = $address;
        }
    }
    
    async function toggle(event){
      document.getElementById("sidebar").classList.toggle('active');
      document.getElementById("window").classList.toggle('active2');
      document.getElementById("menu1").classList.toggle('active3');
      document.getElementById("menu2").classList.toggle('active4');
    }
    
    function connect(event) {
        connectEthProvider(false);
    }    

    async function mint(event) {
      await mintHex(contract, provider);
    }
    const app = writable({});
    //export const innerHeight = writable(1000)
    //export const innerWidth = writable(1000) Any use for these
    setContext('app', app);
    console.log(window.location.href);
</script>

<div class="main">
  
    <Audio controls={false}>
        <source
          src="/"
          type="audio/mp3" />
      </Audio>
      <div class="menu" on:click={toggle} style="position: fixed;z-index: 10;transition: all 0.34s;position: relative;width: 2rem;height: 2rem;border-radius: 100%;cursor: pointer;"><div class="menu_part" id="menu1" style=""></div><div class="menu_part" id="menu2" style=""></div></div>

      <Router url="{url}">
        
        <header id="sidebar">
          <div class="left-box">
                     <Link to="/"> <img  on:click={toggle} src="/imgs/robot.svg" width="50px" height="50px" alt=""></Link>
          </div>

          <nav>
             <!--
            <Link to="/"><p on:click={toggle} class="nav-text" >HOME</p></Link>
            <a href="#mint"><p on:click={toggle} class="nav-text" >Mint</p></a>
            <Link to="roadmap"><p on:click={toggle} class="nav-text" >Roadmap</p></Link>
           -->
            
            <Link to="mint"><p on:click={toggle} class="nav-text" >Mint</p></Link>
            
            <Link to="gallery"><p on:click={toggle} class="nav-text" >Gallery</p></Link>
            
          </nav>

          <div class="right-box">
            {#if !$address}
            <button on:click={connect} class="mint-button mint-button-2"></button>
          {:else}
        <Link to="mint"><button on:click={toggle}  class="mint-button mint-button-3"></button></Link>
          {/if} 
          </div>
        </header>

        <div class="router-window" id="window">
          <Route path="/"><Home /></Route>
          <Route path="/mint" component={Mint}><Mint /></Route>
          <Route path="/gallery" component={Gallery}><Gallery /></Route>
          <Route path="/*" component={Four}><Four /></Route>
        </div> 
      </Router>

    <script type="text/javascript" src="/script.js"></script>
    <footer>
    </footer>
</div>
<style>
	.main {
		text-align: center;
		padding: 0rem;
		margin: 0 auto;
    max-width:100vw;
    overflow-x:hidden;
    
	}
  .router-window{
    left:-164px;transition:all 0.2s ease;
    top:0px;position:fixed;
  }
  @keyframes flash{
    0%{opacity:1;}
    50%{opacity:0;}
    100%{opacity:1;}

  }

.mint-button{
	margin:auto;
  width:50px;
	min-width:auto;
	cursor:pointer;
  height:50px;
  border-radius:4px;
  border:1px solid black;
  transition:all 0.2s ease;
  font-weight:100;
  box-shadow:unset;
text-align:center;display:flex;
flex-flow:column;justify-content:center;
font-weight:300;
  padding:16px;
}
.mint-button-2{
  background-image:url('/imgs/wallet(1).svg');border-width:0px!important;}
  .mint-button-3{
    animation:flash 2s linear infinite;
  background-image:url('/imgs/wallet(2).svg');border-width:0px!important;}
.mint-button > p{
  transition:all 0.2s ease;
}
.mint-button:hover{
  background-color:transparent;  
  border:0px solid #f1f1f1;

}
.mint-button-2:hover{
  background-image:url('/imgs/wallet(2).svg');}
  
  nav{display:flex;
    flex-flow:row-reverse;
    justify-content:space-evenly;
    height:auto;
    transform:rotate(-90deg);
    margin:unset;
    text-transform:uppercase;
}
button{margin:1rem;}
#sidebar{
  transition:all 0.2s ease;
  top:0px;
  z-index:5;
  position:fixed;
  display:flex;
  width:100px;
  flex-flow:column;
  background:#f1f1f1;
  justify-content: space-between;
  padding: 4rem 2rem;
  box-shadow:unset;
  height: calc(100vh - 8rem);
}


#sidebar{left:-164px;transition:all 0.2s ease;}
#window{width:100vw;} 
@media only screen and (max-width: 900px) {
   .main-title{
  margin-top:unset;}
  .footer-text{font-size:0.6rem;}
}

</style>
