import { IconShoppingBag } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const fakeOrders = [
  {
    id: 1,
    status: "Bekliyor",
    date: "2025-04-03T14:48:00.000Z",
    items: [
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2249.9,
        image:
          "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/12-volt-7-amper-akulu-araba-akusu-12-v-7-a-orjinal-pilsan-aku-7764.jpg",
      },
    ],
    total: 2249.9,
  },
  {
    id: 1,
    status: "İptal",
    date: "2025-04-03T14:48:00.000Z",
    items: [
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 2,
        price: 229.9,
        image:
          "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/12-volt-7-amper-akulu-araba-akusu-12-v-7-a-orjinal-pilsan-aku-7764.jpg",
      },
    ],
    total: 2249.9,
  },
  {
    id: 1,
    status: "Tamamlandı",
    date: "2025-04-03T14:48:00.000Z",
    items: [
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2349.9,
        image:
        "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/salcano-orjinal-pedal-metal-kenarlikli-dayanikli-bisiklet-pedali-8044.jpg",
      },
    ],
    total: 2249.9,
  },
  {
    id: 1,
    status: "Hazırlanıyor",
    date: "2025-04-03T14:48:00.000Z",
    items: [
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2349.9,
        image:
        "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/salcano-orjinal-pedal-metal-kenarlikli-dayanikli-bisiklet-pedali-8044.jpg",
      },
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2349.9,
        image:
        "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/salcano-orjinal-pedal-metal-kenarlikli-dayanikli-bisiklet-pedali-8044.jpg",
      },
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2349.9,
        image:
        "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/salcano-orjinal-pedal-metal-kenarlikli-dayanikli-bisiklet-pedali-8044.jpg",
      },
      {
        name: "Pilsan 12 VOLT 7 AMPER AKÜLÜ ARABA AKÜSÜ",
        brand: "Pilsan",
        quantity: 1,
        price: 2349.9,
        image:
        "http://cdn1.xmlbankasi.com/p1/bayginnbisiklet/image/data/resimler/salcano-orjinal-pedal-metal-kenarlikli-dayanikli-bisiklet-pedali-8044.jpg",
      },
    ],
    total: 2249.9,
  },
];

const statusColors = {
  Bekliyor: "bg-yellow-100 text-yellow-700",
  Tamamlandı: "bg-green-100 text-green-700",
  İptal: "bg-red-100 text-red-700",
  Hazırlanıyor: "bg-blue-100 text-blue-700",
};

const Index = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOrders(fakeOrders);
    }, 500);
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-5 bg-white shadow-lg rounded-xl mb-8">
        <span className="flex items-center font-extrabold text-3xl text-slate-900 gap-3">
          <IconShoppingBag className="text-orange-500" size={32} />
          Siparişler
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {orders.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400 italic text-lg font-light">
            Sipariş bulunmamaktadır.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-transform hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <div
                  className={`px-4 py-2 rounded-full font-semibold text-sm tracking-wide ${
                    statusColors[order.status] || "bg-gray-200 text-gray-600"
                  }`}
                >
                  {order.status}
                </div>
                <time
                  className="text-gray-500 text-sm font-medium"
                  dateTime={order.date}
                >
                  {new Date(order.date).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>

              <div className="flex-grow overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
                {order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-gray-800 text-base font-medium"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-contain border border-gray-200 shadow-sm"
                      />
                      <div className="flex flex-col flex-grow min-w-0">
                        <span className="truncate font-semibold">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-400 tracking-wide">
                          {item.brand}
                        </span>
                      </div>
                      <div className="whitespace-nowrap text-orange-600 font-semibold">
                        {item.quantity} x {item.price.toFixed(2)} ₺
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 italic">Ürün yok</div>
                )}
              </div>

              <div className="border-t pt-4 text-right text-xl font-extrabold text-slate-900">
                Toplam:{" "}
                <span className="text-orange-600">
                  {order.total.toFixed(2)} ₺
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Index;
