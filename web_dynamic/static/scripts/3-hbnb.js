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
            "Accept" : 'application/json'
        },
        data: JSON.stringify({}),
        success: function (data) { console.log(data); }
    });
});