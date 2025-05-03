import { createContext, useState, useContext } from 'react';

// Define translations
const translations = {
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
    languageSwitch: 'DE'
  },
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
    languageSwitch: 'EN'
  }
};

// Create context
const LanguageContext = createContext();

// Create context provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default language is English

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'de' : 'en'));
  };

  const value = {
    language,
    translations: translations[language],
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Create custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}