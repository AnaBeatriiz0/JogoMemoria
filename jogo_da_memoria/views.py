from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Jogo  # Importando o modelo Jogo

# Função para salvar os dados do jogador no banco
@login_required
def save(request):
    if request.method == 'POST':
        nome_jogador = request.POST.get('nome_jogador')
        quantidade = request.POST.get('quantidade')
        tempo = request.POST.get('tempo')

        # Verifica se todos os dados estão presentes e são válidos
        if not nome_jogador:
            return HttpResponse('Nome do jogador é obrigatório', status=400)
        
        if not quantidade.isdigit() or not tempo.isdigit():
            return HttpResponse('Quantidade e tempo devem ser números válidos', status=400)

        quantidade = int(quantidade)
        tempo = int(tempo)

        # Criando e salvando os dados no banco
        jogo_partida = Jogo(
            nome_jogador=nome_jogador,
            quantidade=quantidade,
            tempo=tempo,
            usuario=request.user  # Associando o jogo ao usuário logado
        )
        jogo_partida.save()

        # Redireciona para a página de ranking (ou outra página após salvar)
        return redirect('ranking')
    else:
        # Caso o método não seja POST
        return HttpResponse('Método não permitido', status=405)

# Função para exibir os jogos cadastrados (ranking)
def ranking(request):
    # Recupera todos os jogos e ordena pela quantidade de tentativas, tempo e data (mais recente primeiro)
    rankings = Jogo.objects.order_by('quantidade', 'tempo', '-data_hora')

    # Passando os dados para o template
    return render(request, 'ranking.html', {'rankings': rankings})

# Função para exibir a página do jogo (apenas para usuários logados)
@login_required
def jogo(request):
    return render(request, 'jogo.html', {'usuario': request.user})
