<script>
    //Help import data from opensea <3 
    export let nftlink = 'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/42177050677546159779710000316165471247211713436920374376455667151256854462465';
    export let nftimage = '/imgs/bot.png';
    export let nfttitle = 'GURA BOT #12';
    export let desc = 'Strings are a collection of unidimensional objects, pure in form, and vibrant in their variety of stochastic behavior. ';
    export let protocol = 'ERC-1155';
    export let owner = 'CA785C';
    export let ownerlink = undefined;
</script>

<div class="card-wrapper">
    
    <div class="card">
        <div class="row">
            <div class="nft-image">
                <img src="{nftimage}" alt="">
            </div>
            <!--
            <div class="links">
                <a href="{nftlink}"><img style="margin:1rem;" width="64px" height="64px" src="/imgs/external-link.svg" alt=""></a>
                <a href="{nftlink}"><img style="margin:1rem;" width="64px" height="64px" src="/imgs/external-link.svg" alt=""></a>
                <a href="{nftlink}"><img style="margin:1rem;" width="64px" height="64px" src="/imgs/external-link.svg" alt=""></a>
            </div>
            -->
        </div>
        <div class="desc">
            <h1>{nfttitle}</h1>
            <div style="margin:0.5rem 0rem;height:3px;width:4rem;margin-right:calc(100% - 4rem);background:white;border-radius:5px;"></div>
            <p>{desc}</p>
            {#if ownerlink}
                <p>OWNED BY: <a style="display:inline;" href="{ownerlink}"><b>{owner}</b></a></p>
            {/if}
            <p>PROTOCOL: <b>{protocol}</b></p>
            <slot>
            </slot>            
        </div>
    </div>

</div>

<div class="wrapper">
    <div class="mint-box">
      <div class="img-box">
        <img src="{nftimage}" alt="">
       </div>
       <div class="text-row">
         <p>{nfttitle}</p>
         <p><b>1.0 ETH</b></p>
       </div>
    </div>
 </div>
 


<style>
 .mint-box{width:350px;height: min-content;margin:auto;}
 .img-box{width:350px;height:350px;}
 .text-row{display:flex;flex-flow:row;justify-content: space-between;}
 .wrapper{    
   position: absolute;
   margin:auto;
   left: 0px;
   width:100vw;display:flex;flex-flow:row;justify-content:center;
   top:calc(4rem + 100px);
   height:calc(100vh - 150px - 4rem);
 }
</style>
