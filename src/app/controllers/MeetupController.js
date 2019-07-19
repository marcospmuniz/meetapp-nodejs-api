import * as Yup from 'yup';
import {
  isBefore, parseISO,
} from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .max(75),
      file_id: Yup.number()
        .required(),
      description: Yup.string()
        .required(),
      location: Yup.string()
        .required(),
      date: Yup.date()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails! All fields are required!' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
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
}

export default new MeetupController();
