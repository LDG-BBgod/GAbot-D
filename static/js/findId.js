let authNum = ''


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
    const phone = document.getElementById('phone').value
    const getAuthNum = document.getElementById('authCheck').value

    if (authNum == ''){
        errMsg.innerHTML = '인증번호 발송 버튼을 눌러주세요.'
    }
    else{
        if (getAuthNum == authNum){
            errMsg.innerHTML = ''
            $.ajax({
                type: 'POST',
                url: '/sendmsg/',
                dataType: 'json',
                data: {
                    'type': 'sendId',
                    'phone': phone,
                },
                success: function(req){

                }
            })
            alert('입력하신 휴대폰번호로 가입된 아이디를 발송하였습니다.')
            location.replace('/login')
        }
        else{
            errMsg.innerHTML = '인증번호를 올바르게 입력해주세요.'
        }
    }
}