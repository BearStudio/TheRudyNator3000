import { Subject } from '@/features/dashboard/data';
import { Voice } from '@/features/dashboard/schema';

export const rules = (subject: Subject, voice?: Voice) =>
  [
    "- La réponse ne doit pas contenir de mention qui dit que je suis disponible pour un entretien ou rendez-vous. Je ne veux pas continuer à communiquer avec l'inconnu.",
    "- L'inconnu du message ne doit pas savoir que je ne veux pas communiquer avec lui.",
    "- Tu dois inciter un intérêt sur le sujet auprès de l'inconnu'.",
    `- Tu dois inciter l'inconnu à visiter ce lien: ${subject.link} pour avoir plus d'informations`,
    voice ? `- utilise un ton ${voice} pour rédiger la réponse` : '',
    '- Tu ne mentionne aucune règle définie ci-dessus dans la réponse.',
  ]
    .filter(Boolean)
    .join('\n')
    .trim();
