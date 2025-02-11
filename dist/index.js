(()=>{var z=window.location.search,x={},E=we("utm_tracking");E&&(x=JSON.parse(E));if(z.length>0){let e=Object.fromEntries(new URLSearchParams(z));x={...x,...e,utm_duration:Date.now()},ve("utm_tracking",JSON.stringify(x),365)}$("form").each(function(){$(this).find('input[name="UTM Source"]').val(x.utm_source||""),$(this).find('input[name="UTM Medium"]').val(x.utm_medium||""),$(this).find('input[name="UTM Campaign"]').val(x.utm_campaign||""),$(this).find('input[name="UTM Content"]').val(x.utm_content||""),$(this).find('input[name="UTM Term"]').val(x.utm_term||""),$(this).find('input[name="UTM Duration"]').val(Math.floor(x.utm_duration/(1e3*60*60*24))||"")});$("#quoteForm").on("submit",function(){let e="Thank You | "+document.title,t=window.location.pathname+"/thank-you";be(t,e)});function ve(e,t,o){let a=new Date(Date.now()+o*864e5).toUTCString();document.cookie=e+"="+encodeURIComponent(t)+"; expires="+a+"; path=/"}function we(e){return document.cookie.split("; ").reduce((t,o)=>{let a=o.split("=");return a[0]===e?decodeURIComponent(a[1]):t},"")}function be(e,t){if(typeof ga=="function"){let o=typeof google_tag_manager<"u"?ga.getAll()[0].get("name")+".send":"send";ga(o,"pageview",{page:e,title:t})}else console.log("ga() not defined")}xe();function ye(e){return e.replace(/&amp;/g,"&").replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029\uFEFF\uFFFD]/g,"").trim()}function ke(){let e=[];return $('[data="installers"]').each(function(){try{let t=$(this).text().replace(",}","}"),o=ye(t),a=JSON.parse(o);e.push(a)}catch(t){console.error("Failed to parse JSON:",$(this).text(),t)}}),e}function Se(e,t,o){return`
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
        `}function xe(){if($(".installer-selector").length===0)return;let e=ke();$(".installer-selector").each(function(){let t=$(this).data("prefix"),o=$(this).data("class-prefix"),a=$(this).closest("#belgotexTableForm").length>0,i=Se(t,o,a);$(this).html(i);let n=$(this).find(`[name="${t}-Province"]`),s=$(this).find(`.${o}-fieldset-city`),l=$(this).find(`[name="${t}-City"]`),r=$(this).find(`.${o}-fieldset-suburb`),b=$(this).find(`[name="${t}-Suburb"]`),m=$(this).find(`.${o}-fieldset-installer`),g=$(this).find(`[name="${t}-Installer"]`),h=[...new Set(e.map(u=>u.province.trim()).sort())];n.html(p(h)).on("change",function(){let u=$(this).val(),f=[...new Set(e.filter(y=>y.province.trim()===u).map(y=>y.city.trim()).sort())];s.hide(),r.hide(),m.hide(),f.length>0&&(s.show(),l.html(p(f)).off("change").on("change",function(){let y=$(this).val(),v=e.filter(w=>w.province.trim()===u&&w.city.trim()===y);if(r.hide(),m.hide(),a){let w=[...new Set(v.flatMap(c=>c.all_suburbs?c.all_suburbs.split(",").map(d=>d.trim()):[c.suburb.trim()]).sort())];if(v.length>5&&w.length>0)r.show(),b.html(p(w)).off("change").on("change",function(){let c=$(this).val(),d=[...new Set(v.filter(k=>k.all_suburbs?k.all_suburbs.split(",").map(_=>_.trim()).includes(c):k.suburb.trim()===c).map(k=>k.name).sort())];m.show(),g.html(p(d))});else{let c=[...new Set(v.map(d=>d.name).sort())];m.show(),g.html(p(c))}}else{let w=[...new Set(v.map(c=>c.name).sort())];m.show(),g.html(p(w))}}))});function p(u){return`<option value="">Select one...</option>${u.map(f=>`<option value="${f}">${f}</option>`).join("")}`}n.html(p(h))})}var J=ShopifyBuy.buildClient({domain:"belgotex.myshopify.com",storefrontAccessToken:"70183538aae9e241ad5035415de0a843"}),T=document.querySelector("#checkoutButton");T&&!T.disabled&&T.addEventListener("click",async e=>{T.disabled=!0,T.textContent="Processing...";try{let t=window.open("","_blank");t.document.write("Loading checkout...");let o=await J.checkout.create(),a=document.querySelectorAll(".samples-detail-sdk");if(!a.length)throw new Error("No samples selected");let i="",n=0;a.forEach(h=>{let p=h.querySelector(".sample-range")?.textContent||"Unknown Range",u=h.querySelector(".sample-colour")?.textContent||"Unknown Colour";n=150,i+=i.length?` / ${p} - ${u}`:`${p} - ${u}`});let s={variantString:i,price:n.toString()},r=await fetch("https://yudu-server.herokuapp.com/belgotex-sample-rug-api",{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"Application/JSON"}});if(!r.ok)throw new Error(`Failed to fetch variant ID: ${r.statusText}`);let m=[{variantId:(await r.json()).id,quantity:1}],g=await J.checkout.addLineItems(o.id,m);t.location.href=g.webUrl}catch(t){console.error("Error during checkout process:",t.message),alert("An error occurred while processing your checkout. Please try again later.")}finally{T.disabled=!1,T.textContent="Checkout"}});(function(){let e="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";function t(a){let i=document.createElement("script");i.async=!0,i.src=e,i.onload=a,document.head.appendChild(i)}function o(){let a=ShopifyBuy.buildClient({domain:"shop.belgotex.co.za",storefrontAccessToken:"70183538aae9e241ad5035415de0a843"});ShopifyBuy.UI.onReady(a).then(function(n){n.createComponent("collection",{id:"264254750874",node:document.getElementById("product-component-1617260095404"),moneyFormat:"R%20%7B%7Bamount%7D%7D",options:{product:{DOMEvents:{"click .shopify-buy__btn":async function(s){if(s.detail<2){$(parent.document.querySelector(".shopify-buy-button-component")).hide(),$(parent.document.querySelector(".add-to-cart-disabled")).show();let m="https://yudu-server.herokuapp.com/belgotex-custom-rug-api/",g=parent.document.querySelector("#inputWidth").value,h=parent.document.querySelector("#inputLength").value,p=parent.document.querySelector("#inputColour").value,u=parent.document.querySelector("#purchasePrice").innerHTML,f=parent.document.querySelector("#productCapture").innerText,y="Overlocked Edge",v="";[...$(parent.document.querySelectorAll(".preview-swatch-item"))].forEach(d=>{$(d).css("display")=="block"&&(v=$(d).find("img").attr("src"))});let c="";if(g&&h&&f&&p&&u&&v){let d="";c.length<1?d=`${g}cm x ${h}cm / ${f} / ${y} /`:d=`${g}cm x ${h}cm / ${f} / ${y} / ${c}`;let k,_;if(n.components.cart[0].lineItemCache.forEach(F=>{console.log("EVT title - ",F.variant.title),console.log("sameVariant - ",d),console.log("EVT title length - ",F.variant.title.length),console.log("sameVariant length - ",d.length),F.variant.title===d&&(k=F.variant,_=F.variant.id)}),_){n.components.collection[0].cart.addVariantToCart(k),s.stopPropagation(),n.openCart(),$(parent.document.querySelector(".shopify-buy-button-component")).show(),$(parent.document.querySelector(".add-to-cart-disabled")).hide();var l=$(parent.document.querySelector("#productCapture")).text().slice(0,-4).replace(/ /g,"-");console.log("title name: ",l);var r=`Add To Cart: ${l}`,b=`/add-to-cart/${l.toLowerCase()}`;console.log("track page view: ",b,r),BT_logPageView(b,r)}else{let he={method:"POST",body:JSON.stringify({width:g,length:h,colour:p,name:f,trim:y,price:u,swatch:v,discount:c}),headers:{"Content-Type":"Application/JSON"}},ge=await fetch(m,he).then($e=>$e.json());n.components.collection[0].cart.addVariantToCart(ge);var l=$(parent.document.querySelector("#productCapture")).text().slice(0,-4).replace(/ /g,"-");console.log("title name: ",l);var r=`Add To Cart: ${l}`,b=`/add-to-cart/${l.toLowerCase()}`;console.log("track page view: ",b,r),BT_logPageView(b,r),$(parent.document.querySelector(".shopify-buy-button-component")).show(),$(parent.document.querySelector(".add-to-cart-disabled")).hide()}}}}},iframe:!1,styles:{product:{"@media (min-width: 601px)":{width:"100%","margin-left":"0","margin-bottom":"0"},width:"100%","margin-left":"0","margin-bottom":"0",options:{display:"none"}},button:{"font-family":"'Circular Pro', Helvetica, sans-serif",margin:"0","font-size":"1rem",padding:"0.75em 1.5em",color:"#FFF","background-color":"#292524",border:"0","border-radius":"100vw",":hover":{color:"#FFF","background-color":"#f33"},":focus":{"background-color":"#f33",color:"#FFF",border:"none"}}},contents:{img:!1,title:!1,price:!1},text:{button:"Add to Cart"}},productSet:{styles:{products:{"@media (min-width: 601px)":{"margin-left":"-20px"}}}},modalProduct:{contents:{img:!1,imgWithCarousel:!0,button:!1,buttonWithQuantity:!0},styles:{product:{"@media (min-width: 601px)":{"max-width":"100%","margin-left":"0px","margin-bottom":"0px"}},button:{"font-weight":"bold","background-color":"#FF3333","border-radius":"0px",":hover":{"background-color":"#FF3333"},":focus":{"background-color":"#FF3333"}}},text:{button:"Add to Cart"}},option:{},cart:{styles:{button:{"font-weight":"bold",":hover":{"background-color":"#FF3333"},"background-color":"#FF3333",":focus":{"background-color":"#FF3333"},"border-radius":"0px"}},text:{total:"Subtotal",button:"Checkout"},events:{afterInit:s=>{s.onCheckout=()=>{let l=s.model.webUrl;s.checkout.config.cart.popup=!1,window.open(l,"_blank")}}}},toggle:{styles:{toggle:{"font-weight":"bold","background-color":"#FF3333",":hover":{"background-color":"#FF3333"},":focus":{"background-color":"#FF3333"}}}}}})});let i={};$(".miraclerug-product-wrapper, .miracle-rug-collection-item").each((n,s)=>{let l=$(s).find(".miraclerug-name").html(),r=$(s).find('.size-choice[rugsize="small"]'),b=$(s).find('.size-choice[rugsize="medium"]'),m=$(s).find('.size-choice[rugsize="large"]'),g=$(s).find(".price-small").html(),h=$(s).find(".price-small-sale").html(),p=$(s).find(".price-medium").html(),u=$(s).find(".price-medium-sale").html(),f=$(s).find(".price-large").html(),y=$(s).find(".price-large-sale").html(),v=w=>{let c,d;switch(w){case"small":c=h,d=g;break;case"medium":c=u,d=p;break;case"large":c=y,d=f;break}$(s).find(".update-price").html(`R ${j(c)}`),$(s).find(".update-sales-price").html(`R ${j(d)}`)};r.css("display")!="none"?(r.addClass("active"),v("small")):b.css("display")!="none"?(b.addClass("active"),v("medium")):m.css("display")!="none"&&(m.addClass("active"),v("large")),$(s).find(".size-choice").click(function(){let w=$(this).attr("rugsize");$(s).find(".size-choice").removeClass("active"),$(this).addClass("active"),v(w)}),$(s).find("#Miracle_add_to_cart").click(function(w){let c=$(s).find(".size-choice.active").attr("rugsize"),d=$(s).find(`.id-${c}`).html();i.id=window.btoa(d);let k=ShopifyBuy.UI.init(a);k.components.cart[0].addVariantToCart(i),w.stopPropagation(),k.openCart()})})}t(()=>{window.ShopifyBuy&&ShopifyBuy.UI?o():console.error("ShopifyBuy SDK failed to load.")})})();jQuery(".miraclerug-ar-link").each(function(){$ar_link=jQuery(this),$ar_link.on("click",function(){var e=jQuery(this).closest(".miraclerug-size-ratio").siblings(".h6").text(),t=`${e} - Augmented Reality`,o=`/miraclerug/ar-download/${e.toLowerCase()}`;console.log("track page view: ",o,t),BT_logPageView(o,t)})});function j(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}$("#next-1").css("opacity","0");$("#next-2").css("opacity","0");$(':radio[name="RatePartner"]').change(function(){RatePartner=$('input[name="RatePartner"]:checked').val(),RatePartner&&($("#RatePartner .star-solid").css("display","none"),$(this).parent().find(".star-wrapper").find(".star-solid").css("display","inline-block"),$("#next-1").css("opacity","1"))});$(':radio[name="RateBelgotex"]').change(function(){RateBelgotex=$('input[name="RateBelgotex"]:checked').val(),RateBelgotex&&($("#RateBelgotex .star-solid").css("display","none"),$(this).parent().find(".star-wrapper").find(".star-solid").css("display","inline-block"),$("#next-2").css("opacity","1"))});var S=JSON.parse(localStorage.getItem("sampleArray"))||[],C=JSON.parse(localStorage.getItem("sampleItems"))||[];function H(e){return e.map(t=>t.replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase())).join(", ")}$("template").remove();$("#triggerSamplesCustomer").click(function(){$("#samplesCustomer").show(),$("#samplesPro").hide();var e=H(S);$("#selectedConsumer").val(e)});$("#triggerSamplesPro").click(function(){$("#samplesPro").show(),$("#samplesCustomer").hide();var e=H(S);$("#selectedPro").val(e)});$(".samples-detail-wrapper").append("<a id='addMoreSamples' class='addMoreSamples button w-button hide' style='margin-top:20px;pointer-events:auto;'>Add More Samples</a>");$("#addMoreSamples").click(function(){$(".samples-close-cart").click()});function I(){var e=$(".samples-detail-wrapper .samples-detail").length;$(".samples-tab .samples-tab-count").text(e),e>0?($(".remove-notice").addClass("hide"),$(".samples-tab").css("display","flex"),$("#addMoreSamples").removeClass("hide")):($(".remove-notice").removeClass("hide"),$(".samples-tab").css("display","none"),$("#addMoreSamples").addClass("hide"),S=[],C={}),e===5&&$("#addMoreSamples, #addSamplesNote").addClass("hide")}function V(e){var t=e.theRange,o=e.theColor,a=e.theSwatch,i=e.rangeURL.split(/[#?]/)[0];return t?`
        <div class='samples-detail samples-detail-sdk'>
            <div class='samples-image-wrapper'>
                <img src='${a}' loading='lazy' sizes='100vw' alt='Sample Swatch' class='samples-image'>
            </div>
            <div class='samples-name-wrapper'>
                <div class='samples-name'>
                    <a href='${i}' class='samples-range-link w-inline-block'>
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
        </div>`:""}function Q(e){var t=e.sampleID,o=V(e);$(".samples-detail-wrapper .samples-detail").length<5?S.includes(t)?alert(e.theRange+" "+e.theColor+" has already been added."):($(".samples-detail-wrapper").prepend(o),S.push(t),C[t]=e,localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C))):alert("Sample limit reached! Orders are limited to 5 samples."),I()}function Ce(){for(var e in C){var t=V(C[e]);t&&$(".samples-detail-wrapper").prepend(t)}}$(".modal-contant-product .order-sample").click(function(){var e=$(this).parents(".modal-contant-product").find(".modal-titles").find("h2").text();e=e.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase());var t=$(this).parents(".modal-contant-product").find(".modal-titles").find("h3").text(),o=$(this).parents(".modal-contant-product").find(".room-render-grid").find("img").attr("src"),a=window.location.pathname.split(/[#?]/)[0],i=e+"-"+t,n={sampleID:i,theRange:e,theColor:t,theSwatch:o,rangeURL:a};Q(n),$(".samples-tab").click().css("display","flex")});$("#range-get-sample").click(function(){var e=window.location.href.includes("/range/")?window.location.href.split("/range/")[1].split(/[#?]/)[0]:"";e=e.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase());var t=$(this).parents(".colour-control").find(".colour-name-confirmation").text(),o="";$(".preview-swatch-item").each(function(){$(this).css("display")=="block"&&(o=$(this).find(".preview-swatch-img").attr("src"))});var a=window.location.pathname.split(/[#?]/)[0],i=e+"-"+t,n={sampleID:i,theRange:e,theColor:t,theSwatch:o,rangeURL:a};Q(n),$(".samples-tab").click().css("display","flex")});$(".samples-detail-wrapper").on("click",".samples-detail .samples-name-wrapper .remove-samples",function(){var e=$(this).parents(".samples-name-wrapper").find(".sample-range").text(),t=$(this).parents(".samples-name-wrapper").find(".sample-colour").text(),o=e+"-"+t;S=S.filter(a=>a!=o),delete C[o],localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C)),$(this).parents(".samples-detail-wrapper .samples-detail").fadeOut(200,function(){$(this).remove(),I()}),I()});$("#checkoutButton").prop("disabled",!0);window.resetSamples=function(){setTimeout(function(){$(".samples-detail").remove(),$(".remove-notice").removeClass("hide").css({"background-color":"#8ae68a",color:"#000"}).text("Your sample order is being processed."),$(".samples-close-cart, .samples-form-close").click(),$(".samples-tab").css("display","none"),S=[],C={},localStorage.setItem("sampleArray",JSON.stringify(S)),localStorage.setItem("sampleItems",JSON.stringify(C))},3e3)};function W(){let e=$("#samples-dealer").is(":checked");$("#sample-form-section").toggle(e),$("#sample-form-section input, #sample-form-section select, #sample-form-section textarea").prop("required",e),$('#sample-form-section input[type="checkbox"]').prop("required",!1)}function q(){let e=!0;$("#samples-dealer").is(":checked")?($("#sample-form-section input[required], #sample-form-section select[required], #sample-form-section textarea[required]").each(function(){if($(this).val()===""||$(this).val()===null)return e=!1,!1}),grecaptcha.getResponse()===""&&(e=!1)):e=!1,$("#checkoutButton").prop("disabled",$("#samples-dealer").is(":checked")&&!e)}W();q();$("#samples-dealer").change(function(){W(),q()});setTimeout(function(){var e=$("#Samples-Orders .recapture-wrapper");function t(){q()}e.hover(t),e.on("touchstart",t)},1500);$("#professionalsSubmit").prop("disabled",!0);$("#Samples-Professionals input, #Samples-Professionals select, #Samples-Professionals textarea").on("input change",function(){let e=!0;$("#Samples-Professionals input[required], #Samples-Professionals select[required], #Samples-Professionals textarea[required]").each(function(){if($(this).val()===""||$(this).val()===null)return e=!1,!1}),$("#professionalsSubmit").prop("disabled",!e)});$("#checkoutButton, #professionalsSubmit").click(function(){$(this).prop("disabled")||resetSamples()});$("#FixedQuote-City, .form-group, #sample-form-section input, #sample-form-section select, #sample-form-section textarea").on("input change",q);setTimeout(()=>{$("#checkoutButton, #professionalsSubmit").click(function(){$(this).prop("disabled")?q():resetSamples()})},500);Ce();I();var O=$("#home-ranges .w-dyn-items"),D=O.children(".feature"),oe=D.filter(function(){return $(this).find("h3").text().includes("Panthera")}),ae=D.filter(function(){return $(this).find("h3").text().includes("Highlands")}),ie=D.filter(function(){return $(this).find("h3").text().includes("Timbavati")});oe.remove();ae.remove();ie.remove();O.prepend(ie);O.prepend(ae);O.prepend(oe);var P,Z,L,G,Y,K=window.location.href;$('input[name="Page Title"]').val(window.location.href);$('input[name="Page URL"]').val(window.location.href);window.location.href.indexOf("/range/custom-carpets-by-belgotex")>-1&&(window.location.href="/custom-carpets");function Te(e,t,o){var a="";if(o){var i=new Date;i.setTime(i.getTime()+o*24*60*60*1e3),a="; expires="+i.toUTCString()}document.cookie=e+"="+(t||"")+a+"; path=/"}function Fe(e){for(var t=e+"=",o=document.cookie.split(";"),a=0;a<o.length;a++){for(var i=o[a];i.charAt(0)==" ";)i=i.substring(1,i.length);if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return null}function qe(){var e=new URLSearchParams(window.location.search),t=e.get("ref");if(t==="belgotex.com"){var o=Fe("userHasVisited");o||(document.getElementById("sitesModal").style.display="flex",Te("userHasVisited","true",365))}}window.onload=function(){qe()};var R=!1;$("#range-buy-rug").click(function(){R=!0,$(".colour-swatch.active").trigger("click")});$("#close-buy-rug").click(function(){R=!1,$(".colour-swatch.active").trigger("click")});$("#search-trigger").click(function(){setTimeout(function(){$("#search").focus()},100)});function Re(){K.includes("/all-products")?$(".filter-item").each(function(){var e=$(this);e.find(".filter-heading").text().trim()==="Westminster"&&e.find(".compare-price").removeClass("w-condition-invisible")}):K.includes("/westminster")&&$("#w-node-f81ec8e2-6160-c1b6-e368-a4bbdf836105-bfd5d4f1").removeClass("w-condition-invisible")}Re();$(".swatch-link-block").click(function(){P=window.location.pathname,Z=P.replace("/range/",""),L=$(this).find(".product-name").not(".thin").text().replace(/\s+/g,"-").toLowerCase(),G=Z+" - "+L,Y=P+"/"+L,BT_logPageView(Y,G)});$("#pro-btn-wrapper").click(function(){$("#is-professional").val("Yes")});$("#free-btn-wrapper").click(function(){$("#is-professional").val("")});$("#order-for-professional").on("click",function(){$("#is-professional").val("Yes")});window.location.href.indexOf("/range/")>-1&&($("#isPayLater").text()==="true"&&($(".is-pay-later").css("display","block"),X=$("#the-pay-later-price").text(),$("#pay-later-price").text(X)),$(".shopify-buy__btn-wrapper").css("margin-top","0 !important"),$("#hideShopifyBuyButton").remove(),$(".hero-colour-img").attr("src")&&$(".hero-colour-content").css("padding","5vw"),$(".more-collection-list").each(function(){if($(this).children(".more-collection-item").length>5){for(var e=$(this).children(".more-collection-item"),t=$.makeArray(e),o=t.length-1;o>0;o--){var a=Math.floor(Math.random()*(o+1)),i=t[o];t[o]=t[a],t[a]=i}var n=t.slice(0,5);$(this).empty(),$(this).append(n)}}));var X;window.location.href.indexOf("/all-products")>-1&&$(".filter-collection-item").each(function(){$(this).find('[fs-cmsfilter-field="residential"]').text()==="true"&&$(this).find(".filter-items").append('<div fs-cmsfilter-field="sector">Residential</div>'),$(this).find('[fs-cmsfilter-field="commercial"]').text()==="true"&&$(this).find(".filter-items").append('<div fs-cmsfilter-field="sector">Commercial</div>'),$(this).find('[fs-cmsfilter-field="cto"]').text()==="true"&&$(this).find(".filter-items").append('<div fs-cmsfilter-field="solution">Rug</div>')});$(".filter-look-wrapper .checkbox-toggle").click(function(){$(this).is(":checked")&&$(".filter-look-wrapper .checkbox-toggle").not(this).prop("checked",!1)});$(".colour-swatch").on("click",function(){var e=$(this),t=e.find(".mto-flag"),o=e.find(".no-sample-flag"),a=$(".mto-note"),i=e.find(".colour-ar-link"),n=$(".hero-colour-swatch"),s=$(".colour-swatch-confirmation-img"),l=e.find(".wtw-fallback"),r=e.find(".cto-fallback");t.text()==="true"?a.removeClass("hide"):a.addClass("hide"),o.text()==="true"?$('[what_button="get_sample"]').hide():$('[what_button="get_sample"]').show(),$("#colour-control").css("display","flex"),$("#preview-swatch-wrapper").css("display","block"),i.attr("href")!==void 0&&$(".hero-ar-link").attr("href",i.attr("href"));var b=e.css("background-color"),m=e.find(".colour-name").text();m=m.replace("Lite","").replace("Ultra",""),$(".hero-colour-tint, .colour-swatch-confirmation").css("background-color",b),$(".colour-name-confirmation, .hero-colour-name, #colourName").text(m);var g=!1;if($(".preview-swatch-item").each(function(){var u=$(this);if(u.find(".preview-swatch-name").text()===m){u.css("display","block");var f=u.find(".preview-swatch-img").attr("src");n.attr("src",f),s.attr("src",f),g=!0}else u.css("display","none")}),R){if(r.length){var h=r.attr("src");h&&n.attr("src",h)}}else if(l.length){var p=l.attr("src");p&&n.attr("src",p)}});function re(){let e=$(".colour-checkbox.fs-cmsfilter_active .checkbox-label-colour"),t=$(".swatch-hex");e.length>0?(t.css("opacity","0.1"),e.each(function(){let o=$(this).text().trim();t.filter(function(){return $(this).text().trim()===o}).css("opacity","1")})):t.css("opacity","1")}$('[fs-cmsfilter-element="clear"], .colour-checkbox').on("click",function(){setTimeout(re,500)});re();var _e=document.querySelectorAll(".colour-swatch"),ne=Array.from(_e);ne.sort(function(e,t){let o=e.style.backgroundColor.match(/\d+/g),a=t.style.backgroundColor.match(/\d+/g),i=ee(o[0],o[1],o[2]),n=ee(a[0],a[1],a[2]);return i[2]<n[2]?-1:i[2]>n[2]?1:i[0]<n[0]?-1:i[0]>n[0]?1:0});ne.forEach(function(e){document.querySelector(".colour-grid").appendChild(e)});function ee(e,t,o){e/=255,t/=255,o/=255;let a=Math.max(e,t,o),i=Math.min(e,t,o),n,s,l=(a+i)/2;if(a==i)n=s=0;else{let r=a-i;switch(s=l>.5?r/(2-a-i):r/(a+i),a){case e:n=(t-o)/r+(t<o?6:0);break;case t:n=(o-e)/r+2;break;case o:n=(e-t)/r+4;break}n/=6}return[n,s,l]}var Ie=["#bfbf30","#b28659","#80191b","#6b998a","#336680","#ffffff","#808080","#000000"],Oe=document.querySelectorAll(".swatch-hex");Oe.forEach(e=>{let t=e.style.backgroundColor,o="",a=1/0;Ie.forEach(i=>{let n=Ue(t,i);n<a&&(o=i,a=n)}),e.setAttribute("fs-cmsfilter-field","colour"),e.innerHTML=e.innerHTML+o.substring(1),e.style.color=t,e.style.fontSize="0px"});function Ue(e,t){let o=te(e),a=te(t),i=o[0]-a[0],n=o[1]-a[1],s=o[2]-a[2];return Math.sqrt(i*i+n*n+s*s)}function te(e){if(/^#[0-9A-F]{6}$/i.test(e)){let t=parseInt(e.substring(1,3),16),o=parseInt(e.substring(3,5),16),a=parseInt(e.substring(5,7),16);return[t,o,a]}else if(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(e)){let t=e.match(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i),o=parseInt(t[1]),a=parseInt(t[2]),i=parseInt(t[3]);return[o,a,i]}else return[0,0,0]}setTimeout(function(){$(".filter-collection-item").each(function(){let e=$(this).find(".collection-list-swatch").clone(),t=$(this).find(".filter-swatches-modal");$(e).find(".collection-item-swatch").css("width","30px"),e.appendTo(t)})},2e3);$(".range-gallery-item").on("click",".range-gallery-zoom",se);$(".preview-swatch-item, .preview-swatch-img").on("click",".preview-swatch-zoom",se);function se(){let e=$(this).closest(".range-gallery-item"),t=e.find(".range-gallery-img"),o=e.find(".range-gallery-text"),a=$(this).closest(".preview-swatch-item"),i=a.find(".preview-swatch-name"),n=a.find(".preview-swatch-favourite"),s=a.find(".preview-swatch-img"),l=a.find(".preview-swatch-item").css("background-color"),r=$(this).hasClass("zoom-close");$("body").css("overflow",r?"auto":"hidden"),$(this).css({transform:r?"rotate(0deg)":"rotate(45deg)",top:r?"auto":"0",bottom:r?"0":"auto",position:r?"absolute":"fixed",margin:r?"1rem":"5vw"}),e.css({position:r?"relative":"fixed",width:r?"auto":"100vw",height:r?"auto":"100vh",overflow:r?"hidden":"auto",top:r?"auto":"0",left:r?"auto":"0","z-index":r?"auto":"9999","border-radius":r?"1rem":"0"}),t.css({width:"100%",height:r?"100%":"auto","max-height":r?"50dvh":"none"}),o.css({top:r?"1.5rem":"5vw","margin-left":r?"0":"5vw"}),a.css({position:r?"absolute":"fixed",top:r?"auto":"0",left:r?"auto":"0",width:r?"100%":"100vw",height:r?"100%":"100vh","z-index":r?"auto":"9999",display:r?"block":"flex","justify-content":r?"space-between":"center","align-items":r?"flex-start":"center","background-color":r?l:"rgba(0,0,0,0.5)"}),s.css({width:r?"100%":"auto",height:r?"100%":"auto",minWidth:r?"auto":"66vmin",minHeight:r?"auto":"66vmin"}),i.css({display:r?"none":"block",margin:r?"1.5rem":"5vw"}),n.css({display:r?"block":"none"}),$(this).toggleClass("zoom-close")}function le(){let e=document.querySelectorAll(".header"),t=0;e.forEach(o=>{let a=o.offsetHeight;a>t&&(t=a)}),e.forEach(o=>{o.style.height=`${t}px`})}window.addEventListener("load",le);window.addEventListener("resize",le);$(".form-radio-label").each(function(){$(this).text().trim()==="Wall-to-wall"&&$(this).siblings(".form-radio-icon").addClass("w--redirected-checked")});$("#range-rug").click(function(){$(".hero-colour-img:not(.rug)").hide(),$(".hero-colour-mask:not(.rug)").hide(),R=!0,$(".colour-swatch.active").trigger("click")});$("#range-wall-to-wall").click(function(){$(".hero-colour-img:not(.rug)").show(),$(".hero-colour-mask:not(.rug)").show(),R=!1,$(".colour-swatch.active").trigger("click")});$("#range-buy-rug").css("display")!="none"&&$("#range-get-sample").css({"grid-column":"span 2"});$("#range-buy-rug, #close-buy-rug").click(function(){$(".switch-on-rug")[0].click()});var B=$(".colour-swatch"),Pe=B.last();B.click(function(){B.removeClass("active").css("outline","none"),$(this).addClass("active").css("outline","3px solid #3bb300"),$(this).css("outlineOffset","1px"),$("#inputColour").val($(this).find(".colour-name").text().trim())});Pe.click();$("#filterForm").click(function(){setTimeout(function(){$("#rug-checkbox-wrapper").hasClass("fs-cmsfilter_active")?$(".filter-img-rug").removeClass("hide"):$(".filter-img-rug").addClass("hide")},500)});$("#clearFilter1, #clearFilter2").click(function(){$(".filter-img-rug").addClass("hide")});window.location.href.indexOf("solution=Rug")>-1&&$(".filter-img-rug").removeClass("hide");setTimeout(function(){$(".filter-range-link").each(function(){$(this).attr("href").indexOf("miraclerug")>-1&&$(this).find(".collection-list-swatch").remove()})},4e3);$(".get-quote").click(function(){$("#nav-get-quote")[0].click()});if(window.location.href.indexOf("/range/")>-1){let e=function(t){var o="I'm interested in "+$(".hero-intro h1").text(),a=o;t&&(a+=" ("+t+")"),$("#quote-requirements").val(a)};Le=e,e(),$("#colour-grid .colour-swatch").click(function(){var t=$(this).find(".colour-name").text();e(t)})}var Le;$("a.rug-builder").each(function(){$(this).attr("href",$(this).attr("href")+"#range-controls")});window.location.href.indexOf("#range-controls")>-1&&setTimeout(function(){$(".switch-on-rug")[0].click(),$(".buy-rug")[0].click(),$(".colour-swatch.active").trigger("click")},1e3);function Be(e,t,o){var a=new Date;a.setTime(a.getTime()+o*24*60*60*1e3);var i="expires="+a.toUTCString();document.cookie=e+"="+t+";"+i+";path=/"}function ce(e){for(var t=e+"=",o=decodeURIComponent(document.cookie),a=o.split(";"),i=0;i<a.length;i++){for(var n=a[i];n.charAt(0)==" ";)n=n.substring(1);if(n.indexOf(t)==0)return n.substring(t.length,n.length)}return""}var de=[];function De(){$(".json-qr script").each(function(){var e=$(this).text().replace(/&#39;/g,"'").replace(/&amp;/g,"&").trim(),t=JSON.parse(e);de.push(t.id)})}function M(e){var t=new URLSearchParams(window.location.search);return t.get(e)}M("id")&&Be("cookieQRCode",M("id"),1);function Me(){var e=M("id");$("#tableQrCode").val(e),e&&de.includes(e)?$("#link-table").css("display","flex"):$("#link-table").css("display","none")}De();Me();var U=[];function Ae(){$(".json-installer script").each(function(){var e=JSON.parse($(this).text());U.push(e)})}function Ne(){var e=[...new Set(U.map(t=>t.province))].sort();$("#provinceSelect").empty().append($("<option>").text("Select Province").attr("value","")),$.each(e,function(t,o){$("#provinceSelect").append($("<option>").text(o).attr("value",o))}),$("#provinceSelect").show(),$("#citySelect, #installerSelect").hide().empty()}function ze(e){var t=[...new Set(U.filter(o=>o.province===e).map(o=>o.city))].sort();$("#citySelect").empty().append($("<option>").text("Select City").attr("value","")),$.each(t,function(o,a){$("#citySelect").append($("<option>").text(a).attr("value",a))}),$("#citySelect").show(),$("#installerSelect").hide().empty()}function Ee(e){var t=U.filter(o=>o.city===e);t.length>0?($("#installerSelect").empty().append($("<option>").text("Select Installer").attr("value","")),$.each(t,function(o,a){$("#installerSelect").append($("<option>").text(a.name).attr("value",a.id))}),$("#installerSelect").show()):$("#installerSelect").hide()}$("#provinceSelect").change(function(){var e=$(this).val();e?ze(e):$("#citySelect, #installerSelect").hide().empty()});$("#citySelect").change(function(){var e=$(this).val();e?Ee(e):$("#installerSelect").hide().empty()});Ae();Ne();var ue='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>',A='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>';ce("cookieQRCode")&&$("#favQrCode").val(ce("cookieQRCode"));$(document).on("click",".favourite-toggle",function(){var e=$(this),t=e.data("item-id"),o=e.attr("data-favourited")==="true",a=e.data("item-name"),i=window.location.href;if(o)localStorage.removeItem("fav-"+t),e.attr("data-favourited","false").html(ue);else{var n={id:t,name:a,url:i};localStorage.setItem("fav-"+t,JSON.stringify(n)),e.attr("data-favourited","true").html(A)}me()});function pe(){$(".favourite-toggle").each(function(){var e=$(this),t=e.data("item-id");localStorage.getItem("fav-"+t)?e.attr("data-favourited","true").html(A):e.attr("data-favourited","false").html(ue)}),N()}function me(){$("#favouritesList").empty();for(var e=0;e<localStorage.length;e++){var t=localStorage.key(e);if(t.startsWith("fav-")){var o=JSON.parse(localStorage.getItem(t)),a=$('<div class="favourite-item"></div>');a.append($('<a class="favourite-link"></a>').attr("href",o.url).text(o.name));var i='<button class="icon-button favourite-toggle reverse" type="button" data-item-id="'+o.id+'" data-favourited="true" aria-label="Toggle Favourite" data-item-name="'+o.kind+" - "+o.name+'">';i+=A+"</button>",a.append($(i)),$("#favouritesList").append(a)}}pe(),N()}function N(){let e=0;for(let t=0;t<localStorage.length;t++)localStorage.key(t).startsWith("fav-")&&e++;e===0?($(".fav-button").hide(),$(".close-fav-modal").click()):$(".fav-button").show(),$(".fav-count").text(e)}function Je(){let e=[];for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);if(a.startsWith("fav-"))try{let i=JSON.parse(localStorage.getItem(a));e.push(i)}catch(i){console.error("Error parsing itemDetails for key:",a,i)}}let t=JSON.stringify(e);document.getElementById("favouritesData").value=t}pe();me();N();function fe(e,t,o,a){$(e).on("submit",function(i){i.preventDefault(),console.log("Form submitted:",e);var n=$(this).serialize();$.ajax({type:"POST",url:a,data:n,success:function(s){$(e).hide(),$(t).show(),$(o).hide(),e==="#belgotexTableForm"&&setTimeout(function(){$("#link-table").fadeOut(1e3)},2e3)},error:function(){$(e).show(),$(t).hide(),$(o).show()}})})}$(".close-fav-modal").click(function(){$(".favourites-modal").removeClass("show"),$("#favouritesForm, #belgotexTableForm").show(),$("#successMessageFav, #successMessageTable").hide(),$("#errorMessagesFav, #errorMessagesTable").hide()});$("#favouritesForm").on("submit",function(e){e.preventDefault(),Je()});fe("#favouritesForm","#successMessageFav","#errorMessagesFav","https://hook.eu1.make.com/l63sqerolwtsx195zt17yg8tv4f0n52r");fe("#belgotexTableForm","#successMessageTable","#errorMessagesTable","https://hook.eu1.make.com/jolgn9v7yjamrs6ahjawbk6la3tflel3");function je(e){return e>525?"#ecaea2":e>350?"#f6d3b4":e>100?"#fdf0c3":""}$(".navigator-price, .sector-both").each(function(){var e=$(this),t=parseFloat(e.text().trim()),o=je(t);o&&e.closest(".swiper-slide").find(".navigator-heading").css("background-color",o)});$(".modal-nav-zoom-trigger").click(function(){$("body").addClass("no-scroll")});$(".close-modal-nav-zoom").click(function(){$("body").removeClass("no-scroll")});var He=$(".nav-range-heading").text(),Ve="belgotex-"+He.toLowerCase().replace(/\s+/g,"-").replace(/-{2,}/g,"-");$("#downloadPDF").on("click",function(e){e.preventDefault();var t=$(this).attr("href"),o=Ve;$.ajax({url:t,method:"GET",xhrFields:{responseType:"blob"},success:function(a){var i=new Blob([a],{type:"application/pdf"}),n=URL.createObjectURL(i),s=document.createElement("a");s.href=n,s.download=o,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(n)},error:function(a,i,n){console.error("Error downloading PDF: ",n)}})});console.log("Main JS file loaded");})();
