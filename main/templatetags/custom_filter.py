from atexit import register
from tokenize import Number
from django import template
import datetime

register = template.Library()

@register.filter
def change_pw(value):

    changedValue = ""
    for i in range(len(value)):
        changedValue += "*"
    
    return changedValue


@register.filter
def get_two_concern(value):

    splitValue = value.split(',')
    if (len(splitValue) > 1):
        changedValue = splitValue[0] + ', ' + splitValue[1]
    else:
        changedValue = value

    return changedValue


@register.filter
def get_page_to_compare(value):

    changedValue = ((value - 1) // 3) + 1

    return changedValue


@register.filter
def get_page_to_consulting(value):

    changedValue = ((value - 1) // 4) + 1

    return changedValue


@register.filter
def display_progress(value):

    splitValue = value.split('/')
    consultingMonth = splitValue[0]
    consultingDay = splitValue[1]
    consultingDate = int(str(consultingMonth) + str(consultingDay))

    nowTime = datetime.datetime.now()
    nowMonth = nowTime.month
    nowDay = nowTime.day

    if nowDay < 10:
        nowDay = '0' + str(nowDay)
    nowDate = int(str(nowMonth) + str(nowDay))

    if consultingDate > nowDate:

        changedValue = '상담대기'
    
    elif consultingDate == nowDate:

        changedValue = '상담중'
    
    else:

        changedValue = '상담완료'

    return changedValue


@register.filter
def display_status(value):

    if value == '미입력':

        changedValue = '요청'
    
    else:

        changedValue = '정회원'

    return changedValue


@register.filter
def blank_change(value):

    if value == '' or value == None:

        changedValue = '미입력'
    
    else:

        changedValue = value

    return changedValue