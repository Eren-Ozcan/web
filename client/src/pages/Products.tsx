import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Product {
  slug: string;
  titleKey: string;
  image: string;
}

const products: Product[] = [
  { slug: 'glass', titleKey: 'glass', image: '/images/cam.jpg' },
  { slug: 'doors', titleKey: 'door', image: '/images/house1.jpg' },
  { slug: 'balkon', titleKey: 'balcony', image: '/images/house1.jpg' },
  { slug: 'bahce', titleKey: 'garden', image: '/images/house2.jpg' },
  { slug: 'office', titleKey: 'office', image: '/images/house2.jpg' },
  { slug: 'facade', titleKey: 'exterior', image: '/images/house2.jpg' }
];

export default function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('products')}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.slug}
            onClick={() => navigate(`/products/${p.slug}`)}
            className="bg-white shadow rounded overflow-hidden cursor-pointer"
          >
            <img src={p.image} alt={t(p.titleKey)} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{t(p.titleKey)}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
