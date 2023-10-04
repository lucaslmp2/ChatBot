from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask import Flask, send_from_directory
from flask import Flask, render_template
from chatterbot.trainers import ListTrainer
import re

# Crie uma instância do aplicativo Flask
app = Flask(__name__)
CORS(app)

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.json.get("user_message")

    # Remova pontuações e outros caracteres não alfabéticos da entrada do usuário
    user_message = re.sub(r'[^\w\s]', '', user_message)

    # Converta a entrada do usuário para letras minúsculas
    user_message = user_message.lower()

    # Dicionário de palavras-chave e respostas
    responses = {
        "oi": "Oi, eu sou o Guru do Campeonato Brasileiro. Digite de acordo o menu inicial o que quer saber: História do Campeonato, Jogadores, Campeões ou Curiosidades?",
        "ola":"Oi, eu sou o Guru do Campeonato Brasileiro. Digite de acordo o menu inicial o que quer saber: História do Campeonato, Jogadores, Campeões ou Curiosidades?",
        "tudo, bem?":"Oi, tudo sim e você? Eu sou o Guru do Campeonato Brasileiro. Digite de acordo com o menu inicial o que quer saber: História do Campeonato, Jogadores, Campeões ou Curiosidades?",
        
        "historia": "História do Campeonato.",
        "jogadores": "Fale mais sobre os jogadores.",
        "campeoes": "Os campeões do Campeonato Brasileiro.",
        "curiosidades": "Curiosidades sobre o Brasileirão."
    }

    # Verifique se a palavra-chave está no dicionário e obtenha a resposta correspondente
    bot_response = responses.get(user_message, "Desculpe! Não consegui compreender sua mensagem, pode repetir?")

    return jsonify({"bot_response": bot_response})

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == "__main__":
    app.run(debug=True)
