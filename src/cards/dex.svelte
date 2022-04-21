<script>
    //Help import data from opensea <3 
    export let nftlink = 'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/42177050677546159779710000316165471247211713436920374376455667151256854462465';
    export let nftimage = '/imgs/wind.svg';
    export let nfttitle = 'STRING #1';
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

<style>
    .card{
        text-align: left;
        width: auto;
        min-height: 480px;
        background: #2229;
        box-shadow:  40px 40px 40px #777;
        border-radius: 30px;
        padding: 30px;
        max-width: calc(100vw - 10rem);
    }
    .nft-image{
        display: flex;
        align-items: flex-start;
        position: relative;
        z-index: 4;
        width:100%;
    }
    p > a{
    }
    @keyframes float {
        0%{transform:translatey(0px);}
        25%{transform:translatey(5px);}
        50%{transform:translatey(0px);}
        75%{transform:translatey(-5px);}
        100%{transform:translatey(0px);}
    }
    .nft-image > img{
        animation: float 5s linear infinite;
        width: 100%;
        height: auto;
        flex-shrink: 0;
        position: relative;
        margin-bottom:2rem;
        z-index: 2;
        border-radius: 50%;
        z-index: 1;        
        box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.67);

    }
    @media screen and (max-width: 1000px) {
        .row{max-width:400px;flex-flow:column!important;}
        .nft-image > img{width:100%;height:auto;}
  
    }
    .row{display:flex;flex-flow:row;}
    .links{    
        flex: 1;
        padding-left: unset;
        display: flex;
        flex-flow: wrap;
        justify-content: center;}
    .card-wrapper{
        display: flex;
    flex-flow: wrap;padding:4rem 0rem;
    justify-content: center;
max-width:512px;margin:auto;
    }
    @keyframes glow{
        0%{filter:brightness(1);}
        50%{filter:brightness(1.5);}
        100%{filter:brightness(1);}
    }
    .card:hover{
        animation: glow 0.2s 1;
    }
</style>