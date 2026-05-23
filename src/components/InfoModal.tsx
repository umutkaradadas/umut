import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileCheck, 
  Lock, 
  HeartHandshake, 
  X, 
  Search, 
  Award, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'procedures' | 'standards' | 'kvkk' | 'support';
}

export function InfoModal({ isOpen, onClose, initialTab = 'procedures' }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Update active tab if initialTab changes externally
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const tabs = [
    {
      id: 'procedures',
      title: 'Doğrulama Prosedürleri',
      icon: FileCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      tagline: 'Tedavi geçmişlerinin gerçeklik ve güvenilirlik denetim süreci',
    },
    {
      id: 'standards',
      title: 'Veri Teyit Standartları',
      icon: Award,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
      tagline: 'Klinik başarı skorlaması ve şeffaf derecelendirme metodolojisi',
    },
    {
      id: 'kvkk',
      title: 'KVKK Hasta Gizliliği',
      icon: Lock,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      tagline: 'Sıfır-Bilgi Kanıtı (ZKP) ve tıbbi gizlilik standartları',
    },
    {
      id: 'support',
      title: 'Hekim Destek & İrtibat',
      icon: HeartHandshake,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      tagline: 'Hekim hak hakemliği, profil sahiplenme ve kurumsal iletişim',
    },
  ];

  // Detailed content matching search queries or tab selection
  const fDocs = [
    {
      id: 'proc_1',
      category: 'procedures',
      title: '1. Adım: Resmi Evrak ve e-Nabız Doğrulaması',
      content: 'Hastalar sisteme tedavi deneyimlerini yüklerken, e-Nabız sisteminden alınan barkodlu tedavi çıktısını, taburculuk epikriz raporunu veya resmi klinikten verilmiş kaşeli/ıslak imzalı tescil belgesini sisteme yüklerler. Bu belgelerin tescil numarası ve barkodu doğrudan ulusal veritabanları yardımıyla teyit edilir.',
      tag: 'Evrak Güvenliği'
    },
    {
      id: 'proc_2',
      category: 'procedures',
      title: '2. Adım: Yapay Zeka & Çift Katmanlı Manuel Analiz',
      content: 'Evraklar önce taranarak hekim kaşesi, diploma tescil numarası, hastane logosu ve tedavi tarihi analizi yapan gelişmiş OCR motorumuzdan geçer. Ardından, CareTrust Doğrulama Komisyonu üyelerinden en az iki bağımsız raportör tarafından çapraz kontrole tabi tutulur.',
      tag: 'Kontrol Protokolü'
    },
    {
      id: 'proc_3',
      category: 'procedures',
      title: '3. Adım: Sıfır-Bilgi Şifrelemesi ve Evrak İmhası',
      content: 'Onaylanan tedaviler sisteme işlendikten hemen sonra, hastanın yüklediği asıl PDF veya görsel belgeler sunucularımızdan kalıcı olarak (katı veri imha standartlarıyla) geri döndürülemeyecek şekilde silinir. Geriye yalnızca şifrelenmiş bir "Doğrulandı" hash kodu ve maskelenmiş hasta numarası kalır.',
      tag: 'Yüksek Mahremiyet'
    },
    {
      id: 'std_1',
      category: 'standards',
      title: 'Klinik Güven Skoru Hesaplama Ağırlıkları',
      content: 'Hekimlerin profilinde yer alan "Güvenilirlik Skoru" (Credibility Rating) şu formüle göre otomatik olarak ağırlıklandırılır: Klinik Sonuç Başarısı %30, Hasta Bilgisi ve Şeffaflık %25, Ameliyat Sonrası Post-Op Takip Destek Sıklığı %20, Akademik Unvan ve Sertifika Sayısı %15, Uluslararası Akreditasyon (JCI vb.) %10.',
      tag: 'Formül Standartları'
    },
    {
      id: 'std_2',
      category: 'standards',
      title: 'Algoritmik Manipülasyon Engelleme Sistemi',
      content: 'Aynı IP adresi, benzer cihaz parmak izleri veya kısa sürede yapılan tekrarlı bildirimler CareTrust Yapay Zeka Güvenlik Duvarı (Sybil Defense) tarafından engellenir. Bu sayede hiçbir klinik veya muayenehane kendi lehine veya rakiplerinin aleyhine toplu spam bildirim yapamaz.',
      tag: 'Anti-Spam Kalkanı'
    },
    {
      id: 'kvkk_1',
      category: 'kvkk',
      title: 'Tıbbi Veri Haklarının KVKK & GDPR Korunması',
      content: 'Anayasa\'nın 20. maddesi ve 6698 sayılı KVKK gereğince, hassas kişisel sağlık verileri mutlak gizliliğe tabidir. İsimler tamamen maskelenir (Örn: A*** K*** ya da Hasta #9812). Tedavi detayı hiçbir şekilde doğrudan ifşa edilmez, sadece genel branş kategorileri bazında raporlanır.',
      tag: 'Yasal Uyum'
    },
    {
      id: 'kvkk_2',
      category: 'kvkk',
      title: 'Unutulma Hakkı (Right to be Forgotten)',
      content: 'Bir hasta sisteme geçmişte eklediği bir tedavi geçmişini dilediği saniyede silme hakkına sahiptir. "Profilim" panelinden tek tıkla silinen rapor asılları, yedekleme sunucuları dahil olmak üzere tüm ekosistemden aynı anda kriptografik anahtarı yok edilerek imha edilir.',
      tag: 'Kişisel Haklar'
    },
    {
      id: 'sup_1',
      category: 'support',
      title: 'Hekimler için Profil Sahiplenme ve İletişim',
      content: 'İstanbul İl Sağlık Müdürlüğü\'ne bağlı resmi tıp merkezleri, özel hastaneler veya muayenehane sahibi hekimler, CareTrust profillerini e-Devlet kimlik doğrulaması, TTB oda numarası veya kurumsal hekim e-postası ile tam yetkiyle devralabilirler. Profil sahiplenme tamamen ücretsizdir.',
      tag: 'Hekim Paneli'
    },
    {
      id: 'sup_2',
      category: 'support',
      title: 'Etik İtiraz ve Bağımsız Hakem Heyeti',
      content: 'Hekimler, profillerine yazılan bir teyitli tedavinin tıbbi gerçekleri çarpıttığını düşünüyorlarsa, resmi epikriz kayıtlarıyla birlikte CareTrust Etik Hakem Heyeti\'ne (İstanbul Tabip Odası emekli jüri hekimleri ve hukuk danışmanlarından oluşur) itiraz başvurusunda bulunabilirler.',
      tag: 'Adil Hakemlik'
    }
  ];

  const filteredDocs = fDocs.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If not searching, strictly filter by selected tab. If searching, show searching results across all tabs!
    if (searchQuery !== '') {
      return matchesSearch;
    }
    return doc.category === activeTab && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
          {/* Backdrop Click */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-transparent cursor-pointer" 
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white w-full max-w-5xl h-full sm:h-[85vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100/80 z-10"
          >
            {/* Header Area */}
            <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg tracking-tight">CareTrust Resmi Bilgi & Güvenlik Paneli</h3>
                  <p className="text-xs text-slate-400 font-medium">İstanbul Hekim Şeffaflığı & Tedavi Sicili Yönetmeliği</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search and Overview */}
            <div className="bg-slate-50 border-b border-slate-100 p-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Bağımsız Denetim Sistemi • KVKK-Yasaklı Tedavi İfşası Engeli Devrede</span>
              </div>
              <div className="relative w-full md:w-80">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Yönerge veya mevzuat ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                  >
                    Temizle
                  </button>
                )}
              </div>
            </div>

            {/* Main Modal Split Panel */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-72 bg-slate-50 border-r border-slate-100 flex md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 p-2 sm:p-4 gap-1.5">
                <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2.5">Tıbbi Yönetmelik Menüsü</p>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id && searchQuery === '';
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSearchQuery(''); // clear search on deliberate tab select
                      }}
                      className={`flex items-center md:items-start lg:items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold cursor-pointer transition-all w-full shrink-0 whitespace-nowrap md:whitespace-normal ${
                        isSelected 
                          ? 'bg-white shadow-sm border border-slate-100 text-blue-900 shadow-slate-100' 
                          : 'text-slate-600 hover:bg-slate-100/75 hover:text-slate-900'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md border shrink-0 ${tab.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="hidden md:block">
                        <div className="font-bold">{tab.title}</div>
                        <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5 line-clamp-1">{tab.tagline}</div>
                      </div>
                      <span className="md:hidden text-xs">{tab.title}</span>
                    </button>
                  );
                })}

                <div className="hidden md:block mt-auto p-3 bg-gradient-to-tr from-blue-50 to-cyan-50 border border-blue-100/50 rounded-xl">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Güven Sertifikası</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                    CareTrust verileri, blockchain tabanlı mühürleme ve onay protokolleri çerçevesinde bağımsız denetlenmektedir.
                  </p>
                </div>
              </div>

              {/* Dynamic Content Panel */}
              <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Search result title */}
                {searchQuery !== '' && (
                  <div className="bg-blue-50 border border-blue-100 text-blue-900 text-xs py-2 px-3 rounded-lg flex items-center justify-between font-medium">
                    <span>"{searchQuery}" araması için sistem kayıtlarında eşleşen maddeler gösteriliyor:</span>
                    <button onClick={() => setSearchQuery('')} className="underline text-blue-600 hover:text-blue-800">Tümünü Göster</button>
                  </div>
                )}

                {/* Tab specific Hero Header (Rendered if not searching) */}
                {searchQuery === '' && (
                  <div className="pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 tracking-wider uppercase font-mono bg-blue-50 px-2 py-0.5 rounded">
                        BÖLÜM {tabs.findIndex(t => t.id === activeTab) + 1}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                      <span className="text-xs text-slate-500 font-medium">CareTrust Sağlık Güvencesi Sicil Kayıt Standartları</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {tabs.find(t => t.id === activeTab)?.title}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                      {tabs.find(t => t.id === activeTab)?.tagline}. Hastaların ve doktorların platform sınırları içindeki hakları, İstanbul ve çevre illerdeki klinik akreditasyon standartları ile tam olarak koruma altına alınmıştır.
                    </p>
                  </div>
                )}

                {/* Display Documents */}
                <div className="space-y-4">
                  {filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={doc.id} 
                        className="p-4 sm:p-5 rounded-xl border border-slate-100 hover:border-slate-200/80 hover:bg-slate-50/40 transition-all bg-white shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight ring-slate-100">
                            {doc.title}
                          </h4>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/70 border border-blue-100 px-2.5 py-0.5 rounded-full shrink-0 transition-colors uppercase whitespace-nowrap">
                            {doc.tag}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                          {doc.content}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-slate-500 text-sm font-medium mt-2">Böyle bir kayıt bulunamadı.</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-blue-600 hover:text-blue-800 underline mt-1.5 font-bold focus:outline-none"
                      >
                        Aramayı Temizle
                      </button>
                    </div>
                  )}

                  {/* Add Dedicated Custom Tabs Content for Support (Address & Contacts) */}
                  {activeTab === 'support' && searchQuery === '' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 pt-5 border-t border-slate-100 space-y-5"
                    >
                      <h4 className="font-bold text-slate-900 text-sm tracking-tight">CareTrust Resmi İrtibat Kanalları</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800 text-xs">Genel Merkez Ofisi</div>
                            <div className="text-slate-500 text-xs leading-relaxed mt-0.5">
                              Maslak Plaza, No: 12, Kat: 8<br />
                              34485 Sarıyer / İstanbul
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                          <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800 text-xs">E-Posta Adresleri</div>
                            <div className="text-slate-500 text-xs leading-relaxed mt-0.5">
                              Genel Sorular: <span className="text-blue-600 hover:underline">info@caretrust.com</span><br />
                              Hekim İtirazı: <span className="text-blue-600 hover:underline">hekim@caretrust.org</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                          <Phone className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800 text-xs">Telefon & Destek Hattı</div>
                            <div className="text-slate-500 text-xs leading-relaxed mt-0.5">
                              Çağrı Merkezi: <span className="font-mono">+90 (212) 345 80 80</span><br />
                              Faks: <span className="font-mono">+90 (212) 345 80 81</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                          <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800 text-xs">Çalışma Saatleri</div>
                            <div className="text-slate-500 text-xs leading-relaxed mt-0.5">
                              Hafta içi: 09:00 - 18:00<br />
                              Cumartesi: 10:00 - 14:00 (Sadece e-posta)
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-amber-900 text-xs">Acil Medikal Durum Uyarısı</div>
                          <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                            CareTrust hiçbir koşulda acil tıbbi yardım portalı değildir. Acil bir sağlık sorunu, komplikasyon veya hayati tehlike durumlarında lütfen derhal <strong>112 Acil Yardım</strong> hattını arayın veya en yakın tam teşekküllü devlet/özel acil tıp merkezine başvurun.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Mühürlü Kayıt Sistemi v4.2.1 • T.C. Sağlık Mevzuatı ile uyumlu</span>
              </div>
              <p className="text-[10px] font-mono">Güncel Sunucu Saati: 2026-05-23 08:57 UTC</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
