from atexit import register
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render, redirect
from django.utils.dateformat import DateFormat
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from dbapp.models import GauserCompare, GauserConsulting, GauserMyinsurance, HomeHomebutton
from django.http import Http404
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

from .models import GAUser, CompareEstimate, ConsultingEstimate
from .decorators import superUser_required

from datetime import datetime

import hashlib, hmac, base64, time, os
import requests, json, random

def HomeView(request):
    
    content = {
        'compare': GauserCompare.objects.all(),
        'consulting': GauserConsulting.objects.filter(userCount=0)
    }
    return render(request, 'home.html', content)


def LoginView(request):

    if request.method == 'POST':
        userid = request.POST.get('userid', None)
        userpw = request.POST.get('userpw', None)
        res_data = {}

        if userid == '' or userpw == '':
            res_data['error'] = '아이디 비밀번호를 입력해주세요.'
            return render(request, 'login.html', res_data)

        try:
            gauser = GAUser.objects.get(userid=userid)
        except GAUser.DoesNotExist:
            res_data['error'] = '존재하지 않는 아이디입니다.'
            return render(request, 'login.html', res_data)
        
        if  userpw != gauser.userpw:
            res_data['error'] = '비밀번호가 다릅니다.'
            return render(request, 'login.html', res_data)

        if gauser.gaInfo == '미입력':
            res_data['error'] = '승인되지 않은 아이디입니다.'
            return render(request, 'login.html', res_data)
        
        else:
            request.session['user'] = gauser.userid
            return redirect('/')

    return render(request, 'login.html')


def LogoutView(request):

    if request.session.get('user'):
        del(request.session['user'])

    return redirect('/')


def FindIdView(request):

    return render(request, 'findId.html')


def FindPwView(request):

    return render(request, 'findPw.html')


def RegisterView(request):

    if request.method == 'POST':
        gauser = GAUser(
            userid = request.POST.get('userid', None),
            userpw = request.POST.get('userpw', None),
            userName = request.POST.get('userName', None),
            phone = request.POST.get('phone', None),
            kakao = request.POST.get('kakao', None),
            email = request.POST.get('email', None),
            registerDate = DateFormat(datetime.now()).format('20y.m.d H:i'),
        )
        gauser.save()
        return redirect('/login')

    return render(request, 'register.html')
    

@csrf_exempt
def MypageView(request):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'consultingDelete':

            userid = request.session.get('user')
            pk = request.POST.get('pk')
            consultingObject = GauserConsulting.objects.get(pk=pk)
            consultingObject.userCount = 0
            consultingObject.save()
            ConsultingEstimate.objects.filter(registerId=userid).get(consultingPK=pk).delete()
            
            return HttpResponse(json.dumps({}))

        elif method == 'checkPW':

            userid = request.session.get('user')
            userpw = GAUser.objects.get(userid=userid).userpw
            inputpw = request.POST.get('userpw')

            if userpw == inputpw:

                return HttpResponse(json.dumps({'err': 'N'}))
            
            else:

                return HttpResponse(json.dumps({'err': 'Y'}))

        elif method == 'userDataChange':

            userpw = request.POST.get('userpw')
            kakao = request.POST.get('kakao')
            email = request.POST.get('email')

            userid = request.session.get('user')
            gauser = GAUser.objects.get(userid=userid)

            gauser.userpw = userpw
            gauser.kakao = kakao
            gauser.email = email
            gauser.save()

            return HttpResponse(json.dumps({}))


    userid = request.session.get('user')
    gaUser = GAUser.objects.get(userid=userid)
    compareEstimate = CompareEstimate.objects.filter(registerId=userid)
    consultingEstimate = ConsultingEstimate.objects.filter(registerId=userid)

    content = {
        'user': gaUser,
        'compare': compareEstimate,
        'consulting': consultingEstimate,
    }

    return render(request, 'mypage.html', content)


