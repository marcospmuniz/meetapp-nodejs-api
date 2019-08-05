import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';

const models = [User, File, Meetup];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // percorre todos os models da aplicação instanciando eles e passando
    // a conexão com o banco de dados como parametro para o init() de cada
    // model registrado na aplicação
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        // só chama a associação se o model tiver o método associate
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
