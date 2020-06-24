import * as Yup from 'yup';
import User from '../models/User';
import Queue from '../../lib/Queue';
import NewUserMail from '../jobs/NewUserMail';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const user = await User.create(req.body);

    await Queue.add(NewUserMail.key, {
      user,
    });

    return res.json(user);
  }
}

export default new UserController();
