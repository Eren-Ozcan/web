import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ProductInfo {
  titleKey: string;
  descKey: string;
  image: string;
}

const productData: Record<string, ProductInfo> = {
  glass: { titleKey: 'glass', descKey: 'glass_desc', image: '/images/cam.jpg' },
  doors: { titleKey: 'door', descKey: 'door_desc', image: '/images/house1.jpg' },
  balkon: { titleKey: 'balcony', descKey: 'balcony_desc', image: '/images/house1.jpg' },
  bahce: { titleKey: 'garden', descKey: 'garden_desc', image: '/images/house2.jpg' },
  office: { titleKey: 'office', descKey: 'office_desc', image: '/images/house2.jpg' },
  facade: { titleKey: 'exterior', descKey: 'exterior_desc', image: '/images/house2.jpg' },
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const prod = slug ? productData[slug] : undefined;
  if (!prod) {
    return <div className="p-6">{t('loading')}</div>;
  }

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <img
        src={prod.image}
        alt={t(prod.titleKey)}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{t(prod.titleKey)}</h1>
      <p className="text-gray-700 mb-6">{t(prod.descKey)}</p>
      <Link to="/urunler" className="text-blue-600 hover:underline">
        {t('back_to_products')}
      </Link>
    </section>
  );
}
