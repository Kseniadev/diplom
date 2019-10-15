!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=24)}({0:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"d",(function(){return i})),r.d(t,"e",(function(){return a})),r.d(t,"f",(function(){return o})),r.d(t,"g",(function(){return s})),r.d(t,"a",(function(){return u})),r.d(t,"c",(function(){return c}));var n="d73506fc03d54bf7bfe482b2271b6f9e",i=/(\d{1,2}\.\d{1,2}\.\d{1,4})/g,a=/(\d{1,2})\.(\d{1,2})\.(\d{1,4})/g,o=localStorage.getItem("newsArray"),s=localStorage.getItem("query"),u=["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"],c=/(\d{1,4})-(\d{1,2})-(\d{1,2})/g},24:function(e,t,r){"use strict";r.r(t);r(8);var n=r(0),i=r(3),a=r(4);function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}var u,c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l.set(this,{writable:!0,value:document.forms.news.elements.keyword}),d.set(this,{writable:!0,value:document.querySelector(".load-info__fail-description")}),f.set(this,{writable:!0,value:document.querySelector(".load-info__fail")}),h.set(this,{writable:!0,value:document.querySelector(".cards-grid")}),b.set(this,{writable:!0,value:document.querySelector(".load-info__loader")}),y.set(this,{writable:!0,value:document.querySelector(".cards-grid__show-more-button")}),p.set(this,{writable:!0,value:document.querySelector(".cards-grid__container")}),m.set(this,{writable:!0,value:document.querySelector(".content-info__button")}),v.set(this,{writable:!0,value:document.querySelector(".content-info__title")}),this.bind()}var t,r,n;return t=e,(r=[{key:"bind",value:function(){this.addToStorage=this.addToStorage.bind(this),this.showMore=this.showMore.bind(this),this.starting=this.starting.bind(this),this.deleteCards=this.deleteCards.bind(this)}},{key:"addListener",value:function(){s(this,y).addEventListener("click",this.showMore)}},{key:"removeListener",value:function(){s(this,y).removeEventListener("click",this.showMore)}},{key:"starting",value:function(e){this.array=e,this.array.length>3?(s(this,y).setAttribute("style","display:block;"),this.create(this.array.splice(0,3))):(this.create(this.array),this.removeListener(),s(this,y).removeAttribute("style"))}},{key:"showMore",value:function(){this.starting(this.array)}},{key:"addToStorage",value:function(e){localStorage.setItem("newsArray",JSON.stringify(e)),this.starting(JSON.parse(localStorage.getItem("newsArray")))}},{key:"deleteCards",value:function(){for(;s(this,p).firstChild;)s(this,p).removeChild(s(this,p).firstChild);s(this,h).setAttribute("style","display:none"),s(this,v).setAttribute("style","display:none"),s(this,p).setAttribute("style","display:none"),s(this,y).setAttribute("style","display:none"),s(this,m).setAttribute("style","display:none;")}},{key:"create",value:function(e){s(this,v).setAttribute("style","display:block"),s(this,h).setAttribute("style","display:block"),s(this,m).setAttribute("style","display:block;"),s(this,p).setAttribute("style","display:grid"),e.forEach((function(e){var t=document.createElement("a");t.setAttribute("class","cards-grid__item"),t.setAttribute("href",e.url),t.setAttribute("target","_blank"),t.setAttribute("style","display:block");var r=document.createElement("img");r.setAttribute("class","cards-grid__item-image"),r.setAttribute("alt",e.title),r.setAttribute("target","_blank"),r.setAttribute("src",e.urlToImage);var n=document.createElement("div");n.setAttribute("class","cards-grid__item-date"),n.textContent=Object(a.a)(e.publishedAt);var i=document.createElement("h3");i.setAttribute("class","cards-grid__item-subtitle"),i.textContent=e.title;var o=document.createElement("p");o.setAttribute("class","cards-grid__item-description"),o.textContent=e.description;var s=document.createElement("div");s.setAttribute("class","cards-grid__item-source"),s.textContent=e.source.name,t.append(r),t.append(n),t.append(i),t.append(o),t.append(s),document.querySelector(".cards-grid__container").append(t)}))}},{key:"disableInput",value:function(){s(this,l).setAttribute("disabled","disabled"),s(this,l).setAttribute("style","background: #ffffff4d; color: #00000040;")}},{key:"enableInput",value:function(){s(this,l).removeAttribute("disabled"),s(this,l).removeAttribute("style")}},{key:"showLoader",value:function(){s(this,h).setAttribute("style","display:block"),s(this,b).setAttribute("style","display:block")}},{key:"hideLoader",value:function(){s(this,b).setAttribute("style","display:none")}},{key:"hideLoadError",value:function(){s(this,f).setAttribute("style","display:none;")}},{key:"showLoadError",value:function(e){"TypeError: Failed to fetch"===e.toString()?s(this,d).textContent="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз":s(this,d).textContent=e,s(this,f).setAttribute("style","display:block;")}}])&&o(t.prototype,r),n&&o(t,n),e}(),l=new WeakMap,d=new WeakMap,f=new WeakMap,h=new WeakMap,b=new WeakMap,y=new WeakMap,p=new WeakMap,m=new WeakMap,v=new WeakMap,g=new Date(Date.now()+36e5).toLocaleString().match(n.d).join("").replace(n.e,(function(e,t,r,n){return"".concat(n,"-").concat(r,"-").concat(t)})),w=new Date(Date.now()-5184e5).toLocaleString().match(n.d).join("").replace(n.e,(function(e,t,r,n){return"".concat(n,"-").concat(r,"-").concat(t)})),k=new c;var A=document.querySelector(".search-block"),_=document.querySelector(".search-block__form").elements.keyword;var S=document.querySelector(".search-block__form").elements.keyword,E=new c;document.querySelector(".search-block__button").addEventListener("click",(function(){event.preventDefault(),_.value.length>0?(u&&u.remove(),function(){event.preventDefault();var e=_.value;k.deleteCards(),k.showLoader(),k.removeListener(),k.disableInput(),new i.a("https://newsapi.org/v2/everything?q=".concat(e,"&apiKey=").concat(n.b,"&pageSize=100&from=").concat(g,"&to=").concat(w,"&language=ru")).getInfoFromApi().then((function(t){return k.hideLoadError(),localStorage.setItem("query",JSON.stringify(e)),localStorage.setItem("totalResults",JSON.stringify(t.totalResults)),t.articles})).then((function(e){k.addToStorage(e),k.hideLoader(),k.enableInput(),k.addListener()})).catch((function(e){k.hideLoader(),k.deleteCards(),k.showLoadError(e),k.enableInput(),localStorage.removeItem("newsArray")}))}()):((u=document.createElement("div")).setAttribute("class","error-message"),u.textContent="Нужно ввести ключевое слово",A.append(u))})),null!==JSON.parse(n.f)&&(S.setAttribute("placeholder",JSON.parse(n.g)),E.addListener(),E.starting(JSON.parse(n.f)))},3:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}r.d(t,"a",(function(){return i}));var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=t}var t,r,i;return t=e,(r=[{key:"getInfoFromApi",value:function(){return fetch(this.url).then((function(e){return e.status>=200&&e.status<300?Promise.resolve(e.json()):Promise.reject(new Error(e.statusText))})).then((function(e){return 0===e.totalResults?Promise.reject(e="К сожалению, по вашему запросу ничего не найдено"):"Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key."===e.message?Promise.reject(e="Неправильно указан ключ API, подробности на сайте: https://newsapi.org "):e}))}}])&&n(t.prototype,r),i&&n(t,i),e}()},4:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(0);function i(e){return e.match(n.c).join("").replace(n.c,(function(e,t,r,i){return"".concat(i," ").concat(n.a[r.substr(1)],", ").concat(t)}))}},8:function(e,t,r){}});