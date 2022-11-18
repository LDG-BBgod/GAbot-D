from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from main.views import HomeView, MypageView, MypageDetailView, CompareView, CompareDetailView, EstimateView, MyinsuranceView, ConsultingView, ConsultingDetailView, LoginView, LogoutView, FindIdView, FindPwView, RegisterView
from main.views import RegisterAPI, SendMsgAPI, checkOverlap, FileDownload
from main.views import CALoginView, CALogoutView, CASelectView, CACompareServiceView, CACompareServiceDetailView, CAConsultingServiceView, CAConsultingServiceDetailView
from main.views import CAUserDB, CACompareDB, CAConsultingDB, CAMyinsuranceDB, CATimeDB, CAUserDetailDB, CACompareDetailDB, CAConsultingDetailDB, CAMyinsuranceDetailDB, CATimeDetailDB
urlpatterns = [

    path('', HomeView),
    path('admin/', admin.site.urls),

    path('login/', LoginView),
    path('logout/', LogoutView),
    path('findid/', FindIdView),
    path('findpw/', FindPwView),
    path('register/', RegisterView),
    path('register/api/', RegisterAPI),

    path('mypage/', MypageView),
    path('mypageDetail/<int:pk>/', MypageDetailView),

    path('compare/', CompareView),
    path('compare/<int:pk>/', CompareDetailView),
    path('estimate/<int:pk>/', EstimateView),
    path('myinsurance/<int:pk>/', MyinsuranceView),

    path('consulting/', ConsultingView),
    path('consulting/<int:pk>/', ConsultingDetailView),

    path('sendmsg/', SendMsgAPI),
    path('checkOverlap/', checkOverlap),
    path('download/', FileDownload),
    
    path('caLogin/', CALoginView),
    path('caLogout/', CALogoutView),
    path('caSelect/', CASelectView),
    path('caCompare/', CACompareServiceView),
    path('caCompare/<int:pk>/', CACompareServiceDetailView),
    path('caConsulting/', CAConsultingServiceView),
    path('caConsulting/<int:pk>/', CAConsultingServiceDetailView),

    path('caUserDB/', CAUserDB),
    path('caCompareDB/', CACompareDB),
    path('caConsultingDB/', CAConsultingDB),
    path('caMyinsuranceDB/', CAMyinsuranceDB),
    path('caTimeDB/', CATimeDB),
    path('caUserDB/<int:pk>/', CAUserDetailDB),
    path('caCompareDB/<int:pk>/', CACompareDetailDB),
    path('caConsultingDB/<int:pk>/', CAConsultingDetailDB),
    path('caMyinsuranceDB/<int:pk>/', CAMyinsuranceDetailDB),
    path('caTimeDB/<int:pk>/', CATimeDetailDB),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
