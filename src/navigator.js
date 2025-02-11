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

// NAVIGATOR LINK BELGOTEX TABLES

var qrData = [];

// Parses the QR data from the HTML
function parseQRData() {
    $('.json-qr script').each(function () {
        var jsonData = $(this).text().replace(/&#39;/g, "'").replace(/&amp;/g, "&").trim();
        var qrCode = JSON.parse(jsonData);
        qrData.push(qrCode.id); // Access the id property
    });
}

// Retrieves a query parameter value by name
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// set a cookie called cookieQRCode with the value of idFromURL so that it can be used in the form submission for favourites
if (getQueryParam('id')) {
    setCookie('cookieQRCode', getQueryParam('id'), 1);
}

// Determines whether to show the installer form based on the presence of the ID in the URL
function shouldShowInstallerForm() {
    var idFromURL = getQueryParam('id');
    $('#tableQrCode').val(idFromURL); // Set the QR code in the table (if it exists)
    // console.log('ID from URL:', idFromURL);
    if (idFromURL && qrData.includes(idFromURL)) {
        // The QR ID is listed, show the form
        $('#link-table').css('display', 'flex');
        // See NAVIGATOR FORM SUBMISSIONS section for the form submission logic
    } else {
        // The QR ID is not listed, hide the form
        $('#link-table').css('display', 'none');
    }
}

// Parses the QR data and determines the form visibility when the document is ready
parseQRData();
shouldShowInstallerForm();

var installersData = [];

// Function to parse the installer data from the page
function parseInstallerData() {
    $('.json-installer script').each(function () {
        var installer = JSON.parse($(this).text());
        installersData.push(installer);
    });
}

// Function to populate the Province dropdown
function populateProvinces() {
    var provinces = [...new Set(installersData.map(item => item.province))].sort();
    $('#provinceSelect').empty().append($('<option>').text('Select Province').attr('value', ''));
    $.each(provinces, function (index, province) {
        $('#provinceSelect').append($('<option>').text(province).attr('value', province));
    });
    $('#provinceSelect').show();
    $('#citySelect, #installerSelect').hide().empty(); // Removed #suburbSelect from hide().empty();
}

// Function to populate the City dropdown and directly call populateInstallers if a city is selected
function populateCities(province) {
    var cities = [...new Set(installersData.filter(item => item.province === province).map(item => item.city))].sort();
    $('#citySelect').empty().append($('<option>').text('Select City').attr('value', ''));
    $.each(cities, function (index, city) {
        $('#citySelect').append($('<option>').text(city).attr('value', city));
    });
    $('#citySelect').show();
    $('#installerSelect').hide().empty(); // Removed #suburbSelect
}

// Modified Function to populate the Installer dropdown directly after city selection
function populateInstallers(city) {
    var installers = installersData.filter(item => item.city === city);
    if (installers.length > 0) {
        $('#installerSelect').empty().append($('<option>').text('Select Installer').attr('value', ''));
        $.each(installers, function (index, installer) {
            $('#installerSelect').append($('<option>').text(installer.name).attr('value', installer.id)); // Use the id for value
        });
        $('#installerSelect').show();
    } else {
        $('#installerSelect').hide();
    }
}

// Event handler for Province selection
$('#provinceSelect').change(function () {
    var province = $(this).val();
    if (province) {
        populateCities(province);
    } else {
        $('#citySelect, #installerSelect').hide().empty(); // Removed #suburbSelect
    }
});

// Modified event handler for City selection to directly populate installers
$('#citySelect').change(function () {
    var city = $(this).val();
    if (city) {
        populateInstallers(city); // Changed to call populateInstallers directly
    } else {
        $('#installerSelect').hide().empty();
    }
});

// Initial parsing of data and population of the province dropdown
parseInstallerData();
populateProvinces();

// NAVIGATOR FAVOURITES

var heartPlus = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>';
var heartMinus = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q84 0 153 59t69 160q0 14-2 29.5t-6 31.5h-85q5-18 8-34t3-30q0-75-50-105.5T620-760q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm160-280v-80h320v80H600Z"/></svg>';

// if cookieQRCode exists then set value of #tableQrCode input selector
if (getCookie('cookieQRCode')) {
    $('#favQrCode').val(getCookie('cookieQRCode'));
}

// Event delegation for click events on favourite toggle buttons
$(document).on('click', '.favourite-toggle', function () {
    var $button = $(this);
    var itemId = $button.data('item-id');
    var isFavourited = $button.attr('data-favourited') === 'true';
    var itemName = $button.data('item-name');
    var itemPageUrl = window.location.href;

    if (isFavourited) {
        localStorage.removeItem('fav-' + itemId);
        $button.attr('data-favourited', 'false').html(heartPlus);
    } else {
        var itemDetails = {
            id: itemId,
            name: itemName,
            url: itemPageUrl
        };
        localStorage.setItem('fav-' + itemId, JSON.stringify(itemDetails));
        $button.attr('data-favourited', 'true').html(heartMinus);
    }
    updateFavouritesDisplay(); // Optionally update a list display of favourites
});

// Function to update the initial state of the favourite button based on localStorage
function updateButtonState() {
    $('.favourite-toggle').each(function () {
        var $button = $(this);
        var itemId = $button.data('item-id');
        if (localStorage.getItem('fav-' + itemId)) {
            $button.attr('data-favourited', 'true').html(heartMinus);
        } else {
            $button.attr('data-favourited', 'false').html(heartPlus);
        }
    });
    countFavouriteItems();
}

// Function to update the display of the favourites list
function updateFavouritesDisplay() {
    $('#favouritesList').empty(); // Empty the list before repopulating
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith('fav-')) {
            var itemDetails = JSON.parse(localStorage.getItem(key));
            var listItem = $('<div class="favourite-item"></div>');
            listItem.append($('<a class="favourite-link"></a>').attr('href', itemDetails.url).text(itemDetails.name));
            var buttonHTML = '<button class="icon-button favourite-toggle reverse" type="button" data-item-id="' + itemDetails.id + '" data-favourited="true" aria-label="Toggle Favourite" data-item-name="' + itemDetails.kind + ' - ' + itemDetails.name + '">';
            buttonHTML += heartMinus + '</button>';
            listItem.append($(buttonHTML));
            $('#favouritesList').append(listItem);
        }
    }
    // Now that the favourites list has potentially new buttons, update their state.
    // Count the number of favourite items
    updateButtonState();
    countFavouriteItems();
}

