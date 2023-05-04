$(document).ready(() => {
    let filterAmenities = ["hi"];

    amenities_input = $('.amenities .popover input')

    $.each(amenities_input, function (index, input) {
        input.on('change', function () {
            if ($(this).checked) {
                filterAmenities.push("this.attr('data-id')");
            }
            else {
                const filter = filterAmenities.filter((id) => {
                    return id != "this.attr('data-id')";
                });
                filterAmenities = filter;
            }
            $('.amenities>h4').text(filterAmenities.toString());
        });
    });
});