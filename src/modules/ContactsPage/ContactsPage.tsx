import { Typography } from '@/components/ui/Typography/Typography';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { BackButton } from '@/components/common/BackButton/BackButton';
import styles from './ContactsPage.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dmytro Krylov',
    role: 'Frontend Developer (Lead)',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    phone: '+380 99 000 00 00',
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/username',
    about:
      'Щось треба написати про цього хлопця, але я не знаю що саме. Він дуже крутий, це точно. :)',
  },

  {
    id: 1,
    name: 'Illia Tryndiuk',
    role: 'Frontend Developer (Project Manager)',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    phone: '+380 99 000 00 00',
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/username',
    about:
      'Щось треба написати про цього хлопця, але я не знаю що саме. Він дуже крутий, це точно. :)',
  },

  {
    id: 1,
    name: 'Serhii Kusyi',
    role: 'Frontend Developer',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    phone: '+380 99 000 00 00',
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/username',
    about:
      'Щось треба написати про цього хлопця, але я не знаю що саме. Він дуже крутий, це точно. :)',
  },

  {
    id: 1,
    name: 'Anton Lemishko',
    role: 'Frontend Developer',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    phone: '+380 99 000 00 00',
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/username',
    about:
      'Щось треба написати про цього хлопця, але я не знаю що саме. Він дуже крутий, це точно. :)',
  },

  {
    id: 1,
    name: 'Bohdan Moroz',
    role: 'Frontend Developer',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    phone: '+380 66 843 23 74',
    email: 'fs.bohdan.moroz@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bohdan-m-71a522385/',
    about:
      'I am a Frontend Developer with practical experience in building responsive and user-friendly web applications. My core tech stack includes React, JavaScript, and TypeScript. I have a strong understanding of component-based architecture and state management, which allows me to create efficient and maintainable code. I am passionate about learning new technologies and continuously improving my skills to deliver high-quality solutions.',
  },
];

export const ContactsPage = () => {
  return (
    <section className={styles.contacts}>
      <Breadcrumbs />
      <BackButton />

      <Typography
        variant="h1"
        className={styles.title}
      >
        Our Team
      </Typography>

      <div className={styles.grid}>
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className={styles.card}
          >
            <div className={styles.photoWrapper}>
              <img
                src={member.photo}
                alt={member.name}
                className={styles.photo}
                loading="lazy"
              />
            </div>

            <div className={styles.info}>
              <Typography variant="h2">{member.name}</Typography>
              <Typography
                variant="body"
                color="secondary"
                className={styles.role}
              >
                {member.role}
              </Typography>

              <Typography
                variant="small"
                className={styles.about}
              >
                {member.about}
              </Typography>

              <div className={styles.links}>
                <a
                  href={`mailto:${member.email}`}
                  className={styles.link}
                >
                  <ICON_MAP.MAIL size={20} />
                  <Typography variant="body">{member.email}</Typography>
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className={styles.link}
                >
                  <ICON_MAP.PHONE size={20} />
                  <Typography variant="body">{member.phone}</Typography>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  <ICON_MAP.LINKEDIN size={20} />
                  <Typography variant="body">LinkedIn</Typography>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
