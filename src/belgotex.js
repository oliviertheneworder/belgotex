

// REARABGE RANGES ON HOME

var $homeRanges = $('#home-ranges .w-dyn-items');
var $items = $homeRanges.children('.feature');

// Rearranging items
var $panthera = $items.filter(function () {
    return $(this).find('h3').text().includes('Panthera');
});
var $highlands = $items.filter(function () {
    return $(this).find('h3').text().includes('Highlands');
});
var $timbavati = $items.filter(function () {
    return $(this).find('h3').text().includes('Timbavati');
});

// Remove items from the DOM
$panthera.remove();
$highlands.remove();
$timbavati.remove();

// Prepend items in the new order
$homeRanges.prepend($timbavati);
$homeRanges.prepend($highlands);
$homeRanges.prepend($panthera);

// VARS

var pathName;
var rangeName;
var swatchColour;
var pageTitle;
var virtualPage;
var currentUrl = window.location.href;

// input name="Page Title" is equal to the title tag
$('input[name="Page Title"]').val(window.location.href); //.val(document.title);
// input name="Page URL" is equal to the page URL
$('input[name="Page URL"]').val(window.location.href);

// if url contains /range/custom-carpets-by-belgotex then forward to /custom-carpets
if (window.location.href.indexOf("/range/custom-carpets-by-belgotex") > -1) {
    window.location.href = "/custom-carpets";
}

// if div.search-result-item has a with href containing /range/custom-carpets-by-belgotex then remove this div
// $('div.search-result-item').each(function () {
//     if ($(this).find('a').attr('href').indexOf("/range/custom-carpets-by-belgotex") > -1) {
//         $(this).remove();
//     }
// });

// if any link has herf containing /range/custom-carpets-by-belgotex then forward to /custom-carpets
// $('a').each(function () {
//     if ($(this).attr('href').indexOf("/range/custom-carpets-by-belgotex") > -1) {
//         $(this).attr('href', "/custom-carpets");
//     }
// });    

// COOKIE FUNCTION - GLOBAL

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Show site choosing modal if URL contains ?ref=belgotex.com
function setSiteCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function checkModal() {
    var urlParams = new URLSearchParams(window.location.search);
    var ref = urlParams.get('ref'); // Get the "ref" parameter from the URL
    // Check if "ref" parameter exists and equals "belgotex.com"
    if (ref === "belgotex.com") {
        var userHasVisited = getCookie("userHasVisited");
        if (!userHasVisited) {
            // Show the modal
            document.getElementById("sitesModal").style.display = "flex";
            // Set a cookie for 1 year
            setSiteCookie("userHasVisited", "true", 365);
        }
    }
}

// Call checkModal function when the page loads
window.onload = function () {
    checkModal();
}

// Range template check if we previewing a rug (used for .wtw-fallback and .cto-fallback)
var viewAsRug = false;
$('#range-buy-rug').click(function () {
    viewAsRug = true;
    $('.colour-swatch.active').trigger("click");
});
$('#close-buy-rug').click(function () {
    viewAsRug = false;
    $('.colour-swatch.active').trigger("click");
});

// if #search-trigger is clicked add focus to #search input inside the modal
$('#search-trigger').click(function () {
    setTimeout(function () {
        $('#search').focus();
    }, 100);
});

// Show pricing for Westminster
function showPricingForWestminster() {
    if (currentUrl.includes("/all-products")) {
        $('.filter-item').each(function () {
            var $this = $(this);
            if ($this.find('.filter-heading').text().trim() === 'Westminster') {
                $this.find('.compare-price').removeClass('w-condition-invisible');
            }
        });
    } else if (currentUrl.includes("/westminster")) {
        $('#w-node-f81ec8e2-6160-c1b6-e368-a4bbdf836105-bfd5d4f1').removeClass('w-condition-invisible');
    }
}
showPricingForWestminster();

