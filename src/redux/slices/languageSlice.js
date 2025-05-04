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
      description: "We specialize in crafting high-quality metalwork for both residential and commercial needs. Our offer includes a wide range of custom-made products such as railings, fences, gates, stair structures, and more—designed with durability, safety, and style in mind. Whether you're enhancing a home or upgrading a property, we tailor every product to match your exact requirements.",
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
      ],
      benefit1: 'High quality materials',
      benefit2: 'Expert Craftsmanship',
      benefit3: 'Warranty Included',
      benefit4: 'Timely Delivery',
      description1: 'We use only the finest stainless steel to ensure durability and longevity.',
      description2: 'Our skilled artisans bring years of experience to every project.',
      description3: 'All our products come with a comprehensive warranty for your peace of mind.',
      description4: 'We respect deadlines and ensure prompt project completion.'  
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
      description: 'Explore our portfolio of custom stainless steel projects and installations.',
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
      description:'Have a question or want to discuss your project? Get in touch with us today.',
      title1: 'Send Us a Message',
      title2: 'Contact Information',
      address: 'Address',
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
      description: " Wir sind auf die Herstellung hochwertiger Metallarbeiten für private und gewerbliche Zwecke spezialisiert. Unser Angebot umfasst eine breite Palette maßgeschneiderter Produkte wie Geländer, Zäune, Tore, Treppenkonstruktionen und mehr - entworfen mit Blick auf Langlebigkeit, Sicherheit und Stil. Egal, ob Sie ein Zuhause aufwerten oder eine Immobilie modernisieren möchten, wir passen jedes Produkt an Ihre genauen Anforderungen an.",
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
      ],
      benefit1: 'Hochwertige Materialien',
      benefit2: 'Fachmännisches Handwerk',    
      benefit3: 'Garantie inklusive',
      benefit4: 'Pünktliche Lieferung',
      description1: 'Wir verwenden nur die besten Edelstahlmaterialien, um Langlebigkeit und Haltbarkeit zu gewährleisten.',
      description2: 'Unsere erfahrenen Handwerker bringen jahrelange Erfahrung in jedes Projekt ein.',
      description3: 'Alle unsere Produkte sind mit einer umfassenden Garantie für Ihr Seelenheil ausgestattet.',
      description4: 'Wir respektieren Fristen und sorgen für eine pünktliche Projektabwicklung.'
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
      description: 'Entdecken Sie unser Portfolio an kundenspezifischen Edelstahlprojekten und -installationen.',
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
      description: 'Haben Sie eine Frage oder möchten Sie Ihr Projekt besprechen? Kontaktieren Sie uns noch heute.',
      title1: 'Senden Sie uns eine Nachricht',
      title2: 'Kontaktinformationen',
      title3: 'Adresse',
      address: 'Adresse',
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