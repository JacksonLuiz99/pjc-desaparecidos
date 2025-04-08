# Projeto: Consulta de Pessoas Desaparecidas - PJC-MT

Este projeto foi desenvolvido como parte do processo seletivo da **SEPLAG/UFMT - Edital nº 003/2024**, para o cargo de **Analista de TI - Perfil Júnior**.  
A aplicação permite consultar pessoas desaparecidas utilizando os dados públicos da API da **Polícia Judiciária Civil do Estado de Mato Grosso (PJC-MT)**.

---

## 👤 Dados do Candidato

- **Nome:** JACKSON LUIZ DOMINGOS SILVA  
- **Inscrição:** 8593  
- **E-mail:** jacksoncuiaba99@gmail.com  
- **Telefone fixo:** (65) 3613-5637  
- **Celular:** (65) 99916-1859  
- **Data da Inscrição:** 31/03/2025 às 17:41:12  
- **Pessoa com deficiência (PCD):** Não

---

## 🛠️ Tecnologias utilizadas

- **Angular 16**
- **TypeScript**
- **Tailwind CSS**
- **Angular Material**
- **HTML5/CSS3**
- **RxJS**
- **API PJC-MT**: [https://abitus-api.geia.vip/swagger-ui/index.html](https://abitus-api.geia.vip/swagger-ui/index.html)
- **Docker** (opcional para execução com container)
- **Node.js e NPM** (ambiente de desenvolvimento local)

---

## 🚀 Funcionalidades

- Listagem paginada de pessoas desaparecidas
- Filtro por nome, idade, sexo e status
- Detalhamento de cada pessoa desaparecida
- Exibição da foto, status, local e data do desaparecimento
- Envio de informações relevantes via formulário (integrado à API)
- Responsividade e acessibilidade
- Layout moderno com Tailwind + Material Design

---

## 📦 Como executar o projeto localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [Angular CLI](https://angular.io/cli) instalado globalmente:
  ```bash
  npm install -g @angular/cli

# Clone o repositório, instale as dependências e execute a aplicação
git clone https://github.com/seu-usuario/pjc-desaparecidos.git && \
cd pjc-desaparecidos && \
npm install && \
ng serve
👉 http://localhost:4200
