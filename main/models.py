from django.db import models

class GAUser(models.Model):

    userid = models.CharField(max_length=64, verbose_name='아이디')
    userpw = models.CharField(max_length=128, verbose_name='비밀번호')
    userName = models.CharField(max_length=64, verbose_name='이름', blank=True, null=True)
    phone = models.CharField(max_length=64, verbose_name='휴대폰번호')
    kakao = models.CharField(max_length=64, verbose_name='카카오톡아이디')
    email = models.CharField(max_length=64, verbose_name='이메일')
    registerDate = models.CharField(max_length=64, verbose_name='등록시간', default='0')
    gaInfo = models.CharField(max_length=128, verbose_name='설계사 정보', default='미입력')
                      
    class Meta:
        db_table = 'GA_User'
        verbose_name = '회원정보'
        verbose_name_plural = '회원정보'

class CompareEstimate(models.Model):

    comparePK = models.IntegerField(verbose_name='비교견적 퍼스널키', blank=True, null=True)
    opinion = models.TextField(null=True)
    pdfFile = models.FileField(null=True, upload_to="", blank=True)
    contentType = models.CharField(max_length=128, verbose_name='파일형식',  blank=True, null=True)
    registerId = models.CharField(max_length=64, verbose_name='아이디')
    registerPhone = models.CharField(max_length=64, verbose_name='휴대폰번호', blank=True, null=True)
    registerDate = models.CharField(max_length=64, verbose_name='등록시간', default='0')
    birth = models.CharField(max_length=64, verbose_name='생년월일', blank=True, null=True)
    gender = models.CharField(max_length=64, verbose_name='성별', blank=True, null=True)
    concern = models.CharField(max_length=64, verbose_name='관심 보험', blank=True, null=True)
    price = models.CharField(max_length=64, verbose_name='월 보험료', blank=True, null=True)
    
    class Meta:
        db_table = 'GA_CompareEstimate'
        verbose_name = '비교견적 제출'
        verbose_name_plural = '비교견적 제출'

class ConsultingEstimate(models.Model):

    consultingPK =  models.IntegerField(verbose_name='상담예약 퍼스널키', blank=True, null=True)
    registerId = models.CharField(max_length=64, verbose_name='아이디')
    registerDate = models.CharField(max_length=64, verbose_name='등록시간', default='0')
    consultingDate = models.CharField(max_length=64, verbose_name='상담날짜', blank=True, null=True)
    consultingTime = models.CharField(max_length=64, verbose_name='상담시간', blank=True, null=True)
    selectType = models.CharField(max_length=64, verbose_name='연락수단', blank=True, null=True)
    phone = models.CharField(max_length=64, verbose_name='연락처', blank=True, null=True)

    class Meta:
        db_table = 'GA_ConsultingEstimate'
        verbose_name = '상담예약 제출'
        verbose_name_plural = '상담예약 제출'
