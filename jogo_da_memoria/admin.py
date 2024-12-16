from django.contrib import admin
from .models import Jogo  # Importando o modelo Jogo

# Registrar o modelo Jogo no admin
@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_jogador', 'quantidade', 'tempo')  # Campos que aparecerão na lista de jogos
    search_fields = ('nome_jogador',)  # Permite pesquisar pelo nome do jogador
    list_filter = ('quantidade',)  # Filtro por quantidade
    ordering = ('-id',)  # Ordena os registros pela ID de forma decrescente


