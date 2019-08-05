import * as Yup from 'yup';
import { isBefore } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .max(75),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails! All fields are required!' });
    }

    if (isBefore(req.body.date, new Date())) {
      // a data já passou
      return res.status(400).json({ error: 'Meetup date invalid!' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ error: 'You are not the promoter of this meetup!' });
    }

    if (meetup.date < new Date()) {
      return res.status(400).json({ error: "You can't update a realized meetup!" });
    }

    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .max(75),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails! All fields are required!' });
    }

    if (isBefore(req.body.date, new Date())) {
      // a data já passou
      return res.status(400).json({ error: 'Meetup date invalid!' });
    }

    const result = await meetup.update(req.body);

    return res.json(result);
  }
}

export default new MeetupController();
