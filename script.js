
function extract() {    //Extração Conteúdo Json
    fetch('produtos.json')
        .then(response => response.json())
        .then(produtos => {
            const container = document.querySelector("#product");
            container.innerHTML = "";

            produtos.forEach(produto => { //Iteração para percorrer os array
                const img = document.createElement("img");
                img.src = produto.imagem;
                img.alt = produto.nome;

                const card = document.createElement("div");
                card.classList.add("card");

                card.appendChild(img);

                const nome = document.createElement("h3");
                nome.textContent = produto.nome;
                card.appendChild(nome);

                const priceContainer = document.createElement("div");
                priceContainer.classList.add("price");

                if (produto.precoPromo) { // Filtro Promo vs Sem Promo
                    const originalPreco = document.createElement("span");
                    originalPreco.classList.add("original-preco");
                    originalPreco.textContent = produto.preco;
                    priceContainer.appendChild(originalPreco);

                    const descontoPorcent = document.createElement("span");
                    descontoPorcent.classList.add("desconto-porcentagem");
                    descontoPorcent.textContent = produto.desconto; 
                    priceContainer.appendChild(descontoPorcent);

                    const promoPreco = document.createElement("span");
                    promoPreco.classList.add("promo-preco");
                    promoPreco.textContent = produto.precoPromo;
                    priceContainer.appendChild(promoPreco);
                } else {
                    priceContainer.classList.add("sem-desconto");
                    const precoRegular = document.createElement("span");
                    precoRegular.classList.add("promo-preco");
                    precoRegular.textContent = produto.preco;
                    priceContainer.appendChild(precoRegular);
                }

                card.appendChild(priceContainer);

                const entrega = document.createElement("h4");
                entrega.textContent = produto.entregaGratis ? "Entrega Grátis" : "";
                card.appendChild(entrega);

                const desc = document.createElement("p");
                desc.textContent = produto.descricao;
                card.appendChild(desc);

                container.appendChild(card);
            });
        })
}




function applyFilters() {
    // Captura Valores Características
    const selectedMarcas = Array.from(document.querySelectorAll('.filter-marca:checked')).map(cb => cb.value);
    const selectedCategorias = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
    const selectedCondi = Array.from(document.querySelectorAll('.filter-cond:checked')).map(cb => cb.value);
    const selectedFreteGratis = document.querySelector('.filter-frete:checked') ? true : false;
    const selectedPromocao = document.querySelector('.filter-promo:checked') ? true : false;
    const searchQuery = document.getElementById('searchInput').value.toLowerCase(); 

    // Captura Valores Faixa de Preço
    const minPreco = parseFloat(document.getElementById('minPreco').value) || 0;
    const maxPreco = parseFloat(document.getElementById('maxPreco').value) || Infinity;

    fetch('produtos.json')
        .then(response => response.json())
        .then(produtos => {
            const filteredProdutos = produtos.filter(produto => {
                // Conversão dos Números
                const produtoPreco = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.'));
                const produtoPrecoPromo = produto.precoPromo ? parseFloat(produto.precoPromo.replace('R$', '').replace('.', '').replace(',', '.')) : null;

                // Filtragem das características
                const categoriaMatch = selectedCategorias.length === 0 || selectedCategorias.includes(produto.categoria);
                const marcaMatch = selectedMarcas.length === 0 || selectedMarcas.includes(produto.marca);
                const condiMatch = selectedCondi.length === 0 || selectedCondi.includes(produto.condicao);
                const freteMatch = !selectedFreteGratis || produto.entregaGratis;
                const promoMatch = !selectedPromocao || produto.promo;
                const searchMatch = produto.nome.toLowerCase().includes(searchQuery);

                // Filtragem do Preço
                const precoParaFiltrar = produtoPrecoPromo !== null ? produtoPrecoPromo : produtoPreco;
                const precoMatch = precoParaFiltrar >= minPreco && precoParaFiltrar <= maxPreco;

                return categoriaMatch && marcaMatch && condiMatch && freteMatch && promoMatch && precoMatch && searchMatch;
            });

            // Exibição dos Produtos Filtrados
            const container = document.querySelector("#product");
            container.innerHTML = "";

            filteredProdutos.forEach(produto => {//Iteração para percorrer os array
                const img = document.createElement("img");
                img.src = produto.imagem;
                img.alt = produto.nome;

                const card = document.createElement("div");
                card.classList.add("card");

                card.appendChild(img);

                const nome = document.createElement("h3");
                nome.textContent = produto.nome;
                card.appendChild(nome);

                const priceContainer = document.createElement("div");
                priceContainer.classList.add("price");

                if (produto.precoPromo) {// Filtro Promo vs Sem Promo
                    const originalPreco = document.createElement("span");
                    originalPreco.classList.add("original-preco");
                    originalPreco.textContent = produto.preco;
                    priceContainer.appendChild(originalPreco);

                    const descontoPorcent = document.createElement("span");
                    descontoPorcent.classList.add("desconto-porcentagem");
                    descontoPorcent.textContent = produto.desconto;
                    priceContainer.appendChild(descontoPorcent);

                    const promoPreco = document.createElement("span");
                    promoPreco.classList.add("promo-preco");
                    promoPreco.textContent = produto.precoPromo;
                    priceContainer.appendChild(promoPreco);
                } else {
                    priceContainer.classList.add("sem-desconto");
                    const precoRegular = document.createElement("span");
                    precoRegular.classList.add("promo-preco");
                    precoRegular.textContent = produto.preco;
                    priceContainer.appendChild(precoRegular);
                }

                card.appendChild(priceContainer);

                const entrega = document.createElement("h4");
                entrega.textContent = produto.entregaGratis ? "Entrega Grátis" : "";
                card.appendChild(entrega);

                const desc = document.createElement("p");
                desc.textContent = produto.descricao;
                card.appendChild(desc);

                container.appendChild(card);
            });
        })

}






    
        document.getElementById('applyFiltro').addEventListener('click', applyFilters);
        extract();