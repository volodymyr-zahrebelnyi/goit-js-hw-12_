import{a as g,S as $,i as L}from"./assets/vendor-ee72e1a4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();g.defaults.baseURL="https://pixabay.com/api/";const E="44794510-78ac4561676a1628ffedd5f1c";async function b(t,s=1){const r=new URLSearchParams({key:E,q:t,per_page:15,page:s,image_type:"photo",orientation:"horizontal",safesearch:!0});try{return(await g.get(`?${r}`)).data}catch{throw new Error(response.status)}}const v=document.querySelector(".js-loader");function w(t){return t.map(({webformatURL:s,largeImageURL:r,tags:i,likes:e,views:o,comments:n,downloads:q})=>`<li class="gallery-item">
            <a class="gallery-link js-item" href="${r}" data-image-description="${i}">
                <img
                    class="gallery-image"
                    src="${s}" 
                    data-source="${r}" 
                    alt="${i}" 
                     width="360" height="200"
                    />
                    </a>
                <div class="image-info-wrap">
                    <div class="image-info">
                        <h2 class="title">
                        Likes
                        <p class="amount">${e}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Views
                        <p class="amount">${o}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Comments
                        <p class="amount">${n}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Downloads
                        <p class="amount">${q}</p>
                        </h2>
                    </div>
                </div>
        </li>`).join("")}function B(){new $(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}function M(){v.style.display="block"}function S(){v.style.display="none"}function c(){L.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}const f=document.querySelector(".js-gallery"),j=document.querySelector(".js-search-form"),d=document.querySelector('[data-action="load-more"]'),p=document.querySelector(".js-btn-up"),h="is-hidden",y=15;let u="",a=1,P=0;l();m();j.addEventListener("submit",T);d.addEventListener("click",x);p.addEventListener("click",k);async function T(t){t.preventDefault(),f.innerHTML="",a=1;const s=t.currentTarget;if(u=s.elements.query.value.trim().toLowerCase(),!u){c(),l(),m();return}M(),l(),m();try{const r=await b(u,a);if(P=Math.ceil(r.totalHits/y),!r.hits.length){c();return}f.insertAdjacentHTML("afterbegin",w(r.hits)),B(),r.totalHits>y&&C()}catch{c()}finally{S(),s.reset()}}async function x(){a+=1,H(),M();try{const t=await b(u,a);if(!t.hits.length){c(),l();return}f.insertAdjacentHTML("beforeend",w(t.hits)),B(),A(),a>1&&D(),a===P?(l(),L.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):O()}catch{c()}finally{S()}}function l(){d.classList.add(h)}function C(){d.classList.remove(h)}function H(){d.disabled=!0}function O(){d.disabled=!1}function A(){const{height:t}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function m(){p.classList.add(h)}function D(){p.classList.remove(h)}function k(){window.scrollTo({top:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