$(".swatch-link-block").click(function () {

    pathName = window.location.pathname; // Returns path only (/path/page)
    //console.log("pathName = " + pathName);

    rangeName = pathName.replace("/range/", "");
    //console.log("rangeName = " + rangeName);

    swatchColour = $(this).find(".product-name").not(".thin").text().replace(/\s+/g, '-').toLowerCase();
    //console.log("swatchColour = " + swatchColour);

    pageTitle = rangeName + " - " + swatchColour;
    //console.log("pageTitle = " + pageTitle);

    virtualPage = pathName + "/" + swatchColour;
    //console.log("virtualPage = " + virtualPage);

    BT_logPageView(virtualPage, pageTitle);

});

// Mark field that the professional sample button has been clicked - used in Make.com to flag for Professionals
$('#pro-btn-wrapper').click(function () {
    $('#is-professional').val('Yes');
});
$('#free-btn-wrapper').click(function () {
    $('#is-professional').val(''); // Remove values
});

// Sample Order form if #order-for-professional is clicked then add text = Yes to #is-professional
$('#order-for-professional').on('click', function () {
    $('#is-professional').val('Yes');
});

// IF RANGE PAGE

if (window.location.href.indexOf("/range/") > -1) { // IF RANGE PAGE

    // PAY LATER

    if ($('#isPayLater').text() === 'true') {
        $('.is-pay-later').css('display', 'block');
        var payLaterPrice = $('#the-pay-later-price').text();
        $('#pay-later-price').text(payLaterPrice);
    }

    // Style Shopify Buy Button inside iframe
    $('.shopify-buy__btn-wrapper').css('margin-top', '0 !important');

    // Remove 'Shopify Buy Button' Modal on Range pages
    $('#hideShopifyBuyButton').remove();

    // if .hero-colour-img exists and has src value, then set padding of .hero-colour-content to 5vw
    if ($('.hero-colour-img').attr('src')) {
        $('.hero-colour-content').css('padding', '5vw');
    }

    // if url contains /range/ for each .more-collection-list has more than 5 children with .more-collection-item, randomise the order of the children and only show the first 5 of them

    $('.more-collection-list').each(function () {
        if ($(this).children('.more-collection-item').length > 5) {
            var moreCollectionItems = $(this).children('.more-collection-item');
            var moreCollectionItemsArray = $.makeArray(moreCollectionItems);

            // Fisher-Yates shuffle algorithm
            for (var i = moreCollectionItemsArray.length - 1; i > 0; i--) {
                var randomIndex = Math.floor(Math.random() * (i + 1));
                var temp = moreCollectionItemsArray[i];
                moreCollectionItemsArray[i] = moreCollectionItemsArray[randomIndex];
                moreCollectionItemsArray[randomIndex] = temp;
            }

            var moreCollectionItemsArrayRandomisedFirstFive = moreCollectionItemsArray.slice(0, 5);
            $(this).empty();
            $(this).append(moreCollectionItemsArrayRandomisedFirstFive);
        }
    });
} else {
    // hide #is-pay-later if not on Range page
    //$('.is-pay-later').css('display', 'none');
}

// IF ALL PRODUCTS PAGE

if (window.location.href.indexOf("/all-products") > -1) {

    // Add sector and solution to filter items

    $('.filter-collection-item').each(function () {
        if ($(this).find('[fs-cmsfilter-field="residential"]').text() === 'true') {
            $(this).find('.filter-items').append('<div fs-cmsfilter-field="sector">Residential</div>');
        }
        if ($(this).find('[fs-cmsfilter-field="commercial"]').text() === 'true') {
            $(this).find('.filter-items').append('<div fs-cmsfilter-field="sector">Commercial</div>');
        }
        if ($(this).find('[fs-cmsfilter-field="cto"]').text() === 'true') {
            $(this).find('.filter-items').append('<div fs-cmsfilter-field="solution">Rug</div>');
        }
    });

}

