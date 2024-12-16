from django.contrib import admin  # Importando o módulo admin
from django.urls import path
from jogo_da_memoria import views

urlpatterns = [
    path('admin/', admin.site.urls),  # URL do admin
    path('jogo/', views.jogo, name='jogo'),  # URL para o jogo (apenas para usuários logados)
    path('save/', views.save, name='save_game'),  # URL para salvar o resultado do jogo (apenas para usuários logados)
    path('ranking/', views.ranking, name='ranking'),  # URL para o ranking (sem login necessário)
]