function countFavouriteItems() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('fav-')) {
            count++;
        }
    }
    // if count is 0 hide the favourites button else show it
    if (count === 0) {
        $('.fav-button').hide();
        // click .close-fav-modal to close the modal
        $('.close-fav-modal').click();
    } else {
        $('.fav-button').show();
    }
    $('.fav-count').text(count);
}

function prepareFavouritesDataForForm() {
    const favourites = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('fav-')) {
            try {
                // Attempt to parse the item details and add them to the favourites array
                const itemDetails = JSON.parse(localStorage.getItem(key));
                favourites.push(itemDetails);
            } catch (error) {
                // Log an error message if parsing fails
                console.error('Error parsing itemDetails for key:', key, error);
                // Optionally, you can decide to continue, break, or take any other action here
            }
        }
    }
    // Serialize the array of favourites to a string
    const favouritesSerialized = JSON.stringify(favourites);
    // Populate the hidden input field with this serialized string
    document.getElementById('favouritesData').value = favouritesSerialized;
}

// Initial setup calls
updateButtonState(); // Update the state of any favourite-toggle buttons on page load
updateFavouritesDisplay(); // Populate the favourites list based on localStorage
countFavouriteItems(); // Count the number of favourite items

// NAVIGATOR FORMS SUBMISSION

function handleSubmit(formId, successMessageId, errorMessageId, webhookURL) {
    $(formId).on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submitted:', formId);
        var formData = $(this).serialize(); // Serialize the form data for submission
        $.ajax({
            type: "POST",
            url: webhookURL, // Dynamic webhook URL based on the form being submitted
            data: formData,
            success: function (response) {
                // Hide the form and show the success message
                $(formId).hide();
                $(successMessageId).show();
                $(errorMessageId).hide();
                // if formId is #belgotexTableForm then fade out after 2 seconds
                if (formId === '#belgotexTableForm') {
                    // Fade out after 2 seconds
                    setTimeout(function () {
                        $('#link-table').fadeOut(1000);
                    }, 2000);
                }
                // if form is #favouritesForm then fade out after 2 seconds
                // if (formId === '#favouritesForm') {
                //     // Fade out after 2 seconds
                //     setTimeout(function () {
                //         $('#fav-modal').fadeOut(1000);
                //     }, 2000);
                // }
            },
            error: function () {
                // Handle any errors, perhaps show an error message
                $(formId).show();
                $(successMessageId).hide();
                $(errorMessageId).show();
            }
        });
    });
}