// ALL PRODUCTS - LOOK FILTER TO ACT LIKE RADIO BUTTONS

$('.filter-look-wrapper .checkbox-toggle').click(function () {
    if ($(this).is(':checked')) {
        $('.filter-look-wrapper .checkbox-toggle').not(this).prop('checked', false);
    }
});

// RANGE COLOUR CARPET ROOM + ALPHA

$(".colour-swatch").on("click", function () {

    var $this = $(this);
    var $mtoFlag = $this.find('.mto-flag');
    var $noSampleFlag = $this.find('.no-sample-flag');
    var $mtoNote = $('.mto-note');
    var $colourARLink = $this.find(".colour-ar-link");
    var $heroColourSwatch = $('.hero-colour-swatch');
    var $colourSwatchConfirmationImg = $('.colour-swatch-confirmation-img');
    var $wtwFallback = $this.find('.wtw-fallback');
    var $ctoFallback = $this.find('.cto-fallback');

    if ($mtoFlag.text() === 'true') {
        $mtoNote.removeClass('hide');
    } else {
        $mtoNote.addClass('hide');
    }

    if ($noSampleFlag.text() === 'true') {
        $('[what_button="get_sample"]').hide();
    } else {
        $('[what_button="get_sample"]').show();
    }

    $('#colour-control').css('display', 'flex');
    $('#preview-swatch-wrapper').css('display', 'block');

    if ($colourARLink.attr('href') !== undefined) {
        $('.hero-ar-link').attr('href', $colourARLink.attr('href'));
    }

    var colour = $this.css("background-color");
    var colourName = $this.find(".colour-name").text();
    colourName = colourName.replace('Lite', '').replace('Ultra', '');

    $('.hero-colour-tint, .colour-swatch-confirmation').css("background-color", colour);
    $('.colour-name-confirmation, .hero-colour-name, #colourName').text(colourName);

    var foundPreviewSwatch = false;

    $('.preview-swatch-item').each(function () {
        var $previewSwatchItem = $(this);
        if ($previewSwatchItem.find('.preview-swatch-name').text() === colourName) {
            $previewSwatchItem.css('display', 'block');
            var previewSwatchImage = $previewSwatchItem.find('.preview-swatch-img').attr('src');
            $heroColourSwatch.attr('src', previewSwatchImage);
            $colourSwatchConfirmationImg.attr('src', previewSwatchImage);
            foundPreviewSwatch = true;
        } else {
            $previewSwatchItem.css('display', 'none');
        }
    });

    if (viewAsRug) {
        // Check if the CTO fallback element exists and has a valid src
        if ($ctoFallback.length) {
            var ctoFallbackSrc = $ctoFallback.attr('src');
            if (ctoFallbackSrc) {
                $heroColourSwatch.attr('src', ctoFallbackSrc);
            }
        }
    } else {
        // Check if the WTW fallback element exists and has a valid src
        if ($wtwFallback.length) {
            var wtwFallbackSrc = $wtwFallback.attr('src');
            if (wtwFallbackSrc) {
                $heroColourSwatch.attr('src', wtwFallbackSrc);
            }
        }
    }

});

// ALL PRODUCTS - SHOW OR HIDE FILTERED COLOURS

function updateSwatchHexes() {

    const activeColours = $('.colour-checkbox.fs-cmsfilter_active .checkbox-label-colour');
    const swatchHexes = $('.swatch-hex');

    if (activeColours.length > 0) {

        swatchHexes.css('opacity', '0.1');

        activeColours.each(function () {

            const colourValue = $(this).text().trim();
            swatchHexes.filter(function () {
                return $(this).text().trim() === colourValue;
            }).css('opacity', '1');

        });
    } else {
        swatchHexes.css('opacity', '1');
    }
}

$('[fs-cmsfilter-element="clear"], .colour-checkbox').on('click', function () {
    setTimeout(updateSwatchHexes, 500);
});

