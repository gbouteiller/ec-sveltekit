export const i18n = {
  components: {
    contactForm: {
      failure: 'Une erreur est survenue. Veuillez réessayer ultérieurement.',
      fields: {
        email: 'Courriel :',
        forename: 'Prénom :',
        message: 'Message :',
        surname: 'Nom :',
      },
      submit: 'Envoyer',
      submitting: 'Envoi en cours...',
      success: 'Message envoyé avec succès!',
    },
    toOrderForm: {
      failure: 'Une erreur est survenue. Veuillez réessayer ultérieurement.',
      fields: {
        animal: {
          placeholder: 'Animal (requis)',
        },
        colors: {
          hint: 'vous pouvez en sélectionner de 1 à 3.',
          label: 'Vos couleurs préférées :',
        },
        email: {
          label: 'Courriel :',
          placeholder: 'Votre courriel (requis)',
        },
        forename: {
          label: 'Prénom :',
          placeholder: 'Votre prénom (requis)',
        },
        hasAnimal: {
          label: `Y a-t-il un animal qui résonne en vous depuis votre enfance ? Y a-t-il un animal pour lequel vous vous sentez attiré sans aucune
		explication logique ?`,
          options: {
            no: 'non',
            yes: 'oui',
          },
        },
        hobbies: {
          label: 'Dites-moi ce que vous aimez dans votre vie :',
          placeholder: 'Ce que vous aimez (optionnel)',
        },
        layout: {
          label: 'Format :',
          options: {
            landscape: 'Paysage',
            portrait: 'Portrait',
          },
        },
        note: {
          label: 'Autre chose qui vous semble important :',
          placeholder: 'Vous souhaitez ajouter (optionnel)',
        },
        personality: {
          label: 'Parlez moi un peu de vous, votre caractère :',
          placeholder: 'À propos de vous (optionnel)',
        },
        phone: {
          label: 'Téléphone :',
          placeholder: 'Votre n° de téléphone (optionnel)',
        },
        region: {
          label: 'Région :',
          options: {
            mainland: 'Métropole',
            reunion: 'Réunion',
          },
        },
        size: {
          label: 'Dimensions :',
          options: {
            fA5: 'A5 (35.00€)',
            f2432: '24x32 (86.00€)', 
          }
        },
        surname: {
          label: 'Nom :',
          placeholder: 'Votre nom (requis)',
        },
        works: {
          hint: 'la sélection est obligatoire.',
          label: 'Les deux tableaux que vous préférez dans ma collection :',
        },
      },
      step1: 'Ce que vous souhaitez',
      submit: 'Envoyer',
      submitting: 'Envoi en cours...',
      success: 'Message envoyé avec succès!',
    },
  },
  materials: {
    canvas: 'toile',
    paper: 'papier',
  },
  medias: {
    acrylic: 'acrylique',
    ink: 'encre',
    mixedMedia: 'techniques mixtes',
    oil: 'huile',
    watercolor: 'aquarelle',
  },
  validators: {
    email: `Le courriel n'est pas valide.`,
    phone: `Le n° de téléphone doit contenir 10 chiffres.`,
    required: 'Ce champ est requis.',
    works: `Vous devez sélectionner deux tableaux.`,
  },
} as const;

export type I18n = typeof i18n;