// Close modal logic can remain the same, just make sure it targets the right modal based on the context
$('.close-fav-modal').click(function () {
    $('.favourites-modal').removeClass('show');
    // Optionally reset the form and messages visibility
    $('#favouritesForm, #belgotexTableForm').show();
    $('#successMessageFav, #successMessageTable').hide();
    $('#errorMessagesFav, #errorMessagesTable').hide();
});

$('#favouritesForm').on('submit', function (event) {
    event.preventDefault(); // Still prevent the default form submission
    prepareFavouritesDataForForm(); // Update your hidden input with prepared data
});

// Handle the submission of the Favourites form
handleSubmit('#favouritesForm', '#successMessageFav', '#errorMessagesFav', "https://hook.eu1.make.com/l63sqerolwtsx195zt17yg8tv4f0n52r");
// Handle the submission of the Link Table form
handleSubmit('#belgotexTableForm', '#successMessageTable', '#errorMessagesTable', "https://hook.eu1.make.com/jolgn9v7yjamrs6ahjawbk6la3tflel3");

// NAVIGATOR PRICE COLOURS

// Function to determine the background color based on price
function getBackgroundColor(price) {
    if (price > 525) {
        return '#ecaea2'; // Red-ish
    } else if (price > 350) {
        return '#f6d3b4'; // Orange-ish
    } else if (price > 100) {
        return '#fdf0c3'; // Yellow-ish
    }
    return ''; // Default, no background color change
}

// Apply coloring logic to .navigator-price and .sector-both elements
$('.navigator-price, .sector-both').each(function () {
    var priceElement = $(this);
    var price = parseFloat(priceElement.text().trim()); // Parse the price
    var backgroundColor = getBackgroundColor(price);
    if (backgroundColor) {
        // If a background color is determined, apply it to the closest .navigator-heading
        priceElement.closest('.swiper-slide').find('.navigator-heading').css('background-color', backgroundColor);
    }
});

// NAVIGATOR MODAL CONTROLS

// if .modal-nav-zoom-trigger is clicked then add .no-scroll to body and remove when 
$('.modal-nav-zoom-trigger').click(function () {
    $('body').addClass('no-scroll');
});
// if .close-modal-nav-zoom is clicked then remove .no-scroll from body
$('.close-modal-nav-zoom').click(function () {
    $('body').removeClass('no-scroll');
});

// NAVIGATOR PDF FILE NAME OVERIDE

var rangeName = $('.nav-range-heading').text();
var pdfName = 'belgotex-' + rangeName.toLowerCase().replace(/\s+/g, '-').replace(/-{2,}/g, '-');

// Using jQuery for AJAX request
$("#downloadPDF").on("click", function (e) {
    // Prevent the default behaviour
    e.preventDefault();
    // The URL to the PDF you want to download
    var pdfUrl = $(this).attr("href");
    var desiredFilename = pdfName;
    // Fetch the PDF with AJAX
    $.ajax({
        url: pdfUrl,
        method: 'GET',
        xhrFields: {
            responseType: 'blob' // Important: Handle the response as a Blob
        },
        success: function (data) {
            // Create a Blob from the PDF Stream
            var blob = new Blob([data], { type: 'application/pdf' });
            // Generate a URL for the Blob
            var blobUrl = URL.createObjectURL(blob);
            // Create a temporary anchor to trigger download
            var downloadLink = document.createElement("a");
            downloadLink.href = blobUrl;
            downloadLink.download = desiredFilename;
            // Append to the body temporarily
            document.body.appendChild(downloadLink);
            // Trigger the download
            downloadLink.click();
            // Clean up by removing the temporary link and revoking the Blob URL
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
        },
        error: function (xhr, status, error) {
            // Handle errors here
            console.error("Error downloading PDF: ", error);
        }
    });
});