updateSwatchHexes();

// SORT COLOUR BY BRIGHTNESS

const colorSwatches = document.querySelectorAll('.colour-swatch');
const swatchArray = Array.from(colorSwatches);

// Sort the divs by brightness and then hue
swatchArray.sort(function (a, b) {
    const aRGB = a.style.backgroundColor.match(/\d+/g);
    const bRGB = b.style.backgroundColor.match(/\d+/g);

    // Convert RGB to HSL
    const aHSL = rgbToHsl(aRGB[0], aRGB[1], aRGB[2]);
    const bHSL = rgbToHsl(bRGB[0], bRGB[1], bRGB[2]);

    // Sort by brightness first, then by hue
    if (aHSL[2] < bHSL[2]) return -1;
    if (aHSL[2] > bHSL[2]) return 1;
    if (aHSL[0] < bHSL[0]) return -1;
    if (aHSL[0] > bHSL[0]) return 1;
    return 0;

});

// Update the order of the divs in the DOM
swatchArray.forEach(function (swatch) {
    document.querySelector('.colour-grid').appendChild(swatch);
});

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// FILTER COLOURS

let colors = ['#bfbf30', '#b28659', '#80191b', '#6b998a', '#336680', '#ffffff', '#808080', '#000000'];
let swatchDivs = document.querySelectorAll('.swatch-hex');

swatchDivs.forEach(div => {

    // Get the hex color value of the div
    const divColor = div.style.backgroundColor;

    // Calculate the closest color from the colors array
    let closestColor = '';
    let closestColorDistance = Infinity;
    colors.forEach(color => {
        const distance = getColorDistance(divColor, color);
        if (distance < closestColorDistance) {
            closestColor = color;
            closestColorDistance = distance;
        }
    });

    // Set the new attribute with the closest color and then the text of the div
    div.setAttribute('fs-cmsfilter-field', 'colour');

    // div innerHTML is the text of the div but preserve the img already there
    div.innerHTML = div.innerHTML + closestColor.substring(1);
    div.style.color = divColor;
    div.style.fontSize = '0px';

});

// Helper function to calculate the distance between two colors
function getColorDistance(color1, color2) {
    const color1RGB = hexToRGB(color1);
    const color2RGB = hexToRGB(color2);
    const rDiff = color1RGB[0] - color2RGB[0];
    const gDiff = color1RGB[1] - color2RGB[1];
    const bDiff = color1RGB[2] - color2RGB[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

// Helper function to convert a hex color to RGB
function hexToRGB(color) {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        // Hex color code
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);
        return [r, g, b];
    } else if (/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(color)) {
        // RGB color code
        const match = color.match(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i);
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        return [r, g, b];
    } else {
        return [0, 0, 0]; // Invalid color, return black
    }
}

// FILTER COPY SWATCHES TO MODAL

setTimeout(function () {
    $('.filter-collection-item').each(function () {
        const rangeSwatch = $(this).find('.collection-list-swatch').clone();
        const rangeModal = $(this).find('.filter-swatches-modal');
        // $(rangeSwatch).find('.swatch-hex').css('opacity', '1');
        $(rangeSwatch).find('.collection-item-swatch').css('width', '30px');
        rangeSwatch.appendTo(rangeModal);
    });
}, 2000);

// RANGE GALLERY + SWATCH ZOOM

$('.range-gallery-item').on('click', '.range-gallery-zoom', toggleZoom);
$('.preview-swatch-item, .preview-swatch-img').on('click', '.preview-swatch-zoom', toggleZoom);

