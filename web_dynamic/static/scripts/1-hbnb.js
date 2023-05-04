$(document).ready(() => {
    let filterAmenities = [];

    $('input').each(function(){
        $(this).change(function(){
            if ($(this).prop('checked')) {
                filterAmenities.push($(this).attr('data-name'));
            }
            else{
                let filter = filterAmenities.filter((value)=>{
                    return value != $(this).attr('data-name')
                });
                filterAmenities = filter;
            }
            $('.amenities>h4').text(filterAmenities.toString());
        })
    });
});