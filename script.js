function cadastrarProduto() {
    var produto = prompt("Digite o nome do produto:");
    var quantidade = prompt("Digite a quantidade:");
  
    var data = {
      produto: produto,
      quantidade: quantidade
    };
  
    fetch("http://endereco-do-seu-esp32/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      if (result === "success") {
        alert("Cadastro realizado com sucesso!");
      } else if (result === "existing_card") {
        alert("Cartão já cadastrado!");
      } else {
        alert("Não foi possível realizar o cadastro.");
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  function listarProdutos() {
    fetch("http://endereco-do-seu-esp32/listar-produtos")
    .then(response => response.text())
    .then(data => {
      document.getElementById("produtos").innerText = data;
      document.getElementById("popup").style.display = "block";
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  function removerProduto() {
    fetch("http://endereco-do-seu-esp32/remover-produto", {
      method: "DELETE"
    })
    .then(response => response.text())
    .then(result => {
      if (result === "success") {
        alert("Produto removido com sucesso!");
      } else if (result === "unknown_card") {
        alert("Cartão não cadastrado!");
      } else {
        alert("Não foi possível remover o produto.");
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  