function toggleZoom() {

    const $galleryItem = $(this).closest('.range-gallery-item');
    const $galleryImg = $galleryItem.find('.range-gallery-img');
    const $galleryText = $galleryItem.find('.range-gallery-text');

    const $swatchItem = $(this).closest('.preview-swatch-item');
    const $swatchText = $swatchItem.find('.preview-swatch-name');
    const $swatchFave = $swatchItem.find('.preview-swatch-favourite');
    const $swatchImg = $swatchItem.find('.preview-swatch-img');
    const $swatchBackgroundColor = $swatchItem.find('.preview-swatch-item').css('background-color');

    const isZoomed = $(this).hasClass('zoom-close');

    $('body').css('overflow', isZoomed ? 'auto' : 'hidden');

    $(this).css({
        'transform': isZoomed ? 'rotate(0deg)' : 'rotate(45deg)',
        'top': isZoomed ? 'auto' : '0',
        'bottom': isZoomed ? '0' : 'auto',
        'position': isZoomed ? 'absolute' : 'fixed',
        'margin': isZoomed ? '1rem' : '5vw'
    });

    // Gallery

    $galleryItem.css({
        'position': isZoomed ? 'relative' : 'fixed',
        'width': isZoomed ? 'auto' : '100vw',
        'height': isZoomed ? 'auto' : '100vh',
        'overflow': isZoomed ? 'hidden' : 'auto',
        'top': isZoomed ? 'auto' : '0',
        'left': isZoomed ? 'auto' : '0',
        'z-index': isZoomed ? 'auto' : '9999',
        'border-radius': isZoomed ? '1rem' : '0'
    });
    $galleryImg.css({
        'width': '100%',
        'height': isZoomed ? '100%' : 'auto',
        'max-height': isZoomed ? '50dvh' : 'none'
    });
    $galleryText.css({
        'top': isZoomed ? '1.5rem' : '5vw',
        'margin-left': isZoomed ? '0' : '5vw'
    });

    // Swatch

    $swatchItem.css({
        'position': isZoomed ? 'absolute' : 'fixed',
        'top': isZoomed ? 'auto' : '0',
        'left': isZoomed ? 'auto' : '0',
        'width': isZoomed ? '100%' : '100vw',
        'height': isZoomed ? '100%' : '100vh',
        'z-index': isZoomed ? 'auto' : '9999',
        'display': isZoomed ? 'block' : 'flex',
        'justify-content': isZoomed ? 'space-between' : 'center',
        'align-items': isZoomed ? 'flex-start' : 'center',
        'background-color': isZoomed ? $swatchBackgroundColor : 'rgba(0,0,0,0.5)'
    });
    $swatchImg.css({
        'width': isZoomed ? '100%' : 'auto',
        'height': isZoomed ? '100%' : 'auto',
        'minWidth': isZoomed ? 'auto' : '66vmin',
        'minHeight': isZoomed ? 'auto' : '66vmin'
    });
    $swatchText.css({
        'display': isZoomed ? 'none' : 'block',
        'margin': isZoomed ? '1.5rem' : '5vw'
    });
    $swatchFave.css({
        'display': isZoomed ? 'block' : 'none'
    });

    // Toggle

    $(this).toggleClass('zoom-close');

}

// RANGE MATCH HEIGHTS .range-variant-box'

