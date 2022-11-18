function DeleteUserData(id){
    if (confirm('정말 삭제하시겠습니까?') == true){
        $.ajax({
            type: 'POST',
            url: '/caUserDB/' + id + '/',
            dataType: 'json',
            data: {
                'type': 'delete'
            },
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/caUserDB')
            }
        })
    }
}


function DeleteCompareData(id){
    if (confirm('정말 삭제하시겠습니까?') == true){
        $.ajax({
            type: 'POST',
            url: '/caCompareDB/' + id + '/',
            dataType: 'json',
            data: {
                'type': 'delete'
            },
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/caCompareDB')
            }
        }) 
    }
}


function DeleteConsultingData(id){
    if (confirm('정말 삭제하시겠습니까?') == true){
        $.ajax({
            type: 'POST',
            url: '/caConsultingDB/' + id + '/',
            dataType: 'json',
            data: {
                'type': 'delete'
            },
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/caConsultingDB')
            }
        }) 
    }
}


function DeleteTimeData(id){
    if (confirm('정말 삭제하시겠습니까?') == true){
        $.ajax({
            type: 'POST',
            url: '/caTimeDB/' + id + '/',
            dataType: 'json',
            data: {
                'type': 'delete'
            },
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/caTimeDB')
            }
        }) 
    }
}


function ChangeUserData() {

    let toggleItems = document.getElementsByClassName('toggle')
    let toggleChangeItmes = document.getElementsByClassName('toggleChange')

    for (let i = 0; i < 7; i++) {
        toggleItems[i].style.display = 'none'
        toggleChangeItmes[i].style.display = 'block'
    }
    document.getElementById('changeSubmit').style.display = 'block'
    document.getElementById('changeCancle').style.display = 'block'
}


function changeCancel() {
    let toggleItems = document.getElementsByClassName('toggle')
    let toggleChangeItmes = document.getElementsByClassName('toggleChange')

    for (let i = 0; i < 7; i++) {
        toggleItems[i].style.display = 'block'
        toggleChangeItmes[i].style.display = 'none'
    }
    document.getElementById('changeSubmit').style.display = 'none'
    document.getElementById('changeCancle').style.display = 'none'
}