@csrf_exempt
def MypageDetailView(request, pk):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'opinion':
            opinion = request.POST.get('opinion')
            compareEstimate = CompareEstimate.objects.get(pk=pk)
            compareEstimate.opinion = opinion
            compareEstimate.save()

            return HttpResponse(json.dumps({}))

        elif method == 'pdf':

            pdfFile = request.FILES["pdfFile"]
            compareEstimate = CompareEstimate.objects.get(pk=pk)
            compareEstimate.pdfFile.delete()
            compareEstimate.pdfFile = pdfFile
            compareEstimate.save()

            return redirect(f'/mypageDetail/{pk}')

        elif method == 'delete':

            compareEstimate = CompareEstimate.objects.get(pk=pk)
            compareObject = GauserCompare.objects.get(pk=compareEstimate.comparePK)
            compareObject.consulting -= 1
            compareObject.save()
            compareEstimate.pdfFile.delete()
            compareEstimate.delete()

            return HttpResponse(json.dumps({}))

    userid = request.session.get('user')
    compareEstimate = CompareEstimate.objects.filter(registerId=userid).get(pk=pk)
    compareObject = GauserCompare.objects.get(pk=compareEstimate.comparePK)

    userName = compareObject.userName
    if userName == None or userName == '':
        userName = 'blank'
    birth = compareObject.birth

    try:
        myinsuranceObject = GauserMyinsurance.objects.filter(
            Q(userName=userName)|
            Q(birth=birth)
        ).first()

    except GauserMyinsurance.DoesNotExist:

        myinsuranceObject = {}

    content = {
        'compareE': compareEstimate,
        'compare': compareObject,
        'myinsurance': myinsuranceObject,
    }
    
    return render(request, 'mypageDetail.html', content)


def CompareView(request):

    compareObjects = GauserCompare.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(compareObjects, 6)
    compareObject = paginator.get_page(page)

    return render(request, 'compare.html', {'compare': compareObject})


def CompareDetailView(request, pk):

    try:
        compareObject = GauserCompare.objects.get(pk=pk)

    except GauserCompare.DoesNotExist:
        raise Http404('게시글을 찾을 수 없습니다.')

    userName = compareObject.userName
    if userName == None or userName == '':
        userName = 'blank'
    birth = compareObject.birth

    try:
        myinsuranceObject = GauserMyinsurance.objects.filter(
            Q(userName=userName)|
            Q(birth=birth)
        ).first()

    except GauserMyinsurance.DoesNotExist:

        myinsuranceObject = {}

    content = {
        'compare': compareObject,
        'myinsurance': myinsuranceObject,
    }

    return render(request, 'compareDetail.html', content)

def EstimateView(request, pk):

    if request.method == 'POST':

        compareObject = GauserCompare.objects.get(pk=pk)
        userid = request.session.get('user')

        fileupload = CompareEstimate(
            opinion = request.POST['opinion'],
            pdfFile = request.FILES["pdfFile"],
            contentType = request.FILES["pdfFile"].content_type,
            registerId = userid,
            registerPhone = GAUser.objects.get(userid=userid).phone,
            registerDate = DateFormat(datetime.now()).format('20y.m.d H:i'),
            comparePK = pk,
            birth = compareObject.birth,
            gender = compareObject.gender,
            concern = compareObject.concern,
            price = compareObject.price
        )
        fileupload.save()
        
        compareObject.consulting += 1
        compareObject.save()

        return redirect('/')
    
    try:
        compareObject = GauserCompare.objects.get(pk=pk)

    except GauserCompare.DoesNotExist:
        raise Http404('게시글을 찾을 수 없습니다.')

    return render(request, 'estimate.html', {'compare': compareObject})


@csrf_exempt
def MyinsuranceView(request,pk):

    if request.method == 'POST':

        crawlData = GauserMyinsurance.objects.get(pk = pk).crawldata

        return HttpResponse(json.dumps({'crawlData': crawlData}))

    myinsuranceObject = GauserMyinsurance.objects.get(pk=pk)

    return render(request, 'myinsurance.html', {'myinsurance': myinsuranceObject})


def ConsultingView(request):

    consultingObjects = GauserConsulting.objects.filter(userCount=0)
    page = int(request.GET.get('p', 1))
    paginator = Paginator(consultingObjects, 8)
    consultingObject = paginator.get_page(page)

    return render(request, 'consulting.html', {'consulting': consultingObject})


