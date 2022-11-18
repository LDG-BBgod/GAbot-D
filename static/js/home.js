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
// const compareContentWidth = Number(getComputedStyle(contentBox1.getElementsByClassName('content')[0]).width.replace('px',''))
const compareContentWidth = 300
const compareContentCount = contentBox1.childElementCount
// const compareContentMarginR = Number(getComputedStyle(contentBox1.getElementsByClassName('content')[0]).marginRight.replace('px',''))
const compareContentMarginR = 40
let contentBox1Width = (compareContentWidth + compareContentMarginR) * compareContentCount - 1120 - compareContentMarginR

const contentBox2 = document.getElementById('contentBox2')
// const consultingContentWidth = Number(getComputedStyle(contentBox2.getElementsByClassName('content')[0]).width.replace('px',''))
const consultingContentWidth = 300

const consultingContentCount = contentBox2.childElementCount
// const consultingContentMarginR = Number(getComputedStyle(contentBox2.getElementsByClassName('content')[0]).marginRight.replace('px',''))
const consultingContentMarginR = 40
let contentBox2Width = (consultingContentWidth + consultingContentMarginR) * consultingContentCount - 1120 - consultingContentMarginR

if (contentBox1Width < 0) contentBox1Width = 0
if (contentBox2Width < 0) contentBox2Width = 0

function slideLeftSection(boxID, maxArea) {
    let target = document.getElementById(boxID).getElementsByClassName('content')[0]
    let targetMarginLeft = Number(getComputedStyle(target).marginLeft.replace('px',''))
    let changeMarginLeft = targetMarginLeft - Number(getComputedStyle(target).marginRight.replace('px','')) - Number(getComputedStyle(target).width.replace('px',''))

    if (changeMarginLeft >= -maxArea){
        target.style.marginLeft = changeMarginLeft + 'px'
    }
    else {
        target.style.marginLeft = - maxArea + 'px'
    }
}
function slideRightSection(boxID, maxArea) {
    let target = document.getElementById(boxID).getElementsByClassName('content')[0]
    let targetMarginLeft = Number(getComputedStyle(target).marginLeft.replace('px',''))
    let changeMarginLeft = targetMarginLeft + Number(getComputedStyle(target).marginRight.replace('px','')) + Number(getComputedStyle(target).width.replace('px',''))

    if (changeMarginLeft <= 0){
        target.style.marginLeft = changeMarginLeft + 'px'
    }
    else {
        target.style.marginLeft = 0 + 'px'
    }
}

document.getElementById('compareRB').addEventListener('click', () => {
    slideLeftSection('contentBox1', contentBox1Width)
})
document.getElementById('compareLB').addEventListener('click', () => {
    slideRightSection('contentBox1', contentBox1Width)
})
document.getElementById('consultingRB').addEventListener('click', () => {
    slideLeftSection('contentBox2', contentBox2Width)
})
document.getElementById('consultingLB').addEventListener('click', () => {
    slideRightSection('contentBox2', contentBox2Width)
})

//섹션2 클릭시 detail페이지 이동
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
                alert('설계사님께서 이미 상담예약한 DB 입니다.')
            }
            else {
                location.href = '/compare/' + id
            }
        }
    }) 
}
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
                alert('설계사님께서 이미 상담예약한 DB 입니다.')
            }
            else {
                location.href = '/consulting/' + id
            }
        }
    }) 
}