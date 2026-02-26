import { Typography } from '@/components/ui/Typography/Typography';
import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';
import { BackButton } from '@/components/common/BackButton/BackButton';
import styles from './ContactsPage.module.scss';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import dmytroPhoto from '@/modules/ContactsPage/devInfo/Dmytro_Krylov.png';
import illiaPhoto from '@/modules/ContactsPage/devInfo/Illia_Tryndiuk.jpeg';
import sergiyPhoto from '@/modules/ContactsPage/devInfo/Sergiy_Kusiy.jpg';
import antonPhoto from '@/modules/ContactsPage/devInfo/Anton_Lemishko.jpg';
import bohdanPhoto from '@/modules/ContactsPage/devInfo/Bohdan_Moroz.png';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dmytro Krylov',
    role: 'Full Stack Developer (Lead)',
    photo: dmytroPhoto,
    email: 'dmytriy.krylov@gmail.com',
    linkedin: 'https://www.linkedin.com/in/dmytro-krylov/',
    github: 'https://github.com/Dimononon',
    about: `Lead Full Stack Developer with a background in Cybersecurity. I am dedicated to building high-performance, "secure by design" web applications that are as safe as they are user-friendly.

My core expertise lies in React and TypeScript, underpinned by a solid foundation in C# ASP.NET and server management. This unique blend allows me to bridge the gap between complex backend logic and dynamic, interactive user interfaces.`,
  },

  {
    id: 2,
    name: 'Illia Tryndiuk',
    role: 'Frontend Developer (Project Manager)',
    photo: illiaPhoto,
    email: 'tryndiuk.illia@gmail.com',
    linkedin: 'https://www.linkedin.com/in/illia-t-81543a382/',
    github: 'https://github.com/illia-001',
    about: `Full Stack Developer focused on building modern web applications.

      I possess practical experience with React, TypeScript, and CSS/Flexbox. I specialize in turning complex designs into pixel-perfect interfaces.

      Open to networking and new opportunities.`,
  },
  {
    id: 3,
    name: 'Serhii Kusyi',
    role: 'Frontend Developer',
    photo: sergiyPhoto,
    email: 'serhiikusyi.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/serhii-kusyi-282783244/',
    github: 'https://github.com/SergiyKusiy',
    about: `I'm Full Stack developer, looking for a dynamic and progressive company, where my skills are utilized in the maximum way possible.

I have knowledge of HTML5, CSS 3, SASS, JS(ES6), React, TypeScript Redux, REST API and I’m also good at communication, time management, and adaptability.`,
  },

  {
    id: 4,
    name: 'Anton Lemishko',
    role: 'Full Stack Developer',
    photo: antonPhoto,
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
    photo: bohdanPhoto,
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