function setHeaderHeight() {
    // Get all the .header elements
    const headers = document.querySelectorAll('.header');

    // Find the maximum height of all the .header elements
    let maxHeight = 0;
    headers.forEach(header => {
        const height = header.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Set the height of all .header elements to the maximum value
    headers.forEach(header => {
        header.style.height = `${maxHeight}px`;
    });
}

// Call setHeaderHeight on window.onload and window.onresize
window.addEventListener('load', setHeaderHeight);
window.addEventListener('resize', setHeaderHeight);

// RANGE TOOGLE WALL-TO-WALL and RUG ROOMS

$('.form-radio-label').each(function () {
    const labelText = $(this).text().trim();
    if (labelText === 'Wall-to-wall') {
        $(this).siblings('.form-radio-icon').addClass('w--redirected-checked');
    }
});
$('#range-rug').click(function () {
    $('.hero-colour-img:not(.rug)').hide();
    $('.hero-colour-mask:not(.rug)').hide();
    viewAsRug = true;
    $('.colour-swatch.active').trigger("click");

});
$('#range-wall-to-wall').click(function () {
    $('.hero-colour-img:not(.rug)').show();
    $('.hero-colour-mask:not(.rug)').show();
    viewAsRug = false;
    $('.colour-swatch.active').trigger("click");
});

// RANGE CONTROL SAMPLE BUTTON BEHAVIOUR

if ($('#range-buy-rug').css('display') != 'none') {
    $('#range-get-sample').css({
        'grid-column': 'span 2'
    });
}

// if #range-buy-rug is clicked in Range page show rug alpha images
$('#range-buy-rug, #close-buy-rug').click(function () {
    $('.switch-on-rug')[0].click();
});

// RANGE DEFAULT COLOUR SWATCH AND IS ACTIVE CONTROL

const swatches = $('.colour-swatch');
const activeSwatch = swatches.last();

//activeSwatch.addClass('active').css('outline', '3px solid #3bb300');

swatches.click(function () {
    swatches.removeClass('active').css('outline', 'none');
    $(this).addClass('active').css('outline', '3px solid #3bb300');
    $(this).css('outlineOffset', '1px');

    // set value of #inputColour input selector
    $('#inputColour').val($(this).find('.colour-name').text().trim());

    //console.log($(this).find('.colour-name').text().trim());

});

activeSwatch.click(); // Trigger the click event for the last swatch.

// ALL PRODUCTS GENERAL

// Show or hide Rug image for Broadloom products
$('#filterForm').click(function () {
    setTimeout(function () {
        if ($('#rug-checkbox-wrapper').hasClass('fs-cmsfilter_active')) {
            $('.filter-img-rug').removeClass('hide');
        } else {
            $('.filter-img-rug').addClass('hide');
        }
    }, 500);
});

$('#clearFilter1, #clearFilter2').click(function () {
    $('.filter-img-rug').addClass('hide');
    //console.log('#clearFilter1,2 clicked');
});

// if url contains 'solution=Rug' then remove .hide from .filter-img-rug
if (window.location.href.indexOf('solution=Rug') > -1) {
    $('.filter-img-rug').removeClass('hide');
}

// if anchor tag contains 'miraclerug' then remove child with class 'collection-list-swatch'
setTimeout(function () {
    $('.filter-range-link').each(function () {
        if ($(this).attr('href').indexOf('miraclerug') > -1) {
            $(this).find('.collection-list-swatch').remove();
        }
    });
}, 4000);

// trigger get quote button in nav bar
$('.get-quote').click(function () {
    $('#nav-get-quote')[0].click();
});

// Check if current URL contains "/range/"
if (window.location.href.indexOf("/range/") > -1) {
    // Function to set value in the textarea
    function updateQuoteComments(color) {
        var rangeText = "I'm interested in " + $('.hero-intro h1').text();
        var comboText = rangeText;
        // Add color to comboText if provided
        if (color) {
            comboText += " (" + color + ")";
        }
        $('#quote-requirements').val(comboText);
    }
    // Initial call without color
    updateQuoteComments();
    // Set up click event handler for color swatches
    $('#colour-grid .colour-swatch').click(function () {
        var rangeColour = $(this).find('.colour-name').text();
        updateQuoteComments(rangeColour);
    });
}

// if a with class 'rug-builder' then add #range-controls to the href
$('a.rug-builder').each(function () {
    $(this).attr('href', $(this).attr('href') + '#range-controls');
});
// if URL contains #range-controls then click '.switch-on-rug' Range Template page
if (window.location.href.indexOf('#range-controls') > -1) {
    setTimeout(function () {
        $('.switch-on-rug')[0].click();
        $('.buy-rug')[0].click();
        $('.colour-swatch.active').trigger("click");
        // Remove '#range-controls' from URL
    }, 1000);
}