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
    photo: 'src/modules/ContactsPage/devInfo/Dmytro_Krylov.png',
    email: 'alex@example.com',
    linkedin: 'https://www.linkedin.com/in/dmytro-krylov/',
    github: 'https://github.com/Dimononon',
    about: `Team Lead & Frontend Developer (React & TS)
Bridging the gap between robust backend logic and secure, high-performance user interfaces.

Technical Foundation:
Expertise in React and TypeScript, backed by a solid foundation in C# ASP.NET and Cybersecurity. I specialize in building "secure by design" applications with a deep understanding of protocols and system architecture.

Leadership & Strategy:
From developing cryptographic platforms like WebScrambler to managing server environments (Ubuntu, Kali), I bring a disciplined, full-cycle approach to development. I focus on code integrity, cross-team collaboration, and building scalable web ecosystems.`,
  },

  {
    id: 3,
    name: 'Illia Tryndiuk',
    role: 'Frontend Developer (Project Manager)',
    photo: 'src/modules/ContactsPage/devInfo/Illia_Tryndiuk.jpeg', // треба змінити на реальні фото
    email: 'tryndiuk.illia@gmail.com',
    linkedin: 'https://www.linkedin.com/in/illia-t-81543a382/',
    github: 'https://github.com/illia-001',
    about: `Full Stack Developer focused on building modern web applications.

      I possess practical experience with React, TypeScript, and CSS/Flexbox. I specialize in turning complex designs into pixel-perfect interfaces.

      Open to networking and new opportunities.`,
  },
  {
    id: 2,
    name: 'Serhii Kusyi',
    role: 'Frontend Developer',
    photo: 'https://via.placeholder.com/200', // треба змінити на реальні фото
    email: 'alex@example.com',
    linkedin: 'https://linkedin.com/in/username',
    github: 'https://github.com/SergiyKusiy',
    about:
      'Щось треба написати про цього хлопця, але я не знаю що саме. Він дуже крутий, це точно. :)',
  },

  {
    id: 3,
    name: 'Anton Lemishko',
    role: 'Full Stack Developer',
    photo: 'src/modules/ContactsPage/devInfo/Anton_Lemishko.jpg',
    email: 'anlemishko@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anton-lemishko-39281a44/',
    github: 'https://github.com/NastyBaster',
    about: `Full Stack Developer (React & TS Specialist)
Building modern web applications with a focus on performance and scalability.

Technical Stack:
Expertise in JavaScript, TypeScript, and React. I specialize in creating robust web architectures and seamless user experiences.

Beyond the Code:
In my spare time, I build automated solutions using grammY (Telegram bots) and experiment with hardware hacking via Arduino.`,
  },

  {
    id: 5,
    name: 'Bohdan Moroz',
    role: 'Frontend Developer',
    photo: 'src/modules/ContactsPage/devInfo/Bohdan_Moroz.png',
    email: 'fs.bohdan.moroz@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bohdan-m-71a522385/',
    github: 'https://github.com/bohdan8098',
    about: `I am a Frontend Developer with practical experience in building responsive and user-friendly web applications. 
      
      My core tech stack includes React, JavaScript, and TypeScript. I have a strong understanding of component-based architecture and state management, which allows me to create efficient and maintainable code. 
      
      I am passionate about learning new technologies and continuously improving my skills to deliver high-quality solutions.`,
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
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  <ICON_MAP.LINKEDIN size={20} />
                  <Typography variant="body">LinkedIn</Typography>
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  <ICON_MAP.GIT size={20} />
                  <Typography variant="body">GitHub</Typography>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
