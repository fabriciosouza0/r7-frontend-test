## 📌 Link para a aplicação

🔗 [front-end-test-r7](https://r7-frontend-test.vercel.app/)

---

## 🚀 Tecnologias utilizadas

Para o desenvolvimento do projeto, além dos recursos providos ao clonar o repositório do teste, utilizei:

- **HTML5**
- **CSS3**
- **JavaScript (ES6) Puro**

### 🛠 Tecnologias DevOps utilizadas

- **Docker** para construir containers (Node.js e Nginx);
- **Docker Compose** para orquestração dos containers;
- Configuração do **Nginx** para redirecionamento da porta `80` para a porta `7007`, utilizando **proxy reverso** para acessar o back-end da aplicação, que serve os arquivos estáticos contidos no diretório `public`.

---

## ✅ Boas práticas utilizadas

- Utilização de **ES6** para explorar os recursos modernos do JavaScript;
- Aplicação de **Programação Orientada a Objetos (OO)** para tornar o código mais compreensível e de fácil manutenção;
- Separação da lógica de processamento na classe `Ranking.js` e da renderização da interface na classe `RenderRanking.js`;
- Implementação de princípios **SOLID**, como o **Princípio da Responsabilidade Única**, facilitando a manutenção e a implementação de **testes unitários**.

---

## 🖥 Como rodar a aplicação (sem Docker, localmente)

> **Obs.:** Você precisa ter o **Node.js** instalado na sua máquina.

1. Faça o clone do projeto:
   ```sh
   git clone https://github.com/fabriciosouza0/r7-frontend-test.git
   ```

2. Instale as dependências do projeto:
   ```sh
   npm install
   ```

3. Rode a aplicação:
   ```sh
   npm start
   ```

📌 A aplicação ficará acessível em: [http://localhost:7007](http://localhost:7007)

---

## 🐳 Como rodar a aplicação com Docker

> **Obs.:** Se o seu sistema operacional for **Windows**, será necessário instalar o **WSL** e o **Docker Desktop**.

1. Faça o clone do projeto:
   ```sh
   git clone https://github.com/fabriciosouza0/r7-frontend-test.git
   ```

2. Suba os containers:
   ```sh
   docker-compose up -d --build
   ```

📌 A aplicação ficará disponível em: [http://localhost](http://localhost)

---

## 🔧 Decisão Arquitetural

A aplicação foi projetada utilizando **Node.js e Nginx** para servir arquivos estáticos, apesar de o **Nginx sozinho** ser suficiente para essa tarefa. Essa escolha foi intencional, visando demonstrar habilidades em **Docker, configuração de servidores e proxy reverso**. Além disso, essa estrutura facilita futuras expansões da aplicação, permitindo a implementação de um **back-end dinâmico** sem necessidade de grandes mudanças na arquitetura existente.

A decisão de manter o **Node.js** foi baseada no fato de que o repositório original já utilizava essa tecnologia para servir arquivos estáticos. Assim, o projeto continua alinhado com a estrutura fornecida, garantindo flexibilidade para futuras implementações.

---

## 📜 Requisitos entregues

✔️ Ordenação dos participantes
✔️ Cálculo dos votos
✔️ Layout responsivo
✔️ Documentação
✔️ Performance
✔️ Organização
✔️ ES6
✔️ Boas práticas
✔️ Arquitetura CSS (**ITCSS**)

### 🎁 Entregas adicionais

- Conteinerização com **Docker**;
- Uso do **Docker Compose** para orquestração dos containers;
- Configuração do servidor **Nginx**;
- Implementação de **proxy reverso**.

---

## ✒️ Autor

👤 [**Fabricio Souza**](https://linkedin.com/in/fabriciosouzaslv190)

📌 **LinkedIn:** [@Fabricio](https://linkedin.com/in/fabriciosouzaslv190)
