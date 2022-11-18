from django.contrib import admin
from .models import GAUser, CompareEstimate, ConsultingEstimate

class GAuserAdmin(admin.ModelAdmin):

    list_display = ('userid', 'registerDate')

admin.site.register(GAUser, GAuserAdmin)

class CompareEstimateAdmin(admin.ModelAdmin):

    list_display = ('registerId', 'registerDate')

admin.site.register(CompareEstimate, CompareEstimateAdmin)

class ConsultingEstimateAdmin(admin.ModelAdmin):

    list_display = ('registerId', 'registerDate')

admin.site.register(ConsultingEstimate, ConsultingEstimateAdmin)
