import { Doctor } from './types';

export const SPECIALTIES = [
  'Kardiyoloji',
  'Dermatoloji',
  'Nöroloji',
  'Ortopedi ve Travmatoloji',
  'Göz Hastalıkları',
  'Kulak Burun Boğaz (KBB)',
  'Çocuk Sağlığı ve Hastalıkları',
  'İç Hastalıkları (Dahiliye)',
  'Genel Cerrahi',
  'Kadın Hastalıkları ve Doğum',
  'Üroloji',
  'Plastik, Rekonstrüktif ve Estetik Cerrahi',
  'Fiziksel Tıp ve Rehabilitasyon',
  'Göğüs Hastalıkları',
  'Ruh Sağlığı ve Hastalıkları (Psikiyatri)',
  'Tıbbi Onkoloji',
  'Beyin ve Sinir Cerrahisi (Nöroşirürji)',
  'Gastroenteroloji'
];

export const SYMPTOMS_MAPPING: Record<string, string[]> = {
  'Kardiyoloji': [
    'Göğüste sıkışma ağrısı', 
    'Kalp çarpıntısı / Nabız yüksekliği', 
    'Aritmi (Ritim bozukluğu)', 
    'Yokuş çıkarken nefes darlığı', 
    'Kronik yüksek tansiyon'
  ],
  'Dermatoloji': [
    'Şüpheli koyu renkli benler', 
    'Güneş lekeleri ve pigmentasyon', 
    'Şiddetli egzama döküntüsü', 
    'Sedef hastalığı atakları', 
    'İltihaplı sivilce ve akne'
  ],
  'Nöroloji': [
    'El ve ayak titremesi (Tremor)', 
    'Dinmeyen şiddetli migren ağrıları', 
    'Unutkanlık ve konsantrasyon kaybı', 
    'Ayaklarda uyuşma ve karıncalanma', 
    'Kronik baş dönmesi ve denge kaybı'
  ],
  'Ortopedi ve Travmatoloji': [
    'Şiddetli diz kireçlenmesi', 
    'Ön çapraz bağ yırtılması', 
    'Eklem içi sıvı kaybı ve aşınma', 
    'Kronik bel ağrısı ve fıtık şüphesi', 
    'Menisküs yırtığı belirtileri', 
    'Topuk dikeni ve basma ağrısı'
  ],
  'Göz Hastalıkları': [
    'Bulanık görme ve odaklanma güçlüğü', 
    'Katarakt şüphesi (Görmede azalma)', 
    'Gözde kuruluk, kızarıklık ve batma', 
    'İleriye derece astigmat ve miyopi', 
    'Göz içi tansiyon artışı (Glokom)'
  ],
  'Kulak Burun Boğaz (KBB)': [
    'Anormal işitme kaybı ve kulak çınlaması', 
    'Kronik sinüzit ve geniz akıntısı', 
    'Burun kemik eğriliği (Deviasyon)', 
    'Yutkunma zorluğu ve boğaz ağrısı', 
    'Ses kısıklığı ve vokal kord sorunları'
  ],
  'Çocuk Sağlığı ve Hastalıkları': [
    'İnatçı yüksek çocuk ateşi', 
    'Gelişim geriliği ve büyüme takibi', 
    'Çocukluk dönemi alerjileri', 
    'Bebeklerde beslenme ve gaz sorunları', 
    'Tekrarlayan üst solunum yolu enfeksiyonları'
  ],
  'İç Hastalıkları (Dahiliye)': [
    'Kronik halsizlik ve kansızlık', 
    'Açlık kan şekeri düzensizliği', 
    'Tiroid nodülü ve hormonal yavaşlık', 
    'Sebebi bilinmeyen kilo kayıpları', 
    'Böbrek fonksiyonlarında yavaşlama'
  ],
  'Genel Cerrahi': [
    'Kasık fıtığı şişliği ve ağrısı', 
    'Safra kesesi taşı sancıları', 
    'Meme ucu akıntısı ve kitle hissi', 
    'Hemoroid (basur) kanamaları', 
    'Guatr bezi büyümesi'
  ],
  'Kadın Hastalıkları ve Doğum': [
    'Düzensiz adet kanamaları', 
    'Yumurtalık kisti ağrıları', 
    'Gebelik takibi ve ultrason istekleri', 
    'Kronik kasık ağrıları (Endometriozis)', 
    'Menopoz dönemi sıcak basmaları'
  ],
  'Üroloji': [
    'İdrar kaçırma ve sık idrara çıkma', 
    'Böbrek taşı sancısı', 
    'İdrar yaparken yanma veya kan gelmesi', 
    'Prostat büyümesi şikayetleri', 
    'Varikosel ve kısırlık şüphesi'
  ],
  'Plastik, Rekonstrüktif ve Estetik Cerrahi': [
    'Burun şekil bozukluğu (Rinoplasti)', 
    'Yara veya yanık izi onarımı', 
    'Yüz germe ve kırışıklık tedavisi', 
    'Kepçe kulak düzeltilmesi', 
    'Meme küçültme / büyütme estetiği'
  ],
  'Fiziksel Tıp ve Rehabilitasyon': [
    'İnme / felç sonrası hareket kaybı', 
    'Boyun fıtığı ve kol uyuşması', 
    'Fibromiyalji kas tutulmaları', 
    'Romatizmal eklem ağrıları', 
    'Duruş bozukluğu ve sırtta eğrilik'
  ],
  'Göğüs Hastalıkları': [
    'İnatçı ve balgamlı kronik öksürük', 
    'Uykuda horlama ve nefes kesilmesi', 
    'KOAH nefes darlığı atakları', 
    'Göğüs kafesinde hırıltılı solunum', 
    'Alerjik rinit ve hapşırma nöbetleri'
  ],
  'Ruh Sağlığı ve Hastalıkları (Psikiyatri)': [
    'Kronik anksiyete ve panik atak', 
    'Majör depresif durum ve isteksizlik', 
    'Dikkat eksikliği ve odaklanamama', 
    'Takıntılı düşünceler (OKB)', 
    'Uykusuzluk ve gece kaygıları'
  ],
  'Tıbbi Onkoloji': [
    'Kanser tarama ve kemoterapi takibi', 
    'Tümör belirteçlerinde yükselme', 
    'Bağışıklık terapileri (İmmünoterapi)', 
    'Ailesel kanser riski danışmanlığı'
  ],
  'Beyin ve Sinir Cerrahisi (Nöroşirürji)': [
    'Omurilik kanalı daralması şikayeti', 
    'Beyin tümörü veya kist şüphesi', 
    'İleri derece bel fıtığı operasyonu', 
    'Karpal tünel el bileği sıkışması', 
    'Hidrosefali (beyinde su toplanması)'
  ],
  'Gastroenteroloji': [
    'Kronik mide yanması ve Reflü', 
    'Sık tekrarlayan Karın ağrısı', 
    'Huzursuz bağırsak sendromu (IBS)', 
    'Geçmeyen hazımsızlık ve şişkinlik', 
    'Gastrit ve mide ülseri şikayetleri'
  ]
};

