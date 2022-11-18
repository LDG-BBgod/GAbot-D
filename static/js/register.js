let authNum = ''
let idAuth = false
let pwAuth = false
let phoneAuth = false
let emailAuth = false


function idDuplcateCheck() {

    const errMsg = document.getElementById('errorId')
    const userid = document.getElementById('userid').value

    if (FormCheck('id', userid)){
        $.ajax({
            type: 'POST',
            url: '/register/api/',
            dataType: 'json',
            data: {
                'type': 'idCheck',
                'userid': userid,
            },
            success: function(req){
                if (req.check == 'true'){
                    errMsg.innerHTML = '사용 가능한 아이디입니다.'
                    idAuth = true
                }
                else {
                    errMsg.innerHTML = '이미 사용중인 아이디입니다.'
                    idAuth = false
                }
            }
        })
    }
    else {
        errMsg.innerHTML = '아이디를 형식에 맞게 입력해 주세요.'
        idAuth = false
    }
    if (userid == ''){
        errMsg.innerHTML = ''
        idAuth = false
    }
}


function userpwCheck() {

    const errMsg = document.getElementById('errorPw')
    const userpw = document.getElementById('userpw').value

    if (FormCheck('pw', userpw)){
        errMsg.innerHTML = ''
    }
    else {
        errMsg.innerHTML = '비밀번호를 형식에 맞게 입력해 주세요.'
    }
    if (userpw == ''){
        errMsg.innerHTML = ''
    }
}


function reUserpwCheck() {

    const errMsg = document.getElementById('errorRePw')
    const userpw = document.getElementById('userpw').value
    const reUserpw = document.getElementById('reUserpw').value

    if (userpw != reUserpw){
        errMsg.innerHTML = '비밀번호가 다릅니다.'
        pwAuth = false
    }
    else {
        errMsg.innerHTML = ''
        pwAuth = true
    }
}


function phoneCheck() {

    const errMsg = document.getElementById('errorSms')
    const phone = document.getElementById('phone').value

    if (FormCheck('phone', phone)){
        errMsg.innerHTML = ''
    }
    else {
        errMsg.innerHTML = '- 기호 없이 전화번호만 입력해 주세요.'
    }
    if (phone == ''){
        errMsg.innerHTML = ''
    }
}

function sendSMS() {

    const errMsg = document.getElementById('errorSms')
    const phone = document.getElementById('phone').value

    if (FormCheck('phone', phone)){
        $.ajax({
            type: 'POST',
            url: '/sendmsg/',
            dataType: 'json',
            data: {
                'type': 'authMsg',
                'phone': phone,
            },
            success: function(req){
                authNum = req.authNum
                alert('인증번호가 전송되었습니다.')
            }
        })
    }
    else {
        errMsg.innerHTML = '- 기호 없이 전화번호만 입력해 주세요.'
    }
    if (phone == ''){
        errMsg.innerHTML = '전화번호를 입력해주세요.'
    }
}


function authNumCheck() {

    const errMsg = document.getElementById('errorSmsCheck')
    const getAuthNum = document.getElementById('authCheck').value

    if (authNum == ''){
        errMsg.innerHTML = '인증번호 발송 버튼을 눌러주세요.'
    }
    else{
        if (getAuthNum == authNum){
            errMsg.innerHTML = ''
            phoneAuth = true
            document.getElementById('toggleSection1').style.display = 'none'
            document.getElementById('toggleSection2').style.display = 'none'
            alert('문자인증이 완료되었습니다.')
        }
        else{
            errMsg.innerHTML = '인증번호를 올바르게 입력해주세요.'
        }
    }
}

function emailCheck() {

    const errMsg = document.getElementById('errorEmail')
    const email = document.getElementById('email').value

    if (FormCheck('email', email)){
        errMsg.innerHTML = ''
        emailAuth = true
    }
    else {
        errMsg.innerHTML = '이메일 형식에 맞게 입력해주세요.'
        emailAuth = false
    }
    if (email == ''){
        errMsg.innerHTML = ''
        emailAuth = false
    }
}

function submitCheck() {

    if (FormCheck('id', document.getElementById('userid').value)){
        $.ajax({
            type: 'POST',
            url: '/register/api/',
            dataType: 'json',
            async: false,
            data: {
                'type': 'idCheck',
                'userid': document.getElementById('userid').value,
            },
            success: function(req){
                if (req.check == 'true'){
                    idAuth = true
                }
            }
        })
    }
    if (document.getElementById('userpw').value == document.getElementById('reUserpw').value && document.getElementById('reUserpw').value != ''){
        pwAuth = true
    }
    if (FormCheck('email', document.getElementById('email').value)){
        emailAuth = true
    }

    if (!document.getElementById('registerAgree1').checked || !document.getElementById('registerAgree2').checked){
        alert('필수 이용약관 동의박스를 체크해주세요.')
        window.scrollTo(0, 150);
    }
    else if (document.getElementById('userid').value == ''){
        alert('아이디를 입력해주세요.')
    }
    else if (!idAuth){
        alert('사용가능한 아이디를 입력해주세요.')
    }
    else if (document.getElementById('userpw').value == ''){
        alert('비밀번호를 입력해주세요.')
    }
    else if (!pwAuth){
        alert('비밀번호 중복체크를 확인해주세요.')
    }
    else if (document.getElementById('userName').value == ''){
        alert('이름을 입력해주세요.')
    }
    else if (!phoneAuth){
        alert('휴대폰 인증을 진행해 주세요.')
    }
    else if (document.getElementById('kakao').value == ''){
        alert('카카오톡 아이디를 입력해주세요.')
    }
    else if (document.getElementById('email').value == ''){
        alert('이메일을 입력해주세요.')
    }
    else if (!emailAuth){
        alert('이메일을 형식에 맞게 입력해 주세요.')
    }
    else {
        document.getElementById('errorId').innerHTML = ''
        document.getElementById('errorPw').innerHTML = ''
        document.getElementById('errorRePw').innerHTML = ''
        document.getElementById('errorEmail').innerHTML = ''

        alert('-회원가입 요청이 완료되었습니다.\n-영업일 1일 이내로 설계사님께 확인연락이 갑니다.\n-필수사항 확인 후 회원가입이 완료됩니다.')
        var form = document.form
        form.submit()
    }

}