import { createSlice } from '@reduxjs/toolkit';

// Define translations
const translations = {
  // English translations 
  en: {
    header: 'We manufacture and install stainless steel products',
    footer: {
      name: 'Kessler Waldemar',
      address: 'Marktplatz 2 36323 Grebenau',
      country: 'Germany',
      mobile: 'Mobile',
      telephone: 'Telephone',
      email: 'E-mail'
    },
    services: {
      title: 'Our Offer',
      items: [
        'Railings for balconies',
        'Railings for stairs',
        'French balconies',
        'Fences',
        'Gates',
        'Stair constructions',
        'Small roofs and coverings',
        'Window grilles',
        'Decorative elements',
        'And many other products, made to customer order'
      ]
    },
    languageSwitch: 'DE',
    navigation: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact'
    },
    gallery: {
      title: 'Our Work',
      subtitle: 'Explore our portfolio of custom stainless steel projects and installations.',
      all: 'All',
      railings: 'Railings',
      balconies: 'Balconies',
      fences: 'Fences',
      gates: 'Gates',
      grilles: 'Grilles'
    },
    about: {
      title: 'About Us',
      description: 'With years of experience in manufacturing and installing high-quality stainless steel products, we pride ourselves on craftsmanship, attention to detail, and customer satisfaction. Our dedicated team ensures that each project meets the highest standards of quality and design.'
    },
    contact: {
      title: 'Get in Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
    testimonials: {
      title: 'What Our Clients Say'
    }
  },

  // German translations
  de: {
    header: 'Wir fertigen und montieren Produkte aus Edelstahl',
    footer: {
      name: 'Kessler Waldemar',
      address: 'Marktplatz 2 36323 Grebenau',
      country: 'Deutschland',
      mobile: 'Mobil',
      telephone: 'Telefon',
      email: 'E-Mail'
    },
    services: {
      title: 'Unser Angebot',
      items: [
        'Geländer für Balkone',
        'Geländer für Treppen',
        'Französische Balkone',
        'Zäune',
        'Tore',
        'Treppenkonstruktionen',
        'Kleine Dächer und Überdachungen',
        'Fenstergitter',
        'Dekorative Elemente',
        'Und viele andere Produkte, nach Kundenauftrag gefertigt'
      ]
    },
    languageSwitch: 'EN',
    navigation: {
      home: 'Startseite',
      about: 'Über Uns',
      services: 'Leistungen',
      gallery: 'Galerie',
      contact: 'Kontakt'
    },
    gallery: {
      title: 'Unsere Arbeiten',
      subtitle: 'Entdecken Sie unser Portfolio an kundenspezifischen Edelstahlprojekten und -installationen.',
      all: 'Alle',
      railings: 'Geländer',
      balconies: 'Balkone',
      fences: 'Zäune',
      gates: 'Tore',
      grilles: 'Gitter'
    },
    about: {
      title: 'Über Uns',
      description: 'Mit jahrelanger Erfahrung in der Herstellung und Montage hochwertiger Edelstahlprodukte sind wir stolz auf handwerkliches Können, Liebe zum Detail und Kundenzufriedenheit. Unser engagiertes Team sorgt dafür, dass jedes Projekt den höchsten Qualitäts- und Designstandards entspricht.'
    },
    contact: {
      title: 'Nehmen Sie Kontakt auf',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden'
    },
    testimonials: {
      title: 'Was unsere Kunden sagen'
    }
  }
};

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
    translations: translations.en
  },
  reducers: {
    toggleLanguage: (state) => {
      const newLanguage = state.currentLanguage === 'en' ? 'de' : 'en';
      state.currentLanguage = newLanguage;
      state.translations = translations[newLanguage];
    },
    setLanguage: (state, action) => {
      const language = action.payload;
      if (translations[language]) {
        state.currentLanguage = language;
        state.translations = translations[language];
      }
    }
  }
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;

// Selectors
export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectTranslations = (state) => state.language.translations;

export default languageSlice.reducer;