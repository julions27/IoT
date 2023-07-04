let data = [];

function cadastrarProduto() {
  let produto = prompt("Digite o nome do produto:");
  let quantidade = prompt("Digite a quantidade:");

  if (produto && quantidade) {
    let novoProduto = {
      produto: produto,
      quantidade: parseInt(quantidade) // Converte a quantidade para um número inteiro
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
  data = data.map(item => {
    if (item.produto === produto) {
      if (item.quantidade === 0) {
        produtoEncontrado = true;
        return null; // Remove o produto do array
      } else {
        item.quantidade -= 1; // Remove uma unidade do produto
      }
    }
    return item; // Mantém o produto no array
  });

  data = data.filter(item => item !== null); // Filtra e remove os produtos nulos do array

  if (produtoEncontrado) {
    alert("Produto removido com sucesso");
  } else {
    alert("Produto não encontrado");
  }
}
