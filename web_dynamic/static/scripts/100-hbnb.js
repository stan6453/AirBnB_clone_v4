$(document).ready(() => {

    //show status of the airbnb api route as a red dot if reachable esle, a grey dot if down
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
        if (data.status == 'OK') {
            $('div#api_status').addClass('available');
        }
        else {
            $('div#api_status').removeClass('available');
        }
    });


    function populatePlaces(amenities_id = [], states_id = [], cities_id = []) {
        if (amenities_id.length || states_id.length || cities_id.length) {
            data = {
                amenities: amenities_id,
                states: states_id,
                cities: cities_id
            };
        } else {
            data = {};
        }
        console.log(data);
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            type: 'post',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            data: JSON.stringify(data),
            success: function (data) {
                console.log(data);
                //empty the places element in order to add new places based on the filter 
                $('section.places').empty();
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
    }

    //call populate places when the document load to load up the places
    populatePlaces();

    // Attach an event listener to all amenities checkbox filters
    let filterAmenities = [];
    let filterAmenities_id = [];
    $('.amenities input').each(function () {
        $(this).change(function () {
            if ($(this).prop('checked')) {
                filterAmenities.push($(this).attr('data-name'));
                filterAmenities_id.push($(this).attr('data-id'));
            }
            else {
                let filter = filterAmenities.filter((value) => {
                    return value != $(this).attr('data-name')
                });
                filterAmenities = filter;

                let filter_id = filterAmenities_id.filter((value) => {
                    return value != $(this).attr('data-id')
                });
                filterAmenities_id = filter_id;
            }
            $('.amenities>h4').text(filterAmenities.toString());
        })
    });

    // Attach an event listener to all States checkbox filters
    let filterStates = [];
    let filterStates_id = [];
    $('.locations>.popover>ul>li>h2>input').each(function () {
        $(this).change(function () {
            if ($(this).prop('checked')) {
                filterStates.push($(this).attr('data-name'));
                filterStates_id.push($(this).attr('data-id'));
            }
            else {
                let filter = filterStates.filter((value) => {
                    return value != $(this).attr('data-name')
                });
                filterStates = filter;

                let filter_id = filterStates_id.filter((value) => {
                    return value != $(this).attr('data-id')
                });
                filterStates_id = filter_id;
            }
            $('.locations>h4').text(filterStates.toString());
        })
    });

    // Attach an event listener to all Cities checkbox filters
    let filterCities = [];
    let filterCities_id = [];
    $('.locations>.popover>ul>li>ul>li>input').each(function () {
        $(this).change(function () {
            if ($(this).prop('checked')) {
                filterCities.push($(this).attr('data-name'));
                filterCities_id.push($(this).attr('data-id'));
            }
            else {
                let filter = filterCities.filter((value) => {
                    return value != $(this).attr('data-name')
                });
                filterCities = filter;

                let filter_id = filterCities_id.filter((value) => {
                    return value != $(this).attr('data-id')
                });
                filterCities_id = filter_id;
            }
            $('.locations>h4').text(filterCities.toString());
        })
    });

    $('.filters>button').click(() => {
        populatePlaces(filterAmenities_id, filterStates_id, filterCities_id);
    })
});