import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const { translations } = useLanguage();
  const { footer } = translations;
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-800 py-4 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{footer.name}</h3>
            <p className="text-gray-300 mb-4">{footer.companyDescription || "Professional construction services with over 25 years of experience in residential and commercial projects."}</p>

          </div>
          
          {/* Quick Links */}
          <div className='ml-16'>
            <h3 className="text-xl font-semibold mb-4">{footer.quickLinks || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  {footer.home || "Home"}
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-white transition-colors">
                  {footer.services || "Services"}
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  {footer.projects || "Projects"}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {footer.about || "About Us"}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {footer.contact || "Contact"}
                </a>
              </li>
            </ul>
          </div>
          
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{footer.contactUs || "Contact Us"}</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-300" />
                <div>
                  <p>{footer.address}</p>
                  <p>{footer.country}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p><span className="font-medium">{footer.mobile}:</span> +49 151 400 504 67</p>
              </div>
              
              <div className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p><span className="font-medium">{footer.telephone}:</span> +49 6646 17 18</p>
              </div>
              
              <div className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <a 
                  href="mailto:kessler-waldemar@t-online.de" 
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  kessler-waldemar@t-online.de
                </a>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="mr-2 flex-shrink-0 text-blue-300" />
                <p>{footer.businessHours || "Mon-Fri: 8:00 - 17:00"}</p>
              </div>
            </address>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Kessler Construction Services. {footer.allRightsReserved || "All rights reserved."}
            </p>
            <div className=" ">
              <ul className="flex space-x-6">
                <li>
                  <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {footer.privacyPolicy || "Privacy Policy"}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {footer.termsOfService || "Terms of Service"}
                  </a>
                </li>
                <li>
                  <a href="/imprint" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {footer.imprint || "Imprint"}
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