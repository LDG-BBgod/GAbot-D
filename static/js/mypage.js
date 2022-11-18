//섹션2 만나이 입력
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

//섹션2 슬라이드 영역
const compareLB = document.getElementById('compareLB')
const conpareRB = document.getElementById('compareRB')
const consultingLB = document.getElementById('consultingLB')
const consultingRB = document.getElementById('consultingRB')

const contentBox1 = document.getElementById('contentBox1')
const contentBox2 = document.getElementById('contentBox2')

const comparePageMax = document.getElementById('compareCount').textContent
const consultingPageMax = document.getElementById('consultingCount').textContent

document.getElementById('compareCount').innerHTML = 1
document.getElementById('consultingCount').innerHTML = 1

function slideLeftSection(boxID, pageID, pageMax) {

    let target = document.getElementById(boxID).getElementsByClassName('content')[0]
    let targetMarginLeft = Number(getComputedStyle(target).marginLeft.replace('px',''))
    const currentPage = Number(document.getElementById(pageID).textContent)

    if (currentPage < pageMax) {
        
        document.getElementById(pageID).innerHTML = currentPage + 1
        target.style.marginLeft = (-1185) * currentPage + 'px'

    }
}
function slideRightSection(boxID, pageID, pageMax) {

    let target = document.getElementById(boxID).getElementsByClassName('content')[0]
    let targetMarginLeft = Number(getComputedStyle(target).marginLeft.replace('px',''))
    const currentPage = Number(document.getElementById(pageID).textContent)

    if (currentPage > 1) {

        document.getElementById(pageID).innerHTML = currentPage - 1
        target.style.marginLeft = (-1185) * (currentPage - 2) + 'px'
    }
}

document.getElementById('compareRB').addEventListener('click', () => {
    slideLeftSection('contentBox1', 'compareCount', comparePageMax)
})
document.getElementById('compareLB').addEventListener('click', () => {
    slideRightSection('contentBox1', 'compareCount', comparePageMax)
})
document.getElementById('consultingRB').addEventListener('click', () => {
    slideLeftSection('contentBox2', 'consultingCount', consultingPageMax)
})
document.getElementById('consultingLB').addEventListener('click', () => {
    slideRightSection('contentBox2', 'consultingCount', consultingPageMax)
})

//상담예약 취소
function CancelReserve(id){
    if (confirm('정말 취소하시겠습니까?\n취소 누적시 차후 상담 예약이 어려울 수 있습니다.') == true){
        
        $.ajax({
            type: 'POST',
            url: '/mypage/',
            dataType: 'json',
            data: {
                'type': 'consultingDelete',
                'pk': id,
            },
            success: function(req){
                alert('선택하신 상담예약이 취소되었습니다.')
                location.reload()
            }
        })
    }
}

//견적서제출 수정 페이지 이동
function MypageDetail(id) {
    location.href = '/mypageDetail/' + id
}

//수정하기
function ChangeUserData() {
    document.getElementById('mask').style.display = 'block'
    document.getElementsByClassName('section-checkPw')[0].style.display = 'block'
}


function CheckPw() {
    let userpw = document.getElementsByClassName('section-checkPw')[0].getElementsByTagName('input')[0].value

    $.ajax({
        type: 'POST',
        url: '/mypage/',
        dataType: 'json',
        data: {
            'type': 'checkPW',
            'userpw': userpw,
        },
        success: function(req){
            if (req.err == 'N') {
                document.getElementsByClassName('section-checkPw')[0].style.display = 'none'
                document.getElementsByClassName('section-change')[0].style.display = 'block'
            }
            else {
                document.getElementsByClassName('section-checkPw')[0].getElementsByClassName('text2')[0].innerHTML = '비밀번호가 다릅니다.'
            }
        }
    })
}


function CheckPwCancle() {
    document.getElementById('mask').style.display = 'none'
    document.getElementsByClassName('section-checkPw')[0].style.display = 'none'
}


function ChangeSubmit() {
    const userpw = document.getElementById('changeUserpw').value
    const kakao = document.getElementById('changeKakao').value
    const email = document.getElementById('changeEmail').value

    $.ajax({
        type: 'POST',
        url: '/mypage/',
        dataType: 'json',
        data: {
            'type': 'userDataChange',
            'userpw': userpw,
            'kakao': kakao,
            'email': email,
        },
        success: function(req){
            alert('회원정보가 변경되었습니다.')
            location.replace('/mypage')
        }
    })
}


function ChangeCancle() {
    document.getElementById('mask').style.display = 'none'
    document.getElementsByClassName('section-change')[0].style.display = 'none'
}

