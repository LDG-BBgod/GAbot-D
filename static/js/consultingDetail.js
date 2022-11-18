function submit(id) {
    $.ajax({
        type: 'POST',
        url: `/consulting/${id}/`,
        dataType: 'json',
        data: {},
        success: function(req){
            alert('상담예약 신청이 완료되었습니다.')
            location.replace('/')
        }
    })
}