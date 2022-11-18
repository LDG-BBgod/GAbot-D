from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):     
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:        
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class GauserCompare(models.Model):
    id = models.BigAutoField(primary_key=True)
    method = models.CharField(max_length=64, blank=True, null=True)
    concern = models.CharField(max_length=64, blank=True, null=True)
    price = models.CharField(max_length=64, blank=True, null=True)
    hospital = models.CharField(max_length=64, blank=True, null=True)
    hospitaltreatment = models.CharField(db_column='hospitalTreatment', max_length=64, blank=True, null=True)  # Field name made lowercase.
    hospitaldisease = models.CharField(db_column='hospitalDisease', max_length=64, blank=True, null=True)  # Field name made lowercase.
    disease = models.CharField(max_length=64, blank=True, null=True)
    familydisease = models.CharField(db_column='familyDisease', max_length=64, blank=True, null=True)  # Field name made lowercase.
    familydiseaseetc = models.CharField(db_column='familyDiseaseEtc', max_length=64, blank=True, null=True)  # Field name made lowercase.
    userName = models.CharField(max_length=64, blank=True, null=True)
    birth = models.CharField(max_length=64, blank=True, null=True)
    gender = models.CharField(max_length=64, blank=True, null=True)
    job = models.CharField(max_length=64, blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    contact = models.CharField(max_length=64, blank=True, null=True)
    userip = models.CharField(db_column='userIP', max_length=64)  # Field name made lowercase.
    nextRegisterDate = models.CharField(max_length=64)
    registerdate = models.CharField(db_column='registerDate', max_length=64)  # Field name made lowercase.
    consulting = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'gauser_compare'
        verbose_name = '비교견적'
        verbose_name_plural = '비교견적'


class GauserConsulting(models.Model):
    id = models.BigAutoField(primary_key=True)
    userip = models.CharField(db_column='userIP', max_length=64)  # Field name made lowercase.
    registerdate = models.CharField(db_column='registerDate', max_length=64)  # Field name made lowercase.
    phone = models.CharField(max_length=64, blank=True, null=True)
    consultingdate = models.CharField(db_column='consultingDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    consultingtime = models.CharField(db_column='consultingTime', max_length=64, blank=True, null=True)  # Field name made lowercase.
    selecttype = models.CharField(db_column='selectType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    userCount = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'gauser_consulting'
        verbose_name = '상담예약'
        verbose_name_plural = '상담예약'


class GauserMyinsurance(models.Model):
    id = models.BigAutoField(primary_key=True)
    userip = models.CharField(db_column='userIP', max_length=64)  # Field name made lowercase.
    registerdate = models.CharField(db_column='registerDate', max_length=64)  # Field name made lowercase.
    crawldata = models.TextField(db_column='crawlData')  # Field name made lowercase.
    userName = models.CharField(max_length=64, verbose_name='이름', blank=True, null=True)
    birth = models.CharField(max_length=64, verbose_name='생년월일', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gauser_myinsurance'
        verbose_name = '보험진단'
        verbose_name_plural = '보험진단'


class HomeHomebutton(models.Model):
    id = models.BigAutoField(primary_key=True)
    userip = models.CharField(db_column='userIP', max_length=64)  # Field name made lowercase.
    refreshcount = models.IntegerField(db_column='refreshCount')  # Field name made lowercase.
    comparecount = models.IntegerField(db_column='compareCount')  # Field name made lowercase.
    diagnosiscount = models.IntegerField(db_column='diagnosisCount')  # Field name made lowercase.
    homestaytime = models.FloatField(db_column='homeStayTime')  # Field name made lowercase.
    registerdate = models.CharField(db_column='registerDate', max_length=64)  # Field name made lowercase.
    comparestaytime = models.FloatField(db_column='compareStayTime')  # Field name made lowercase.
    consultingstaytime = models.FloatField(db_column='consultingStayTime')  # Field name made lowercase.
    diagnosisstaytime2 = models.FloatField(db_column='diagnosisStayTime2')  # Field name made lowercase.
    selectstaytime = models.FloatField(db_column='selectStayTime')  # Field name made lowercase.
    comparesubmitcount = models.IntegerField(db_column='compareSubmitCount')  # Field name made lowercase.
    consultingcount = models.IntegerField(db_column='consultingCount')  # Field name made lowercase.
    consultingsubmitcount = models.IntegerField(db_column='consultingSubmitCount')  # Field name made lowercase.
    managecount = models.IntegerField(db_column='manageCount')  # Field name made lowercase.
    diagnosisstaytime1 = models.FloatField(db_column='diagnosisStayTime1')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'home_homeButton'
        verbose_name = '방문기록'
        verbose_name_plural = '방문기록'


class HomeUsercount(models.Model):
    id = models.BigAutoField(primary_key=True)
    usercount = models.IntegerField(db_column='userCount')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'home_userCount'