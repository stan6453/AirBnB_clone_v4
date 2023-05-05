$(document).ready(() => {

    // Attach an event listener to all amenities filter checkboxes
    let filterAmenities = [];
    $('input').each(function () {
        $(this).change(function () {
            if ($(this).prop('checked')) {
                filterAmenities.push($(this).attr('data-name'));
            }
            else {
                let filter = filterAmenities.filter((value) => {
                    return value != $(this).attr('data-name')
                });
                filterAmenities = filter;
            }
            $('.amenities>h4').text(filterAmenities.toString());
        })
    });

    //show status of the airbnb api route as a red dot if reachable and a grey dot if down
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
        if (data.status == 'OK') {
            $('div#api_status').addClass('available');
        }
        else {
            $('div#api_status').removeClass('available');
        }
    });




    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'post',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        data: JSON.stringify({}),
        success: function (data) {
            $.each(data, function (index, place) {
                const article = $('<article></article>').html(`
                <div class="title_box">
					<h2>${place.name}</h2>
					<div class="price_by_night">\$${place.price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
					<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div> 
					<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
				</div>
				<div class="description">
					${place.description}
				</div>
                `);
                $('section.places').append(article);
            });
        }
    });
});