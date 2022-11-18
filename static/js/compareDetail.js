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

//섹션1 내용 펼치기
function contentToggle(i) {
    const target = document.getElementsByClassName('contentToggle')[i]
    target.classList.toggle('open')
}

//섹션1 견적서 보내기
function submit(id) {
    if(consultingCount >= 3) {
        alert('비교견적 요청 한개에 3건의 견적서만 보낼 수 있습니다.')
    }
    else {
        location.href='/estimate/' + id
    }
}