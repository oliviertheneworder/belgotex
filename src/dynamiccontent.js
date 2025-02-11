

const utmString = window.location.search;
let utmObject = {};

// Get UTM values from the cookie if they exist
const utmCookie = getCookie('utm_tracking');
if (utmCookie) {
	utmObject = JSON.parse(utmCookie);
}

// Update UTM values with new parameters found in the URL
if (utmString.length > 0) {
	const urlUtmObject = Object.fromEntries(new URLSearchParams(utmString));
	utmObject = { ...utmObject, ...urlUtmObject, utm_duration: Date.now() };
	setCookie('utm_tracking', JSON.stringify(utmObject), 365);
}

// Populate hidden input fields with UTM parameters in all forms
$('form').each(function () {
	$(this).find('input[name="UTM Source"]').val(utmObject['utm_source'] || '');
	$(this).find('input[name="UTM Medium"]').val(utmObject['utm_medium'] || '');
	$(this).find('input[name="UTM Campaign"]').val(utmObject['utm_campaign'] || '');
	$(this).find('input[name="UTM Content"]').val(utmObject['utm_content'] || '');
	$(this).find('input[name="UTM Term"]').val(utmObject['utm_term'] || '');
	$(this).find('input[name="UTM Duration"]').val(Math.floor(utmObject['utm_duration'] / (1000 * 60 * 60 * 24)) || '');
});

$('#quoteForm').on('submit', function () {
	const trackTitle = 'Thank You | ' + document.title;
	const trackPath = window.location.pathname + '/thank-you';
	logPageView(trackPath, trackTitle);
});

function setCookie(name, value, days) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
	return document.cookie.split('; ').reduce((r, v) => {
		const parts = v.split('=');
		return parts[0] === name ? decodeURIComponent(parts[1]) : r;
	}, '');
}

function logPageView(pagePath, pageTitle) {
	if (typeof ga === 'function') {
		const command = typeof google_tag_manager !== 'undefined' ? ga.getAll()[0].get('name') + '.send' : 'send';
		ga(command, 'pageview', { page: pagePath, title: pageTitle });
	} else {
		console.log('ga() not defined');
	}
}

updateInstallerSelector();

function cleanJSON(jsonStr) {
	return jsonStr
		.replace(/&amp;/g, '&')
		.replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029\uFEFF\uFFFD]/g, '')
		.trim();
}

function getInstallerData() {
	const installers = [];
	$('[data="installers"]').each(function () {
		try {
			const rawJson = $(this).text().replace(',}', '}');
			const cleanedJson = cleanJSON(rawJson);
			const itemData = JSON.parse(cleanedJson);
			installers.push(itemData);
		} catch (e) {
			console.error("Failed to parse JSON:", $(this).text(), e);
		}
	});
	return installers;
}

function renderInstallerSelectors(prefix, classPrefix, isBelgotexTableForm) {
	return `
            <div class="${classPrefix}-fieldset ${classPrefix}-fieldset-province">
                <label for="${prefix}-Province" class="field-label">Province</label>
                <select autocomplete="dont-auto-complete" id="${prefix}-Province" name="${prefix}-Province" data-name="Installer" required class="${classPrefix}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            <div class="${classPrefix}-fieldset ${classPrefix}-fieldset-city" style="display: none;">
                <label for="${prefix}-City" class="field-label">City</label>
                <select autocomplete="dont-auto-complete" id="${prefix}-City" name="${prefix}-City" data-name="${prefix} City" required class="${classPrefix}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            ${isBelgotexTableForm ? `
            <div class="${classPrefix}-fieldset ${classPrefix}-fieldset-suburb" style="display: none;">
                <label for="${prefix}-Suburb" class="field-label">Suburb</label>
                <select autocomplete="dont-auto-complete" id="${prefix}-Suburb" name="${prefix}-Suburb" data-name="${prefix} Suburb" class="${classPrefix}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>
            <div class="${classPrefix}-fieldset ${classPrefix}-fieldset-installer" style="display: none;">
                <label for="${prefix}-Installer" class="field-label">Authorised Installer</label>
                <select autocomplete="dont-auto-complete" id="${prefix}-Installer" name="${prefix}-Installer" data-name="Authorised Installer" class="${classPrefix}-select-field select-field w-select">
                    <option value="">Select one...</option>
                </select>
            </div>` : ''}
        `;
}

