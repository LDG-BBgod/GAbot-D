let crwalData

const loadingPage = new Promise((resolve, reject) => {
    $.ajax({
        type: 'POST',
        url: '/myinsurance/' + MYINSU + '/',
        dataType: 'json',
        data: {},
        success: function(requestData) {
            crwalData = JSON.parse(requestData.crawlData)
            resolve()
        }
    })
})

loadingPage.then(() => {

    $('#mask, #loadingImg').hide()
    $('#mask, #loadingImg').remove()

    const errRange = 0.2

    //첫번째 디테일 페이지 월보험료
    let avgAmount = {
        '00': 100000,
        '10': 100000,
        '20': 180000,
        '30': 260000,
        '40': 370000,
        '50': 490000,
        '60': 350000,
        '70': 200000,
    }
    let age = crwalData.age
    let money = crwalData.monthPrice

    for (let i = 0; i < crwalData.status.length; i++){

        let title = document.getElementById('first-detail-box').appendChild(document.createElement('div'))
        title.setAttribute('id', `first-detail-title${i}`)
        title.setAttribute('class', 'title')
        title.innerHTML = crwalData.status[i].title

        let contentBox = document.getElementById(`first-detail-box`).appendChild(document.createElement('div'))
        contentBox.setAttribute('id', `first-detail-contentBox${i}`)
        contentBox.setAttribute('class', 'content-box')

        let text = document.getElementById(`first-detail-contentBox${i}`).appendChild(document.createElement('span'))
        text.setAttribute('class', 'text')
        text.innerHTML = '월 보험료'

        let amount = document.getElementById(`first-detail-contentBox${i}`).appendChild(document.createElement('span'))
        amount.setAttribute('class', 'amount')
        amount.innerHTML = (crwalData.status[i].mggPrice).toLocaleString('ko-KR')
        
        let unit = document.getElementById(`first-detail-contentBox${i}`).appendChild(document.createElement('span'))
        unit.setAttribute('class', 'unit')
        unit.innerHTML = '원'
        
        let ul = document.getElementById('first-detail-box').appendChild(document.createElement('ul'))
        ul.setAttribute('id', `first-detail-ul${i}`)

        let li1 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li1.innerHTML = '계약일'
        let li2 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li2.innerHTML = crwalData.status[i].mggStart
        let li3 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li3.innerHTML = '만기일'
        let li4 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li4.innerHTML = crwalData.status[i].mggEnd
        // let li5 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        // li5.innerHTML = '보장 연령'
        // let li6 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        // li6.innerHTML = 'test' + '세'
        let li7 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li7.innerHTML = '납입 기간'
        let li8 = document.getElementById(`first-detail-ul${i}`).appendChild(document.createElement('li'))
        li8.innerHTML = crwalData.status[i].mggRcv
    }
    const amountRate = money/avgAmount[age]
    let fixAmountRate = amountRate    
    if (amountRate > 2) {fixAmountRate = 2}

    //두번째 디테일 페이지 정액형
    let customerMggAmtAvg = 0
    let mggAmtAvg = 0
    let fixMggRate = []
    for (let i = 0; i < 10; i++){
        customerMggAmtAvg += Number(crwalData.mggData[i].price)
        mggAmtAvg += Number(crwalData.mggData[i].mggAvg)
        if (i == 0) {
            let title = document.getElementById('second-detail-box').appendChild(document.createElement('div'))
            title.setAttribute('id', `second-detail-title`)
            title.setAttribute('class', 'title')

            let explainBox = document.getElementById('second-detail-box').appendChild(document.createElement('div'))
            explainBox.setAttribute('id', `second-detail-explainBox`)
            explainBox.setAttribute('class', 'explainBox')
            
            let sect1 = document.getElementById('second-detail-explainBox').appendChild(document.createElement('div'))
            sect1.setAttribute('class', 'sect1')

            let sect2 = document.getElementById('second-detail-explainBox').appendChild(document.createElement('div'))
            sect2.setAttribute('id', `second-sect2`)
            sect2.setAttribute('class', 'sect2')

            let sect3 = document.getElementById('second-detail-explainBox').appendChild(document.createElement('div'))
            sect3.setAttribute('class', 'sect3')

            let sect4 = document.getElementById('second-detail-explainBox').appendChild(document.createElement('div'))
            sect4.setAttribute('id', `second-sect4`)
            sect4.setAttribute('class', 'sect4')

            let ul = document.getElementById('second-detail-box').appendChild(document.createElement('ul'))
            ul.setAttribute('id', `second-detail-ul`)

            let buttonDetail = document.getElementById('second-detail-box').appendChild(document.createElement('div'))
            buttonDetail.setAttribute('id', `buttonDetail`)
            buttonDetail.setAttribute('class', 'button-detail')

            let buttonText = document.getElementById('buttonDetail').appendChild(document.createElement('div'))
            buttonText.setAttribute('id', `buttonText`)
            buttonText.setAttribute('class', `button-text`)

            let arrowBox = document.getElementById('buttonDetail').appendChild(document.createElement('div'))
            arrowBox.setAttribute('id', `arrowBox`)
            arrowBox.setAttribute('class', `arrow-box`)

            let buttonImg = document.getElementById('arrowBox').appendChild(document.createElement('img'))
            buttonImg.setAttribute('src', `../../static/img/arrow_white.svg`)
        }
        let li = document.getElementById('second-detail-ul').appendChild(document.createElement('li'))
        li.setAttribute('id', `second-li${i}`)

        let content = document.getElementById(`second-li${i}`).appendChild(document.createElement('div'))
        content.setAttribute('id', `second-content${i}`)
        content.setAttribute('class', 'content')

        let contentBox = document.getElementById(`second-li${i}`).appendChild(document.createElement('div'))
        contentBox.setAttribute('id', `second-contentBox${i}`)
        contentBox.setAttribute('class', 'contentBox')

        let stickAvg = document.getElementById(`second-contentBox${i}`).appendChild(document.createElement('div'))
        stickAvg.setAttribute('id', `second-stickAvg${i}`)
        stickAvg.setAttribute('class', 'stickAvg')

        let stickMy = document.getElementById(`second-contentBox${i}`).appendChild(document.createElement('div'))
        stickMy.setAttribute('id', `second-stickMy${i}`)
        stickMy.setAttribute('class', 'stickMy')    

        let mggPercent = document.getElementById(`second-contentBox${i}`).appendChild(document.createElement('div'))
        mggPercent.setAttribute('id', `second-mggPercent${i}`)
        mggPercent.setAttribute('class', 'mggPercent')

        const mggRate = crwalData.mggData[i].price/crwalData.mggData[i].mggAvg
        fixMggRate[i] = mggRate
        if (mggRate > 1.2){fixMggRate[i] = 1.2}
        document.getElementById(`second-content${i}`).innerHTML = crwalData.mggData[i].indDiv
        document.getElementById(`second-mggPercent${i}`).innerHTML = Math.round(mggRate*100) + '%'
        
        if (mggRate < (1 - errRange) || mggRate > (1+errRange)){
            document.getElementById(`second-mggPercent${i}`).style.color = '#F83D3D'
        }
    } 
    const mggAvgRate = customerMggAmtAvg/mggAmtAvg
    let fixMggAvgRate = mggAvgRate
    if (mggAvgRate > 2){fixMggAvgRate = 2}
    document.getElementById('buttonDetail').addEventListener('click', () => {
        document.getElementById('myInsuranceInner').style.display = 'none'
        document.getElementById('detailPage').style.display = 'block'
        window.scrollTo(0,0)
    })
    document.getElementById('detailPageBackArrow').addEventListener('click', () => {
        document.getElementById('detailPage').style.display = 'none'
        document.getElementById('myInsuranceInner').style.display = 'block'
        window.scrollTo(0,0)
    })
    //세번째 디테일 페이지 실손형
    let myMedRate = 0
    let medRate = 0
    let etcMyMedRate = 0
    let etcMedRate = 0
    let medSbscRate = []
    for (let i = 0; i < crwalData.medData.length; i++){
        if (i == 0){
            let title = document.getElementById('third-detail-box').appendChild(document.createElement('div'))
            title.setAttribute('id', `third-detail-title`)
            title.setAttribute('class', 'title')

            let ul = document.getElementById('third-detail-box').appendChild(document.createElement('ul'))
            ul.setAttribute('id', `third-detail-ul`)
        }
        let li = document.getElementById('third-detail-ul').appendChild(document.createElement('li'))
        li.setAttribute('id', `third-li${i}`)

        let content = document.getElementById(`third-li${i}`).appendChild(document.createElement('div'))
        content.setAttribute('id', `third-content${i}`)
        content.setAttribute('class', 'content')

        let contentBox = document.getElementById(`third-li${i}`).appendChild(document.createElement('div'))
        contentBox.setAttribute('id', `third-contentBox${i}`)
        contentBox.setAttribute('class', 'contentBox')

        let stickRatio = document.getElementById(`third-contentBox${i}`).appendChild(document.createElement('div'))
        stickRatio.setAttribute('id', `third-stickRatio${i}`)
        stickRatio.setAttribute('class', 'stickRatio')

        let check = document.getElementById(`third-contentBox${i}`).appendChild(document.createElement('div'))
        check.setAttribute('id', `third-check${i}`)
        check.setAttribute('class', 'check')

        document.getElementById(`third-content${i}`).innerHTML = crwalData.medData[i].name + '&nbsp&nbsp&nbsp' + crwalData.medData[i].percent + '%'
        if (crwalData.medData[i].count == '미'){
            document.getElementById(`third-check${i}`).innerHTML = '미가입'
            document.getElementById(`third-check${i}`).style.color = '#F83D3D'
        }
        else {
            document.getElementById(`third-check${i}`).innerHTML = '가입됨'
            document.getElementById(`third-check${i}`).style.color = '#5B8DEF'
        }
        if (i < 6) {
            medRate += Number(crwalData.medData[i].percent)/100
            if (crwalData.medData[i].count == '미'){
                myMedRate += 0
            }
            else{
                myMedRate += 1
            }
        }
        else {
            etcMedRate += Number(crwalData.medData[i].percent)/100
            if (crwalData.medData[i].count == '미'){
                etcMyMedRate += 0
            }
            else{
                etcMyMedRate += 1
            }
        }
        medSbscRate[i] = Number(crwalData.medData[i].percent)/100
    }

    myMedRate = Math.round((myMedRate /6 ) * 1000 ) / 10
    medRate = Math.round((medRate /6 ) * 1000) / 10
    etcMyMedRate = Math.round((etcMyMedRate /6 ) * 1000) / 10
    etcMedRate = Math.round((etcMedRate /6 ) * 1000) / 10

    //헤더부분
    const amountThanMggAvgRate = mggAvgRate / amountRate

    if (amountThanMggAvgRate > 1 + errRange) {
        document.getElementById('header-mark').setAttribute('src', '../../static/img/myinsuranceDetail_goodMark.svg')
        document.getElementById('header-right-text').innerHTML = '많은편이에요'
    }
    else if (amountThanMggAvgRate <= 1 + errRange && amountThanMggAvgRate >= 1 - errRange){
        document.getElementById('header-mark').setAttribute('src', '../../static/img/myinsuranceDetail_goodMark.svg')
        document.getElementById('header-right-text').innerHTML = '적절한 수준이에요'
    }
    else {
        document.getElementById('header-mark').setAttribute('src', '../../static/img/myinsuranceDetail_bedMark.svg')
        document.getElementById('header-right-text').innerHTML = '적은편이에요'
    }

    //두번째 디테일 추가 페이지
    let prevMggName
    for (let i = 0; i < crwalData.mggDetailData.length; i++){
        
        if (crwalData.mggDetailData[i].indDiv != prevMggName) {
            prevMggName = crwalData.mggDetailData[i].indDiv

            let title = document.getElementsByClassName('inner-detail-page')[0].appendChild(document.createElement('div'))
            title.setAttribute('class', 'title')
            title.innerHTML = crwalData.mggDetailData[i].indDiv
            

        }
        let contentBox = document.getElementsByClassName('inner-detail-page')[0].appendChild(document.createElement('div'))
        contentBox.setAttribute('id', `contentBox${i}`)
        contentBox.setAttribute('class', 'content-box')

        let content = document.getElementById(`contentBox${i}`).appendChild(document.createElement('div'))
        content.setAttribute('class', 'content')
        content.innerHTML = crwalData.mggDetailData[i].indName

        let value = document.getElementById(`contentBox${i}`).appendChild(document.createElement('div'))
        value.setAttribute('class', 'value')
        value.innerHTML = Number(crwalData.mggDetailData[i].price.slice(0, -4)).toLocaleString('ko-KR') + '만원'

    }
    


    function desktopSize () {

        for (let i = 0; i < 6; i++){
            document.getElementsByClassName('box-middle')[i].style.width = '100%'
        }
        //첫번째 디테일 페이지 월보험료
        document.getElementById('main-amount').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-amount').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-avgAmount').innerHTML = avgAmount[age].toLocaleString('ko-KR') + '원'
        document.getElementById('value-amount-detail').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-avgAmount-detail').innerHTML = avgAmount[age].toLocaleString('ko-KR') + '원'
        for(let i = 0; i < document.getElementsByClassName('menuAge').length; i++){
            document.getElementsByClassName('menuAge')[i].innerHTML = age + '대 평균'
        }
        document.getElementById('stick-amount').style.height = fixAmountRate * 150 + 'px'
        document.getElementById('stick-amount').style.width = '70px'
        document.getElementById('stick-amount-detail').style.height = '60px'
        document.getElementById('stick-amount-detail').style.width = fixAmountRate * 250 + 'px'
        if (money < avgAmount[age]*(1-errRange) || money > avgAmount[age]*(1+errRange)){
            document.getElementById('stick-amount').style.backgroundColor = '#F83D3D'
            document.getElementById('value-amount').style.color = '#F83D3D'
            document.getElementById('stick-amount-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-amount-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-amount').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-amount').style.color = '#5B8DEF'
            document.getElementById('stick-amount-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-amount-detail').style.color = '#5B8DEF'
        }

        //두번째 디테일 페이지 정액형
        for (let i = 0; i < 10; i++) {
            document.getElementById(`second-stickMy${i}`).style.width = 230 * fixMggRate[i] + 'px'
        }
        document.getElementById('value-customerMggAvg').innerHTML = Math.round(customerMggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-MggAvg').innerHTML = Math.round(mggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-customerMggAvg-detail').innerHTML = Math.round(customerMggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-MggAvg-detail').innerHTML = Math.round(mggAmtAvg/1000).toLocaleString('ko-KR') + '만원'

        document.getElementById('stick-customerMggAvg').style.height =  150 * fixMggAvgRate + 'px'
        document.getElementById('stick-customerMggAvg').style.width = '70px'
        document.getElementById('stick-customerMggAvg-detail').style.height = '60px'
        document.getElementById('stick-customerMggAvg-detail').style.width =  250 * fixMggAvgRate+ 'px'

        if (customerMggAmtAvg < mggAmtAvg*(1-errRange) || customerMggAmtAvg > mggAmtAvg*(1+errRange)){
            document.getElementById('stick-customerMggAvg').style.backgroundColor = '#F83D3D'
            document.getElementById('value-customerMggAvg').style.color = '#F83D3D'
            document.getElementById('stick-customerMggAvg-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-customerMggAvg-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-customerMggAvg').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-customerMggAvg').style.color = '#5B8DEF'
            document.getElementById('stick-customerMggAvg-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-customerMggAvg-detail').style.color = '#5B8DEF'
        }

        document.getElementById('second-detail-title').innerHTML = age + '대 평균 가입률 상위 10개 항목 비교진단표'
        document.getElementById('second-sect2').innerHTML ='내 보장 금액'
        document.getElementById('second-sect4').innerHTML = age + '대 평균 보장금액'
        document.getElementById('buttonText').innerHTML ='모든 보장목록 확인하기'

        //세번째 디테일 페이지 실손형
        for (let i = 0; i < 12; i++) {
            document.getElementById(`third-stickRatio${i}`).style.width = 300 * medSbscRate[i] + 'px'
        }
        document.getElementById('value-myMedRate').innerHTML = myMedRate + '%'
        document.getElementById('value-medRate').innerHTML = medRate + '%'
        document.getElementById('value-etcMyMedRate').innerHTML = etcMyMedRate + '%'
        document.getElementById('value-etcMedRate').innerHTML = etcMedRate + '%'
        document.getElementById('value-myMedRate-detail').innerHTML = myMedRate + '%'
        document.getElementById('value-medRate-detail').innerHTML = medRate + '%'
        document.getElementById('value-etcMyMedRate-detail').innerHTML = etcMyMedRate + '%'
        document.getElementById('value-etcMedRate-detail').innerHTML = etcMedRate + '%'

        document.getElementById('stick-myMedRate').style.height = 3 * myMedRate + 'px'
        document.getElementById('stick-myMedRate').style.width = '70px'
        document.getElementById('stick-medRate').style.height = 3 * medRate + 'px'
        document.getElementById('stick-medRate').style.width = '70px'
        document.getElementById('stick-etcMyMedRate').style.height = 3 * etcMyMedRate + 'px'
        document.getElementById('stick-etcMyMedRate').style.width = '70px'
        document.getElementById('stick-etcMedRate').style.height = 3 * etcMedRate + 'px'
        document.getElementById('stick-etcMedRate').style.width = '70px'
        document.getElementById('stick-myMedRate-detail').style.height = '60px'
        document.getElementById('stick-myMedRate-detail').style.width = 5 * myMedRate + 'px'
        document.getElementById('stick-medRate-detail').style.height = '60px'
        document.getElementById('stick-medRate-detail').style.width = 5 * medRate + 'px'
        document.getElementById('stick-etcMyMedRate-detail').style.height = '60px'
        document.getElementById('stick-etcMyMedRate-detail').style.width = 5 * etcMyMedRate + 'px'
        document.getElementById('stick-etcMedRate-detail').style.height = '60px'
        document.getElementById('stick-etcMedRate-detail').style.width = 5 * etcMedRate + 'px'

        if (myMedRate < medRate*(1-errRange) || myMedRate > medRate*(1+errRange)){
            document.getElementById('stick-myMedRate').style.backgroundColor = '#F83D3D'
            document.getElementById('value-myMedRate').style.color = '#F83D3D'
            document.getElementById('stick-etcMyMedRate').style.backgroundColor = '#F83D3D'
            document.getElementById('value-etcMyMedRate').style.color = '#F83D3D'
            document.getElementById('stick-myMedRate-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-myMedRate-detail').style.color = '#F83D3D'
            document.getElementById('stick-etcMyMedRate-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-etcMyMedRate-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-myMedRate').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-myMedRate').style.color = '#5B8DEF'
            document.getElementById('stick-etcMyMedRate').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-etcMyMedRate').style.color = '#5B8DEF'
            document.getElementById('stick-myMedRate-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-myMedRate-detail').style.color = '#5B8DEF'
            document.getElementById('stick-etcMyMedRate-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-etcMyMedRate-detail').style.color = '#5B8DEF'
        }
        document.getElementById('third-detail-title').innerHTML = age + '대 평균 가입률 / 본인 가입 여부'
    }

    function mobileSize() {

        for (i = 0; i < 6; i++){
            document.getElementsByClassName('box-middle')[i].style.width = (window.innerWidth-40)*0.9 + 'px'
        }

        //첫번째 디테일 페이지 월보험료
        document.getElementById('main-amount').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-amount').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-avgAmount').innerHTML = avgAmount[age].toLocaleString('ko-KR') + '원'
        document.getElementById('value-amount-detail').innerHTML = money.toLocaleString('ko-KR') + '원'
        document.getElementById('value-avgAmount-detail').innerHTML = avgAmount[age].toLocaleString('ko-KR') + '원'
        for(let i = 0; i < document.getElementsByClassName('menuAge').length; i++){
            document.getElementsByClassName('menuAge')[i].innerHTML = age + '대 평균'
        }
        document.getElementById('stick-amount').style.height = fixAmountRate * 80 + 'px'
        document.getElementById('stick-amount').style.width = '55px'
        document.getElementById('stick-amount-detail').style.height = fixAmountRate * 80 + 'px'
        document.getElementById('stick-amount-detail').style.width = '55px'
        if (money < avgAmount[age]*(1-errRange) || money > avgAmount[age]*(1+errRange)){
            document.getElementById('stick-amount').style.backgroundColor = '#F83D3D'
            document.getElementById('value-amount').style.color = '#F83D3D'
            document.getElementById('stick-amount-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-amount-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-amount').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-amount').style.color = '#5B8DEF'
            document.getElementById('stick-amount-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-amount-detail').style.color = '#5B8DEF'
        }

        //두번째 디테일 페이지 정액형
        for (let i = 0; i < 10; i++) {
            document.getElementById(`second-stickMy${i}`).style.width = (window.innerWidth-40)*0.54 * fixMggRate[i] + 'px'
        }
        document.getElementById('value-customerMggAvg').innerHTML = Math.round(customerMggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-MggAvg').innerHTML = Math.round(mggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-customerMggAvg-detail').innerHTML = Math.round(customerMggAmtAvg/1000).toLocaleString('ko-KR') + '만원'
        document.getElementById('value-MggAvg-detail').innerHTML = Math.round(mggAmtAvg/1000).toLocaleString('ko-KR') + '만원'

        document.getElementById('stick-customerMggAvg').style.height =  80 * fixMggAvgRate + 'px'
        document.getElementById('stick-customerMggAvg').style.width = '55px'
        document.getElementById('stick-customerMggAvg-detail').style.height =  80 * fixMggAvgRate+ 'px'
        document.getElementById('stick-customerMggAvg-detail').style.width = '55px'

        if (customerMggAmtAvg < mggAmtAvg*(1-errRange) || customerMggAmtAvg > mggAmtAvg*(1+errRange)){
            document.getElementById('stick-customerMggAvg').style.backgroundColor = '#F83D3D'
            document.getElementById('value-customerMggAvg').style.color = '#F83D3D'
            document.getElementById('stick-customerMggAvg-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-customerMggAvg-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-customerMggAvg').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-customerMggAvg').style.color = '#5B8DEF'
            document.getElementById('stick-customerMggAvg-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-customerMggAvg-detail').style.color = '#5B8DEF'
        }

        document.getElementById('second-detail-title').innerHTML = age + '대 평균 가입률 상위 10개 항목 비교진단표'
        document.getElementById('second-sect2').innerHTML ='내 보장 금액'
        document.getElementById('second-sect4').innerHTML = age + '대 평균 보장금액'
        document.getElementById('buttonText').innerHTML ='모든 보장목록 확인하기'

        //세번째 디테일 페이지 실손형
        for (let i = 0; i < 12; i++) {
            document.getElementById(`third-stickRatio${i}`).style.width = (window.innerWidth - 40) * 0.6 * medSbscRate[i] + 'px'
        }
        document.getElementById('value-myMedRate').innerHTML = myMedRate + '%'
        document.getElementById('value-medRate').innerHTML = medRate + '%'
        document.getElementById('value-etcMyMedRate').innerHTML = etcMyMedRate + '%'
        document.getElementById('value-etcMedRate').innerHTML = etcMedRate + '%'
        document.getElementById('value-myMedRate-detail').innerHTML = myMedRate + '%'
        document.getElementById('value-medRate-detail').innerHTML = medRate + '%'
        document.getElementById('value-etcMyMedRate-detail').innerHTML = etcMyMedRate + '%'
        document.getElementById('value-etcMedRate-detail').innerHTML = etcMedRate + '%'

        document.getElementById('stick-myMedRate').style.height = 1.5 * myMedRate + 'px'
        document.getElementById('stick-myMedRate').style.width = '40px'
        document.getElementById('stick-medRate').style.height = 1.5 * medRate + 'px'
        document.getElementById('stick-medRate').style.width = '40px'
        document.getElementById('stick-etcMyMedRate').style.height = 1.5 * etcMyMedRate + 'px'
        document.getElementById('stick-etcMyMedRate').style.width = '40px'
        document.getElementById('stick-etcMedRate').style.height = 1.5 * etcMedRate + 'px'
        document.getElementById('stick-etcMedRate').style.width = '40px'
        document.getElementById('stick-myMedRate-detail').style.height = 1.5 * myMedRate + 'px'
        document.getElementById('stick-myMedRate-detail').style.width = '40px'
        document.getElementById('stick-medRate-detail').style.height = 1.5 * medRate + 'px'
        document.getElementById('stick-medRate-detail').style.width = '40px'
        document.getElementById('stick-etcMyMedRate-detail').style.height = 1.5 * etcMyMedRate + 'px'
        document.getElementById('stick-etcMyMedRate-detail').style.width = '40px'
        document.getElementById('stick-etcMedRate-detail').style.height = 1.5 * etcMedRate + 'px'
        document.getElementById('stick-etcMedRate-detail').style.width = '40px'

        if (myMedRate < medRate*(1-errRange) || myMedRate > medRate*(1+errRange)){
            document.getElementById('stick-myMedRate').style.backgroundColor = '#F83D3D'
            document.getElementById('value-myMedRate').style.color = '#F83D3D'
            document.getElementById('stick-etcMyMedRate').style.backgroundColor = '#F83D3D'
            document.getElementById('value-etcMyMedRate').style.color = '#F83D3D'
            document.getElementById('stick-myMedRate-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-myMedRate-detail').style.color = '#F83D3D'
            document.getElementById('stick-etcMyMedRate-detail').style.backgroundColor = '#F83D3D'
            document.getElementById('value-etcMyMedRate-detail').style.color = '#F83D3D'
        }
        else {
            document.getElementById('stick-myMedRate').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-myMedRate').style.color = '#5B8DEF'
            document.getElementById('stick-etcMyMedRate').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-etcMyMedRate').style.color = '#5B8DEF'
            document.getElementById('stick-myMedRate-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-myMedRate-detail').style.color = '#5B8DEF'
            document.getElementById('stick-etcMyMedRate-detail').style.backgroundColor = '#5B8DEF'
            document.getElementById('value-etcMyMedRate-detail').style.color = '#5B8DEF'
        }
        document.getElementById('third-detail-title').innerHTML = age + '대 평균 가입률 / 본인 가입 여부'
    }


    let detailListHeight = []
    function detailSlide(i) {
        if (windowSize == 'desktop') {
            $('#list1').slideToggle(600)
            $('#list2').slideToggle(600)
            $('#list3').slideToggle(600)
            setTimeout(() => {
                $(`#detail-list${i}`).animate({
                    height: 'auto'
                },0).slideToggle(600)
            },600)
        }
        else {
            const sectionHeight = [0 ,300, 300, 330]
            const show = new Promise((resolve, reject) => {
                $(`#list${i}`).slideToggle(0).queue(() => {
                    resolve()
                    $(`#list${i}`).dequeue()
                })
            })
            show.then(() => {
                detailListHeight[i] = $(`#detail-list${i}`).css('height')
                $(`#detail-list${i}`).slideToggle(0).animate({
                    height: sectionHeight[i]
                },0).animate({
                    height: detailListHeight[i]
                },600)
            }) 
        }
    }
    function exitSlide(i) {
        if (windowSize == 'desktop') {
            $(`#detail-list${i}`).slideToggle(600)
                setTimeout(() => {        
            $('#list1').slideToggle(600)
            $('#list2').slideToggle(600)
            $('#list3').slideToggle(600)
            },600)
        }
        else {    
            const sectionHeight = [0, 300, 300, 330]
            const hide = new Promise((resolve, reject) => {
                $(`#detail-list${i}`).animate({
                    height: sectionHeight[i]
                },600).slideToggle(0).queue(() => {
                    document.getElementById(`detail-list${i}`).setAttribute('style', 'display: none;')
                    resolve()
                    $(`#detail-list${i}`).dequeue()
                })
            })
            hide.then(() => {
                $(`#list${i}`).slideToggle(0)
            })
        }
    }
    document.getElementById('first-detail').addEventListener('click', () => {
        detailSlide(1)
    })
    document.getElementById('second-detail').addEventListener('click', () => {
        detailSlide(2)   
    })
    document.getElementById('third-detail').addEventListener('click', () => {
        detailSlide(3)   
    })
    document.getElementById('first-exit').addEventListener('click', () => {
        exitSlide(1)
    })
    document.getElementById('first-exit2').addEventListener('click', () => {
        exitSlide(1)
    })
    document.getElementById('second-exit').addEventListener('click', () => {
        exitSlide(2)
    })
    document.getElementById('second-exit2').addEventListener('click', () => {
        exitSlide(2)
    })
    document.getElementById('third-exit').addEventListener('click', () => {
        exitSlide(3)
    })
    document.getElementById('third-exit2').addEventListener('click', () => {
        exitSlide(3)
    })

    let windowSize
    if (window.innerWidth > 800) {
        windowSize = 'desktop'
        desktopSize ()
    }
    else {
        windowSize = 'mobile'
        mobileSize()
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800 && windowSize == 'mobile'){
            windowSize = 'desktop'
            document.getElementById('list1').style.display = 'flex'
            document.getElementById('list2').style.display = 'flex'
            document.getElementById('list3').style.display = 'flex'
            document.getElementById('detail-list1').style.display = 'none'
            document.getElementById('detail-list2').style.display = 'none'
            document.getElementById('detail-list3').style.display = 'none'
            document.getElementById('detail-list1').style.height = ''
            document.getElementById('detail-list2').style.height = ''
            document.getElementById('detail-list3').style.height = ''
            desktopSize ()
        }
        else if (window.innerWidth <= 800) {
            for (let i = 0; i < 10; i++) {
                document.getElementById(`second-stickMy${i}`).style.width = (window.innerWidth-40)*0.54 * fixMggRate[i] + 'px'
            }
            for (i = 0; i < 6; i++){
                document.getElementsByClassName('box-middle')[i].style.width = (window.innerWidth-40)*0.9 + 'px'
            }
            for (let i = 0; i < 12; i++) {
                document.getElementById(`third-stickRatio${i}`).style.width = (window.innerWidth - 40) * 0.6 * medSbscRate[i] + 'px'
            }
            if (windowSize == 'desktop') {
            windowSize = 'mobile'
            document.getElementById('list1').style.display = 'flex'
            document.getElementById('list2').style.display = 'flex'
            document.getElementById('list3').style.display = 'flex'
            document.getElementById('detail-list1').style.display = 'none'
            document.getElementById('detail-list2').style.display = 'none'
            document.getElementById('detail-list3').style.display = 'none'
            mobileSize ()
            }
        }
    })
}) 