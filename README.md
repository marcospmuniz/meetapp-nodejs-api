# meetapp-nodejs-api

O primeiro passo após clonar o repositório será instalar as dependências executando o comando abaixo no terminal:

<code>yarn</code>

# Configurando o Banco de Dados

Esta aplicação utiliza um banco de dados Postgres.

Se você não tiver o Postgres instalado em seu computador, você poderá utilizar
um docker container com Postgres.

Se optar por utilizar um docker container e você estiver em um sistema Ubuntu,
você deve então executar o comando abaixo para criar o container em seu
computador:

<code>docker run --name meetup -e POSTGRES_PASSWORD=somethingrealydificult -p 5432:5432 -d postgres</code>

Depois de criado o container, ou caso você já tenha o Postgres instalado em sua
máquina, você deverá criar o banco de dados com o nome __meetapp__. Você pode
utilizar o __postbird__ para fazer isso, se quiser.

O próximo passo será executar as migrations.
