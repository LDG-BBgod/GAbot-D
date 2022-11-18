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

// 첨부파일 이름 출력
$("#pdfFile").on('change',function(){
    
    var fileName = $("#pdfFile").val()
    var changeFileName = fileName.split('\\')

    document.getElementsByClassName('upload-name')[0].innerHTML = changeFileName[changeFileName.length - 1]
})

//섹션2 수정, 삭제
function ChangeOpinion() {
    document.getElementById('contentBox1').style.display = 'none'
    document.getElementsByName('opinion')[0].style.display = 'block'
    document.getElementById('opinionCancleButton').style.display = 'block'
    document.getElementById('opinionButton').style.display = 'block'
}


function ChangeOpinionCancle() {
    document.getElementById('contentBox1').style.display = 'block'
    document.getElementsByName('opinion')[0].style.display = 'none'
    document.getElementById('opinionCancleButton').style.display = 'none'
    document.getElementById('opinionButton').style.display = 'none'
}


function ChangeOpinionSubmit(id) {
    let opinion = document.getElementById('opinion').value

    if (opinion == '') {
        alert('소견서를 작성 후 수정완료 버튼을 눌러주세요.')
    }
    else{
        $.ajax({
            type: 'POST',
            url: `/mypageDetail/${id}/`,
            dataType: 'json',
            data: {
                'type': 'opinion',
                'opinion': opinion,
            },
            success: function(req){
                location.reload()
            }
        })
    }
}


function ChangePDF() {
    document.getElementById('contentBox2').style.display = 'none'
    document.getElementsByClassName('fileArea')[0].style.display = 'block'

}

function ChangePdfFileCancle() {
    document.getElementById('contentBox2').style.display = 'block'
    document.getElementsByClassName('fileArea')[0].style.display = 'none'
}

function ChangePdfFileSubmit() {
    let pdfFile = document.getElementById('pdfFile').value

    if (pdfFile == ''){
        alert('견적서 PDF 파일을 첨부 후 수정완료 버튼을 눌러주세요.')
    }
    else {
        var form = document.form
        form.submit()
    }
}

function deleteEstimate(id) {
    if (confirm('정말 삭제하시겠습니까?') == true){
        
        $.ajax({
            type: 'POST',
            url: `/mypageDetail/${id}/`,
            dataType: 'json',
            data: {
                'type': 'delete',
            },
            success: function(req){
                alert('삭제되었습니다.')
                location.replace('/mypage')
            }
        })
    }
}