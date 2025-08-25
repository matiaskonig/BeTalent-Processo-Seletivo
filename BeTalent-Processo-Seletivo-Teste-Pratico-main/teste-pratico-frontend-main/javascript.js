// Aguarda o DOM ser totalmente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Obtém referências aos elementos do DOM que serão manipulados
    const searchInput = document.getElementById("pesquisar");
    const tableBody = document.getElementById("employee-table-body");
    const noResults = document.getElementById("no-results");
    const employeeTable = document.getElementById("employee-table");

    /**
     * Formata um número de telefone para o padrão brasileiro
     * @param {string|number} phone - Número de telefone a ser formatado
     * @returns {string} Telefone formatado (ex: (11) 98765-4321)
     */
    function formatPhone(phone) {
        const phoneStr = phone.toString().replace(/\D/g, "");
        if (phoneStr.length === 11) {
            return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 7)}-${phoneStr.slice(7)}`;
        } else if (phoneStr.length === 10) {
            return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 6)}-${phoneStr.slice(6)}`;
        }
        return phone;
    }

    /**
     * Converte data do formato ISO para o formato brasileiro
     * @param {string} date
     * @returns {string} 
     */
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /**
     * Cria as linhas da tabela com os dados dos funcionários
     * @param {Array} employees - Array de objetos com dados dos funcionários
     */
    function createTableRows(employees) {
        tableBody.innerHTML = "";
        employees.forEach((employee, index) => {
            // Gera ID único para o elemento collapse
            const rowId = `collapse${index + 1}`;
            const formattedPhone = formatPhone(employee.phone);
            const formattedDate = formatDate(employee.admission_date);

            // Cria a linha principal com os dados do funcionário
            const row = document.createElement("tr");
            row.classList.add("row-toggle");
            row.setAttribute("data-bs-toggle", "collapse");
            row.setAttribute("data-bs-target", `#${rowId}`);
            row.setAttribute("aria-expanded", "false");
            row.setAttribute("aria-controls", rowId);

            // Popula a linha principal com as informações básicas
            row.innerHTML = `
                <td><img class="foto" src="${employee.image}" alt="Foto de ${employee.name}"></td>
                <td><h3>${employee.name}</h3></td>
                <td><h3>${employee.job}</h3></td>
                <td><h3>${formattedDate}</h3></td>
                <td><h3>${formattedPhone}</h3></td>
            `;

            // Cria a linha expansível (collapse) com informações adicionais
            const collapseRow = document.createElement("tr");
            collapseRow.classList.add("collapse");
            collapseRow.id = rowId;
            collapseRow.innerHTML = `
                <td colspan="5" class="collapse-content">
                    <h3>Cargo: ${employee.job}</h3>
                    <h3>Data de Admissão: ${formattedDate}</h3>
                    <h3>Telefone: ${formattedPhone}</h3>
                </td>
            `;

            // Adiciona ambas as linhas à tabela
            tableBody.appendChild(row);
            // Função para gerenciar o collapse responsivo
            function handleResponsiveCollapse() {
                const isMobile = window.innerWidth <= 768; // Define o breakpoint para mobile

                // Remove o collapse anterior se existir
                const existingCollapse = document.getElementById(rowId);
                if (existingCollapse) {
                    existingCollapse.remove();
                }

                // Adiciona o collapse apenas no mobile
                if (isMobile) {
                    tableBody.appendChild(collapseRow);
                }
            }

            // Executa inicialmente
            handleResponsiveCollapse();

            // Adiciona listener para redimensionamento da janela
            window.addEventListener('resize', handleResponsiveCollapse);
        });
    }

    /**
     * Filtra as linhas da tabela com base no texto de pesquisa
     * @param {string} filter - Texto para filtrar os funcionários
     */
    function filterTableRows(filter) {
        const tableRows = tableBody.querySelectorAll("tr:not(.collapse)");
        let hasVisibleRows = false;

        // Percorre todas as linhas principais da tabela
        tableRows.forEach(row => {
            const cells = row.querySelectorAll("td h3");
            const collapseRow = document.querySelector(row.getAttribute("data-bs-target"));
            const textContent = Array.from(cells).map(c => c.textContent.toLowerCase()).join(" ");

            // Mostra/esconde as linhas com base no filtro
            if (textContent.includes(filter)) {
                row.style.display = "";
                if (collapseRow) collapseRow.style.display = "";
                hasVisibleRows = true;
            } else {
                row.style.display = "none";
                if (collapseRow) collapseRow.style.display = "none";
            }
        });

        // Controla a visibilidade da tabela e mensagem de "sem resultados"
        employeeTable.style.display = hasVisibleRows ? "" : "none";
        noResults.style.display = hasVisibleRows ? "none" : "block";
    }

    // Carrega os dados dos funcionários do arquivo JSON
    fetch("db.json")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o arquivo JSON");
            return response.json();
        })
        .then(data => {
            // Inicializa a tabela e configura o evento de pesquisa
            createTableRows(data.employees);
            searchInput.addEventListener("input", () => {
                filterTableRows(searchInput.value.toLowerCase());
            });
        })
        .catch(error => {
            // Tratamento de erro ao carregar os dados
            console.error("Erro:", error);
            noResults.textContent = "Erro ao carregar os dados dos funcionários";
            noResults.style.display = "block";
            employeeTable.style.display = "none";
        });
});