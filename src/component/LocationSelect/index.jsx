import React, { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [iller, setIller] = useState([]);
  const [ilceler, setIlceler] = useState([]);
  const [mahalleler, setMahalleler] = useState([]);
  const [sokaklar, setSokaklar] = useState([]);

  const [selectedIl, setSelectedIl] = useState("");
  const [selectedIlce, setSelectedIlce] = useState("");
  const [selectedMahalle, setSelectedMahalle] = useState("");

  useEffect(() => {
    axios
      .get("https://adresmagnet.com/api/v1/il")
      .then((res) => setIller(res.data.data))
      .catch((err) => console.error("İller alınamadı:", err));
  }, []);

  useEffect(() => {
    axios
      .get("https://adresmagnet.com/api/v1/il")
      .then((res) => console.log(res.data))
      .catch((err) => console.error("İller alınamadı:", err));
  }, []);

  useEffect(() => {
    if (selectedIl) {
      axios
        .get(`https://adresmagnet.com/api/v1/ilce?il_id=${selectedIl}`)
        .then((res) => setIlceler(res.data.data))
        .catch((err) => console.error("İlçeler alınamadı:", err));
    } else {
      setIlceler([]);
      setMahalleler([]);
      setSokaklar([]);
    }
  }, [selectedIl]);

  useEffect(() => {
    if (selectedIlce) {
      axios
        .get(`https://adresmagnet.com/api/v1/mahalle?ilce_id=${selectedIlce}`)
        .then((res) => setMahalleler(res.data.data))
        .catch((err) => console.error("Mahalleler alınamadı:", err));
    } else {
      setMahalleler([]);
      setSokaklar([]);
    }
  }, [selectedIlce]);

  useEffect(() => {
    if (selectedMahalle) {
      axios
        .get(
          `https://adresmagnet.com/api/v1/sokak?mahalle_id=${selectedMahalle}`
        )
        .then((res) => setSokaklar(res.data.data))
        .catch((err) => console.error("Sokaklar alınamadı:", err));
    } else {
      setSokaklar([]);
    }
  }, [selectedMahalle]);

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <select
        className="border border-gray-300 p-2 w-full rounded"
        value={selectedIl}
        onChange={(e) => setSelectedIl(e.target.value)}
      >
        <option value="">İl Seç</option>
        {iller.map((il) => (
          <option key={il.id} value={il.id}>
            {il.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 p-2 w-full rounded"
        value={selectedIlce}
        onChange={(e) => setSelectedIlce(e.target.value)}
        disabled={!selectedIl}
      >
        <option value="">İlçe Seç</option>
        {ilceler.map((ilce) => (
          <option key={ilce.id} value={ilce.id}>
            {ilce.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 p-2 w-full rounded"
        value={selectedMahalle}
        onChange={(e) => setSelectedMahalle(e.target.value)}
        disabled={!selectedIlce}
      >
        <option value="">Mahalle Seç</option>
        {mahalleler.map((mahalle) => (
          <option key={mahalle.id} value={mahalle.id}>
            {mahalle.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 p-2 w-full rounded"
        disabled={!selectedMahalle}
      >
        <option value="">Sokak Seç</option>
        {sokaklar.map((sokak) => (
          <option key={sokak.id} value={sokak.id}>
            {sokak.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Index;
