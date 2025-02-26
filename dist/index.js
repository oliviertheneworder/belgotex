(()=>{var q=document.getElementById("cookie-banner"),ye=document.getElementById("customise-cookies"),ke=document.getElementById("save-cookies"),Se=document.getElementById("accept-all-cookies"),xe=document.getElementById("accept-all-cookies-2"),Ce=document.querySelector(".cookie-form-wrap"),Te=document.querySelector(".cookie-save-wrap"),Fe=document.querySelector(".cookie-button-wrap"),qe=document.getElementById("AnalyticsCookie"),_e=document.getElementById("MarketingCookie");function j(e,t,o){let a=new Date;a.setTime(a.getTime()+o*24*60*60*1e3),document.cookie=`${e}=${encodeURIComponent(t)}; expires=${a.toUTCString()}; path=/; SameSite=Lax; Secure`}function Re(e){let t=document.cookie.split("; ");for(let o=0;o<t.length;o++){let[a,n]=t[o].split("=");if(a===e)return decodeURIComponent(n)}return null}function Ie(){let e=Re("user_consent");try{if(e){let t=JSON.parse(e);L(t),q.style.display="none"}else q.style.display="flex"}catch{q.style.display="flex"}}function L(e){typeof gtag=="function"&&gtag("consent","update",{ad_storage:e.marketing?"granted":"denied",analytics_storage:e.analytics?"granted":"denied",ad_user_data:e.marketing?"granted":"denied",ad_personalization:e.marketing?"granted":"denied"}),typeof fbq=="function"&&!e.marketing&&fbq("consent","revoke")}function Be(){let e={analytics:qe.checked,marketing:_e.checked};j("user_consent",JSON.stringify(e),365),L(e),V()}function H(){let e={analytics:!0,marketing:!0};j("user_consent",JSON.stringify(e),365),L(e),V()}function V(){q.style.opacity="0",setTimeout(()=>q.style.display="none",300)}function Ue(){Ce.style.display="block",Te.style.display="grid",Fe.style.display="none"}ye.addEventListener("click",Ue);ke.addEventListener("click",Be);Se.addEventListener("click",H);xe.addEventListener("click",H);Ie();var W=window.location.search,x={},Q=Le("utm_tracking");Q&&(x=JSON.parse(Q));if(W.length>0){let e=Object.fromEntries(new URLSearchParams(W));x={...x,...e,utm_duration:Date.now()},Oe("utm_tracking",JSON.stringify(x),365)}$("form").each(function(){$(this).find('input[name="UTM Source"]').val(x.utm_source||""),$(this).find('input[name="UTM Medium"]').val(x.utm_medium||""),$(this).find('input[name="UTM Campaign"]').val(x.utm_campaign||""),$(this).find('input[name="UTM Content"]').val(x.utm_content||""),$(this).find('input[name="UTM Term"]').val(x.utm_term||""),$(this).find('input[name="UTM Duration"]').val(Math.floor(x.utm_duration/(1e3*60*60*24))||"")});$("#quoteForm").on("submit",function(){let e="Thank You | "+document.title,t=window.location.pathname+"/thank-you";Pe(t,e)});function Oe(e,t,o){let a=new Date(Date.now()+o*864e5).toUTCString();document.cookie=e+"="+encodeURIComponent(t)+"; expires="+a+"; path=/"}function Le(e){return document.cookie.split("; ").reduce((t,o)=>{let a=o.split("=");return a[0]===e?decodeURIComponent(a[1]):t},"")}function Pe(e,t){if(typeof ga=="function"){let o=typeof google_tag_manager<"u"?ga.getAll()[0].get("name")+".send":"send";ga(o,"pageview",{page:e,title:t})}else console.log("ga() not defined")}Ne();function Me(e){return e.replace(/&amp;/g,"&").replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029\uFEFF\uFFFD]/g,"").trim()}function De(){let e=[];return $('[data="installers"]').each(function(){try{let t=$(this).text().replace(",}","}"),o=Me(t),a=JSON.parse(o);e.push(a)}catch(t){console.error("Failed to parse JSON:",$(this).text(),t)}}),e}function Ee(e,t,o){return`
            <div class="${t}-fieldset ${t}-fieldset-province">
                <label for="${e}-Province" class="field-label">Province</label>
                <select autocomplete="dont-auto-complete" id="${e}-Province" name="${e}-Province" data-name="Installer" required class="${t}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            <div class="${t}-fieldset ${t}-fieldset-city" style="display: none;">
                <label for="${e}-City" class="field-label">City</label>
                <select autocomplete="dont-auto-complete" id="${e}-City" name="${e}-City" data-name="${e} City" required class="${t}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            ${o?`
            <div class="${t}-fieldset ${t}-fieldset-suburb" style="display: none;">
                <label for="${e}-Suburb" class="field-label">Suburb</label>
                <select autocomplete="dont-auto-complete" id="${e}-Suburb" name="${e}-Suburb" data-name="${e} Suburb" class="${t}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            <div class="${t}-fieldset ${t}-fieldset-installer" style="display: none;">
                <label for="${e}-Installer" class="field-label">Authorised Installer</label>
                <select autocomplete="dont-auto-complete" id="${e}-Installer" name="${e}-Installer" data-name="Authorised Installer" class="${t}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>`:""}
        `}function Ne(){if($(".installer-selector").length===0)return;let e=De();$(".installer-selector").each(function(){let t=$(this).data("prefix"),o=$(this).data("class-prefix"),a=$(this).closest("#belgotexTableForm").length>0,n=Ee(t,o,a);$(this).html(n);let r=$(this).find(`[name="${t}-Province"]`),s=$(this).find(`.${o}-fieldset-city`),c=$(this).find(`[name="${t}-City"]`),i=$(this).find(`.${o}-fieldset-suburb`),p=$(this).find(`[name="${t}-Suburb"]`),f=$(this).find(`.${o}-fieldset-installer`),v=$(this).find(`[name="${t}-Installer"]`),g=[...new Set(e.map(u=>u.province.trim()).sort())];r.html(m(g)).on("change",function(){let u=$(this).val(),h=[...new Set(e.filter(y=>y.province.trim()===u).map(y=>y.city.trim()).sort())];s.hide(),i.hide(),f.hide(),h.length>0&&(s.show(),c.html(m(h)).off("change").on("change",function(){let y=$(this).val(),w=e.filter(b=>b.province.trim()===u&&b.city.trim()===y);if(i.hide(),f.hide(),a){let b=[...new Set(w.flatMap(l=>l.all_suburbs?l.all_suburbs.split(",").map(d=>d.trim()):[l.suburb.trim()]).sort())];if(w.length>5&&b.length>0)i.show(),p.html(m(b)).off("change").on("change",function(){let l=$(this).val(),d=[...new Set(w.filter(k=>k.all_suburbs?k.all_suburbs.split(",").map(I=>I.trim()).includes(l):k.suburb.trim()===l).map(k=>k.name).sort())];f.show(),v.html(m(d))});else{let l=[...new Set(w.map(d=>d.name).sort())];f.show(),v.html(m(l))}}else{let b=[...new Set(w.map(l=>l.name).sort())];f.show(),v.html(m(b))}}))});function m(u){return`<option value="">Select one...</option>${u.map(h=>`<option value="${h}">${h}</option>`).join("")}`}r.html(m(g))})}var Z=ShopifyBuy.buildClient({domain:"belgotex.myshopify.com",storefrontAccessToken:"70183538aae9e241ad5035415de0a843"}),T=document.querySelector("#checkoutButton");T&&!T.disabled&&T.addEventListener("click",async e=>{T.disabled=!0,T.textContent="Processing...";try{let t=window.open("","_blank");t.document.write("Loading checkout...");let o=await Z.checkout.create(),a=document.querySelectorAll(".samples-detail-sdk");if(!a.length)throw new Error("No samples selected");let n="",r=0;a.forEach(g=>{let m=g.querySelector(".sample-range")?.textContent||"Unknown Range",u=g.querySelector(".sample-colour")?.textContent||"Unknown Colour";r=150,n+=n.length?` / ${m} - ${u}`:`${m} - ${u}`});let s={variantString:n,price:r.toString()},i=await fetch("https://yudu-server.herokuapp.com/belgotex-sample-rug-api",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"Application/JSON"}});if(!i.ok)throw new Error(`Failed to fetch variant ID: ${i.statusText}`);let f=[{variantId:(await i.json()).id,quantity:1}],v=await Z.checkout.addLineItems(o.id,f);t.location.href=v.webUrl}catch(t){console.error("Error during checkout process:",t.message),alert("An error occurred while processing your checkout. Please try again later.")}finally{T.disabled=!1,T.textContent="Checkout"}});(function(){let e="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";function t(a){let n=document.createElement("script");n.async=!0,n.src=e,n.onload=a,document.head.appendChild(n)}function o(){let a=ShopifyBuy.buildClient({domain:"shop.belgotex.co.za",storefrontAccessToken:"70183538aae9e241ad5035415de0a843"});ShopifyBuy.UI.onReady(a).then(function(r){r.createComponent("collection",{id:"264254750874",node:document.getElementById("product-component-1617260095404"),moneyFormat:"R%20%7B%7Bamount%7D%7D",options:{product:{DOMEvents:{"click .shopify-buy__btn":async function(s){if(s.detail<2){$(parent.document.querySelector(".shopify-buy-button-component")).hide(),$(parent.document.querySelector(".add-to-cart-disabled")).show();let f="https://yudu-server.herokuapp.com/belgotex-custom-rug-api/",v=parent.document.querySelector("#inputWidth").value,g=parent.document.querySelector("#inputLength").value,m=parent.document.querySelector("#inputColour").value,u=parent.document.querySelector("#purchasePrice").innerHTML,h=parent.document.querySelector("#productCapture").innerText,y="Overlocked Edge",w="";[...$(parent.document.querySelectorAll(".preview-swatch-item"))].forEach(d=>{$(d).css("display")=="block"&&(w=$(d).find("img").attr("src"))});let l="";if(v&&g&&h&&m&&u&&w){let d="";l.length<1?d=`${v}cm x ${g}cm / ${h} / ${y} /`:d=`${v}cm x ${g}cm / ${h} / ${y} / ${l}`;let k,I;if(r.components.cart[0].lineItemCache.forEach(F=>{console.log("EVT title - ",F.variant.title),console.log("sameVariant - ",d),console.log("EVT title length - ",F.variant.title.length),console.log("sameVariant length - ",d.length),F.variant.title===d&&(k=F.variant,I=F.variant.id)}),I){r.components.collection[0].cart.addVariantToCart(k),s.stopPropagation(),r.openCart(),$(parent.document.querySelector(".shopify-buy-button-component")).show(),$(parent.document.querySelector(".add-to-cart-disabled")).hide();var c=$(parent.document.querySelector("#productCapture")).text().slice(0,-4).replace(/ /g,"-");console.log("title name: ",c);var i=`Add To Cart: ${c}`,p=`/add-to-cart/${c.toLowerCase()}`;console.log("track page view: ",p,i),BT_logPageView(p,i)}else{let $e={method:"POST",body:JSON.stringify({width:v,length:g,colour:m,name:h,trim:y,price:u,swatch:w,discount:l}),headers:{"Content-Type":"Application/JSON"}},we=await fetch(f,$e).then(be=>be.json());r.components.collection[0].cart.addVariantToCart(we);var c=$(parent.document.querySelector("#productCapture")).text().slice(0,-4).replace(/ /g,"-");console.log("title name: ",c);var i=`Add To Cart: ${c}`,p=`/add-to-cart/${c.toLowerCase()}`;console.log("track page view: ",p,i),BT_logPageView(p,i),$(parent.document.querySelector(".shopify-buy-button-component")).show(),$(parent.document.querySelector(".add-to-cart-disabled")).hide()}}}}},iframe:!1,styles:{product:{"@media (min-width: 601px)":{width:"100%","margin-left":"0","margin-bottom":"0"},width:"100%","margin-left":"0","margin-bottom":"0",options:{display:"none"}},button:{"font-family":"'Circular Pro', Helvetica, sans-serif",margin:"0","font-size":"1rem",padding:"0.75em 1.5em",color:"#FFF","background-color":"#292524",border:"0","border-radius":"100vw",":hover":{color:"#FFF","background-color":"#f33"},":focus":{"background-color":"#f33",color:"#FFF",border:"none"}}},contents:{img:!1,title:!1,price:!1},text:{button:"Add to Cart"}},productSet:{styles:{products:{"@media (min-width: 601px)":{"margin-left":"-20px"}}}},modalProduct:{contents:{img:!1,imgWithCarousel:!0,button:!1,buttonWithQuantity:!0},styles:{product:{"@media (min-width: 601px)":{"max-width":"100%","margin-left":"0px","margin-bottom":"0px"}},button:{"font-weight":"bold","background-color":"#FF3333","border-radius":"0px",":hover":{"background-color":"#FF3333"},":focus":{"background-color":"#FF3333"}}},text:{button:"Add to Cart"}},option:{},cart:{styles:{button:{"font-weight":"bold",":hover":{"background-color":"#FF3333"},"background-color":"#FF3333",":focus":{"background-color":"#FF3333"},"border-radius":"0px"}},text:{total:"Subtotal",button:"Checkout"},events:{afterInit:s=>{s.onCheckout=()=>{let c=s.model.webUrl;s.checkout.config.cart.popup=!1,window.open(c,"_blank")}}}},toggle:{styles:{toggle:{"font-weight":"bold","background-color":"#FF3333",":hover":{"background-color":"#FF3333"},":focus":{"background-color":"#FF3333"}}}}}})});let n={};$(".miraclerug-product-wrapper, .miracle-rug-collection-item").each((r,s)=>{let c=$(s).find(".miraclerug-name").html(),i=$(s).find('.size-choice[rugsize="small"]'),p=$(s).find('.size-choice[rugsize="medium"]'),f=$(s).find('.size-choice[rugsize="large"]'),v=$(s).find(".price-small").html(),g=$(s).find(".price-small-sale").html(),m=$(s).find(".price-medium").html(),u=$(s).find(".price-medium-sale").html(),h=$(s).find(".price-large").html(),y=$(s).find(".price-large-sale").html(),w=b=>{let l,d;switch(b){case"small":l=g,d=v;break;case"medium":l=u,d=m;break;case"large":l=y,d=h;break}$(s).find(".update-price").html(`R ${G(l)}`),$(s).find(".update-sales-price").html(`R ${G(d)}`)};i.css("display")!="none"?(i.addClass("active"),w("small")):p.css("display")!="none"?(p.addClass("active"),w("medium")):f.css("display")!="none"&&(f.addClass("active"),w("large")),$(s).find(".size-choice").click(function(){let b=$(this).attr("rugsize");$(s).find(".size-choice").removeClass("active"),$(this).addClass("active"),w(b)}),$(s).find("#Miracle_add_to_cart").click(function(b){let l=$(s).find(".size-choice.active").attr("rugsize"),d=$(s).find(`.id-${l}`).html();n.id=window.btoa(d);let k=ShopifyBuy.UI.init(a);k.components.cart[0].addVariantToCart(n),b.stopPropagation(),k.openCart()})})}t(()=>{window.ShopifyBuy&&ShopifyBuy.UI?o():console.error("ShopifyBuy SDK failed to load.")})})();jQuery(".miraclerug-ar-link").each(function(){$ar_link=jQuery(this),$ar_link.on("click",function(){var e=jQuery(this).closest(".miraclerug-size-ratio").siblings(".h6").text(),t=`${e} - Augmented Reality`,o=`/miraclerug/ar-download/${e.toLowerCase()}`;console.log("track page view: ",o,t),BT_logPageView(o,t)})});function G(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}$("#next-1").css("opacity","0");$("#next-2").css("opacity","0");$(':radio[name="RatePartner"]').change(function(){RatePartner=$('input[name="RatePartner"]:checked').val(),RatePartner&&($("#RatePartner .star-solid").css("display","none"),$(this).parent().find(".star-wrapper").find(".star-solid").css("display","inline-block"),$("#next-1").css("opacity","1"))});$(':radio[name="RateBelgotex"]').change(function(){RateBelgotex=$('input[name="RateBelgotex"]:checked').val(),RateBelgotex&&($("#RateBelgotex .star-solid").css("display","none"),$(this).parent().find(".star-wrapper").find(".star-solid").css("display","inline-block"),$("#next-2").css("opacity","1"))});var S=JSON.parse(localStorage.getItem("sampleArray"))||[],C=JSON.parse(localStorage.getItem("sampleItems"))||[];function Y(e){return e.map(t=>t.replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase())).join(", ")}$("template").remove();$("#triggerSamplesCustomer").click(function(){$("#samplesCustomer").show(),$("#samplesPro").hide();var e=Y(S);$("#selectedConsumer").val(e)});$("#triggerSamplesPro").click(function(){$("#samplesPro").show(),$("#samplesCustomer").hide();var e=Y(S);$("#selectedPro").val(e)});$(".samples-detail-wrapper").append("<a id='addMoreSamples' class='addMoreSamples button w-button hide' style='margin-top:20px;pointer-events:auto;'>Add More Samples</a>");$("#addMoreSamples").click(function(){$(".samples-close-cart").click()});function B(){var e=$(".samples-detail-wrapper .samples-detail").length;$(".samples-tab .samples-tab-count").text(e),e>0?($(".remove-notice").addClass("hide"),$(".samples-tab").css("display","flex"),$("#addMoreSamples").removeClass("hide")):($(".remove-notice").removeClass("hide"),$(".samples-tab").css("display","none"),$("#addMoreSamples").addClass("hide"),S=[],C={}),e===5&&$("#addMoreSamples, #addSamplesNote").addClass("hide")}function K(e){var t=e.theRange,o=e.theColor,a=e.theSwatch,n=e.rangeURL.split(/[#?]/)[0];return t?`
        <div class='samples-detail samples-detail-sdk'>
            <div class='samples-image-wrapper'>
                <img src='${a}' loading='lazy' sizes='100vw' alt='Sample Swatch' class='samples-image'>
            </div>
            <div class='samples-name-wrapper'>
                <div class='samples-name'>
                    <a href='${n}' class='samples-range-link w-inline-block'>
                        <div class='sample-range'>${t}</div>
                    </a>
                    <div class='sample-colour'>${o}</div>
                </div>
                <div class='remove-samples'>
                    <div class='remove-icon'>
                        <div class='remove-bar'></div>
                    </div>
                </div>
            </div>
        </div>`:""}function X(e){var t=e.sampleID,o=K(e);$(".samples-detail-wrapper .samples-detail").length<5?S.includes(t)?alert(e.theRange+" "+e.theColor+" has already been added."):($(".samples-detail-wrapper").prepend(o),S.push(t),C[t]=e,localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C))):alert("Sample limit reached! Orders are limited to 5 samples."),B()}function Ae(){for(var e in C){var t=K(C[e]);t&&$(".samples-detail-wrapper").prepend(t)}}$(".modal-contant-product .order-sample").click(function(){var e=$(this).parents(".modal-contant-product").find(".modal-titles").find("h2").text();e=e.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase());var t=$(this).parents(".modal-contant-product").find(".modal-titles").find("h3").text(),o=$(this).parents(".modal-contant-product").find(".room-render-grid").find("img").attr("src"),a=window.location.pathname.split(/[#?]/)[0],n=e+"-"+t,r={sampleID:n,theRange:e,theColor:t,theSwatch:o,rangeURL:a};X(r),$(".samples-tab").click().css("display","flex")});$("#range-get-sample").click(function(){var e=window.location.href.includes("/range/")?window.location.href.split("/range/")[1].split(/[#?]/)[0]:"";e=e.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase());var t=$(this).parents(".colour-control").find(".colour-name-confirmation").text(),o="";$(".preview-swatch-item").each(function(){$(this).css("display")=="block"&&(o=$(this).find(".preview-swatch-img").attr("src"))});var a=window.location.pathname.split(/[#?]/)[0],n=e+"-"+t,r={sampleID:n,theRange:e,theColor:t,theSwatch:o,rangeURL:a};X(r),$(".samples-tab").click().css("display","flex")});$(".samples-detail-wrapper").on("click",".samples-detail .samples-name-wrapper .remove-samples",function(){var e=$(this).parents(".samples-name-wrapper").find(".sample-range").text(),t=$(this).parents(".samples-name-wrapper").find(".sample-colour").text(),o=e+"-"+t;S=S.filter(a=>a!=o),delete C[o],localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C)),$(this).parents(".samples-detail-wrapper .samples-detail").fadeOut(200,function(){$(this).remove(),B()}),B()});$("#checkoutButton").prop("disabled",!0);window.resetSamples=function(){setTimeout(function(){$(".samples-detail").remove(),$(".remove-notice").removeClass("hide").css({"background-color":"#8ae68a",color:"#000"}).text("Your sample order is being processed."),$(".samples-close-cart, .samples-form-close").click(),$(".samples-tab").css("display","none"),S=[],C={},localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C))},3e3)};function ee(){let e=$("#samples-dealer").is(":checked");$("#sample-form-section").toggle(e),$("#sample-form-section input, #sample-form-section select, #sample-form-section textarea").prop("required",e),$('#sample-form-section input[type="checkbox"]').prop("required",!1)}function _(){let e=!0;$("#samples-dealer").is(":checked")?($("#sample-form-section input[required], #sample-form-section select[required], #sample-form-section textarea[required]").each(function(){if($(this).val()===""||$(this).val()===null)return e=!1,!1}),grecaptcha.getResponse()===""&&(e=!1)):e=!1,$("#checkoutButton").prop("disabled",$("#samples-dealer").is(":checked")&&!e)}ee();_();$("#samples-dealer").change(function(){ee(),_()});setTimeout(function(){var e=$("#Samples-Orders .recapture-wrapper");function t(){_()}e.hover(t),e.on("touchstart",t)},1500);$("#professionalsSubmit").prop("disabled",!0);$("#Samples-Professionals input, #Samples-Professionals select, #Samples-Professionals textarea").on("input change",function(){let e=!0;$("#Samples-Professionals input[required], #Samples-Professionals select[required], #Samples-Professionals textarea[required]").each(function(){if($(this).val()===""||$(this).val()===null)return e=!1,!1}),$("#professionalsSubmit").prop("disabled",!e)});$("#checkoutButton, #professionalsSubmit").click(function(){$(this).prop("disabled")||resetSamples()});$("#FixedQuote-City, .form-group, #sample-form-section input, #sample-form-section select, #sample-form-section textarea").on("input change",_);setTimeout(()=>{$("#checkoutButton, #professionalsSubmit").click(function(){$(this).prop("disabled")?_():resetSamples()})},500);Ae();B();$(window).on("pageshow",function(){P()});$(document).ready(function(){window.location.href.includes("/all-products")&&(P(),ze(),Je(),je(),He(),Ve(),We(),Qe(),Ze())});function P(){setTimeout(function(){$(".checkbox_toggle.fs-cmsfilter_active").each(function(){let e=$(this);e.find(".checkbox_toggle-dot").css("transform","translateX(15px)"),e.find(".checkbox_toggle-mask").css("background","#3cb300")}),$(".checkbox_toggle").not(".fs-cmsfilter_active").each(function(){let e=$(this);e.find(".checkbox_toggle-dot").css("transform","translateX(0)"),e.find(".checkbox_toggle-mask").css("background","#999")})},100)}function ze(){new MutationObserver(function(){P()}).observe(document.body,{childList:!0,subtree:!0})}function Je(){let e=[{field:"residential",label:"Residential",filterField:"sector"},{field:"commercial",label:"Commercial",filterField:"sector"},{field:"cto",label:"Rug",filterField:"solution"}];$(".filter-collection-item").each(function(){let t=$(this);e.forEach(o=>{t.find(`[fs-cmsfilter-field="${o.field}"]`).text()==="true"&&t.find(".filter-items").append(`<div fs-cmsfilter-field="${o.filterField}">${o.label}</div>`)})})}function je(){function e(){let t=$(".colour-checkbox.fs-cmsfilter_active .checkbox-label-colour"),o=$(".swatch-hex");t.length?(o.css("opacity","0.1"),t.each(function(){let a=$(this).text().trim();o.filter(function(){return $(this).text().trim()===a}).css("opacity","1")})):o.css("opacity","1")}$('[fs-cmsfilter-element="clear"], .colour-checkbox').on("click",function(){setTimeout(e,500)}),e()}function He(){let e=["#bfbf30","#b28659","#80191b","#6b998a","#336680","#ffffff","#808080","#000000"];$(".swatch-hex").each(function(){let a=$(this),n=a.css("background-color"),r="",s=1/0;e.forEach(c=>{let i=t(n,c);i<s&&(r=c,s=i)}),a.attr("fs-cmsfilter-field","colour"),a.html(a.html()+r.substring(1)),a.css({color:n,fontSize:"0px"})});function t(a,n){let r=o(a),s=o(n),c=r[0]-s[0],i=r[1]-s[1],p=r[2]-s[2];return Math.sqrt(c*c+i*i+p*p)}function o(a){let n=a.match(/^#?([0-9A-F]{6})$/i);if(n){let s=n[1],c=parseInt(s.substring(0,2),16),i=parseInt(s.substring(2,4),16),p=parseInt(s.substring(4,6),16);return[c,i,p]}let r=a.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);return r?[parseInt(r[1]),parseInt(r[2]),parseInt(r[3])]:[0,0,0]}}function Ve(){setTimeout(function(){$(".filter-collection-item").each(function(){let e=$(this),t=e.find(".collection-list-swatch").clone(),o=e.find(".filter-swatches-modal");e.find(".collection-item-swatch").css("width","20px"),t.appendTo(o)})},2e3)}function We(){$("#filterForm").on("click",function(){setTimeout(function(){$("#rug-checkbox-wrapper").hasClass("fs-cmsfilter_active")?$(".filter-img-rug").removeClass("hide"):$(".filter-img-rug").addClass("hide")},500)}),$("#clearFilter1, #clearFilter2").on("click",function(){$(".filter-img-rug").addClass("hide")}),window.location.href.includes("solution=Rug")&&$(".filter-img-rug").removeClass("hide")}function Qe(){setTimeout(function(){$(".filter-range-link").each(function(){$(this).attr("href").includes("miraclerug")&&$(this).find(".collection-list-swatch").remove()})},4e3)}function Ze(){let e=window.location.href;e.includes("/all-products")?$(".filter-item").each(function(){let t=$(this);t.find(".filter-heading").text().trim()==="Westminster"&&t.find(".compare-price").removeClass("w-condition-invisible")}):e.includes("/westminster")&&$("#w-node-f81ec8e2-6160-c1b6-e368-a4bbdf836105-bfd5d4f1").removeClass("w-condition-invisible")}var U=$("#home-ranges .w-dyn-items"),N=U.children(".feature"),re=N.filter(function(){return $(this).find("h3").text().includes("Panthera")}),se=N.filter(function(){return $(this).find("h3").text().includes("Highlands")}),ce=N.filter(function(){return $(this).find("h3").text().includes("Timbavati")});re.remove();se.remove();ce.remove();U.prepend(ce);U.prepend(se);U.prepend(re);var M,te,D,oe,ae,mt=window.location.href;$('input[name="Page Title"]').val(window.location.href);$('input[name="Page URL"]').val(window.location.href);window.location.href.indexOf("/range/custom-carpets-by-belgotex")>-1&&(window.location.href="/custom-carpets");function Ge(e,t,o){var a="";if(o){var n=new Date;n.setTime(n.getTime()+o*24*60*60*1e3),a="; expires="+n.toUTCString()}document.cookie=e+"="+(t||"")+a+"; path=/"}function Ye(e){for(var t=e+"=",o=document.cookie.split(";"),a=0;a<o.length;a++){for(var n=o[a];n.charAt(0)==" ";)n=n.substring(1,n.length);if(n.indexOf(t)==0)return n.substring(t.length,n.length)}return null}function Ke(){var e=new URLSearchParams(window.location.search),t=e.get("ref");if(t==="belgotex.com"){var o=Ye("userHasVisited");o||(document.getElementById("sitesModal").style.display="flex",Ge("userHasVisited","true",365))}}window.onload=function(){Ke()};var R=!1;$("#range-buy-rug").click(function(){R=!0,$(".colour-swatch.active").trigger("click")});$("#close-buy-rug").click(function(){R=!1,$(".colour-swatch.active").trigger("click")});$("#search-trigger").click(function(){setTimeout(function(){$("#search").focus()},100)});$(".swatch-link-block").click(function(){M=window.location.pathname,te=M.replace("/range/",""),D=$(this).find(".product-name").not(".thin").text().replace(/\s+/g,"-").toLowerCase(),oe=te+" - "+D,ae=M+"/"+D,BT_logPageView(ae,oe)});$("#pro-btn-wrapper").click(function(){$("#is-professional").val("Yes")});$("#free-btn-wrapper").click(function(){$("#is-professional").val("")});$("#order-for-professional").on("click",function(){$("#is-professional").val("Yes")});window.location.href.indexOf("/range/")>-1&&($("#isPayLater").text()==="true"&&($(".is-pay-later").css("display","block"),ne=$("#the-pay-later-price").text(),$("#pay-later-price").text(ne)),$(".shopify-buy__btn-wrapper").css("margin-top","0 !important"),$("#hideShopifyBuyButton").remove(),$(".hero-colour-img").attr("src")&&$(".hero-colour-content").css("padding","5vw"),$(".more-collection-list").each(function(){if($(this).children(".more-collection-item").length>5){for(var e=$(this).children(".more-collection-item"),t=$.makeArray(e),o=t.length-1;o>0;o--){var a=Math.floor(Math.random()*(o+1)),n=t[o];t[o]=t[a],t[a]=n}var r=t.slice(0,5);$(this).empty(),$(this).append(r)}}));var ne;$(".colour-swatch").on("click",function(){var e=$(this),t=e.find(".mto-flag"),o=e.find(".no-sample-flag"),a=$(".mto-note"),n=e.find(".colour-ar-link"),r=$(".hero-colour-swatch"),s=$(".colour-swatch-confirmation-img"),c=e.find(".wtw-fallback"),i=e.find(".cto-fallback");t.text()==="true"?a.removeClass("hide"):a.addClass("hide"),o.text()==="true"?$('[what_button="get_sample"]').hide():$('[what_button="get_sample"]').show(),$("#colour-control").css("display","flex"),$("#preview-swatch-wrapper").css("display","block"),n.attr("href")!==void 0&&$(".hero-ar-link").attr("href",n.attr("href"));var p=e.css("background-color"),f=e.find(".colour-name").text();f=f.replace("Lite","").replace("Ultra",""),$(".hero-colour-tint, .colour-swatch-confirmation").css("background-color",p),$(".colour-name-confirmation, .hero-colour-name, #colourName").text(f);var v=!1;if($(".preview-swatch-item").each(function(){var u=$(this);if(u.find(".preview-swatch-name").text()===f){u.css("display","block");var h=u.find(".preview-swatch-img").attr("src");r.attr("src",h),s.attr("src",h),v=!0}else u.css("display","none")}),R){if(i.length){var g=i.attr("src");g&&r.attr("src",g)}}else if(c.length){var m=c.attr("src");m&&r.attr("src",m)}});var Xe=document.querySelectorAll(".colour-swatch"),le=Array.from(Xe);le.sort(function(e,t){let o=e.style.backgroundColor.match(/\d+/g),a=t.style.backgroundColor.match(/\d+/g),n=ie(o[0],o[1],o[2]),r=ie(a[0],a[1],a[2]);return n[2]<r[2]?-1:n[2]>r[2]?1:n[0]<r[0]?-1:n[0]>r[0]?1:0});le.forEach(function(e){document.querySelector(".colour-grid").appendChild(e)});function ie(e,t,o){e/=255,t/=255,o/=255;let a=Math.max(e,t,o),n=Math.min(e,t,o),r,s,c=(a+n)/2;if(a==n)r=s=0;else{let i=a-n;switch(s=c>.5?i/(2-a-n):i/(a+n),a){case e:r=(t-o)/i+(t<o?6:0);break;case t:r=(o-e)/i+2;break;case o:r=(e-t)/i+4;break}r/=6}return[r,s,c]}$(".range-gallery-item").on("click",".range-gallery-zoom",de);$(".preview-swatch-item, .preview-swatch-img").on("click",".preview-swatch-zoom",de);function de(){let e=$(this).closest(".range-gallery-item"),t=e.find(".range-gallery-img"),o=e.find(".range-gallery-text"),a=$(this).closest(".preview-swatch-item"),n=a.find(".preview-swatch-name"),r=a.find(".preview-swatch-favourite"),s=a.find(".preview-swatch-img"),c=a.find(".preview-swatch-item").css("background-color"),i=$(this).hasClass("zoom-close");$("body").css("overflow",i?"auto":"hidden"),$(this).css({transform:i?"rotate(0deg)":"rotate(45deg)",top:i?"auto":"0",bottom:i?"0":"auto",position:i?"absolute":"fixed",margin:i?"1rem":"5vw"}),e.css({position:i?"relative":"fixed",width:i?"auto":"100vw",height:i?"auto":"100vh",overflow:i?"hidden":"auto",top:i?"auto":"0",left:i?"auto":"0","z-index":i?"auto":"9999","border-radius":i?"1rem":"0"}),t.css({width:"100%",height:i?"100%":"auto","max-height":i?"50dvh":"none"}),o.css({top:i?"1.5rem":"5vw","margin-left":i?"0":"5vw"}),a.css({position:i?"absolute":"fixed",top:i?"auto":"0",left:i?"auto":"0",width:i?"100%":"100vw",height:i?"100%":"100vh","z-index":i?"auto":"9999",display:i?"block":"flex","justify-content":i?"space-between":"center","align-items":i?"flex-start":"center","background-color":i?c:"rgba(0,0,0,0.5)"}),s.css({width:i?"100%":"auto",height:i?"100%":"auto",minWidth:i?"auto":"66vmin",minHeight:i?"auto":"66vmin"}),n.css({display:i?"none":"block",margin:i?"1.5rem":"5vw"}),r.css({display:i?"block":"none"}),$(this).toggleClass("zoom-close")}function ue(){let e=document.querySelectorAll(".header"),t=0;e.forEach(o=>{let a=o.offsetHeight;a>t&&(t=a)}),e.forEach(o=>{o.style.height=`${t}px`})}window.addEventListener("load",ue);window.addEventListener("resize",ue);$(".form-radio-label").each(function(){$(this).text().trim()==="Wall-to-wall"&&$(this).siblings(".form-radio-icon").addClass("w--redirected-checked")});$("#range-rug").click(function(){$(".hero-colour-img:not(.rug)").hide(),$(".hero-colour-mask:not(.rug)").hide(),R=!0,$(".colour-swatch.active").trigger("click")});$("#range-wall-to-wall").click(function(){$(".hero-colour-img:not(.rug)").show(),$(".hero-colour-mask:not(.rug)").show(),R=!1,$(".colour-swatch.active").trigger("click")});$("#range-buy-rug").css("display")!="none"&&$("#range-get-sample").css({"grid-column":"span 2"});$("#range-buy-rug, #close-buy-rug").click(function(){$(".switch-on-rug")[0].click()});var E=$(".colour-swatch"),et=E.last();E.click(function(){E.removeClass("active").css("outline","none"),$(this).addClass("active").css("outline","3px solid #3bb300"),$(this).css("outlineOffset","1px"),$("#inputColour").val($(this).find(".colour-name").text().trim())});et.click();$(".get-quote").click(function(){$("#nav-get-quote")[0].click()});if(window.location.href.indexOf("/range/")>-1){let e=function(t){var o="I'm interested in "+$(".hero-intro h1").text(),a=o;t&&(a+=" ("+t+")"),$("#quote-requirements").val(a)};tt=e,e(),$("#colour-grid .colour-swatch").click(function(){var t=$(this).find(".colour-name").text();e(t)})}var tt;$("a.rug-builder").each(function(){$(this).attr("href",$(this).attr("href")+"#range-controls")});window.location.href.indexOf("#range-controls")>-1&&setTimeout(function(){$(".switch-on-rug")[0].click(),$(".buy-rug")[0].click(),$(".colour-swatch.active").trigger("click")},1e3);function ot(e,t,o){var a=new Date;a.setTime(a.getTime()+o*24*60*60*1e3);var n="expires="+a.toUTCString();document.cookie=e+"="+t+";"+n+";path=/"}function pe(e){for(var t=e+"=",o=decodeURIComponent(document.cookie),a=o.split(";"),n=0;n<a.length;n++){for(var r=a[n];r.charAt(0)==" ";)r=r.substring(1);if(r.indexOf(t)==0)return r.substring(t.length,r.length)}return""}var me=[];function at(){$(".json-qr script").each(function(){var e=$(this).text().replace(/&#39;/g,"'").replace(/&amp;/g,"&").trim(),t=JSON.parse(e);me.push(t.id)})}function A(e){var t=new URLSearchParams(window.location.search);return t.get(e)}A("id")&&ot("cookieQRCode",A("id"),1);function nt(){var e=A("id");$("#tableQrCode").val(e),e&&me.includes(e)?$("#link-table").css("display","flex"):$("#link-table").css("display","none")}at();nt();var O=[];function it(){$(".json-installer script").each(function(){var e=JSON.parse($(this).text());O.push(e)})}function rt(){var e=[...new Set(O.map(t=>t.province))].sort();$("#provinceSelect").empty().append($("<option>").text("Select Province").attr("value","")),$.each(e,function(t,o){$("#provinceSelect").append($("<option>").text(o).attr("value",o))}),$("#provinceSelect").show(),$("#citySelect, #installerSelect").hide().empty()}function st(e){var t=[...new Set(O.filter(o=>o.province===e).map(o=>o.city))].sort();$("#citySelect").empty().append($("<option>").text("Select City").attr("value","")),$.each(t,function(o,a){$("#citySelect").append($("<option>").text(a).attr("value",a))}),$("#citySelect").show(),$("#installerSelect").hide().empty()}function ct(e){var t=O.filter(o=>o.city===e);t.length>0?($("#installerSelect").empty().append($("<option>").text("Select Installer").attr("value","")),$.each(t,function(o,a){$("#installerSelect").append($("<option>").text(a.name).attr("value",a.id))}),$("#installerSelect").show()):$("#installerSelect").hide()}$("#provinceSelect").change(function(){var e=$(this).val();e?st(e):$("#citySelect, #installerSelect").hide().empty()});$("#citySelect").change(function(){var e=$(this).val();e?ct(e):$("#installerSelect").hide().empty()});it();rt();var fe='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>',z='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>';pe("cookieQRCode")&&$("#favQrCode").val(pe("cookieQRCode"));$(document).on("click",".favourite-toggle",function(){var e=$(this),t=e.data("item-id"),o=e.attr("data-favourited")==="true",a=e.data("item-name"),n=window.location.href;if(o)localStorage.removeItem("fav-"+t),e.attr("data-favourited","false").html(fe);else{var r={id:t,name:a,url:n};localStorage.setItem("fav-"+t,JSON.stringify(r)),e.attr("data-favourited","true").html(z)}ge()});function he(){$(".favourite-toggle").each(function(){var e=$(this),t=e.data("item-id");localStorage.getItem("fav-"+t)?e.attr("data-favourited","true").html(z):e.attr("data-favourited","false").html(fe)}),J()}function ge(){$("#favouritesList").empty();for(var e=0;e<localStorage.length;e++){var t=localStorage.key(e);if(t.startsWith("fav-")){var o=JSON.parse(localStorage.getItem(t)),a=$('<div class="favourite-item"></div>');a.append($('<a class="favourite-link"></a>').attr("href",o.url).text(o.name));var n='<button class="icon-button favourite-toggle reverse" type="button" data-item-id="'+o.id+'" data-favourited="true" aria-label="Toggle Favourite" data-item-name="'+o.kind+" - "+o.name+'">';n+=z+"</button>",a.append($(n)),$("#favouritesList").append(a)}}he(),J()}function J(){let e=0;for(let t=0;t<localStorage.length;t++)localStorage.key(t).startsWith("fav-")&&e++;e===0?($(".fav-button").hide(),$(".close-fav-modal").click()):$(".fav-button").show(),$(".fav-count").text(e)}function lt(){let e=[];for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);if(a.startsWith("fav-"))try{let n=JSON.parse(localStorage.getItem(a));e.push(n)}catch(n){console.error("Error parsing itemDetails for key:",a,n)}}let t=JSON.stringify(e);document.getElementById("favouritesData").value=t}he();ge();J();function ve(e,t,o,a){$(e).on("submit",function(n){n.preventDefault(),console.log("Form submitted:",e);var r=$(this).serialize();$.ajax({type:"POST",url:a,data:r,success:function(s){$(e).hide(),$(t).show(),$(o).hide(),e==="#belgotexTableForm"&&setTimeout(function(){$("#link-table").fadeOut(1e3)},2e3)},error:function(){$(e).show(),$(t).hide(),$(o).show()}})})}$(".close-fav-modal").click(function(){$(".favourites-modal").removeClass("show"),$("#favouritesForm, #belgotexTableForm").show(),$("#successMessageFav, #successMessageTable").hide(),$("#errorMessagesFav, #errorMessagesTable").hide()});$("#favouritesForm").on("submit",function(e){e.preventDefault(),lt()});ve("#favouritesForm","#successMessageFav","#errorMessagesFav","https://hook.eu1.make.com/l63sqerolwtsx195zt17yg8tv4f0n52r");ve("#belgotexTableForm","#successMessageTable","#errorMessagesTable","https://hook.eu1.make.com/jolgn9v7yjamrs6ahjawbk6la3tflel3");function dt(e){return e>525?"#ecaea2":e>350?"#f6d3b4":e>100?"#fdf0c3":""}$(".navigator-price, .sector-both").each(function(){var e=$(this),t=parseFloat(e.text().trim()),o=dt(t);o&&e.closest(".swiper-slide").find(".navigator-heading").css("background-color",o)});$(".modal-nav-zoom-trigger").click(function(){$("body").addClass("no-scroll")});$(".close-modal-nav-zoom").click(function(){$("body").removeClass("no-scroll")});var ut=$(".nav-range-heading").text(),pt="belgotex-"+ut.toLowerCase().replace(/\s+/g,"-").replace(/-{2,}/g,"-");$("#downloadPDF").on("click",function(e){e.preventDefault();var t=$(this).attr("href"),o=pt;$.ajax({url:t,method:"GET",xhrFields:{responseType:"blob"},success:function(a){var n=new Blob([a],{type:"application/pdf"}),r=URL.createObjectURL(n),s=document.createElement("a");s.href=r,s.download=o,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},error:function(a,n,r){console.error("Error downloading PDF: ",r)}})});})();
//# sourceMappingURL=index.js.map
