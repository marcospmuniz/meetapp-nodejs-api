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

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().max(75),
      email: Yup.string()
        .email()
        .max(75),
      oldPassword: Yup.string()
        .min(8)
        .required(),
      password: Yup.string().min(8),
      confirmPassword: Yup.string()
        .min(8)
        .when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const emailExists = User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'Email aready in use!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match!' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
