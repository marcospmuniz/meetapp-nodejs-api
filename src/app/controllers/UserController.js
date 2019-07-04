import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async list(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .max(75),
      email: Yup.string()
        .email()
        .required()
        .max(75),
      password: Yup.string()
        .required()
        .min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      res.status(400).json({ error: 'Email already used!' });
    }

    const { uuid, name, email } = await User.create(req.body);

    return res.json({
      uuid,
      name,
      email,
    });
  }
}

export default new UserController();
