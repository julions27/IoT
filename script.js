let data = [];

function cadastrarProduto() {
  let produto = prompt("Digite o nome do produto:");
  let quantidade = prompt("Digite a quantidade:");

  if (produto && quantidade) {
    let novoProduto = {
      produto: produto,
      quantidade: quantidade
    };

    data.push(novoProduto);

    setTimeout(executarDepoisDe3Segundos, 3000);
  } else {
    alert("Nome do produto e quantidade são obrigatórios!");
  }
}

function executarDepoisDe3Segundos() {
  alert("Produto cadastrado com sucesso");
}

function listarProdutos() {
  let mensagem = "Lista de Produtos:\n";

  if (data.length === 0) {
    mensagem = "Nenhum produto cadastrado.";
  } else {
    data.forEach((produto, index) => {
      mensagem += `Produto ${index + 1}: ${produto.produto} - Quantidade: ${produto.quantidade}\n`;
    });
  }

  alert(mensagem);
}

function removerProduto() {
  let produto = prompt("Digite o nome do produto a ser removido:");

  let produtoEncontrado = false;
  data = data.filter(item => {
    if (item.produto === produto) {
      produtoEncontrado = true;
      return false; // Remove o produto do array
    }
    return true; // Mantém o produto no array
  });

  if (produtoEncontrado) {
    alert("Produto removido com sucesso");
  } else {
    alert("Produto não encontrado");
  }
}
