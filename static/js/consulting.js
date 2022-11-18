function consultingDetail(id){
    $.ajax({
        type: 'POST',
        url: '/checkOverlap/',
        dataType: 'json',
        data: {
            'type': 'consulting',
            'pk': id,
        },
        success: function(req){

            if (req.overlap == 'on') {
                alert('설계사님께서 이미 제출한 DB 입니다.')
            }
            else {
                location.href = '/consulting/' + id
            }
        }
    }) 
}
