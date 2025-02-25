$(window).on("pageshow", function () {
    applyFilterStyles();
});

// Run immediately on page load
$(document).ready(function () {
    if (window.location.href.includes("/all-products")) {
        applyFilterStyles();
        setupObservers();
        addFilterMapping();
        // setupLookFilterRadio();
        setupSwatchUpdates();
        setupSwatchFiltering();
        copySwatchesToModal();
        handleRugImageToggle();
        removeMiracleRugSwatch();
        showPricingForWestminster();
    }
});

// Function to apply filter styles
function applyFilterStyles() {
    setTimeout(function () {
        $('.checkbox_toggle.fs-cmsfilter_active').each(function () {
            const $this = $(this);
            $this.find('.checkbox_toggle-dot').css('transform', 'translateX(15px)');
            $this.find('.checkbox_toggle-mask').css('background', '#3cb300');
        });
        $('.checkbox_toggle').not('.fs-cmsfilter_active').each(function () {
            const $this = $(this);
            $this.find('.checkbox_toggle-dot').css('transform', 'translateX(0)');
            $this.find('.checkbox_toggle-mask').css('background', '#999');
        });
    }, 100);
}

// Observe for dynamic changes in the DOM
function setupObservers() {
    const observer = new MutationObserver(function () {
        applyFilterStyles();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// Add sector and solution filters
function addFilterMapping() {
    const filterMapping = [
        { field: 'residential', label: 'Residential', filterField: 'sector' },
        { field: 'commercial', label: 'Commercial', filterField: 'sector' },
        { field: 'cto', label: 'Rug', filterField: 'solution' }
    ];

    $('.filter-collection-item').each(function () {
        const $item = $(this);
        filterMapping.forEach(mapping => {
            if ($item.find(`[fs-cmsfilter-field="${mapping.field}"]`).text() === 'true') {
                $item.find('.filter-items').append(`<div fs-cmsfilter-field="${mapping.filterField}">${mapping.label}</div>`);
            }
        });
    });
}

// Make Look filter acts like radio buttons
function setupLookFilterRadio() {
    $('.filter-look-wrapper .checkbox-toggle').on('click', function () {
        if ($(this).is(':checked')) {
            $('.filter-look-wrapper .checkbox-toggle').not(this).prop('checked', false);
        }
    });
}

// Update swatch hexes opacity
function setupSwatchUpdates() {
    function updateSwatchHexes() {
        const activeColours = $('.colour-checkbox.fs-cmsfilter_active .checkbox-label-colour');
        const swatchHexes = $('.swatch-hex');

        if (activeColours.length) {
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
}

// Filter colours
function setupSwatchFiltering() {
    const colors = ['#bfbf30', '#b28659', '#80191b', '#6b998a', '#336680', '#ffffff', '#808080', '#000000'];

    $('.swatch-hex').each(function () {
        const $div = $(this);
        const divColor = $div.css('background-color');
        let closestColor = '';
        let closestColorDistance = Infinity;

        colors.forEach(color => {
            const distance = getColorDistance(divColor, color);
            if (distance < closestColorDistance) {
                closestColor = color;
                closestColorDistance = distance;
            }
        });

        $div.attr('fs-cmsfilter-field', 'colour');
        $div.html($div.html() + closestColor.substring(1));
        $div.css({
            color: divColor,
            fontSize: '0px'
        });
    });

    function getColorDistance(color1, color2) {
        const color1RGB = hexToRGB(color1);
        const color2RGB = hexToRGB(color2);
        const rDiff = color1RGB[0] - color2RGB[0];
        const gDiff = color1RGB[1] - color2RGB[1];
        const bDiff = color1RGB[2] - color2RGB[2];
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
    }

    function hexToRGB(color) {
        const hexMatch = color.match(/^#?([0-9A-F]{6})$/i);
        if (hexMatch) {
            const hex = hexMatch[1];
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return [r, g, b];
        }
        const rgbMatch = color.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i);
        if (rgbMatch) {
            return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
        }
        return [0, 0, 0];
    }
}

// Copy swatches to modal
function copySwatchesToModal() {
    setTimeout(function () {
        $('.filter-collection-item').each(function () {
            const $item = $(this);
            const rangeSwatch = $item.find('.collection-list-swatch').clone();
            const rangeModal = $item.find('.filter-swatches-modal');
            $item.find('.collection-item-swatch').css('width', '20px');
            rangeSwatch.appendTo(rangeModal);
        });
    }, 2000);
}

// Show or hide Rug image for Broadloom products
function handleRugImageToggle() {
    $('#filterForm').on('click', function () {
        setTimeout(function () {
            if ($('#rug-checkbox-wrapper').hasClass('fs-cmsfilter_active')) {
                $('.filter-img-rug').removeClass('hide');
            } else {
                $('.filter-img-rug').addClass('hide');
            }
        }, 500);
    });

    $('#clearFilter1, #clearFilter2').on('click', function () {
        $('.filter-img-rug').addClass('hide');
    });

    if (window.location.href.includes('solution=Rug')) {
        $('.filter-img-rug').removeClass('hide');
    }
}

// Remove MiracleRug swatch
function removeMiracleRugSwatch() {
    setTimeout(function () {
        $('.filter-range-link').each(function () {
            if ($(this).attr('href').includes('miraclerug')) {
                $(this).find('.collection-list-swatch').remove();
            }
        });
    }, 4000);
}

// Show pricing for Westminster
function showPricingForWestminster() {
    const currentUrl = window.location.href;

    if (currentUrl.includes("/all-products")) {
        $('.filter-item').each(function () {
            const $this = $(this);
            if ($this.find('.filter-heading').text().trim() === 'Westminster') {
                $this.find('.compare-price').removeClass('w-condition-invisible');
            }
        });
    } else if (currentUrl.includes("/westminster")) {
        $('#w-node-f81ec8e2-6160-c1b6-e368-a4bbdf836105-bfd5d4f1').removeClass('w-condition-invisible');
    }
}