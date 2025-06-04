import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconMail,
  IconPhoneCall,
  IconMapPin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Açıklama */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-white">
            Sarrissa Bisiklet
          </h2>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Kalite, güç ve özgürlüğü pedallamak isteyenler için Sarrissa...
            Baygın Bisiklet tarafından kurulmuştur.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <IconBrandInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <IconBrandFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <IconBrandTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <IconBrandYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Ürünler */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ürünler</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Yol Bisikletleri
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Dağ Bisikletleri
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Elektrikli Bisikletler
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Yedek Parçalar
              </a>
            </li>
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Hikayemiz
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Bayiler
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kariyer
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="text-lg font-semibold mb-4">İletişim</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <IconMapPin size={16} /> Ankara, Türkiye
            </li>
            <li className="flex items-center gap-2">
              <IconPhoneCall size={16} /> +90 312 123 4567
            </li>
            <li className="flex items-center gap-2">
              <IconMail size={16} /> info@sarrissabisiklet.com
            </li>
          </ul>
        </div>
      </div>

      {/* Alt Çizgi */}

      <div className="border-t border-gray-600  pt-4 pb-2 text-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} Sarrissa Bisiklet. Tüm hakları saklıdır.
        </p>
        <p className="italic mt-1">
          Bu site {' '}
          <a
            target="_blank"
            className="hover:text-rose-300 underline"
            href="https://www.linkedin.com/in/mehmet-ali-sevin%C3%A7-2a8521254/"
          >
            Mehmet Ali Sevinç
          </a>
          {' '}
          ve
          {' '}
          <a
            target="_blank"
            className="hover:text-rose-300 underline"
            href="https://www.linkedin.com/in/dursun-ali-sevin%C3%A7-18a466280/"
          >
            Dursun Ali Sevinç
          </a>
          {' '}
          tarafından özenle geliştirilmiştir.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
