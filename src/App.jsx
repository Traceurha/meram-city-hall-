import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const defaultTalepler = [
  {
    gonderen: "Harun ACAR",
    konu: "Yol yapılması",
    tarih: "2023-06-01",
    detay: `Yolunuz çok kötü. Lütfen düzeltin. Sürekli araba lastiklerim patlıyor.`,
    yorumlar: [],
  },
  {
    gonderen: "Hasan ACAR",
    konu: "Park yapılması",
    tarih: "2024-01-01",
    detay: `Çocuklarımız için park yapılmasını istiyoruz. Çocuklarımızın oyun oynayabileceği bir park yok. Lütfen yapın.`,
    yorumlar: [
      {
        gonderen: "Kamil DEMİR",
        tarih: "2024-06-02",
        detay: "Bende katılıyorum 👍",
      },
    ],
  },
];
function App() {
  // sayfalar: talepler, talepDetay, talepEkle
  const [sayfa, setSayfa] = useState("talepler");
  const [talepler, setTalepler] = useState(defaultTalepler);
  const [seciliTalep, setSeciliTalep] = useState(null);

  return (
    <>
      <div>
        <h1>Meram Belediyesinden Talepleriniz</h1>

        {sayfa === "talepler" && (
          <Talepler
            setSayfa={setSayfa}
            talepler={talepler}
            setSeciliTalep={setSeciliTalep}
          />
        )}

        {sayfa === "talepEkle" && (
          <TalepEkle setSayfa={setSayfa} setTalepler={setTalepler} />
        )}

        {sayfa === "talepDetay" && (
          <TalepDetay
            setSayfa={setSayfa}
            talep={seciliTalep}
            setTalepler={setTalepler}
          />
        )}
      </div>
    </>
  );
}

function Talepler(props) {
  const talepler = props.talepler;
  const setSayfa = props.setSayfa;
  const setSeciliTalep = props.setSeciliTalep;

  const detayaGit = (index) => {
    setSeciliTalep(talepler[index]);
    setSayfa("talepDetay");
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <button onClick={() => setSayfa("talepEkle")}>Talep ekle</button>
      </div>

      <div className="talep_tablo">
        <div className="talep talep_baslik">
          <div>Konu</div>
          <div>Gönderen</div>
          <div>Tarih</div>
          <div>Detay</div>
        </div>

        {talepler.map((talep, index) => (
          <div className="talep">
            <div>{talep.konu}</div>
            <div>{talep.gonderen}</div>
            <div>{talep.tarih}</div>
            <div>
              <button
                onClick={() => detayaGit(index)}
                style={{ fontSize: "12px" }}
              >
                Detay
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TalepDetay(props) {
  const talep = props.talep;
  const setSayfa = props.setSayfa;
  const setTalepler = props.setTalepler;

  const [isim, setIsim] = useState("");
  const [yorum, setYorum] = useState("");
  const yorumEkle = () => {
    if (!isim || !yorum) return;
    const yeniYorum = {
      gonderen: isim,
      detay: yorum,
      tarih: new Date().toISOString().slice(0, 10),
    };

    // yorumu ekle
    setTalepler((eskiTalepler) => {
      const yeniTalepler = [...eskiTalepler];

      return yeniTalepler.map((t) => {
        if (t === talep) {
          t.yorumlar.push(yeniYorum);
        }
        return t;
      });
    });

    // temizle
    setIsim("");
    setYorum("");
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <button onClick={() => setSayfa("talepler")}>Geri dön</button>
      </div>

      <div>
        <h2>{talep.konu}</h2>
        <p>{talep.detay}</p>
        <div className="talep_tarih">
          {talep.tarih} tarihinde {talep.gonderen} tarafından gönderildi
        </div>
      </div>

      <div style={{ border: "1px solid rgba(245, 245, 245, 0.25)" }}></div>
      <div>
        <h3>Yorumlar</h3>
        {talep.yorumlar.length === 0 && <p>Henüz yorum yok</p>}
        {talep.yorumlar.map((yorum) => (
          <div className="yorum">
            <p>{yorum.detay}</p>
            <span>
              {yorum.tarih} tarihinde {yorum.gonderen} tarafından gönderildi
            </span>
          </div>
        ))}

        <div className="cizgi" />

        <div className="yorumkutusu">
          <input
            type="text"
            placeholder="İsminiz"
            value={isim}
            onChange={(e) => setIsim(e.target.value)}
          />
          <button onClick={yorumEkle}>Gönder</button>
        </div>
        <textarea
          placeholder="Yorumunuz"
          rows={4}
          style={{ width: "100%" }}
          value={yorum}
          onChange={(e) => setYorum(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

function TalepEkle(props) {
  const [gonderen, setGonderen] = useState("");
  const [konu, setKonu] = useState("");
  const [detay, setDetay] = useState("");

  const setSayfa = props.setSayfa;
  const setTalepler = props.setTalepler;

  const talepEkle = () => {
    const tarih = new Date().toISOString().slice(0, 10);

    setTalepler((eskiTalepler) =>
      eskiTalepler.concat({ gonderen, konu, detay, tarih, yorumlar: [] })
    );

    setSayfa("talepler");
  };

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <button onClick={() => setSayfa("talepler")}>Geri dön</button>
      </div>

      <h2>Yeni talep</h2>
      <div className="talep_formu">
        <div>
          <input
            type="text"
            placeholder="İsminiz"
            value={gonderen}
            onChange={(e) => setGonderen(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Konu"
            value={konu}
            onChange={(e) => setKonu(e.target.value)}
          />
        </div>
        <div>
          <textarea
            rows={5}
            placeholder="Detay"
            value={detay}
            onChange={(e) => setDetay(e.target.value)}
          />
        </div>
        <div>
          <button onClick={talepEkle}>Gönder</button>
        </div>
      </div>
    </div>
  );
}

export default App;
