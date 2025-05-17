import { createSlice } from '@reduxjs/toolkit';

// Define translations
const translations = {
  // English translations 
  en: {
    header: "Your project. Our stainless steel.",
    subheader: 'We manufacture and install stainless steel products',
    scrollDown: 'Scroll down',

    footer: {
      name: 'Josef Kuś',
      description:"Professional construction services with over 25 years of experience in residential and commercial projects.",
      address: 'Schmiedegraben 2 36323 Grebenau',
      country: 'Germany',
      mobile: 'Mobile',
      telephone: 'Telephone',
      email: 'E-mail',
      contactUs: 'Contact Us'
    },
    services: {
      title: 'Our Services',
      description: "We specialize in crafting high-quality metalwork for both residential and commercial needs. Our offer includes a wide range of custom-made products such as railings, fences, gates, stair structures, and more—designed with durability, safety, and style in mind. Whether you're enhancing a home or upgrading a property, we tailor every product to match your exact requirements.",
      cta: 'Explore our services',
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
      cta: 'View All Gallery',
      all: 'All',
      railings: 'Railings',
      balconies: 'Balconies',
      fences: 'Fences',
      gates: 'Gates',
      grilles: 'Grilles'
    },
    about: {
      title: 'About Us',
      description: 'With years of experience in manufacturing and installing high-quality stainless steel products, we pride ourselves on craftsmanship, attention to detail, and customer satisfaction. Our dedicated team ensures that each project meets the highest standards of quality and design.',
      title2: "Why Choose Us",
      item1_title: "Quality Craftsmanship",
      item1_des: "We take pride in our precision engineering and meticulous attention to detail.",
      item2_title: "Custom Solutions",
      item2_des: "Every project is unique, and we create tailored solutions to match your specific needs.",
      item3_title: "Timely Delivery",
      item3_des: "We understand the importance of deadlines and ensure prompt project completion.",
      item4_title: "Customer Satisfaction",
      item4_des: "Our customers' satisfaction is our top priority, with clear communication throughout the process.",
      history: "Our History",
      des1: "Since our establishment, Kessler Construction Services has been dedicated to providing the highest quality stainless steel products for residential and commercial properties.",
      des2: "Our journey began with a passion for metalwork and a vision to create functional yet beautiful structural elements that would stand the test of time. Over the years, we've refined our techniques and expanded our capabilities, while maintaining our commitment to excellence.",
      des3: "Today, we continue to serve our clients with the same dedication to quality and customer satisfaction that has been our hallmark since day one."
    },
    contact: {
      title: 'Get in Touch',
      description:'Have a question or want to discuss your project? Get in touch with us today.',
      cta:"Let us help bring your vision to life with our high-quality stainless steel products.",
      title1: 'Send Us a Message',
      title2: 'Contact Information',
      login_message: 'Login with Gmail to Contact Us',
      logout: 'Logout',
      address: 'Address',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
  },
//-------------------------------------------------------------------------------------------------------------
  // German translations
  de: {
    header: "Dein Projekt. Unser Edelstahl.",
    subheader: 'Wir fertigen und montieren Produkte aus Edelstahl',
    scrollDown: 'Nach unten scrollen',

    footer: {
      name: 'Josef Kuś',
      description:"Professionelle Baudienstleistungen mit über 25 Jahren Erfahrung in Wohn- und Gewerbeprojekten.",
      address: 'Schmiedegraben 2 36323 Grebenau',
      country: 'Deutschland',
      mobile: 'Mobil',
      telephone: 'Telefon',
      email: 'E-Mail',
      contactUs: 'Kontaktieren Sie uns'
    },
    services: {
      title: 'Unsere Leistungen',
      description: " Wir sind auf die Herstellung hochwertiger Metallarbeiten für private und gewerbliche Zwecke spezialisiert. Unser Angebot umfasst eine breite Palette maßgeschneiderter Produkte wie Geländer, Zäune, Tore, Treppenkonstruktionen und mehr - entworfen mit Blick auf Langlebigkeit, Sicherheit und Stil. Egal, ob Sie ein Zuhause aufwerten oder eine Immobilie modernisieren möchten, wir passen jedes Produkt an Ihre genauen Anforderungen an.",
      cta: 'Entdecken Sie unsere Dienstleistungen',
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
      cta: 'Alle Galerie anzeigen',
      all: 'Alle',
      railings: 'Geländer',
      balconies: 'Balkone',
      fences: 'Zäune',
      gates: 'Tore',
      grilles: 'Gitter'
    },
    about: {
      title: 'Über Uns',
      description: 'Mit jahrelanger Erfahrung in der Herstellung und Montage hochwertiger Edelstahlprodukte sind wir stolz auf handwerkliches Können, Liebe zum Detail und Kundenzufriedenheit. Unser engagiertes Team sorgt dafür, dass jedes Projekt den höchsten Qualitäts- und Designstandards entspricht.',
      title2: "Warum sollten Sie sich für uns entscheiden?",
      item1_title: "Hochwertige Handwerkskunst",
      item1_des: "Wir sind stolz auf unsere Präzisionstechnik und unsere akribische Liebe zum Detail.",
      item2_title: "Maßgeschneiderte Lösungen",
      item2_des: "Jedes Projekt ist einzigartig und wir entwickeln maßgeschneiderte Lösungen, die Ihren spezifischen Anforderungen entsprechen.",
      item3_title: "Pünktliche Lieferung",
      item3_des: "Wir sind uns der Bedeutung von Terminen bewusst und sorgen für eine zügige Projektabwicklung.",
      item4_title: "Kundenzufriedenheit",
      item4_des: "Die Zufriedenheit unserer Kunden hat für uns oberste Priorität und wir kommunizieren während des gesamten Prozesses klar und deutlich.",
      history: "Unsere Geschichte",
      des1: "Seit unserer Gründung hat sich Kessler Construction Services der Bereitstellung von Edelstahlprodukten höchster Qualität für Wohn- und Gewerbeimmobilien verschrieben.",
      des2: "Unsere Reise begann mit der Leidenschaft für Metallverarbeitung und der Vision, funktionale und zugleich schöne Konstruktionselemente zu schaffen, die den Anforderungen der Zeit standhalten. Im Laufe der Jahre haben wir unsere Techniken verfeinert und unsere Fähigkeiten erweitert, ohne dabei unseren Anspruch an Exzellenz zu vernachlässigen.",
      des3: "Auch heute noch betreuen wir unsere Kunden mit der gleichen Hingabe an Qualität und Kundenzufriedenheit, die seit dem ersten Tag unser Markenzeichen ist."
    },
    contact: {
      title: 'Nehmen Sie Kontakt auf',
      description: 'Haben Sie eine Frage oder möchten Sie Ihr Projekt besprechen? Kontaktieren Sie uns noch heute.',
      cta: 'Lassen Sie uns Ihre Vision mit unseren hochwertigen Edelstahlprodukten zum Leben erwecken.',
      title1: 'Senden Sie uns eine Nachricht',
      title2: 'Kontaktinformationen',
      login_message: 'Melden Sie sich mit Gmail an, um uns zu kontaktieren',
      logout: 'Abmelden',
      title3: 'Adresse',
      address: 'Adresse',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden'
    },
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