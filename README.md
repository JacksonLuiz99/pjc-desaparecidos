# 🚨 Projeto: Consulta de Pessoas Desaparecidas - PJC-MT

Este repositório apresenta uma aplicação desenvolvida para o processo seletivo da **SEPLAG/UFMT - Edital nº 003/2024**, voltada ao cargo de **Analista de TI - Perfil Júnior**.
A solução permite a consulta pública de pessoas desaparecidas com base nos dados fornecidos pela **Polícia Judiciária Civil do Estado de Mato Grosso (PJC-MT)**.

---

## 👤 Sobre o Desenvolvedor

- **Nome:** JACKSON LUIZ DOMINGOS SILVA  
- **Inscrição:** 8593  
- **E-mail:** [jacksoncuiaba99@gmail.com](mailto:jacksoncuiaba99@gmail.com)  
- **Telefone fixo:** (65) 3613-5637  
- **Celular:** (65) 99916-1859  
- **Data da Inscrição:** 31/03/2025 às 17:41:12  
- **Pessoa com deficiência (PCD):** Não

---

## 🛠️ Tecnologias Utilizadas

- ⚙️ **Angular 16**
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS** + **Angular Material**
- 🧩 **RxJS** e **HTML5/CSS3**
- 🔗 **API Pública da PJC-MT**: [Documentação Swagger](https://abitus-api.geia.vip/swagger-ui/index.html)
- 🐳 **Docker** (execução opcional via container)
- 🧪 **Node.js** e **NPM** (para ambiente de desenvolvimento local)

---

## 🚀 Funcionalidades Principais

- ✅ Listagem paginada de pessoas desaparecidas
- 🔍 Filtros por nome, idade, sexo e status (desaparecido/localizado)
- 📄 Página de **detalhes completos** de cada pessoa
- 🖼️ Exibição de foto, status com cor, data e local do desaparecimento
- 📝 Formulário com máscara e envio de informações à PJC via API oficial
- 📱 Interface **100% responsiva** com acessibilidade e usabilidade
- 💅 Design limpo e moderno com Tailwind e Angular Material

---

## 🧑‍💻 Executando Localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- Angular CLI instalado globalmente:
```bash
npm install -g @angular/cli
```

### 2. Clone o projeto e execute:

```bash
git clone https://github.com/seu-usuario/pjc-desaparecidos.git
cd pjc-desaparecidos
npm install
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

## 🐳 Execução via Docker

> Recurso opcional para rodar a aplicação em container isolado.

### 📁 `Dockerfile`

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
```

### 🔨 Buildando a Imagem

- **Linux:**
```bash
sudo docker build -t pjc-desaparecidos .
```
- **Windows:**
```bash
docker build -t pjc-desaparecidos .
```

### ▶️ Executando o Container

- **Linux:**
```bash
sudo docker run -p 4200:4200 pjc-desaparecidos
```
- **Windows:**
```bash
docker run -p 4200:4200 pjc-desaparecidos
```

Abra no navegador: [http://localhost:4200](http://localhost:4200)

---

## 📌 Observações Finais

Este projeto foi desenvolvido com foco em **boas práticas de código, performance e clareza visual**, atendendo às exigências do edital. Todo o consumo da API foi feito com segurança, tratamento de erros e normalização de dados para garantir uma excelente experiência ao usuário final.

---

> 💬 Em caso de dúvidas ou sugestões, sinta-se à vontade para entrar em contato. Obrigado por visitar este repositório!
