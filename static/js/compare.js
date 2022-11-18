//섹션1 클릭시 detail페이지 이동
function compareDetail(id){
    $.ajax({
        type: 'POST',
        url: '/checkOverlap/',
        dataType: 'json',
        data: {
            'type': 'compare',
            'pk': id,
        },
        success: function(req){

            if (req.overlap == 'on') {
                alert('설계사님께서 이미 제출한 DB 입니다.')
            }
            else {
                location.href = '/compare/' + id
            }
        }
    })    
}

//섹션1 만나이 입력
const birth = document.getElementsByClassName('birthToAge')
for(var i in birth){
    let userY = Number(String(birth[i].textContent).substr(0,4))
    let userMD = Number(String(birth[i].textContent).substr(4,4))
    let currentDate = new Date()
    let currentY = currentDate.getFullYear()
    let currentMD = Number(String(currentDate.getMonth() + 1) + String(currentDate.getDate()))
    let age = currentY - userY

    if (userMD > currentMD){
        age -= 1
    }
    birth[i].innerHTML = `만 ${age}세`
}