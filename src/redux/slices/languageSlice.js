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
        'Double rod mesh fence',
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
      stairs: 'Stairs Railings',
      balconies: 'Balconies',
      fences: 'Fences',
      gates: 'Gates',
      grilles: 'Grilles'
    },
    about: {
      title: 'About Us',
      description: 'For many years, we have been passionately manufacturing stainless steel railings, handrails, and custom-made structures that combine modern design, the highest precision, and reliable durability. Our strength lies in decades of experience, attention to detail, and personalized service for each individual customer.',
      title2: "Why KUŚ?",
      item1_title: "Perfection in Execution",
      item1_des: "Every element is manufactured with the utmost precision and care so that you can enjoy it for many years.",
      item2_title: "Individual Solutions",
      item2_des: "We develop projects that are precisely tailored to your wishes and the character of your house or facade.",
      item3_title: "Timely Delivery",
      item3_des: "We keep our promises and reliably implement every project within the agreed timeframe.",
      item4_title: "Satisfaction Guaranteed",
      item4_des: "From the initial consultation to professional installation, we will support you with clear communication and full commitment.",
      history: "Our Story",
      des1: "KUŚ was born out of a passion for metalworking and the desire to create constructions that impress with both their appearance and their quality.",
      des2: "Over the years, we have continuously expanded our expertise, integrated state-of-the-art technologies, and expanded our range of services with one unchanging goal: perfect execution and satisfied customers.",
      des3: "Today, our stainless steel structures adorn numerous homes and commercial properties. Despite all the advancements, we still manufacture railings with the same dedication as on the first day, aesthetically pleasing, functional, and durable."
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
        'Treppengeländer',
        'Französische Balkone',
        'Zäune',
        'Tore',
        'Treppenkonstruktionen',
        'Kleine Dächer und Überdachungen',
        'Doppelstabmattenzaun',
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
      stairs: 'Treppengeländer',
      balconies: 'Balkone',
      fences: 'Zäune',
      gates: 'Tore',
      grilles: 'Gitter'
    },
    about: {
      title: 'Über Uns',
      description: "Seit vielen Jahren fertigen wir mit Leidenschaft Edelstahlgeländer, Handläufe und maßgeschneiderte Konstruktionen, die modernes Design, höchste Präzision und zuverlässige Beständigkeit vereinen. Unsere Stärke liegt in jahrzehntelanger Erfahrung, Liebe zum Detail und einer persönlichen Betreuung jedes einzelnen Kunden. ",
      title2: "Warum KUŚ? ",
      item1_title: "Perfektion in der Ausführung",
      item1_des: "Jedes Element wird mit höchster Präzision und Sorgfalt gefertigt, damit Sie viele Jahre Freude daran haben.",
      item2_title: "Individuelle Lösungen",
      item2_des: "Wir entwickeln Projekte, die exakt auf Ihre Wünsche und den Charakter Ihres Hauses oder Ihrer Fassade abgestimmt sind. ",
      item3_title: "Termintreue ",
      item3_des: "Wir halten, was wir versprechen, und realisieren jedes Projekt zuverlässig innerhalb des vereinbarten Zeitrahmens. ",
      item4_title: "Zufriedenheitsgarantie ",
      item4_des: "Von der ersten Beratung bis zur fachgerechten Montage begleiten wir Sie mit klarer Kommunikation und vollem Einsatz. ",
      history: "Unsere Geschichte",
      des1: "KUŚ entstand aus der Leidenschaft für Metallverarbeitung und dem Anspruch, Konstruktionen zu schaffen, die gleichermaßen durch ihre Optik wie durch ihre Qualität überzeugen.",
      des2: "Im Laufe der Jahre haben wir unser Know-how kontinuierlich erweitert, modernste Technologien integriert und unser Leistungsspektrum ausgebaut – mit einem unveränderten Ziel: perfekte Ausführung und zufriedene Kunden.",
      des3: "Heute zieren unsere Edelstahlkonstruktionen zahlreiche Häuser und Gewerbeobjekte. Trotz aller Weiterentwicklung fertigen wir Geländer noch immer mit derselben Hingabe wie am ersten Tag ästhetisch, funktional und langlebig. "
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
    currentLanguage: 'de',
    translations: translations.de
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