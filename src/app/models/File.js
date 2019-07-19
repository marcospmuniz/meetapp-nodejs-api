import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    /*
     * Aqui no método init, nós declaramos os parametros do model
     * que podem ser cadastrados pelo nosso app.
     * O campo VIRTUAL, é um campo que nunca será salvo no banco de dados
     * ele serve apenas para pegar e/ou retornar uma informação para o usuário
     * final.
     */
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default File;
