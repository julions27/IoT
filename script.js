let data = {};

function cadastrarProduto() {
  let produto = prompt("Digite o nome do produto:");
  let quantidade = prompt("Digite a quantidade:");

  if (produto && quantidade) {
    data = {
      produto: produto,
      quantidade: quantidade
    };

    setTimeout(executarDepoisDe3Segundos, 3000);
  } else {
    alert("Nome do produto e quantidade são obrigatórios!");
  }
}

function executarDepoisDe3Segundos() {
  alert("Produto cadastrado com sucesso");
}

function listarProdutos() {
  let mensagem = "";
  for (let prop in data) {
    mensagem += prop + ": " + data[prop] + "\n";
  }
  alert(mensagem);
}

function removerProduto() {
  let produto = prompt("Digite o nome do produto a ser removido:");

  if (data.produto === produto) {
    delete data.produto;
    delete data.quantidade;
    alert("Produto removido com sucesso");
  } else {
    alert("Produto não encontrado");
  }
}
