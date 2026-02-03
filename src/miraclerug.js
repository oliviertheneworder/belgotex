(function () {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    // Function to load the Shopify Buy SDK
    function loadShopifySDK(callback) {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        script.onload = callback; // Call your initialization once the script loads
        document.head.appendChild(script);
    }

    // Initialization logic for Shopify Buy
    function ShopifyBuyInit() {
        const client = ShopifyBuy.buildClient({
            domain: 'shop.belgotex.co.za',
            storefrontAccessToken: '70183538aae9e241ad5035415de0a843',
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
            // Add your collection and cart logic here
            ui.createComponent('collection', {
                id: '264254750874',
                node: document.getElementById('product-component-1617260095404'),
                moneyFormat: 'R%20%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "DOMEvents": {
                            "click .shopify-buy__btn": async function (evt) {

                                // Check that the click is less than one
                                if (evt.detail < 2) {

                                    $(parent.document.querySelector('.shopify-buy-button-component')).hide();
                                    $(parent.document.querySelector('.add-to-cart-disabled')).show();

                                    const requestURL = 'https://yudu-server.herokuapp.com/belgotex-custom-rug-api/';

                                    const width = parent.document.querySelector('#inputWidth').value;
                                    const length = parent.document.querySelector('#inputLength').value;
                                    const colour = parent.document.querySelector('#inputColour').value;
                                    const price = parent.document.querySelector('#purchasePrice').innerHTML;
                                    const name = parent.document.querySelector('#productCapture').innerText;
                                    
                                    // Check if it's Sensology Lush range - if so, don't use Overlocked Edge
                                    const isSensologyLush = name && name.toLowerCase().includes('sensology') && name.toLowerCase().includes('lush');
                                    const trim = isSensologyLush ? `No Edge Treatment` : `Overlocked Edge`;
                                    let swatch = '';
                                    let swatch_list = $(parent.document.querySelectorAll('.preview-swatch-item'));

                                    [...swatch_list].forEach((element) => {
                                        $(element).css('display') == 'block'
                                            ? swatch = $(element).find('img').attr('src') : '';
                                    });

                                    const discount = ''; //parent.document.querySelector('#input-discount').value; //$('#input-discount').val();

                                    // Check if any required data fields are undefined
                                    if (width && length && name && colour && price && swatch) {

                                        // Check if the data matches what is already in the cart
                                        let sameVariant = '';
                                        discount.length < 1 ?
                                            sameVariant = `${width}cm x ${length}cm / ${name} / ${trim} /`
                                            :
                                            sameVariant = `${width}cm x ${length}cm / ${name} / ${trim} / ${discount}`;

                                        let sameVariantObject;
                                        let sameVariantId;
                                        ui.components.cart[0].lineItemCache.forEach((element) => {

                                            console.log('EVT title - ', element.variant.title);
                                            console.log('sameVariant - ', sameVariant);
                                            console.log('EVT title length - ', element.variant.title.length);
                                            console.log('sameVariant length - ', sameVariant.length);

                                            if (element.variant.title === sameVariant) {
                                                sameVariantObject = element.variant;
                                                sameVariantId = element.variant.id;
                                            }
                                        });

                                        // If it does match then just simply add the same variant to cart
                                        if (sameVariantId) {

                                            ui.components.collection[0].cart.addVariantToCart(sameVariantObject);
                                            evt.stopPropagation();
                                            ui.openCart();
                                            $(parent.document.querySelector('.shopify-buy-button-component')).show();
                                            $(parent.document.querySelector('.add-to-cart-disabled')).hide();

                                            // Track the add to cart
                                            var title_name = $(parent.document.querySelector('#productCapture'))
                                                .text()
                                                .slice(0, -4)
                                                .replace(/ /g, '-');

                                            console.log('title name: ', title_name);
                                            var track_title = `Add To Cart: ${title_name}`;
                                            var track_ref = `/add-to-cart/${title_name.toLowerCase()}`;
                                            console.log("track page view: ", track_ref, track_title);
                                            BT_logPageView(track_ref, track_title);

                                        } else {

                                            // Create our data object with the required data
                                            const body = { width, length, colour, name, trim, price, swatch, discount };

                                            // Send a POST request to our endpoint with the required data
                                            const options = {
                                                method: 'POST',
                                                body: JSON.stringify(body),
                                                headers: {
                                                    'Content-Type': 'Application/JSON'
                                                }
                                            }

                                            // Request to server with all necessary data
                                            const data = await fetch(requestURL, options)
                                                .then((res) => {
                                                    return res.json();
                                                });

                                            // Use the variant ID to addVariantToCart
                                            ui.components.collection[0].cart.addVariantToCart(data);

                                            // Track the add to cart
                                            var title_name = $(parent.document.querySelector('#productCapture'))
                                                .text()
                                                .slice(0, -4)
                                                .replace(/ /g, '-');

                                            console.log('title name: ', title_name);
                                            var track_title = `Add To Cart: ${title_name}`;
                                            var track_ref = `/add-to-cart/${title_name.toLowerCase()}`;
                                            console.log("track page view: ", track_ref, track_title);
                                            BT_logPageView(track_ref, track_title);

                                            $(parent.document.querySelector('.shopify-buy-button-component')).show();
                                            $(parent.document.querySelector('.add-to-cart-disabled')).hide();

                                        } // Check cart lineitems if else statement

                                    } // Required data if statement

                                } // Click conditional

                            } // Event function
                        },
                        "iframe": false,
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "width": "100%",
                                    "margin-left": "0",
                                    "margin-bottom": "0"
                                },

                                "width": "100%",
                                "margin-left": "0",
                                "margin-bottom": "0",

                                "options": {
                                    "display": "none"
                                }
                            },
                            "button": {
                                "font-family": "'Circular Pro', Helvetica, sans-serif",
                                //"font-weight": "900",
                                //"width": "100%",
                                "margin": "0",
                                "font-size": "1rem",
                                "padding": "0.75em 1.5em",
                                //"test-transform": "uppercase",
                                //"letter-spacing": "1.1px",
                                "color": "#FFF",
                                "background-color": "#292524",
                                "border": "0",
                                "border-radius": "100vw",
                                ":hover": {
                                    "color": "#FFF",
                                    "background-color": "#f33"
                                },
                                ":focus": {
                                    "background-color": "#f33",
                                    "color": "#FFF",
                                    "border": "none"
                                },
                            }
                        },
                        "contents": {
                            "img": false,
                            "title": false,
                            "price": false
                        },
                        "text": {
                            "button": "Add to Cart"
                        }
                    },
                    "productSet": {
                        "styles": {
                            "products": {
                                "@media (min-width: 601px)": {
                                    "margin-left": "-20px"
                                }
                            }
                        }
                    },
                    "modalProduct": {
                        "contents": {
                            "img": false,
                            "imgWithCarousel": true,
                            "button": false,
                            "buttonWithQuantity": true
                        },
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0px",
                                    "margin-bottom": "0px"
                                }
                            },
                            "button": {
                                "font-weight": "bold",
                                "background-color": "#FF3333",
                                "border-radius": "0px",
                                ":hover": {
                                    "background-color": "#FF3333"
                                },
                                ":focus": {
                                    "background-color": "#FF3333"
                                },
                            }
                        },

                        "text": {
                            "button": "Add to Cart"
                        }
                    },
                    "option": {},
                    "cart": {
                        "styles": {
                            "button": {
                                "font-weight": "bold",
                                ":hover": {
                                    "background-color": "#FF3333"
                                },
                                "background-color": "#FF3333",
                                ":focus": {
                                    "background-color": "#FF3333"
                                },
                                "border-radius": "0px"
                            }
                        },
                        "text": {
                            "total": "Subtotal",
                            "button": "Checkout"
                        },
                        events: {
                            afterInit: (cart) => {
                                cart.onCheckout = () => {
                                    const checkoutUrl = cart.model.webUrl;

                                    // we dynamically change the checkout function.
                                    cart.checkout.config.cart.popup = false;
                                    window.open(checkoutUrl, '_blank');
                                };
                            },
                        }
                    },
                    "toggle": {
                        "styles": {
                            "toggle": {
                                "font-weight": "bold",
                                "background-color": "#FF3333",
                                ":hover": {
                                    "background-color": "#FF3333"
                                },
                                ":focus": {
                                    "background-color": "#FF3333"
                                }
                            }
                        }

                    }
                },
            });
        });

        //==================================
        // MIRACLE RUG SHOPIFY INTEGRATION
        //==================================

        let variant_config = {};

        $('.miraclerug-product-wrapper, .miracle-rug-collection-item')
            .each((index, element) => {
                const name = $(element).find('.miraclerug-name').html();

                const select_small = $(element).find('.size-choice[rugsize="small"]');
                const select_medium = $(element).find('.size-choice[rugsize="medium"]');
                const select_large = $(element).find('.size-choice[rugsize="large"]');

                const small_price = $(element).find('.price-small').html();
                const small_sale_price = $(element).find('.price-small-sale').html();
                const medium_price = $(element).find('.price-medium').html();
                const medium_sale_price = $(element).find('.price-medium-sale').html();
                const large_price = $(element).find('.price-large').html();
                const large_sale_price = $(element).find('.price-large-sale').html();

                // Function to update prices based on selection
                const updatePrices = (rugsize) => {
                    let salePrice, price;

                    switch (rugsize) {
                        case 'small':
                            salePrice = small_sale_price;
                            price = small_price;
                            break;
                        case 'medium':
                            salePrice = medium_sale_price;
                            price = medium_price;
                            break;
                        case 'large':
                            salePrice = large_sale_price;
                            price = large_price;
                            break;
                    }

                    $(element).find('.update-price').html(`R ${separator(salePrice)}`);
                    $(element).find('.update-sales-price').html(`R ${separator(price)}`);
                };

                // Set the default active class on page load
                if (select_small.css('display') != 'none') {
                    select_small.addClass('active');
                    updatePrices('small');
                } else if (select_medium.css('display') != 'none') {
                    select_medium.addClass('active');
                    updatePrices('medium');
                } else if (select_large.css('display') != 'none') {
                    select_large.addClass('active');
                    updatePrices('large');
                }

                // Handle size choice click
                $(element).find('.size-choice').click(function () {
                    const selected_rugsize = $(this).attr('rugsize');

                    $(element).find('.size-choice').removeClass('active');
                    $(this).addClass('active');
                    updatePrices(selected_rugsize);
                });

                // Handle add to cart click
                $(element).find('#Miracle_add_to_cart').click(function (event) {
                    const selected_rugsize = $(element).find('.size-choice.active').attr('rugsize');
                    const selected_variant_id = $(element).find(`.id-${selected_rugsize}`).html();

                    variant_config.id = window.btoa(selected_variant_id);

                    const ui = ShopifyBuy.UI.init(client);

                    ui.components.cart[0].addVariantToCart(variant_config);
                    event.stopPropagation();
                    ui.openCart();
                });
            });


    }

	// Load the SDK and initialize
    loadShopifySDK(() => {
        if (window.ShopifyBuy && ShopifyBuy.UI) {
            ShopifyBuyInit();
        } else {
            console.error('ShopifyBuy SDK failed to load.');
        }
    });

})();

// AR VIEWS TRACKING

jQuery('.miraclerug-ar-link').each(function () {
    $ar_link = jQuery(this);

    $ar_link.on("click", function () {
        var title_name = jQuery(this)
            .closest('.miraclerug-size-ratio')
            .siblings('.h6')
            .text();
        var track_title = `${title_name} - Augmented Reality`;
        var track_ref = `/miraclerug/ar-download/${title_name.toLowerCase()}`;
        // var track_title = `Belgotex Augmented Reality`
        // var track_ref = `/download/ar-file/color-rib/bush-baby`
        console.log("track page view: ", track_ref, track_title);
        BT_logPageView(track_ref, track_title);
    });
});

function compare(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function separator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}