from django.contrib import admin
from .models import GauserCompare, GauserConsulting, GauserMyinsurance, HomeHomebutton

class GauserCompareAdmin(admin.ModelAdmin):

    list_display = ('userip',)

admin.site.register(GauserCompare, GauserCompareAdmin)

class GauserConsultingAdmin(admin.ModelAdmin):

    list_display = ('userip',)

admin.site.register(GauserConsulting, GauserConsultingAdmin)

class GauserMyinsuranceAdmin(admin.ModelAdmin):

    list_display = ('userip',)

admin.site.register(GauserMyinsurance, GauserMyinsuranceAdmin)

class HomeHomebuttonAdmin(admin.ModelAdmin):

    list_display = ('userip',)

admin.site.register(HomeHomebutton, HomeHomebuttonAdmin)
