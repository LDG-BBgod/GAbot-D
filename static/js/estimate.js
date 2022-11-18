// 첨부파일 이름 출력
$("#pdfFile").on('change',function(){
    
    var fileName = $("#pdfFile").val()
    var changeFileName = fileName.split('\\')

    document.getElementsByClassName('upload-name')[0].innerHTML = changeFileName[changeFileName.length - 1]
})

//submit 체크
document.getElementById('submit').addEventListener('click', () => {

    if (document.getElementsByClassName('textArea')[0].value == ''){
        alert('소견서를 작성해주세요.')
    }
    else if (document.getElementById('pdfFile').value == '') {
        alert('견적서PDF 파일을 첨부해주세요.')
    }
    else {
        var form = document.form
        form.submit()
    }

}) 