@csrf_exempt
def ConsultingDetailView(request, pk):

    if request.method == 'POST':

        consultingObject = GauserConsulting.objects.get(pk=pk)
        consultingObject.userCount = 1

        consultingEstimate = ConsultingEstimate(
            registerId = request.session.get('user'),
            registerDate  = DateFormat(datetime.now()).format('20y.m.d H:i'),
            consultingPK = pk,
            consultingDate = consultingObject.consultingdate,
            consultingTime = consultingObject.consultingtime,
            selectType = consultingObject.selecttype,
            phone = consultingObject.phone
        )

        consultingObject.save()
        consultingEstimate.save()

        return HttpResponse(json.dumps({}))

    try:
        consultingObject = GauserConsulting.objects.get(pk=pk)
    except GauserConsulting.DoesNotExist:
        raise Http404('게시글을 찾을 수 없습니다.')

    return render(request, 'consultingDetail.html', {'consulting': consultingObject})


# API

@csrf_exempt
def RegisterAPI(request):

    apiType = request.POST.get('type')
    
    if apiType == 'idCheck':
        userid = request.POST.get('userid')
        try:
            gauser = GAUser.objects.get(userid=userid)
            responseData = {
                'check': 'false',
            }
        except GAUser.DoesNotExist:
            responseData = {
                'check': 'true',
            }
            return HttpResponse(json.dumps(responseData))

        return HttpResponse(json.dumps(responseData))
       
    return HttpResponse()


@csrf_exempt
def SendMsgAPI(request):

    authNum = random.randrange(100000, 999999)
    apiType = request.POST.get('type')
    phone = request.POST.get('phone')
    content = None

    if apiType == 'authMsg':
        content = f'[GABOT] 인증번호 [{authNum}]'
    elif apiType == 'sendId':
        try:
            gausers = GAUser.objects.filter(phone = phone)
            useridList = []

            for gauser in gausers:
                useridList.append(gauser.userid)

            userid = ', '.join(useridList)
            content = f'[GABOT] {phone} 번호로 가입된 아이디 [{userid}]'

        except GAUser.DoesNotExist:
            content = f'[GABOT] {phone} 번호로 가입된 아이디가 없습니다.'
        
    elif apiType == 'sendPw':
        userid = request.POST.get('userid')
        try:
            gauser = GAUser.objects.get(userid = userid)
            if gauser.phone == phone:
                content = f'[GABOT] {userid}의 비밀번호는 [{gauser.userpw}]입니다.'
            else:
                content = f'[GABOT] {userid}에 등록된 휴대전화번호와 다릅니다.'

        except GAUser.DoesNotExist:
            content = f'[GABOT] {userid}는 존재하지 않는 아이디 입니다.'

    def getSigningKey():

        timestamp = str(int(time.time() * 1000))

        access_key = "Lyf4UlLYnAqvptuxG9Oq"
        secret_key = "O8DxN19g9zaRZ335Wgx5FCzQfXPIbZfkLR5dng4C"
        secret_key = bytes(secret_key, 'UTF-8')

        method = "POST"
        
        uri = "/sms/v2/services/ncp:sms:kr:289661419957:gabot/messages"

        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, 'UTF-8')
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        return signingKey

    headers = {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": str(int(time.time() * 1000)),
        "x-ncp-iam-access-key": 'Lyf4UlLYnAqvptuxG9Oq',
        "x-ncp-apigw-signature-v2": getSigningKey(),
        }
    body = {
        'type': 'SMS',
        'contentType': 'COMM',
        'countryCode': '82',
        'from': '01054088229',
        'content': content,
        'messages': [{
            'to': phone,
        }],
    }
    requests.post('https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:289661419957:gabot/messages', json=body, headers=headers)
    
    responseData = {
        'authNum': authNum,
    }

    return HttpResponse(json.dumps(responseData))

