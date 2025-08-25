# Tabela de Funcionários

Um aplicativo web responsivo que exibe uma tabela de funcionários com recursos de pesquisa e visualização detalhada.

## 🚀 Funcionalidades

- Visualização em tabela dos dados dos funcionários
- Pesquisa por nome, cargo e telefone
- Layout responsivo (desktop e mobile)
- Formatação automática de telefone e data
- Visualização detalhada ao clicar nas linhas (no mobile)

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5
- JSON Server (para simulação da API)

## ⚙️ Pré-requisitos

- Node.js
- NPM ou Yarn
- JSON Server (`npm install -g json-server`)

## 🔧 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/matiaskonig/BeTalent-Processo-Seletivo-Teste-Pratico.git
cd teste-pratico-frontend-main
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o JSON Server:
```bash
json-server --watch db.json
```

4. Abra o arquivo `index.html` em seu navegador ou use um servidor local

## 📱 Responsividade

O aplicativo é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Exibe todos os dados em formato de tabela
- **Mobile**: Apresenta um layout compacto com expansão de detalhes

## 🔍 Como Usar

1. A tabela exibe inicialmente todos os funcionários
2. Use a barra de pesquisa para filtrar por:
   - Nome do funcionário
   - Cargo
   - Número de telefone
3. Em dispositivos móveis, clique na linha para ver mais detalhes

## 📁 Estrutura do Projeto

```
├── images/            # Diretório contendo imagens do projeto
├── index.html         # Página principal
├── styles.css         # Estilos da aplicação
├── javascript.js      # Lógica da aplicação
├── db.json            # Dados simulados
└── README.md          # Documentação
```


## 👨‍💻 Desenvolvimento

### Estrutura do Código

- `images/`: Diretório contendo imagens do projeto
- `index.html`: Estrutura da página e importação de recursos
- `styles.css`: Estilização responsiva e personalizada
- `javascript.js`: Manipulação do DOM e lógica de negócios
- `db.json`: Banco de dados simulado com informações dos funcionários

### Boas Práticas

- Código comentado e documentado
- Nomenclatura clara e consistente
- Separação de responsabilidades
- Tratamento de erros
- Design responsivo

## 👥 Autor

Matias König
- GitHub: [@matiaskonig](https://github.com/matiaskonig)
- Email: [matiaskonig@email.com](mailto:matiaskonig@email.com)

## 📌 Observações

- O projeto utiliza apenas tecnologias front-end
- Os dados são simulados através do JSON Server
- O layout é otimizado para diferentes dispositivos
- Código fonte bem documentado e organizado
