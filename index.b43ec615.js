function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},l={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in l){var t=l[e];delete l[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){l[e]=t},t.parcelRequired7c6=o),o("krGWQ"),o("kzzqr"),o("b5rV1");var r=o("kzzqr"),a=o("lyvUQ");const s=document.querySelector(".gallery"),i=new(0,r.default),c=document.querySelector(".loader"),d=document.querySelector(".movies-gallery");async function u(){try{c.style.display="block",d.style.height="350px";const e=await i.fetchTrendingFilms(),t=await i.getGenres();e.results.forEach((e=>{e.genre_names=e.genre_ids.map((e=>t.find((({id:t})=>t===e)))).map((({name:e})=>e))})),s.innerHTML=(0,a.createMarkup)(e.results)}catch(e){console.log(e)}finally{c.style.display="none",d.style.height="auto"}}u();var g=o("fb9GJ");a=o("lyvUQ");const m=document.getElementById("tui-pagination-container"),y=document.querySelector(".gallery"),f={totalItems:2e4,page:1,itemsPerPage:20,visiblePages:5},p=new(e(g))(m,f);p.on("afterMove",(async function(e){return window.scrollTo({top:0,behavior:"smooth"}),f.page=e.page,i.page=e.page,null!==i.inputValue?await async function(){try{const e=await i.fetchSearchFilms(),t=await i.getGenres();return e.results.forEach((e=>{e.genre_names=e.genre_ids.map((e=>t.find((({id:t})=>t===e)))).map((({name:e})=>e))})),y.innerHTML=(0,a.createMarkup)(e.results),e}catch(e){console.log(e)}}():await u()})),i.fetchTrendingFilms().then((function({total_results:e}){f.totalItems=e,p.setTotalItems(e),m.classList.remove("visually-hidden")})).catch((e=>console.error(e)));a=o("lyvUQ");const h=document.querySelector(".header__form"),v=document.querySelector(".gallery"),E=document.querySelector(".header__form-warning-text"),b=document.querySelector(".loader");h.addEventListener("submit",(async e=>{e.preventDefault(),i.inputValue=e.target.elements.searchQuery.value.trim().toLowerCase(),i.page=1;try{b.style.display="block";const t=await i.fetchSearchFilms(),n=await i.getGenres();if(p.setTotalItems(t.total_results),0===t.results.length)return e.target.reset(),p.setTotalItems(t.results.length),void E.classList.remove("visually-hidden");t.results.forEach((e=>{e.genre_names=e.genre_ids.map((e=>n.find((({id:t})=>t===e)))).map((({name:e})=>e))})),E.classList.add("visually-hidden"),v.innerHTML=(0,a.createMarkup)(t.results),p.movePageTo(1),f.page=1,p.setTotalItems(t.total_results),f.totalItems=t.total_results}catch(e){console.log(e)}finally{b.style.display="none"}})),o("bTcpz"),o("6HA5D"),o("I2Abx");const w={disableScroll(){document.body.classList.add("stop-scrolling")},enableScroll(){document.body.classList.remove("stop-scrolling")}},L={btnLoginOpenEl:document.querySelector(".login__btn"),btnOutEl:document.querySelector(".logout__btn"),btnCloseAutEl:document.querySelector('button[data-action="close"]'),loginBackdropEl:document.querySelector(".login-modal-backdrop"),loginModalEl:document.querySelector(".modal-container"),logoutBtnEl:document.querySelector(".nav-btn.logout__btn"),loginFormEl:document.querySelector(".modal-form.login"),registerFormEl:document.querySelector(".modal-form.register"),modalBtnEls:document.querySelectorAll('.modal-form button[data-action="toggle"]')};function _(){L.loginFormEl.classList.toggle("is-hidden"),L.registerFormEl.classList.toggle("is-hidden")}function S(){w.enableScroll(),L.loginBackdropEl.classList.toggle("is-hidden"),window.removeEventListener("keydown",q)}function q(e){"Escape"===e.code&&S()}L.modalBtnEls[0].addEventListener("click",_),L.modalBtnEls[1].addEventListener("click",_),L.btnLoginOpenEl.addEventListener("click",(function(){w.disableScroll(),L.loginBackdropEl.classList.toggle("is-hidden"),window.addEventListener("keydown",q)})),L.btnCloseAutEl.addEventListener("click",S),L.loginBackdropEl.addEventListener("click",(function(e){e.target===e.currentTarget&&S()}));
//# sourceMappingURL=index.b43ec615.js.map
