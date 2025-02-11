$(document).ready(function () {

    var sampleArray = JSON.parse(localStorage.getItem('sampleArray')) || [];
    var sampleItems = JSON.parse(localStorage.getItem('sampleItems')) || [];

    function formatSampleArray(array) {
        return array.map(item => item.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ');
    }

    $('template').remove();

    $('#triggerSamplesCustomer').click(function () {
        $('#samplesCustomer').show();
        $('#samplesPro').hide();
        var formattedSampleArray = formatSampleArray(sampleArray);
        $('#selectedConsumer').val(formattedSampleArray);
    });
    $('#triggerSamplesPro').click(function () {
        $('#samplesPro').show();
        $('#samplesCustomer').hide();
        var formattedSampleArray = formatSampleArray(sampleArray);
        $('#selectedPro').val(formattedSampleArray);
    });

    $(".samples-detail-wrapper").append("<a id='addMoreSamples' class='addMoreSamples button w-button hide' style='margin-top:20px;pointer-events:auto;'>Add More Samples</a>");

    $("#addMoreSamples").click(function () {
        $(".samples-close-cart").click();
    });

    function countSamples() {
        var samplesCount = $(".samples-detail-wrapper .samples-detail").length;
        $(".samples-tab .samples-tab-count").text(samplesCount);

        if (samplesCount > 0) {
            $(".remove-notice").addClass("hide");
            $(".samples-tab").css("display", "flex");
            $("#addMoreSamples").removeClass("hide");
        } else {
            $(".remove-notice").removeClass("hide");
            $(".samples-tab").css("display", "none");
            $("#addMoreSamples").addClass("hide");
            // clear sampleArray and sampleItems
            sampleArray = [];
            sampleItems = {};
        }

        if (samplesCount === 5) {
            $("#addMoreSamples, #addSamplesNote").addClass("hide");
        }
    }

    function renderSampleItem(sampleItemData) {
        var theRange = sampleItemData['theRange'];
        var theColor = sampleItemData['theColor'];
        var theSwatch = sampleItemData['theSwatch'];
        var rangeURL = sampleItemData['rangeURL'].split(/[#?]/)[0];

        if (!theRange) return '';

        return `
            <div class='samples-detail samples-detail-sdk'>
                <div class='samples-image-wrapper'>
                    <img src='${theSwatch}' loading='lazy' sizes='100vw' alt='Sample Swatch' class='samples-image'>
                </div>
                <div class='samples-name-wrapper'>
                    <div class='samples-name'>
                        <a href='${rangeURL}' class='samples-range-link w-inline-block'>
                            <div class='sample-range'>${theRange}</div>
                        </a>
                        <div class='sample-colour'>${theColor}</div>
                    </div>
                    <div class='remove-samples'>
                        <div class='remove-icon'>
                            <div class='remove-bar'></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    function addSamples(sampleItemData) {
        var sampleID = sampleItemData['sampleID'];
        var sampleItem = renderSampleItem(sampleItemData);

        if ($(".samples-detail-wrapper .samples-detail").length < 5) {
            if (sampleArray.includes(sampleID)) {
                alert(sampleItemData['theRange'] + " " + sampleItemData['theColor'] + " has already been added.");
            } else {
                $(".samples-detail-wrapper").prepend(sampleItem);
                sampleArray.push(sampleID);
                sampleItems[sampleID] = sampleItemData;
                localStorage.setItem('sampleArray', JSON.stringify(sampleArray));
                localStorage.setItem('sampleItems', JSON.stringify(sampleItems));
            }
        } else {
            alert("Sample limit reached! Orders are limited to 5 samples.");
        }
        countSamples();
    }

    function updateSamples() {
        for (var sampleID in sampleItems) {
            var sampleItem = renderSampleItem(sampleItems[sampleID]);
            if (sampleItem) {
                $(".samples-detail-wrapper").prepend(sampleItem);
            }
        }
    }

    $(".modal-contant-product .order-sample").click(function () {
        var theRange = $(this).parents(".modal-contant-product").find(".modal-titles").find("h2").text();
        theRange = theRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        var theColor = $(this).parents(".modal-contant-product").find(".modal-titles").find("h3").text();
        var theSwatch = $(this).parents(".modal-contant-product").find(".room-render-grid").find("img").attr('src');
        var rangeURL = window.location.pathname.split(/[#?]/)[0];
        //var sampleID = theRange.replace(/ /g, '').toLowerCase() + "-" + theColor.replace(/ /g, '').toLowerCase();
        var sampleID = theRange + "-" + theColor;

        var sampleItemData = {
            sampleID: sampleID,
            theRange: theRange,
            theColor: theColor,
            theSwatch: theSwatch,
            rangeURL: rangeURL
        };

        addSamples(sampleItemData);
        $(".samples-tab").click().css("display", "flex");
    });

    $("#range-get-sample").click(function () {
        var theRange = window.location.href.includes("/range/") ? window.location.href.split("/range/")[1].split(/[#?]/)[0] : "";
        theRange = theRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        var theColor = $(this).parents(".colour-control").find(".colour-name-confirmation").text();
        var theSwatch = '';
        $(".preview-swatch-item").each(function () {
            if ($(this).css('display') == 'block') {
                theSwatch = $(this).find('.preview-swatch-img').attr('src');
            }
        });
        var rangeURL = window.location.pathname.split(/[#?]/)[0];
        // var sampleID = theRange.replace(/ /g, '').toLowerCase() + "-" + theColor.replace(/ /g, '').toLowerCase();
        var sampleID = theRange + "-" + theColor;

        var sampleItemData = {
            sampleID: sampleID,
            theRange: theRange,
            theColor: theColor,
            theSwatch: theSwatch,
            rangeURL: rangeURL
        };

        addSamples(sampleItemData);
        $(".samples-tab").click().css("display", "flex");
    });

    $(".samples-detail-wrapper").on('click', '.samples-detail .samples-name-wrapper .remove-samples', function () {
        var removeRange = $(this).parents(".samples-name-wrapper").find(".sample-range").text();
        var removeColor = $(this).parents(".samples-name-wrapper").find(".sample-colour").text();
        //var removeID = removeRange.replace(/ /g, '').toLowerCase() + "-" + removeColor.replace(/ /g, '').toLowerCase();
        var removeID = removeRange + "-" + removeColor;

        sampleArray = sampleArray.filter(value => value != removeID);
        delete sampleItems[removeID];

        localStorage.setItem('sampleArray', JSON.stringify(sampleArray));
        localStorage.setItem('sampleItems', JSON.stringify(sampleItems));

        $(this).parents(".samples-detail-wrapper .samples-detail").fadeOut(200, function () {
            $(this).remove();
            countSamples();
        });

        countSamples();
    });

    window['resetSamples'] = function () {
        setTimeout(function () {
            $(".samples-detail").remove();
            //$("#checkoutButton").text("Order for R150");
            $(".remove-notice").removeClass("hide").css({ "background-color": "#8ae68a", "color": "#000" }).text("Your sample order is being processed.");
            $(".samples-close-cart, .samples-form-close").click();
            $(".samples-tab").css("display", "none");
            sampleArray = [];
            sampleItems = {};
            localStorage.setItem('sampleArray', JSON.stringify(sampleArray));
            localStorage.setItem('sampleItems', JSON.stringify(sampleItems));
        }, 3000);
    }

    // Function to update form section visibility and input requirements
    function updateFormSection() {
        const isChecked = $('#samples-dealer').is(':checked');
        $('#sample-form-section').toggle(isChecked);
        $('#sample-form-section input, #sample-form-section select, #sample-form-section textarea').prop('required', isChecked);
        $('#sample-form-section input[type="checkbox"]').prop('required', false);
    }

    // Function to check if all required fields are filled
    function validateForm() {
        let allFilled = true;
        if ($('#samples-dealer').is(':checked')) {
            $('#sample-form-section input[required], #sample-form-section select[required], #sample-form-section textarea[required]').each(function () {
                // console.log('Checking:', $(this).attr('id'), 'Value:', $(this).val()); // Debugging line
                if ($(this).val() === '' || $(this).val() === null) {
                    allFilled = false;
                    return false; // Exit each loop
                }
            });

            // Check reCAPTCHA
            if (grecaptcha.getResponse() === "") {
                allFilled = false;
                // alert("Please complete the reCAPTCHA.");
            }

        } else {
            allFilled = false;
        }
        // console.log('All fields filled:', allFilled); // Debugging line
        $('#checkoutButton').prop('disabled', $('#samples-dealer').is(':checked') && !allFilled);
    }

    // On load, update form section based on the checkbox state
    updateFormSection();

    // Initial validation after the page loads
    validateForm();

    // Validate the form when the #samples-dealer checkbox is toggled
    $('#samples-dealer').change(function () {
        updateFormSection();
        validateForm(); // Explicitly call validateForm to ensure initial state is captured
    });

    // Validate form on input change
    $('#sample-form-section input, #sample-form-section select, #sample-form-section textarea').on('input change', validateForm);
    // Validate form on reCAPTCHA completion
    setTimeout(function () {
        var $element = $("#Samples-Orders .recapture-wrapper");
        // Function to validate the form
        function handleInteraction() {
            validateForm();
        }
        // For mouse hover (desktop)
        $element.hover(handleInteraction);
        // For touch start (mobile)
        $element.on("touchstart", handleInteraction);
    }, 1500);

    // add disabled for #professionalsSubmit, then if #Samples-Professionals has any changes to fields and has all required elements filled then remove disabled from #professionalsSubmit
    $('#professionalsSubmit').prop('disabled', true);
    $('#Samples-Professionals input, #Samples-Professionals select, #Samples-Professionals textarea').on('input change', function () {
        let allFilled = true;
        $('#Samples-Professionals input[required], #Samples-Professionals select[required], #Samples-Professionals textarea[required]').each(function () {
            if ($(this).val() === '' || $(this).val() === null) {
                allFilled = false;
                return false; // Exit each loop
            }
        });
        $('#professionalsSubmit').prop('disabled', !allFilled);
    });

    $("#checkoutButton, #professionalsSubmit").click(function () {
        if (!$(this).prop('disabled')) {
            resetSamples();
        }
    });

    updateSamples();
    countSamples();

}); // End of document ready