function updateInstallerSelector() {
	if ($('.installer-selector').length === 0) return;

	const installers = getInstallerData();

	$('.installer-selector').each(function () {
		const prefix = $(this).data('prefix');
		const classPrefix = $(this).data('class-prefix');
		const isBelgotexTableForm = $(this).closest('#belgotexTableForm').length > 0;
		const selectorsHTML = renderInstallerSelectors(prefix, classPrefix, isBelgotexTableForm);
		$(this).html(selectorsHTML);

		const provincesDropdown = $(this).find(`[name="${prefix}-Province"]`);
		const cityContainer = $(this).find(`.${classPrefix}-fieldset-city`);
		const cityDropdown = $(this).find(`[name="${prefix}-City"]`);
		const suburbContainer = $(this).find(`.${classPrefix}-fieldset-suburb`);
		const suburbDropdown = $(this).find(`[name="${prefix}-Suburb"]`);
		const installerContainer = $(this).find(`.${classPrefix}-fieldset-installer`);
		const installerDropdown = $(this).find(`[name="${prefix}-Installer"]`);

		const provinces = [...new Set(installers.map(item => item.province.trim()).sort())];
		provincesDropdown.html(renderDropdownOptions(provinces)).on("change", function () {
			const selectedProvince = $(this).val();
			const cities = [...new Set(installers.filter(item => item.province.trim() === selectedProvince).map(item => item.city.trim()).sort())];

			cityContainer.hide();
			suburbContainer.hide();
			installerContainer.hide();

			if (cities.length > 0) {
				cityContainer.show();
				cityDropdown.html(renderDropdownOptions(cities)).off("change").on("change", function () {
					const selectedCity = $(this).val();
					const cityInstallers = installers.filter(item => item.province.trim() === selectedProvince && item.city.trim() === selectedCity);

					suburbContainer.hide();
					installerContainer.hide();

					if (isBelgotexTableForm) {
						const suburbs = [...new Set(cityInstallers.flatMap(item => item.all_suburbs ? item.all_suburbs.split(",").map(sub => sub.trim()) : [item.suburb.trim()]).sort())];

						if (cityInstallers.length > 5 && suburbs.length > 0) {
							suburbContainer.show();
							suburbDropdown.html(renderDropdownOptions(suburbs)).off("change").on("change", function () {
								const selectedSuburb = $(this).val();
								const installersList = [...new Set(cityInstallers.filter(item => (item.all_suburbs ? item.all_suburbs.split(",").map(sub => sub.trim()).includes(selectedSuburb) : item.suburb.trim() === selectedSuburb)).map(item => item.name).sort())];
								installerContainer.show();
								installerDropdown.html(renderDropdownOptions(installersList));
							});
						} else {
							const installersList = [...new Set(cityInstallers.map(item => item.name).sort())];
							installerContainer.show();
							installerDropdown.html(renderDropdownOptions(installersList));
						}
					} else {
						const installersList = [...new Set(cityInstallers.map(item => item.name).sort())];
						installerContainer.show();
						installerDropdown.html(renderDropdownOptions(installersList));
					}
				});
			}
		});

		function renderDropdownOptions(options) {
			return `<option value="">Select one...</option>${options.map(option => `<option value="${option}">${option}</option>`).join("")}`;
		}

		// Populate the province dropdown initially
		provincesDropdown.html(renderDropdownOptions(provinces));
	});
}