@csrf_exempt
def checkOverlap(request):
        
    pk = request.POST.get('pk')
    model = request.POST.get('type')
    userid = request.session.get('user')
    responseData = {
        'overlap': 'off',
    }

    if model == 'compare':

        compareObjects = CompareEstimate.objects.filter(registerId = userid)
        
        for compareObject in compareObjects:

            if str(compareObject.comparePK) == pk:

                responseData['overlap'] = 'on'

    if model == 'consulting':

        consultingObjects = ConsultingEstimate.objects.filter(registerId = userid)
        
        for consultingObject in consultingObjects:

            if str(consultingObject.consultingPK) == pk:

                responseData['overlap'] = 'on'

    return HttpResponse(json.dumps(responseData))


def FileDownload(request):

    path = request.GET['path']
    contentType = request.GET['content_type']
    filePath = os.path.join(settings.MEDIA_ROOT, path)

    if os.path.exists(filePath):
        binary_file = open(filePath, 'rb')
        response = HttpResponse(binary_file.read(), content_type=contentType)
        response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(filePath)
        return response
    else:
        message = '알 수 없는 오류가 발행하였습니다.'
        return HttpResponse("<script>alert('"+ message +"');history.back()'</script>")





# 관리자 페이지 뷰 - 서비스 관리
def CALoginView(request):

    if request.session.get('superUser'):
        return redirect('/caSelect/')

    if request.method == 'POST':

        if request.POST.get('userid') != User.objects.last().username:

            return render(request, 'caLogin.html', {'error': '아이디가 잘못되었습니다.'})
        if not check_password(request.POST.get('userpw'), User.objects.last().password):

            return render(request, 'caLogin.html', {'error': '비밀번호가 잘못되었습니다.'})

        request.session['superUser'] = request.POST.get('userid')
        
        return redirect('/caSelect/')

    return render(request, 'caLogin.html')


def CALogoutView(request):

    if request.session.get('superUser'):
        del(request.session['superUser'])

    return redirect('/caLogin/')


@superUser_required
def CASelectView(request):

    return render(request, 'caSelect.html')


@superUser_required
def CACompareServiceView(request):

    compareObjects = GauserCompare.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(compareObjects, 6)
    compareObject = paginator.get_page(page)

    return render(request, 'caCompareService.html', {'compare': compareObject})


@csrf_exempt
@superUser_required
def CACompareServiceDetailView(request, pk):

    if request.method == 'POST':

        compareObject = GauserCompare.objects.get(pk=pk)
        compareObject.consulting = 0
        compareObject.save()

        compareEstimates = CompareEstimate.objects.filter(comparePK=pk)

        for compareEstimate in compareEstimates:

            compareEstimate.pdfFile.delete()
            compareEstimate.delete()

        return HttpResponse(json.dumps({}))

    compareObjects = CompareEstimate.objects.filter(comparePK=pk)

    return render(request, 'caCompareDetail.html', {'compare': compareObjects})


@superUser_required
def CAConsultingServiceView(request):

    consultingObjects = GauserConsulting.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(consultingObjects, 8)
    consultingObject = paginator.get_page(page)
    return render(request, 'caConsultingService.html', {'consulting': consultingObject})


@csrf_exempt
@superUser_required
def CAConsultingServiceDetailView(request, pk):

    if request.method == 'POST':

        consultingObject = GauserConsulting.objects.get(pk=pk)
        consultingObject.userCount = 0
        consultingObject.save()

        ConsultingEstimate.objects.get(consultingPK=pk).delete()

        return HttpResponse(json.dumps({}))

    try:

        consultingObject = ConsultingEstimate.objects.get(consultingPK=pk)
        GAuser = GAUser.objects.get(userid = consultingObject.registerId)
        responseData = {
            'consulting': consultingObject,
            'gauser': GAuser,
        }

    except ConsultingEstimate.DoesNotExist:

        responseData = {}



    return render(request, 'caConsultingDetail.html', responseData)


