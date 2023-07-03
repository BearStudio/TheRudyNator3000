import { z } from 'zod';

export type Subject = z.infer<ReturnType<typeof zSubject>>;
export const zSubject = () =>
  z.object({
    label: z.string().nonempty(),
    description: z.string().nonempty(),
    link: z.string().url(),
    keyword: z.string().nonempty(),
  });

export const subjects: readonly Subject[] = [
  {
    label: 'Start UI',
    keyword: 'start ui',
    description: `Start UI [web] est un starter de démarrage front créé et maintenu par l'équipe BearStudio et d'autres contributeurs. Il représente la stack à jour que l'équipe Bearstudio utilise lors de la création d'applications Web pour ses clients.
Start ui [web] fournit de manière non exaustive les fonctionnalitées suivantes:
- Mise en page/navigation réactive.
- Écrans de connexion/inscription/récupération de mot de passe.
- Écrans Profil du compte / Changer le mot de passe.
- Écrans d'administration de gestion des utilisateurs (CRUD).
- Multi-langues (i18n) (anglais et français intégrés).
- Thème d'interface utilisateur Chakra personnalisé avec typages générés.
- Grande liste de composants d'interface utilisateur avec leur documentation Storybook.
- Composants de champs de formulaires pour Formiz.
- Prise en charge du mode sombre avec bascule Storybook.
- Version de l'application et nom de l'environnement dans l'interface utilisateur.
- Documentation du schéma d'API via Swagger UI React.
- API Mocking avec un mappage JHipster utilisant l'API Next.js.
- Amélioration de la Developer eXperience avec ESLint, Prettier et Husky
- Déploiement facilité grâce à Next.js
`,
    link: 'https://rebrand.ly/start-ui-web',
  },
  {
    label: 'Codeur en seine',
    description: `Codeur en seine est une journée par la communauté pour la communauté;
c'est une journée de conférences gratuite qui se déroule à Rouen, pour découvrir, apprendre et partager autour du monde du développement.
Codeurs en Seine vous propose une journée complète le jeudi 26 octobre sur des conférences aux thèmes divers et variés : Web, Devops, UX, Securité, Langages etc.
Codeurs en Seine est à la recherche de sponsors pour proposer un événement d'une qualité toujours meilleure.
Les partenaires des éditions précédentes ont confirmé la visibilité offerte par ce sponsoring, surtout dans le cadre d'une politique de recrutement.`,
    link: 'https://rebrand.ly/codeurs-en-seine',
    keyword: 'Codeur en Seine',
  },
  {
    label: 'BearStudio',
    keyword: 'bearstudio',
    description: `Le BearStudio est un studio de développement numérique.
BearStudio accompagne les porteurs de projet dans leur développement numérique, avec une équipe et/ou des CTO à louer.
BearStudio est composé de développeurs et d’UX designers qui interviennent auprès des porteurs de projet pour apporter la connaissance technique manquante. Startups ou entreprises innovantes, l'équipe du Bearstudio est capable de se greffer à votre projet à n’importe quel moment pour vous permettre d’avancer et de transformer votre projet en production à succès.
De l’idée jusqu’au déploiement, l'équipe du bearstudio peut réaliser les maquettes navigables (définissant un périmètre technique) puis agir sur le développement de la solution. Elle peux également prendre part à un projet en cours lorsqu’un développement précédent n’a pu aboutir (par exemple 😉) ou pour apporter de nouvelles fonctionnalités.
`,
    link: 'https://rebrand.ly/bearstudio',
  },
] as const;
