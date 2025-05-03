import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { translations } = useLanguage();
  const { footer } = translations;
  
  return (
    <footer className="w-full bg-gray-800 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">{footer.name}</h3>
            <address className="not-italic">
              <p>{footer.address}</p>
              <p>{footer.country}</p>
              <div className="mt-4">
                <p><span className="font-medium">{footer.mobile}:</span> +49 151 400 504 67</p>
                <p><span className="font-medium">{footer.telephone}:</span> +49 6646 17 18</p>
                <p>
                  <span className="font-medium">{footer.email}:</span>{' '}
                  <a 
                    href="mailto:kessler-waldemar@t-online.de" 
                    className="text-blue-300 hover:text-blue-100 transition-colors"
                  >
                    kessler-waldemar@t-online.de
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-2 pt-2 text-sm text-gray-400">
          <p> © {new Date().getFullYear()} Kessler Construction Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}