# 관리자 페이지 뷰 - DB
@superUser_required
def CAUserDB(request):

    if request.method == 'POST':

        search = request.POST.get('search')

        try:

            gauserObjects = GAUser.objects.filter(
                Q(userid__contains=search)|
                Q(phone__contains=search)
            )
            page = int(request.GET.get('p', 1))
            paginator = Paginator(gauserObjects, 10)
            gauserObject = paginator.get_page(page)

            return render(request, 'caUserDB.html', {'gauser': gauserObject})

        except GAUser.DoesNotExist:

            gauserObjects = GAUser.objects.all()
            page = int(request.GET.get('p', 1))
            paginator = Paginator(gauserObjects, 10)
            gauserObject = paginator.get_page(page)

            res_data = {
                'gauser': gauserObjects,
                'error': '해당하는 데이터가 없습니다.'
            }
            return render(request, 'login.html', res_data)

    gauserObjects = GAUser.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(gauserObjects, 10)
    gauserObject = paginator.get_page(page)

    return render(request, 'caUserDB.html', {'gauser': gauserObject})


@csrf_exempt
@superUser_required
def CAUserDetailDB(request, pk):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'delete':

            GAUser.objects.get(pk = pk).delete()

            return HttpResponse(json.dumps({}))

        elif method == 'change':

            print('testsetsetsetset')
            gauser = GAUser.objects.get(pk=pk)
            gauser.userid = request.POST.get('userid')
            gauser.userpw = request.POST.get('userpw')
            gauser.userName = request.POST.get('userName')
            gauser.phone = request.POST.get('phone')
            gauser.kakao = request.POST.get('kakao')
            gauser.email = request.POST.get('email')
            gauser.gaInfo = request.POST.get('gaInfo')
            gauser.save()

            return render(request, 'caUserDetailDB.html', {'gauser': gauser})

    gauserObject = GAUser.objects.get(pk = pk)

    return render(request, 'caUserDetailDB.html', {'gauser': gauserObject})


@superUser_required
def CACompareDB(request):

    compareObjects = GauserCompare.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(compareObjects, 10)
    compareObject = paginator.get_page(page)

    return render(request, 'caCompareDB.html', {'compare': compareObject})


@csrf_exempt
@superUser_required
def CACompareDetailDB(request, pk):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'delete':

            GauserCompare.objects.get(pk = pk).delete()

            return HttpResponse(json.dumps({}))

    compareObject = GauserCompare.objects.get(pk = pk)

    return render(request, 'caCompareDetailDB.html', {'compare': compareObject})


@superUser_required
def CAConsultingDB(request):

    consultingObjects = GauserConsulting.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(consultingObjects, 10)
    consultingObject = paginator.get_page(page)

    return render(request, 'caConsultingDB.html', {'consulting': consultingObject})


@csrf_exempt
@superUser_required
def CAConsultingDetailDB(request, pk):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'delete':

            GauserConsulting.objects.get(pk = pk).delete()

            return HttpResponse(json.dumps({}))

    consultingObject = GauserConsulting.objects.get(pk = pk)

    return render(request, 'caConsultingDetailDB.html', {'consulting': consultingObject})


@superUser_required
def CAMyinsuranceDB(request):

    myinsuranceObjects = GauserMyinsurance.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(myinsuranceObjects, 10)
    myinsuranceObject = paginator.get_page(page)

    return render(request, 'caMyinsuranceDB.html', {'myinsurance': myinsuranceObject})


@csrf_exempt
@superUser_required
def CAMyinsuranceDetailDB(request, pk):

    if request.method == 'POST':

        crawlData = GauserMyinsurance.objects.get(pk = pk).crawldata

        return HttpResponse(json.dumps({'crawlData': crawlData}))

    myinsuranceObject = GauserMyinsurance.objects.get(pk = pk)

    return render(request, 'caMyinsuranceDetailDB.html', {'myinsurance': myinsuranceObject})


@superUser_required
def CATimeDB(request):

    timeObjects = HomeHomebutton.objects.all()
    page = int(request.GET.get('p', 1))
    paginator = Paginator(timeObjects, 10)
    timeObject = paginator.get_page(page)

    return render(request, 'caTimeDB.html', {'time': timeObject})


@csrf_exempt
@superUser_required
def CATimeDetailDB(request, pk):

    if request.method == 'POST':

        method = request.POST.get('type')

        if method == 'delete':

            HomeHomebutton.objects.get(pk = pk).delete()

            return HttpResponse(json.dumps({}))

    timeObject = HomeHomebutton.objects.get(pk = pk)

    return render(request, 'caTimeDetailDB.html', {'time': timeObject})