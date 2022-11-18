function FormCheck(type, value) {

    if (type == 'id') {
        let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/
        return regExp.test(value)
    }
    else if (type == 'pw') {
        let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/
        return regExp.test(value)
    }
    else if (type == 'phone') {
        let regExp = /^[0-9]{10,11}$/g
        return regExp.test(value)
    }
    else if (type == 'email') {
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        return regExp.test(value)
    }
}