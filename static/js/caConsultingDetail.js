function DeleteEstimate() {
    const url = window.location.href
    const urlSplit = url.split('/')
    const id = urlSplit[urlSplit.length - 2]

    if (confirm('정말 삭제하시겠습니까?') == true){
        $.ajax({
            type: 'POST',
            url: '/caConsulting/' + id + '/',
            dataType: 'json',
            data: {},
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/caConsulting')
            }
        })
    }
}