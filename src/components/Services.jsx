import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';

export default function Services() {
  const translations = useSelector(selectTranslations);
  const { services } = translations;
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{services.title}</h2>
        
        <div className="max-w-3xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}