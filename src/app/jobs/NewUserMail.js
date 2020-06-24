import Mail from '../../lib/Mail';

class NewUserMail {
  get key() {
    return 'CancellarionMail';
  }

  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Seja Bem-Vindo',
      template: 'new-user',
      context: {
        user: user.name,
      },
    });
  }
}

export default new NewUserMail();
