from django.db import models
from django.contrib.auth.models import User

class Jogo(models.Model):
    nome_jogador = models.CharField(max_length=100)
    quantidade = models.IntegerField()
    tempo = models.IntegerField()
    data_hora = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jogos')  # Relação com o usuário logado

    def __str__(self):
        return f'{self.nome_jogador} - {self.quantidade} tentativas'