export const CITIES = [
  'Adalar, İstanbul',
  'Arnavutköy, İstanbul',
  'Ataşehir, İstanbul',
  'Avcılar, İstanbul',
  'Bağcılar, İstanbul',
  'Bahçelievler, İstanbul',
  'Bakırköy, İstanbul',
  'Başakşehir, İstanbul',
  'Bayrampaşa, İstanbul',
  'Beşiktaş, İstanbul',
  'Beykoz, İstanbul',
  'Beylikdüzü, İstanbul',
  'Beyoğlu, İstanbul',
  'Büyükçekmece, İstanbul',
  'Çatalca, İstanbul',
  'Çekmeköy, İstanbul',
  'Esenler, İstanbul',
  'Esenyurt, İstanbul',
  'Eyüpsultan, İstanbul',
  'Fatih, İstanbul',
  'Gaziosmanpaşa, İstanbul',
  'Güngören, İstanbul',
  'Kadıköy, İstanbul',
  'Kağıthane, İstanbul',
  'Kartal, İstanbul',
  'Küçükçekmece, İstanbul',
  'Maltepe, İstanbul',
  'Pendik, İstanbul',
  'Sancaktepe, İstanbul',
  'Sarıyer, İstanbul',
  'Silivri, İstanbul',
  'Sultanbeyli, İstanbul',
  'Sultangazi, İstanbul',
  'Şile, İstanbul',
  'Şişli, İstanbul',
  'Tuzla, İstanbul',
  'Ümraniye, İstanbul',
  'Üsküdar, İstanbul',
  'Zeytinburnu, İstanbul'
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Prof. Dr. Aylin Yılmaz, MD, FACC',
    title: 'Girişimsel Kardiyoloji Anabilim Dalı Başkanı',
    specialty: 'Kardiyoloji',
    hospital: 'İstanbul Kardiyoloji Hastanesi ve Araştırma Merkezi',
    city: 'Şişli, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 184,
    credibilityRating: 99,
    verifiedTreatments: 840,
    experienceYears: 18,
    satisfactionRate: 99,
    age: 52,
    about: 'Prof. Dr. Aylin Yılmaz, minimal invaziv kapak tamiri, koroner anjiyoplasti ve önleyici kardiyoloji konularında uzmanlaşmıştır. Hasta bildirimli sonuçların en büyük savunucularındandır. Ekibiyle birlikte her üç ayda bir blokzincir teknolojisiyle imzalanmış hasta başarı oranlarını ve tedavi sonuçlarını şeffaf bir şekilde paylaşmaktadır. Transkateter Aort Kapak İmplantasyonu (TAVI) konusunda 45\'ten fazla uluslararası makalesi bulunmaktadır.',
    education: [
      'Tıp Doktoru (MD) - Harvard Tıp Fakültesi (Onur Derecesi)',
      'İç Hastalıkları İhtisası - Massachusetts General Hospital',
      'Girişimsel Kardiyoloji Yan Dal Uzmanlığı - Johns Hopkins Medicine',
      'Kardiyoloji Vakıf Tezi - "Koroner Arter Daralmalarında Mekanik Akış Analizi"'
    ],
    specialInterests: [
      'Transkateter Aort Kapak İmplantasyonu (TAVI)',
      'Mikrovasküler Koroner Yetmezlik',
      'İleri Derece Sol Ventrikül Destek Cihazları (LVAD)'
    ],
    experienceHistory: [
      {
        hospitalName: 'Mayo Clinic Rochester',
        department: 'Girişimsel Kardiyoloji Ünitesi',
        yearsRange: '2008 - 2011',
        title: 'Klinik Araştırma Fellow\'u'
      },
      {
        hospitalName: 'Massachusetts General Hospital',
        department: 'Kronik Kalp Yetmezliği Tanı Grubu',
        yearsRange: '2011 - 2016',
        title: 'Başasistan ve Yoğun Bakım Uzmanı'
      },
      {
        hospitalName: 'İstanbul Kardiyoloji Hastanesi ve Araştırma Merkezi',
        department: 'Kardiyoloji Kliniği',
        yearsRange: '2016 - Günümüz',
        title: 'Anabilim Dalı Başkanı'
      }
    ],
    timeline: [
      {
        id: 't-1-1',
        year: '2025',
        title: 'Girişimsel Kardiyoloji Yılın Bilim İnsanı Ödülü',
        category: 'Award',
        institution: 'Kardiyoloji Akademisi Derneği',
        description: 'Geliştirdiği düşük riskli transapikal erişim yöntemleriyle hasta hastanede kalış sürelerini %40 azaltması sebebiyle layık görülmüştür.'
      },
      {
        id: 't-1-2',
        year: '2024',
        title: 'Uzun Dönem Kalp Kapağı Tedavi Sonuçları Araştırması',
        category: 'Publication',
        institution: 'New England Journal of Medicine',
        description: 'TAVI operasyonları sonrasında arter elastikiyeti ve kireçlenme oranlarını takip eden 5 yıllık klinik çalışmanın baş yazarıdır.'
      }
    ],
    reviews: [
      {
        id: 'rev-1-1',
        treatmentType: 'Transkateter Aort Kapak İmplantasyonu (TAVI)',
        patientIdCode: 'Hasta ID: TR-82914 — Ulusal Sağlık Onay Geçidi ile Doğrulandı',
        verified: true,
        date: '2026-02-14',
        summary: 'Mükemmel şeffaflık, ağrısız iyileşme süreci ve son derece profesyonel bir yaklaşım.',
        text: '2025 yılının sonlarında bana ileri derece aort darlığı teşhisi konmuştu. Aylin Hocam TAVI prosedürünü 3 boyutlu modeller ve geçmiş doğrulanmış verilerle son derece net anlattı. Ameliyat çok konforlu geçti, tüm klinik verilerim sistem üzerinden onaylı şekilde işlendi.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Teşhis ve Operasyon Öncesi Danışmanlık',
            title: 'Bilinçli ve Güvenli Bir Karar',
            text: 'Açık kalp ameliyatı riskinden çok korkuyordum. Aylin Hanım ailemizle bir saat boyunca oturup kapak değişiminin risklerini şeffaf verilerle anlattı.'
          },
          {
            phase: 'Aşama 2: Ameliyat Günü',
            title: '90 Dakikalık Kusursuz Müdahale',
            text: 'Lokal anestezi ve sedasyon altında yapıldı. Ameliyathane son derece sterile ve sessizdi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'Doç. Dr. Serkan Karaca, MD, FAAD',
    title: 'Dermatolojik Cerrahi ve Onkoloji Direktörü',
    specialty: 'Dermatoloji',
    hospital: 'İstanbul Deri ve Cerrahi Onkoloji Kliniği',
    city: 'Kadıköy, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 245,
    credibilityRating: 97,
    verifiedTreatments: 1220,
    experienceYears: 14,
    satisfactionRate: 98,
    age: 43,
    about: 'Doç. Dr. Serkan Karaca, Mohs Mikrografik Cerrahisi ve deri kanserlerinin cerrahi tedavisi sonrası yüz rekonstrüksiyonu konularında tanınmış bir uzmandır. Mikroskobik kontrollü cerrahi prensibiyle çalışarak, kanserli hücreleri temizlerken sağlam doku kaybını en aza indirmeyi ve estetik olarak en ideal sonucu elde etmeyi hedefler.',
    education: [
      'Tıp Fakültesi - İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi',
      'Dermatoloji İhtisası - NYU Langone Sağlık Merkezi',
      'Mohs Mikrografik Cerrahisi Üst İhtisası - Cleveland Clinic',
      'Yüksek Lisans Tezi - "Bazal Hücreli Karsinom Tedavisinde Flep Uygulamaları ve Estetik İz Analizleri"'
    ],
    specialInterests: [
      'Mohs Mikrografik Cerrahisi',
      'Gelişmiş Yüz Flep ve Greft Uygulamaları',
      'Melanom Tedavisinde İmmünoterapi Yaklaşımları'
    ],
    experienceHistory: [
      {
        hospitalName: 'NYU Langone Medical Center',
        department: 'Dermatoloji Anabilim Dalı',
        yearsRange: '2012 - 2015',
        title: 'Asistan Doktor'
      },
      {
        hospitalName: 'Cleveland Clinic',
        department: 'Mikrografik Deri Cerrahisi Departmanı',
        yearsRange: '2015 - 2018',
        title: 'Mohs Cerrahisi Araştırmacısı / Fellow'
      },
      {
        hospitalName: 'İstanbul Deri ve Cerrahi Onkoloji Kliniği',
        department: 'Klinik Cerrahi Birimi',
        yearsRange: '2018 - Günümüz',
        title: 'Medikal Onkolojik Direktör'
      }
    ],
    timeline: [
      {
        id: 't-2-1',
        year: '2023',
        title: 'Burun Kanadı Rekonstrüksiyonu Vaka Serisi',
        category: 'Clinical Case',
        institution: 'Journal of Surgical Oncology',
        description: 'Tümör temizliği sonrası burun kenarı kaybolan 24 hastada alın flebi kaydırma yöntemiyle fonksiyon kaybı olmadan yaptığı plastik onarımları sundu.'
      }
    ],
    reviews: [
      {
        id: 'rev-2-1',
        treatmentType: 'Mohs Cerrahisi ile Kanserli Hücre Temizliği ve Yüz Onarımı',
        patientIdCode: 'Hasta ID: TR-04921 — Sağlık Bakanlığı Entegre Sistemi ile Onaylı',
        verified: true,
        date: '2026-04-09',
        summary: 'Burun ucumdaki yassı hücreli kanserin iz bırakılmadan temizlenmesi sağlandı.',
        text: 'Yüzün tam merkezinde tümör cerrahisi geçirmek estetik kaygı nedeniyle çok korkutucuydu. Serkan Hocamın katman katman kanser hücresi arayan hassas mikrografik cerrahisi sayesinde neredeyse görünmez bir iz ile bu süreçten kurtuldum.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Katman Katman Temizleme Tekniği',
            title: 'Kansersiz Sınır Garanti Edildi',
            text: 'Göz kararı geniş kesim yerine, Serkan Bey dokuyu çok ince soyup laboratuvarda hemen inceledi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-3',
    name: 'Prof. Dr. Tarık Dağdeviren, PhD',
    title: 'Fonksiyonel Nöroşirürji ve Parkinson Tedavi Koordinatörü',
    specialty: 'Nöroloji',
    hospital: 'İstanbul Nöroloji ve Beyin Cerrahisi Enstitüsü',
    city: 'Beşiktaş, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 196,
    credibilityRating: 98,
    verifiedTreatments: 680,
    experienceYears: 22,
    satisfactionRate: 98,
    age: 56,
    about: 'Prof. Dr. Tarık Dağdeviren, stereotaktik beyin ameliyatları ve Derin Beyin Stimülasyonu (DBS - Beyin Pili) alanında dünya çapında üne sahiptir. Klinik çalışmaları, Parkinson titremeleri, distoniler ve ilaçlara dirençli nörolojik ağrı sendromlarını robotik yönlendirmeyle kontrol altına almaya odaklanır.',
    education: [
      'Tıp Fakültesi - Hacettepe Üniversitesi İngilizce Tıp Fakültesi',
      'Nörolojik Bilimler Doktorası (PhD) - Queen Square National Hospital (Londra, İngiltere)',
      'Fonksiyonel Beyin Cerrahisi Fellowluğu - UCSF Medical Center (San Francisco)',
      'Uzmanlık Tezi - "Parkinson Hastalarında Subtalamik Çekirdek Kombinasyonlu Beyin Pili Modellemesi"'
    ],
    specialInterests: [
      'Derin Beyin Stimülasyonu (DBS / Beyin Pili Operasyonları)',
      'MR Altında Odaklanmış Ultrason ile Tremor Cerrahisi (MRgFUS)',
      'Uyanık Beyin Haritalaması ve Motor Yolların Korunması'
    ],
    experienceHistory: [
      {
        hospitalName: 'Queen Square National Hospital, Londra',
        department: 'Nörolojik Bilimler Enstitüsü',
        yearsRange: '2004 - 2008',
        title: 'Doktora Araştırmacısı'
      },
      {
        hospitalName: 'UCSF Medical Center, San Francisco',
        department: 'Fonksiyonel Nöroşirürji Departmanı',
        yearsRange: '2008 - 2014',
        title: 'Klinik Klinik Öğretim Üyesi / Doçent'
      },
      {
        hospitalName: 'İstanbul Nöroloji ve Beyin Cerrahisi Enstitüsü',
        department: 'Fonksiyonel Nöroloji Koordinatörlüğü',
        yearsRange: '2014 - Günümüz',
        title: 'Nöroloji Profesörü & Başhekim'
      }
    ],
    timeline: [
      {
        id: 't-3-1',
        year: '2025',
        title: 'Fonksiyonel Nöroloji Yılın Başarı Madalyası',
        category: 'Award',
        institution: 'Dünya Nöroşirürji Dernekleri Federasyonu',
        description: 'Ameliyat esnasında hedef tespiti zor subtalamik çekirdeklerin izlenmesi için geliştirdiği VR (Sanal Gerçeklik) simülatörü için ödüllendirilmiştir.'
      }
    ],
    reviews: [
      {
        id: 'rev-3-1',
        treatmentType: 'Bilateral Derin Beyin Stimülasyonu (Beyin Pili Ameliyatı)',
        patientIdCode: 'Hasta ID: TR-91823 — Kamu Sağlık Veri Havuzu ile Doğrulandı',
        verified: true,
        date: '2026-01-20',
        summary: '7 senedir hayatımı zindan eden Parkinson titremelerini tamamen arkamda bıraktım.',
        text: 'Nörolojik cerrahinin hassasiyeti inanılmaz derecede yüksek. Tarık Hocam ve haritalama ekibi pillerin tam yerini bulmak için beni ameliyatta uyanık tuttular ve sürekli test ettiler. Sonuçlar tek kelimeyle mucizevi.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Ameliyatta Uyanık Test Süreci',
            title: 'Sesimi Dinlerken Titremem Geçti',
            text: 'Kafamda özel bir çerçeve sabitlenmiş durumdaydı. Ekip beyin sinyallerini tarayıp pili iterken, bir anda elektrik verildi. Yıllardır delice sallanan sağ elim uyanıkken bir saniye içinde durdu.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-4',
    name: 'Prof. Dr. Mert Şenel, MD',
    title: 'Göz Hastalıkları ve Retinal Cerrahi Uzmanı',
    specialty: 'Göz Hastalıkları',
    hospital: 'İstanbul Göz ve Mikrocerrahi Hastanesi',
    city: 'Fatih, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 112,
    credibilityRating: 98,
    verifiedTreatments: 450,
    experienceYears: 20,
    satisfactionRate: 98,
    age: 50,
    about: 'Prof. Dr. Mert Şenel, yeni nesil lazer cerrahileri, katarakt tedavilerinde akıllı mercek uygulamaları ve vitreoretinal cerrahi alanlarında Türkiye\'nin önde gelen hekimlerindendir. Özellikle kornea tabakası ölçümlerinde yapay zeka entegreli haritalandırma çalışmalarına liderlik etmektedir.',
    education: [
      'Lisans ve İhtisas - Hacettepe Üniversitesi Tıp Fakültesi',
      'Retinal Hastalıklar Araştırma Bursu - Münih Ludwig Maximilian Üniversitesi (Almanya)',
      'Doktora Tezi - "Kornea Islaklığı ve Lazer Sonrası Kuruluk Sendromlarında Epitel Koruma Teknolojileri"'
    ],
    specialInterests: [
      'Trifokal Akıllı Mercek Yerleştirilmesi',
      'Katarakt Cerrahisinde Femtosaniyeli Lazer',
      'Makula Dejenerasyonu (Sarı Nokta Hastalığı)'
    ],
    experienceHistory: [
      {
        hospitalName: 'Hacettepe Üniversitesi Tıp Fakültesi Hastanesi',
        department: 'Göz Hastalıkları Anabilim Dalı',
        yearsRange: '2006 - 2010',
        title: 'Asistan Doktor'
      },
      {
        hospitalName: 'Münih Ludwig Maximilian Üniversitesi',
        department: 'Vitreoretinal Ameliyatsal Cerrahi Birimi',
        yearsRange: '2010 - 2014',
        title: 'Klinik Araştırmalar Şefi'
      },
      {
        hospitalName: 'İstanbul Göz ve Mikrocerrahi Hastanesi',
        department: 'Retinal ve Lazer Cerrahi Servisi',
        yearsRange: '2014 - Günümüz',
        title: 'Başhekim / Profesör Uzman'
      }
    ],
    timeline: [
      {
        id: 't-4-1',
        year: '2025',
        title: 'Oftalmolojide Yeni Girişim Ödülü',
        category: 'Award',
        institution: 'Türk Oftalmoloji Derneği',
        description: 'Yapay zeka analizli kornea tarama sistemi geliştirerek cerrahi öncesi ektazi risk tespitini kolaylaştırmıştır.'
      }
    ],
    reviews: [
      {
        id: 'rev-4-1',
        treatmentType: 'Femtosaniye Lazer ve Trifokal Akıllı Mercek Uygulaması',
        patientIdCode: 'Hasta ID: TR-10395 — E-Nabız Entegrasyonu ile Doğrulandı',
        verified: true,
        date: '2026-03-12',
        summary: 'Katarakt ve yakın görme problemimi tek bir operasyonda sıfırladım.',
        text: 'Mert Hocamın güler yüzü ve operasyon öncesi dijital simülasyon sunumu harikaydı. Gözüme yerleştirilen üç odaklı mercekler sayesinde hem kitabı hem de araç ekranını gözlüksüz görebiliyorum.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Detaylı Kornea Analizi',
            title: 'Gözün Tomografisi Çekildi',
            text: 'Göz yapımın akıllı merceğe uygunluğu hassas lazerlerle tarandı. Mert Bey her bir odağın görme alanını bana grafiklerle anlattı.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'Prof. Dr. Canan Aslan, MD',
    title: 'Çocuk Sağlığı ve Alerji İhtisası Uzmanı',
    specialty: 'Çocuk Sağlığı ve Hastalıkları',
    hospital: 'İstanbul Çocuk Sağlığı Araştırma Enstitüsü',
    city: 'Üsküdar, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 320,
    credibilityRating: 98,
    verifiedTreatments: 1950,
    experienceYears: 19,
    satisfactionRate: 99,
    age: 53,
    about: 'Prof. Dr. Canan Aslan, pediatrik alerjiler, astım, atopik dermatit ve çocukluk çağı gelişim takip süreçlerinde tecrübeli bir child hekimidir. Çocuk dostu muayene protokollerinin ve gereksiz antibiyotik kullanımıyla mücadelenin aktif yürütücülerindendir.',
    education: [
      'Tıp Fakültesi - Ankara Üniversitesi Tıp Fakültesi',
      'Pediatri İhtisası - İstanbul Üniversitesi Çapa Tıp Fakültesi',
      'Pediatrik Alerji ve İmmünoloji Yan Dal - Mayo Clinic (ABD)',
      'Tıpta Uzmanlık Tezi - "Atopik Dermatitli Çocuklarda Akıllı Emilim Testleri ve Diyet Planlamasının Etkileri"'
    ],
    specialInterests: [
      'Çocukluk Çağı Astım ve Akciğer Sağlığı',
      'Bebeklerde Alerjik Egzama (Atopik Dermatit)',
      'Çocuk Sağlıklı Gelişim ve Bağışıklık Güçlendirme'
    ],
    experienceHistory: [
      {
        hospitalName: 'Ankara Üniversitesi Tıp Fakültesi Hastanesi',
        department: 'Çocuk Sağlığı ve Hastalıkları',
        yearsRange: '2005 - 2007',
        title: 'Asistan Araştırmacı'
      },
      {
        hospitalName: 'Mayo Clinic, Minnesota (ABD)',
        department: 'Pediatrik İmmünoloji & Alerji Bölümü',
        yearsRange: '2007 - 2011',
        title: 'Baş Alerji Fellow\'u'
      },
      {
        hospitalName: 'İstanbul Çocuk Sağlığı Araştırma Enstitüsü',
        department: 'Pediatri ve Gelişim Takip Anabilim Dalı',
        yearsRange: '2011 - Günümüz',
        title: 'Klinik İhtisas Şefi / Profesör'
      }
    ],
    timeline: [
      {
        id: 't-5-1',
        year: '2024',
        title: 'Akılcı İlaç Kullanımı Danışman Ödülü',
        category: 'Award',
        institution: 'Türkiye Sağlık Tedarik ve Eğitim Derneği',
        description: 'Pediatrik hastalarda doğru tahlil odaklı antibiyotik kullanımını %35 azaltan yerel sağlık projelerine liderlik etti.'
      }
    ],
    reviews: [
      {
        id: 'rev-5-1',
        treatmentType: 'Pediatrik Astım ve Atopik Dermatit Entegre Tedavisi',
        patientIdCode: 'Hasta ID: TR-22941 — Anne/Veli Kimlik Entegrasyonuyla Onaylandı',
        verified: true,
        date: '2026-05-01',
        summary: 'Kızımın dinmeyen öksürük nöbetleri ve cilt kaşıntısı Canan Hocam ile son buldu.',
        text: '6 yaşındaki kızımızda uzun süredir astım ve geçmeyen egzama döküntüleri vardı. Canan Hanım kortizonlu ilaçlar yerine tetikleyici alerjenleri tespit edip beslenmeyi düzenledi ve akıllı takip sistemi verdi. Sürecimiz mükemmel gidiyor.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Alerji Yama Testleri',
            title: 'Tetikleyicileri Bulduk',
            text: 'Cildi yıpratmadan yapılan hassas testlerle yumurta akı ve ev tozu akarlarına karşı ileri duyarlılık tespit edildi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'Op. Dr. Hakan Yılmaz',
    title: 'Ortopedik Cerrahi ve Travma Uzmanı',
    specialty: 'Ortopedi ve Travmatoloji',
    hospital: 'Acıbadem Maslak Hastanesi',
    city: 'Sarıyer, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    rating: 3.5,
    reviewsCount: 74,
    credibilityRating: 72,
    verifiedTreatments: 310,
    experienceYears: 12,
    satisfactionRate: 70,
    age: 44,
    about: 'Op. Dr. Hakan Yılmaz, sporcu yaralanmaları, ön çapraz bağ operasyonları, diz kireçlenmesi ve eklem protezleri alanlarında cerrahi müdahaleler yapmaktadır. Klinik olarak her ne kadar ameliyat başarısı yüksek olsa da hasta yoğunluğundan ötürü muayene ve ameliyat sonrası takiplerinde bekleme süreleri konusunda geribildirimler almaktadır.',
    education: [
      'Lisans ve Tıp Doktoru - Akdeniz Üniversitesi Tıp Fakültesi',
      'Ortopedi ve Travmatoloji İhtisası - Erciyes Üniversitesi tıp fakültesi',
      'Uzmanlık Tezi - "Ön Çapraz Bağ Greft Uygulamalarında Gerginliğin Korunması ve Rehabilitasyon Karşılaştırması"'
    ],
    specialInterests: [
      'Artroskopik Meniskectomy ve Bağ Tamiri',
      'Total Diz ve Kalça Protez Cerrahisi',
      'Platelet-Rich Plasma (PRP) Eklem Enjeksiyonları'
    ],
    experienceHistory: [
      {
        hospitalName: 'Kayseri Eğitim ve Araştırma Hastanesi',
        department: 'Travmatoloji Servisi',
        yearsRange: '2014 - 2018',
        title: 'Asistan ve Pratisyen Uzman'
      },
      {
        hospitalName: 'Özel Doğan Hastanesi',
        department: 'Ortopedi Bölümü',
        yearsRange: '2018 - 2021',
        title: 'Klinik Uzman Doktoru'
      },
      {
        hospitalName: 'Acıbadem Maslak Hastanesi',
        department: 'Ortopedi ve Spor Yaralanmaları Birimi',
        yearsRange: '2021 - Günümüz',
        title: 'Operatör Hekim'
      }
    ],
    timeline: [
      {
        id: 't-6-1',
        year: '2022',
        title: 'Ön Çapraz Bağ Tamirinde Yeni Vida Yerleşimi Makalesi',
        category: 'Publication',
        institution: 'Türkiye Ortopedi Vakfı Bülteni',
        description: 'Biyobozunur vidaların tünel içindeki stabilitesi ve erken yük verme sürelerini incelemiştir.'
      }
    ],
    reviews: [
      {
        id: 'rev-6-1',
        treatmentType: 'Artroskopik Ön Çapraz Bağ Rekonstrüksiyonu',
        patientIdCode: 'Hasta ID: TR-00384 — e-Nabız Barkod Çıktısıyla Teyit Edildi',
        verified: true,
        date: '2025-10-18',
        summary: 'Ameliyatım son derece başarılı geçti ancak takip süreci ilgisizdi.',
        text: 'Çapraz bağ operasyonu geçirdim, Hakan Hocanın cerrahi olarak eli çok iyi ve dizim şu an gayet stabil durumda. Fakat asıl sorun ameliyat sonrasında başladı. Bacağımda aşırı bir ödem ve şişlik oluştuğunda kliniğe ulaşmaya çalıştım. Asistanı Hakan Beyin çok yoğun olduğunu belirterek beni 3 gün bekletti, telefonlarımıza geç yanıt verildi. Muayene sırası beklemek de oldukça yorucu oldu.',
        ratings: {
          explanation: 3,
          success: 5,
          postOp: 2
        },
        journey: [
          {
            phase: 'Aşama 1: Ameliyat Öncesi Karar',
            title: 'Hızlı Tanı Kondu',
            text: 'MR bulguları incelenerek hemen ameliyat kararı verildi. Süreç çok hızlı ilerledi ancak ameliyat riskleri bana çok yüzeysel geçildi.'
          },
          {
            phase: 'Aşama 2: Cerrahi Müdahale',
            title: 'Kusursuz Ameliyat Performansı',
            text: 'Dizimdeki kilitlenme ve kayma hissi ameliyat biter bitmez düzeldi. Cerrahi ekibin ameliyathane içi tutumu son derece iyiydi.'
          },
          {
            phase: 'Aşama 3: Ameliyat Sonrası Yoğun İlgisizlik',
            title: 'Soru Sormakta Zorlandım',
            text: 'Muayenehaneye gittiğimde hoca o kadar yoğundu ki odada sadece 3 dakika kalabildi. Sorularımın çoğunu soramadan çıktım. Ağrı yönetimi takibinde zayıflık yaşadık.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-7',
    name: 'Doç. Dr. Selen Özdemir',
    title: 'Kulak Burun Boğaz ve Rinoplasti Direktörü',
    specialty: 'Kulak Burun Boğaz (KBB)',
    hospital: 'Memorial Şişli Hastanesi',
    city: 'Şişli, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=600',
    rating: 4.1,
    reviewsCount: 92,
    credibilityRating: 81,
    verifiedTreatments: 410,
    experienceYears: 11,
    satisfactionRate: 80,
    age: 42,
    about: 'Doç. Dr. Selen Özdemir, kronik sinüzit ameliyatları, burun içi kemik ve kıkırdak eğriliği (deviasyon) düzeltilmesi ve burun estetiği (Rinoplasti) üzerine çalışmaktadır. Cerrahi planlamalarda simülasyon araçları kullanmaktadır fakat ameliyat sonrası meydana gelebilecek hafif fonksiyonel değişikliklerin önceden hastaya iyi iletilmemesi nedeniyle bazı ortalama geri dönüşler almıştır.',
    education: [
      'Tıp Fakültesi - Ege Üniversitesi Tıp Fakültesi',
      'Uzmanlık Eğitimi - Hacettepe Üniversitesi KBB Anabilim Dalı',
      'Yüksek Lisans / Tez Çalışması - "Rinoplasti Operasyonu Sonrasında Nazal Valv Açısı ve Hava Akımı Stabilizasyonu"'
    ],
    specialInterests: [
      'Fonksiyonel ve Estetik Burun Ameliyatları (Septorinoplasti)',
      'Balon Sinonasti (Kronik Sinüzit Lazer Tedavisi)',
      'Tiroplastik Ses Kısıklığı Cerrahisi'
    ],
    experienceHistory: [
      {
        hospitalName: 'Hacettepe Üniversitesi Hastanesi',
        department: 'Kulak Burun Boğaz Servisi',
        yearsRange: '2015 - 2018',
        title: 'Araştırma Görevlisi Dr.'
      },
      {
        hospitalName: 'Şişli Hamidiye Etfal Hastanesi',
        department: 'Baş ve Boyun Cerrahisi Birimi',
        yearsRange: '2018 - 2021',
        title: 'Devlet Hizmeti Yükümlüsü Uzman Hekim'
      },
      {
        hospitalName: 'Memorial Şişli Hastanesi',
        department: 'KBB ve Estetik Klinikleri',
        yearsRange: '2021 - Günümüz',
        title: 'Klinik Doçenti'
      }
    ],
    timeline: [
      {
        id: 't-7-1',
        year: '2024',
        title: 'Burun İçi Hava Yolu Direnci Analizleri Raporu',
        category: 'Publication',
        institution: 'Laryngoscope Journal',
        description: 'Kemik düzeltilmesi ameliyatları sonrasında mukoza iyileşmesini inceleyen deneysel rapor.'
      }
    ],
    reviews: [
      {
        id: 'rev-7-1',
        treatmentType: 'Septorinoplasti (Burun Eğriliği ve Estetiği)',
        patientIdCode: 'Hasta ID: TR-94520 — Islak İmzalı Epikriz Belgesiyle Teyit Edildi',
        verified: true,
        date: '2025-12-01',
        summary: 'Estetik olarak çok başarılı ancak nefes alma sorunlarım tam bitmedi.',
        text: 'Selen Hanıma burun eğriliği ve estetik kaygılar nedeniyle sinüzit ameliyatıyla birleşik olarak başvurdum. Burnumun dış görüntüsü tam istediğim gibi oldu. Ancak ameliyat sonrasında sol burun deliğimde geceleri hafif bir ıslık sesi ve kuruma oluştu. Bu tür kalıcı fonksiyonel değişikliklerin ameliyattan önce hekim tarafından bana daha ayrıntılı açıklanmasını ve risk uyarısının yapılmasını beklerdim.',
        ratings: {
          explanation: 3,
          success: 4,
          postOp: 3
        },
        journey: [
          {
            phase: 'Etap 1: Fotoğraflı Tasarım',
            title: 'Yüzeysel Bilgilendirme Alabildim',
            text: 'Fotoğraflarım çekilip 3D gösterildi, tasarımda anlaştık ama süreç riskleri üzerinde hiç durulmadı.'
          },
          {
            phase: 'Etap 2: Ameliyat ve Atel Dönemi',
            title: 'Sorunsuz Cerrahi Operasyon',
            text: 'Anestezi ekibi ve hastane personeli çok konforluydu, dikişler acısız alındı.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-8',
    name: 'Dr. Burak Çelik',
    title: 'Genel Cerrahi ve Gastrointestinal Hastalıklar Uzmanı',
    specialty: 'Genel Cerrahi',
    hospital: 'Medical Park Göztepe Hastane Kompleksi',
    city: 'Kadıköy, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1638202993928-7267af8e48b4?auto=format&fit=crop&q=80&w=600',
    rating: 3.2,
    reviewsCount: 52,
    credibilityRating: 64,
    verifiedTreatments: 140,
    experienceYears: 9,
    satisfactionRate: 63,
    age: 38,
    about: 'Dr. Burak Çelik, kasık fıtığı, laparoskopik safra kesesi taş operasyonları ve hemoroid tedavileri üzerine odaklanmıştır. Hastanenin sigorta onay süreçlerindeki idari gecikmeler ve operasyon sonrasında hastaya maliyet bilgilendirmelerinde yaşanan tutarsızlıklar nedeniyle hastaların güven puanlarında düşüşler yaşamaktadır.',
    education: [
      'Tıp Fakültesi - Karadeniz Teknik Üniversitesi Tıp Fakültesi',
      'Genel Cerrahi İhtisası - Haydarpaşa Numune Eğitim Hastanesi',
      'Uzmanlık Tezi - "Laparoskopik Safra Kesesi Operasyonlarında Koledok Yaralanmalarının Önlenmesi"'
    ],
    specialInterests: [
      'Laparoskopik Kese Taş Ameliyatı (Kolesistektomi)',
      'Hemoroid ve Anal Fissür Lazer Uygulamaları',
      'Kasık ve Göbek Fıtığı Onarımları'
    ],
    experienceHistory: [
      {
        hospitalName: 'Giresun Devlet Hastanesi',
        department: 'Acil Genel Cerrahi Servisi',
        yearsRange: '2015 - 2018',
        title: 'Mecburi Hizmet Pratisyen Cerrahi'
      },
      {
        hospitalName: 'Kadıköy Şifa Hastanesi',
        department: 'Genel Cerrahi Bölümü',
        yearsRange: '2018 - 2022',
        title: 'Uzman Hekim'
      },
      {
        hospitalName: 'Medical Park Göztepe',
        department: 'Laparoskopik Cerrahi Bölümü',
        yearsRange: '2022 - Günümüz',
        title: 'Genel Cerrah'
      }
    ],
    timeline: [
      {
        id: 't-8-1',
        year: '2023',
        title: 'Safra Kesesi Ameliyatlarında Erken Taburculuk Kriterleri',
        category: 'Clinical Case',
        institution: 'Medical Park İstanbul Vaka Grubu',
        description: 'Laparoskopik işlemlerden sonraki 8. saat taburcu süreçlerini irdeleyen klinik vaka derlemesi.'
      }
    ],
    reviews: [
      {
        id: 'rev-8-1',
        treatmentType: 'Laparoskopik Safra Kesesi Taşı Ameliyatı',
        patientIdCode: 'Hasta ID: TR-00492 — Ameliyat Faturası ve Sigorta Onayıyla Teyit Edildi',
        verified: true,
        date: '2025-11-14',
        summary: 'İdari operasyon süreci ve ek ücretlendirmede ciddi aksaklıklar yaşandı.',
        text: 'Burak Beyin cerrahisine bir sözüm yok, safra kesemdeki taşları kapalı yöntemle aldı ve şikayetlerim bitti. Ancak hastane idari kadrosu ve hekimin koordinasyonu berbattı. Sigorta şirketinden provizyon onayını almak için kendileri 4 saat boyunca yanlış kodlar girdi, ameliyathanede bekletildim. Ameliyat öncesinde konuşulan maliyetin çok üzerinde ek kalemler çıkarıldı. Cerrahi kontrol randevusu için ise hekimin asistanları aşırı ilgisiz davrandı.',
        ratings: {
          explanation: 2,
          success: 4,
          postOp: 2
        },
        journey: [
          {
            phase: 'Aşama 1: Muayene ve Teşhis',
            title: 'Aceleci Bir Yaklaşım',
            text: 'Tanı aşamasında hekim bana sadece 5 dakika ayırdı, fıtık olup olmadığıma bakmadan hemen kese taşı için gün verdi.'
          },
          {
            phase: 'Aşama 2: İdari Kaos ve Ameliyat',
            title: 'Klinik Güvensizliği',
            text: 'Anlaşmalı kurumlar departmanının hatasından ötürü eşimle ameliyathane kapısında saatlerce stres yaşadık. Cerrahi işlem bitti ama pürüzleri bitmedi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-9',
    name: 'Prof. Dr. Ahmet Kozan',
    title: 'İç Hastalıkları (Dahiliye) Anabilim Dalı Kıdemli Üyesi',
    specialty: 'İç Hastalıkları (Dahiliye)',
    hospital: 'T.C. İstanbul Cerrahpaşa Tıp Fakültesi Hastanesi',
    city: 'Fatih, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=600',
    rating: 2.8,
    reviewsCount: 38,
    credibilityRating: 58,
    verifiedTreatments: 110,
    experienceYears: 27,
    satisfactionRate: 60,
    age: 59,
    about: 'Prof. Dr. Ahmet Kozan, kronik halsizlik, tiroid bozuklukları, diyabet yönetimi ve böbrek fonksiyonları gibi karmaşık dahiliye vakalarını takip etmektedir. Ancak kamu hastanesi yoğunluğu, muayene odasındaki mesafeli/soğuk tavırları ve tahlil sonuçlarını açıklarken hastayı tatmin etmeyen kısa cevaplarla geçiştirmesi nedeniyle güvenilirlik derecelendirmesi düşüktür.',
    education: [
      'Tıp Fakültesi - T.C. İstanbul Üniversitesi Çapa Tıp Fakültesi',
      'İç Hastalıkları İhtisası - İstanbul Eğitim ve Araştırma Hastanesi',
      'Yüksek Lisans / Tez Çalışması - "Diyabetik Nefropatili Hastalarda Mikroalbüminüri ve Böbrek Fonksiyon Koruyucu İlaç Analizleri"'
    ],
    specialInterests: [
      'Gelişmiş Diyabet Tedavileri ve İnsülin Direnci',
      'Haşimato Tiroiditi ve İmmün Hormon Bozuklukları',
      'Kronik Yaşlılık Hastalıkları (Geriatrik Takip)'
    ],
    experienceHistory: [
      {
        hospitalName: 'Cerrahpaşa Tıp Fakültesi',
        department: 'Dahiliye Klinik İhtisası',
        yearsRange: '2000 - 2005',
        title: 'Uzman Başasistan'
      },
      {
        hospitalName: 'Haseki Eğitim ve Araştırma Hastanesi',
        department: 'Dahiliye Kliniği',
        yearsRange: '2005 - 2015',
        title: 'Klinik Şefi'
      },
      {
        hospitalName: 'T.C. İstanbul Cerrahpaşa Tıp Fakültesi',
        department: 'İç Hastalıkları Polikliniği',
        yearsRange: '2015 - Günümüz',
        title: 'Poliklinik Kıdemli Profesörü'
      }
    ],
    timeline: [
      {
        id: 't-9-1',
        year: '2021',
        title: 'Tiroid Nodüllerinde Malignite Riski Sınıflandırması',
        category: 'Clinical Case',
        institution: 'Cerrahpaşa Dahiliye Arşivi',
        description: 'Çoklu nodülleri olan 50 hastanın uzun süreli tiroid hormon değişimlerinin klinik takibi.'
      }
    ],
    reviews: [
      {
        id: 'rev-9-1',
        treatmentType: 'İnsülin Direnci ve Hipotiroidi Teşhis Süreci',
        patientIdCode: 'Hasta ID: TR-00104 — Cerrahpaşa Kamu Tahlil Barkoduyla Doğrulandı',
        verified: true,
        date: '2025-08-23',
        summary: 'Tıbbi bilgisi iyi olabilir ama hekim oldukça soğuk ve ilgisiz.',
        text: 'Aşırı yorgunluk, halsizlik ve kilo verememe şikayetleriyle Cerrahpaşa Tıp Fakültesi özel muayenesine başvurdum. Ahmet Bey şikayetlerimi anlatırken yüzüme dahi bakmadı, sürekli bilgisayara bakıp kafasını salladı. Çok kısa tahliller yazdı, sonuçları göstermeye gittiğimde odasından asistanı aracılığıyla "ilaçlarını yazdırıp eczaneden alsın" haberi yolladı. Hekimden doğrudan bir açıklama, sıcaklık veya güler yüz kesinlikle göremedim. Kamu hastanesi yoğunluğu bu ilgisizliğe mazeret olamaz.',
        ratings: {
          explanation: 1,
          success: 3,
          postOp: 2
        },
        journey: [
          {
            phase: 'Aşama 1: Randevu ve İlk Görüşme',
            title: 'Sadece 3 Dakika Sürdü',
            text: 'Sorularımı kesip aceleyle kan tahlili formunu elime tutuşturdu.'
          },
          {
            phase: 'Aşama 2: Sonuçların Gösterilmesi',
            title: 'Yüz Yüze Görüşemedim',
            text: 'Asistanı odanın kapısından ilacı uzattı. Neden bu ilacı içmem gerektiği bilgisini alamadım.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-10',
    name: 'Doç. Dr. Melis Baran',
    title: 'Perinatoloji ve Yüksek Riskli Gebelikler Uzmanı',
    specialty: 'Kadın Hastalıkları ve Doğum',
    hospital: 'Florence Nightingale Hastanesi',
    city: 'Kadıköy, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 154,
    credibilityRating: 92,
    verifiedTreatments: 760,
    experienceYears: 15,
    satisfactionRate: 93,
    age: 41,
    about: 'Doç. Dr. Melis Baran, riskli gebelik takipleri, detaylı anomali ultrasonları ve zorlu doğum süreçlerinde Kadıköy bölgesinde popüler bir hekimdir. Hasta ilişkisi oldukça empatik olmasına rağmen randevu sürelerinde yaşanan 45 dakikaya varan gecikmeler nedeniyle bazı ufak eleştiriler almaktadır.',
    education: [
      'Tıp Fakültesi - T.C. İstanbul Üniversitesi İstanbul Tıp Fakültesi (Çapa)',
      'Uzmanlık - Zeynep Kamil Kadın ve Çocuk Hastalıkları Eğitim Hastanesi',
      'Yüksek Lisans / Tez - "Yüksek Riskli Gebeliklerde Fetal Doppler Akım Analizleri ile Erken Doğum Bulgularının Korelasyonu"'
    ],
    specialInterests: [
      'Detaylı Obstetrik Ultrasonografi (Perinatoloji)',
      'Preeklampsi (Gebelik Zehirlenmesi) Takipleri',
      'Primer Vajinal Doğum ve Sezaryen Sonrası Normal Doğum (SSVD)'
    ],
    experienceHistory: [
      {
        hospitalName: 'Zeynep Kamil Kadın Doğum Hastanesi',
        department: 'Doğum ve Riskli Gebelik Servisi',
        yearsRange: '2011 - 2015',
        title: 'Asistan Doktor'
      },
      {
        hospitalName: 'Şişli Florence Nightingale Hastanesi',
        department: 'Perinatoloji Bölümü',
        yearsRange: '2015 - 2019',
        title: 'Mütehassıs Kadın Doğum Uzmanı'
      },
      {
        hospitalName: 'Kadıköy Florence Nightingale Hastanesi',
        department: 'Kadın Hastalıkları Polikliniği',
        yearsRange: '2019 - Günümüz',
        title: 'Doçent Klinik Sorumlusu'
      }
    ],
    timeline: [
      {
        id: 't-10-1',
        year: '2023',
        title: 'Plasenta Akreata Vakalarında Rahim Koruma Yöntemleri',
        category: 'Clinical Case',
        institution: 'Florence Onkolojik Doğum Kongresi',
        description: 'Tehlikeli doğum kanamaları riski taşıyan 12 hastada başarılı koruyucu dikiş cerrahisi.'
      }
    ],
    reviews: [
      {
        id: 'rev-10-1',
        treatmentType: 'Riskli İkiz Gebelik ve Sezaryen Doğum',
        patientIdCode: 'Hasta ID: TR-11204 — Doğum Muayene Kaydıyla Teyit Edildi',
        verified: true,
        date: '2025-12-14',
        summary: 'Hekimlik başarısı ve ilgisi harika ama muayenehanede bekletilme süreleri fazla.',
        text: 'İkiz gebeliğimin risklerini Melis Hanım mükemmel bir şekilde yönetti ve sağlıklı bir sezaryen doğum ile bebeklerimizi kucağımıza aldık. Kendisi çok candan, bilgisine sonuna kadar güvenebileceğiniz bir perinatolog. Ancak popülerliğinden ötürü klinikte aşırı bir yığılma mevcut. Randevularımıza her gidişimizde en az 30-40 dakika gecikmeli girebildik, bu da hamile halimle beni çok yordu.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 3
        },
        journey: [
          {
            phase: 'Aşama 1: Gebelik Başlangıcı',
            title: 'Sıcak ve Rahatlatıcı Başlangıç',
            text: 'Düşük risklerimiz varken Melis Hanım bizi çok sakinleştirdi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-11',
    name: 'Doç. Dr. Ömer Soylu',
    title: 'Minimal İnvaziv Üroloji ve Robotik Cerrahi Uzmanı',
    specialty: 'Üroloji',
    hospital: 'Liv Hospital Ulus',
    city: 'Beşiktaş, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&q=80&w=600',
    rating: 4.2,
    reviewsCount: 68,
    credibilityRating: 88,
    verifiedTreatments: 220,
    experienceYears: 12,
    satisfactionRate: 87,
    age: 43,
    about: 'Doç. Dr. Ömer Soylu, endoskopik böbrek taşı tedavileri, prostat büyümesi (HoLEP) cerrahisi ve ürolojik kanserler üzerine cerrahi müdahaleler gerçekleştirmektedir. Klinik başarısı yüksek olmakla birlikte, operasyon sonrası ağrılı iyileşme safhasında ekibine veya kendisine doğrudan erişilebilirlik konusunda hasta memnuniyet puanlarında kayıplar yaşamaktadır.',
    education: [
      'Lisans ve Doktora - Ankara Üniversitesi Tıp Fakültesi',
      'Uzmanlık Eğitimi - Başkent Üniversitesi Üroloji Anabilim Dalı',
      'Yüksek Lisans - "Böbrek Taşı Kırma Sonrası Rezidüel Fragmanların Atılımında Medikal Tedavi Protokolleri"'
    ],
    specialInterests: [
      'Holmium Lazerle Prostat Enükleasyonu (HoLEP)',
      'Retrograd İntrarenal Cerrahi (RIRC - Böbrek Taşı lazer Tedavisi)',
      'Laparoskopik Parsiyel Nefrektomi'
    ],
    experienceHistory: [
      {
        hospitalName: 'Ankara Başkent Hastanesi',
        department: 'Üroloji Servisi',
        yearsRange: '2014 - 2018',
        title: 'Asistan ve Başasistan'
      },
      {
        hospitalName: 'Özel Gaziosmanpaşa Hastanesi',
        department: 'Üroloji Klinik Şefliği',
        yearsRange: '2018 - 2021',
        title: 'Konsültan Uzman'
      },
      {
        hospitalName: 'Liv Hospital Ulus',
        department: 'Robotik ve Minimal İnvaziv Üroloji',
        yearsRange: '2021 - Günümüz',
        title: 'Robotik Operatör Doçent'
      }
    ],
    timeline: [
      {
        id: 't-11-1',
        year: '2023',
        title: 'HoLEP Cerrahisinde İdrar Kaçırma Riskini Önleyen Anatomik Sınırlar',
        category: 'Publication',
        institution: 'European Urology Journal',
        description: 'Büyük hacimli prostatlarda Holmium lazer kesiminin erken dönem kontinans başarısını irdeleyen makale.'
      }
    ],
    reviews: [
      {
        id: 'rev-11-1',
        treatmentType: 'RIRC Lazerle Böbrek Taşı Ameliyatı',
        patientIdCode: 'Hasta ID: TR-22904 — İşlem Faturası ve Epikriz Kaydıyla Onaylandı',
        verified: true,
        date: '2025-10-02',
        summary: 'Başarılı bir operasyon geçirsem de ameliyat sonrası süreçte muayenehaneye ulaşmak zordu.',
        text: 'Böbreğimdeki 18mm büyüklükteki taş için Ömer Hocaya başvurdum. İdrar yolundan girilerek taş lazerle tamamen toz haline getirildi. İdrar yaparken takılan JJ stentin yarattığı sancı ameliyat sonrası beni çok zorladı. Geceleri yaşadığım spazm ağrıları için Liv Hospital acil birimi hekimle doğrudan görüşmeme izin vermedi, asistanına attığım mesajlara ise ancak ertesi gün öğleden sonra yanıt alabildim. Hekimlik becerisi üstün olsa da takibinde zayıf kaldılar.',
        ratings: {
          explanation: 4,
          success: 5,
          postOp: 2
        },
        journey: [
          {
            phase: 'Etap 1: Teşhis Aşaması',
            title: 'Hızlı ve Güvenli Karar',
            text: 'BT tomografi çekildikten hemen sonra açık ameliyat yerine RIRC yöntemi anlatıldı, güven veren üslubu vardı.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-12',
    name: 'Uzm. Dr. Elif Şahin',
    title: 'Psikiyatri ve Erişkin Duygudurum Bozuklukları Uzmanı',
    specialty: 'Ruh Sağlığı ve Hastalıkları (Psikiyatri)',
    hospital: 'Bakırköy Ruh ve Sinir Hastalıkları Hastanesi',
    city: 'Bakırköy, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    reviewsCount: 88,
    credibilityRating: 91,
    verifiedTreatments: 420,
    experienceYears: 10,
    satisfactionRate: 92,
    age: 37,
    about: 'Uzm. Dr. Elif Şahin, anksiyete, dirençli obsesif kompulsif bozukluklar, panik atak ve yetişkin psikofarmakolojisi üzerine uzmandır. Davranışçı terapiler üzerine ek eğitimleri bulunmaktadır lakin devlet hastanesi yoğunluğundan ötürü seans sürelerinin kısalığı konusunda eleştiriler almaktadır.',
    education: [
      'Tıp Doktoru - Dokuz Eylül Üniversitesi Tıp Fakültesi',
      'Uzmanlık Eğitimi - Bakırköy Dr. Mazhar Osman Ruh Sağlığı ve Sinir Hastalıkları Hastanesi',
      'Yüksek Lisans / Tez - "Yetişkinlerde Yaygın Anksiyete Bozukluğunda Kombine BDT ve Seçici Serotonin Gerialım İnhibitörü Kullanımının Karşılaştırılması"'
    ],
    specialInterests: [
      'Bilişsel Davranışçı Terapi (BDT)',
      'Dirençli Anksiyete ve Panik Bozukluk',
      'Yetişkin Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB)'
    ],
    experienceHistory: [
      {
        hospitalName: 'Dokuz Eylül Tıp Fakültesi Hastanesi',
        department: 'Erişkin Ruh Sağlığı Bölümü',
        yearsRange: '2016 - 2018',
        title: 'Klinik İhtisas Öğrencisi'
      },
      {
        hospitalName: 'Özel Erenköy Ruh ve Sinir Hastalıkları Hastanesi',
        department: 'Psikoz ve Şizofreni Akut Servisi',
        yearsRange: '2018 - 2021',
        title: 'Uzman Psikiyatrist'
      },
      {
        hospitalName: 'Bakırköy Ruh Sağlığı ve Sinir Hastalıkları Hastanesi',
        department: 'Duygudurum Bozuklukları Polikliniği',
        yearsRange: '2021 - Günümüz',
        title: 'Poliklinik Koordinatörü'
      }
    ],
    timeline: [
      {
        id: 't-12-1',
        year: '2023',
        title: 'Hızlı Döngülü Bipolar Bozuklukta Yeni Nesil Stabilizör Raporu',
        category: 'Publication',
        institution: 'Türk Psikiyatri Dergisi',
        description: 'İlaç direnci olan 30 hastanın uzun süreli lityum ve valproat kullanım sonuçlarının karşılaştırılması.'
      }
    ],
    reviews: [
      {
        id: 'rev-12-1',
        treatmentType: 'Medikal Panik Atak ve Yaygın Anksiyete Takibi',
        patientIdCode: 'Hasta ID: TR-88492 — Mazhar Osman MHRS Muayene Randevusu ile Doğrulandı',
        verified: true,
        date: '2025-09-12',
        summary: 'Elif Hanım çok bilgili ve sevecen fakat devlet hastanesinde süre kısıtlılığı çok kötü.',
        text: 'Nefes alamama, çarpıntı ve ölüm korkusu krizlerim nedeniyle Elif Hanıma sevk edildim. Reçete ayarlaması ve yaklaşımı çok insaniydi. Kendisi gerçekten dert dinleyen bir psikiyatrist. Gelgelelim devlet hastanesi şartlarında her hastaya sadece 12-15 dakika ayrılabiliyor. Bu süre zarfında insan tam olarak rahatlayıp sorunlarını açamıyor, seanslar hızlı bitmek zorunda kalıyor. Çok daha uzun terapi seansı sunulabilmesi gerekirdi.',
        ratings: {
          explanation: 5,
          success: 4,
          postOp: 3
        },
        journey: [
          {
            phase: 'Aşama 1: İlaç Ayarlaması',
            title: 'Başarılı Yan Etki Kontrolü',
            text: 'İlaca başlarken olabilecek mide bulantısı ve baş ağrılarını çok ince ayarlarla en aza indirdi.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-13',
    name: 'Doç. Dr. Gökhan Talu',
    title: 'Mikrocerrahi Bel Fıtığı ve Omurilik Cerrahi Uzmanı',
    specialty: 'Beyin ve Sinir Cerrahisi (Nöroşirürji)',
    hospital: 'Acıbadem Maslak Hastanesi',
    city: 'Sarıyer, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 104,
    credibilityRating: 94,
    verifiedTreatments: 340,
    experienceYears: 16,
    satisfactionRate: 94,
    age: 46,
    about: 'Doç. Dr. Gökhan Talu, mikroskobik yöntemlerle yapılan bel fıtığı ameliyatları, spinal stenoz (omurilik kanalı daralması) ve periferik sinir sıkışması cerrahileri üzerine odaklanmıştır. Hastalarına ameliyat öncesi ve sonrası 3D anatomik canlandırmalar ile tüm süreçleri titizlikle izletmektedir.',
    education: [
      'Tıp Fakültesi - Marmara Üniversitesi Tıp Fakültesi',
      'Beyin ve Sinir Cerrahisi Uzmanlığı - Hacettepe Üniversitesi Nöroşirürji Anabilim Dalı',
      'Yüksek Lisans / Doktora - "Servikal ve Lomber Mikrodiskektomi Operasyonlarında Faset Eklem Hasarını En Aza İndiren Yaklaşımlar"'
    ],
    specialInterests: [
      'Lomber ve Servikal Mikrodiskektomi (Bel ve Boyun Fıtığı)',
      'Spinal Kanat Enstrümantasyonu (Platin Yerleştirilmesi)',
      'Karpal Tünel Sendromu Mikrocerrahi Gevşetilmesi'
    ],
    experienceHistory: [
      {
        hospitalName: 'Hacettepe Üniversitesi Hastanesi',
        department: 'Nöroşirürji Klinik Servisi',
        yearsRange: '2010 - 2015',
        title: 'Asistan Doktor'
      },
      {
        hospitalName: 'Koç Üniversitesi Hastanesi',
        department: 'Omurga Cerrahi Enstitüsü',
        yearsRange: '2015 - 2020',
        title: 'Yrd. Doçent Cerrahi'
      },
      {
        hospitalName: 'Acıbadem Maslak Hastanesi',
        department: 'Sinir ve Omurilik Cerrahisi Kliniği',
        yearsRange: '2020 - Günümüz',
        title: 'Doçent Cerrahi Şefi'
      }
    ],
    timeline: [
      {
        id: 't-13-1',
        year: '2024',
        title: 'Mikrodiskektomide Nüks Oranlarını Düşüren Yeni Mikroskop Lensleri',
        category: 'Publication',
        institution: 'Neurosurgery Spine Journal',
        description: 'Düşük ısı yayan ve keskin odaklama sunan mikroskobik dikişlerin dural tamir başarılarını irdeleyen vaka serisi.'
      }
    ],
    reviews: [
      {
        id: 'rev-13-1',
        treatmentType: 'Mikrocerrahi Yöntemiyle Çift Seviye Bel Fıtığı Ameliyatı',
        patientIdCode: 'Hasta ID: TR-20194 — Özel Sağlık Poliçe Teyidiyle Onaylandı',
        verified: true,
        date: '2025-07-19',
        summary: 'Yürüyemez halde girdiğim hastaneden ertesi gün ağrısız olarak çıktım.',
        text: 'Sol ayağımda oluşan şiddetli güç kaybı ve geçmeyen ağrılar nedeniyle Gökhan Hocaya başvurdum. fıtığım omurilik kanalına patlamış durumdaydı. Mikrocerrahi yöntemiyle 45 dakikalık konforlu bir ameliyat yaptı. İkinci gün ayağa kalkarak sıfır dikiş acısıyla yürüyebildim. Kendisi son derece nazik ve her dikiş aşamasını röntgenler üzerinde sabırla açıklayan bir tıp insanı.',
        ratings: {
          explanation: 5,
          success: 5,
          postOp: 5
        },
        journey: [
          {
            phase: 'Aşama 1: Şiddetli Ağrı ve Acil Yatış',
            title: 'Hızlı Reaksiyon Süreci',
            text: 'Felç riskimi azaltmak için aynı gece yatışım yapıldı, MR onay işlemlerim 30 dakikada bitti.'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-14',
    name: 'Prof. Dr. Deniz Demir',
    title: 'Gastroenteroloji ve Hepatoloji Klinik Sorumlusu',
    specialty: 'Gastroenteroloji',
    hospital: 'Amerikan Hastanesi',
    city: 'Şişli, İstanbul',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
    rating: 4.3,
    reviewsCount: 78,
    credibilityRating: 89,
    verifiedTreatments: 190,
    experienceYears: 17,
    satisfactionRate: 88,
    age: 54,
    about: 'Prof. Dr. Deniz Demir, gelişmiş endoskopi, kolonoskopi tanı kolları, karaciğer yağlanması, reflü hastalıkları ve irritabl bağırsak sendromu (IBS) üzerine uzmandır. Ancak Amerikan Hastanesi\'nin standart üstü yüksek fiyatlandırmaları ve ameliyatsal teşhis sürecindeki ek asistan ücretleri nedeniyle bazı maliyet eleştirileri barındırmaktadır.',
    education: [
      'Lisans ve İhtisas - İstanbul Üniversitesi İstanbul Tıp Fakültesi (Çapa)',
      'Gastroenteroloji Üst İhtisası - King\'s College Hospital (Londra, İngiltere)',
      'Yüksek Lisans Tezi - "İrritabl Bağırsak Sendromunda Diyet Modifikasyonları ve Bağırsak Florası Rekonstrüksiyonu"'
    ],
    specialInterests: [
      'Girişimsel Endoskopi ve Mukozal Rezeksiyon (EMR)',
      'Kronik Hemoroidal Hastalık Lazer Ablasyonu',
      'Kronik Ülseratif Kolit Tedavileri'
    ],
    experienceHistory: [
      {
        hospitalName: 'Çapa Tıp Fakültesi Gastroenteroloji Kliniği',
        department: 'Hepatoloji Bilim Dalı',
        yearsRange: '2008 - 2011',
        title: 'Başasistan Doç Dr.'
      },
      {
        hospitalName: 'King\'s College Hospital, Londra',
        department: 'Organ Transplantasyonu ve Karaciğer Yetmezliği Bölümü',
        yearsRange: '2011 - 2014',
        title: 'Yabancı Gözlemci Hekim'
      },
      {
        hospitalName: 'Amerikan Hastanesi',
        department: 'Gastroenteroljik Endoskopi Ünitesi',
        yearsRange: '2014 - Günümüz',
        title: 'Klinik Profesörü'
      }
    ],
    timeline: [
      {
        id: 't-14-1',
        year: '2023',
        title: 'IBS Hastalarında Mikrobiyota Çeşitliliğinde Yapay Maya Naklinin Etkileri',
        category: 'Publication',
        institution: 'American Journal of Gastroenterology',
        description: 'Bağışıklık destekli probiyotiklerin sindirim kanallarındaki emilim başarılarının takibi.'
      }
    ],
    reviews: [
      {
        id: 'rev-14-1',
        treatmentType: 'Anestezi Altında Endoskopi ve Kolonoskopi Teşhisi',
        patientIdCode: 'Hasta ID: TR-30491 — Amerikan Hastanesi Protokol Koduyla Doğrulandı',
        verified: true,
        date: '2025-11-03',
        summary: 'Tıbbi teşhis hızı iyi ama tedavi fiyat politikaları aşırı yüksek.',
        text: 'Şiddetli mide yanması ve geçmeyen hazımsızlık şikayetlerim nedeniyle Deniz Beyden randevu aldım. Amerikan Hastanesi şartlarında konforlu şekilde her iki işlemi de uyutularak oldum. Teşhis başarısı refleks ve mide fıtığı saptamasıyla mükemmel yapıldı. Ancak hastanenin başlangıçta verdiği kolonoskopi fiyatına sonradan alınan milimetrik parça patoloji tetkikleri için neredeyse ameliyat fiyatı kadar ek bütçe yansıtmaları bizi çok şaşırttı.',
        ratings: {
          explanation: 4,
          success: 5,
          postOp: 3
        },
        journey: [
          {
            phase: 'Aşama 1: Hazırlık Diyeti',
            title: 'Detaylı Beslenme Çizelgesi',
            text: 'İşlemden 3 gün önce uymam gereken bağırsak boşaltım diyeti çok iyi tasarlanmıştı.'
          }
        ]
      }
    ]
  }
];
