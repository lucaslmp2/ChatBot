// Função para adicionar mensagens à tabela
function addMessage(sender, text, isUser = false) {
    const messageTable = document.getElementById('message-table');
    const tableRow = document.createElement('tr');

    const senderCell = document.createElement('td');
    senderCell.textContent = sender + ':';

    const messageCell = document.createElement('td');
    messageCell.textContent = text;

    // Aplicar a classe CSS correta com base na origem da mensagem
    if (isUser) {
        
        // Adicione a classe 'user-message' à célula de mensagem
        messageCell.classList.add('user-message');
        
        // Adicione a classe 'user-message-row' à linha da tabela
        tableRow.classList.add('user-message-row');
    } else {
        
        // Adicione a classe 'bot-message' à célula de mensagem
        messageCell.classList.add('bot-message');
        
        // Adicione a classe 'bot-message-row' à linha da tabela
        tableRow.classList.add('bot-message-row');
    }
    tableRow.appendChild(messageCell);

    messageTable.appendChild(tableRow);

    // Rolar para o final da tabela
    messageTable.scrollTop = messageTable.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Verifique se a tecla pressionada é "Enter"
        const userInput = document.getElementById('user-input');
        const userMessage = userInput.value.trim(); // Remova espaços em branco extras
        if (userMessage !== '') { // Verifique se a mensagem não está vazia
            // Limpe o campo de entrada
            userInput.value = '';
            // Adicione a mensagem do usuário à tabela
            addMessage('Você', userMessage, true);
            // Faça uma solicitação AJAX para obter a resposta do chatbot do servidor
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message: userMessage }),
            })
            .then(response => response.json())
            .then(data => {
                // Adicione a resposta do chatbot à tabela
                addMessage('Guru', data.bot_response);
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
            });
        }
    }
});

// Event listener para o botão de envio
document.getElementById('btn-submit').addEventListener('click', function () {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;

    // Limpe o campo de entrada
    userInput.value = '';

    // Adicione a mensagem do usuário à tabela
    addMessage('Você', userMessage, true);

    // Faça uma solicitação AJAX para obter a resposta do chatbot do servidor
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Adicione a resposta do chatbot à tabela
        addMessage('Guru', data.bot_response);
    })
    .catch(error => {
        console.error('Erro na solicitação:', error);
    });
});
});
