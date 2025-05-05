import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const translations = useSelector(selectTranslations);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="masked-top w-full bg-gray-600 py-4 text-white relative">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Josef Kuś</h3>
            <p className="text-gray-300 mb-4">{translations.footer.description}</p>

          </div>
          
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{translations.contact.contactUs}</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-300" />
                <div>
                  <p>{translations.footer.address}</p>
                  <p>{translations.footer.country}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p><span className="font-medium">{translations.footer.mobile}:</span> 0175-7150-358</p>
              </div>
              
              <div className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p><span className="font-medium">{translations.footer.telephone}:</span> +49 6646 17 18</p>
              </div>
              
              <div className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <a 
                  href="mailto:Kus-edelstahl@web.de" 
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  Kus-edelstahl@web.de
                </a>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p>Mon-Fri: 8:00 - 17:00</p>
              </div>
            </address>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Kuś Edelstahl Services. All rights reserved.
            </p>
            <div className=" ">
              <ul className="flex space-x-6">
                <li>
                  <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Terms of service
                  </a>
                </li>
                <li>
                  <a href="/imprint" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Imprint
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}