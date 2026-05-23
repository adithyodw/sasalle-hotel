import { Room, Language } from './types';

export const ROOMS: Room[] = [
  {
    id: 'heritage-suite',
    name: 'The Heritage Suite',
    collection: 'Collection I',
    price: 850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoqw7pgaZjEsdUcRL1t0Phx9fYGCOZEdrud75PWInPwshhE-xNEoXY29oRiOs9z3PWmKrZ5HaPzUJZxEU66Q0x7uIoP9SvIUC26ryQsYz4H_BMkn9XV-g3kgsuA_QxvInY72Ay2XaNWLmVeAoKzIclHVb-DMkqRY7MAW4Gn7ZYD2sT1z2ZTXqrmowCJpgWLG1aaPiOPtm_y8dJzPCcm6TLpQMBe3BMI_XzVW9pKDA5Tq-WvAjeY2CR-uAmFASanH7I4APFITRVrblF',
    description: 'A dialogue between history and modernity, featuring hand-fired Hijau Nyonya accents and reclaimed timber floors.',
    size: '120 sqm',
    bed: 'Bespoke Emperor King',
    occupancy: 2,
    highlight: 'Steaming basalt stone tub with custom arched nature views',
    details: [
      'Glazed Hijau Nyonya ceramic wall tiles catching the soft Indonesian mist',
      'Solid Indonesian reclaimed teakwood flooring',
      'Floor-to-ceiling arched glass windows peering into tropical mist gardens',
      'Exclusive bathroom sanctuary with raw volcanic stone freestanding tub',
      'Integrated smart lighting to preserve biological clock synchronization'
    ]
  },
  {
    id: 'obsidian-studio',
    name: 'The Obsidian Studio',
    collection: 'Collection II',
    price: 620,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuVVis-tkIaOPiUz-HtuV9tb6HaY3ehGTHW2c1NNlc1nfC0eGY694Y60dzdPwYUdidP_5atw_Kn6gF8dhC7vIAYaNhd5-JTopFmKNtLMgoj-sRVJLKhbmwdQJvwBM_FleEhHPFGHJ7tf4LF18336JdelRiwiocAALi-7jKxXjAKZQeOjQ8VGqz096xRWA06hlC5Ock_Qyg3FdbxLVvQQFCyebAFgvky1NVSvCW7Jlt7wkwwbI6FPWz1XaAWM9qINV5R4TWkMpZj3PI',
    description: 'Defined by its structural purity, this studio utilizes light-absorbing materials to create a cocoon of silence.',
    size: '95 sqm',
    bed: 'Bespoke Platform King',
    occupancy: 2,
    highlight: 'Cocoon of pure light-absorbing basalt and dramatic custom textures',
    details: [
      'Moist and acoustic-insulated black basalt architecture walls',
      'Dark basalt customized low-profile furniture blocks',
      'Floor-to-ceiling glass panel facing Batam’s raw coastal lines at dusk',
      'Fine Italian linen bedding in crisp contrast white',
      'Minimalist bathroom carved entirely from deep charcoal limestone slabs'
    ]
  },
  {
    id: 'ivory-pavilion',
    name: 'The Ivory Pavilion',
    collection: 'Collection III',
    price: 1150,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7ex9rTQTGXxBCiVG57WxsfAcD8wfMAQBs76IWGbREyXHjFyx2Ql8XSsESYtDg1CrhK9KvfLtb1P9sOyCB5nlSEYdxuTCfu1wlx2AI1EsYs4sRz_VP62-FWvj7HAoA015k_fck-1kNJQOZjjTmpEnuCsdYXPlg9BEkYR58KXzP4hdlexEtDn12Cz06tmKn3271QcljBX88rOsxMcXTXu5tN3TItdKpfamR8tuHU7tYA-5jjNK8chLMnO5rhxhmptR_3U1Fb1i2stD',
    description: 'An ethereal retreat flooded with natural light, featuring lime-wash finishes and organic textures.',
    size: '180 sqm',
    bed: 'Double Imperial King',
    occupancy: 4,
    highlight: 'Ethereal custom lime-washed timber ceiling and private sun deck',
    details: [
      'Exquisite neutral lime-wash rendering on architectural columns',
      'Double high ceiling framing natural breeze lines',
      'Fine linen sheer curtains diffusing tropical sunlight',
      'Handcrafted clay pottery visual accents from local artisans',
      'Organic mineral fireplace sitting as the center geometric anchor'
    ]
  }
];

export const DICTIONARY: Record<string, Record<Language, string>> = {
  // Navigation
  "reservations": {
    "en": "RESERVATIONS",
    "id": "RESERVASI",
    "zh": "极奢预订"
  },
  "home": {
    "en": "HOME",
    "id": "BERANDA",
    "zh": "殿堂首页"
  },
  "rooms": {
    "en": "ROOMS",
    "id": "KAMAR SUITE",
    "zh": "套房艺术"
  },
  "key": {
    "en": "DIGITAL KEY",
    "id": "KUNCI DIGITAL",
    "zh": "数字钥匙"
  },
  "concierge": {
    "en": "CONCIERGE",
    "id": "PELAYANAN",
    "zh": "奢华礼宾"
  },
  "admin": {
    "en": "OPERATIONS",
    "id": "OPERASIONAL",
    "zh": "后台管理"
  },
  // Home Text
  "hero_subtitle": {
    "en": "ESTABLISHED MCMXXIV",
    "id": "TERTATA SEJAK MCMXXIV",
    "zh": "始创于 1924 年"
  },
  "hero_title": {
    "en": "The Art of Deep Presence",
    "id": "Seni Kehadiran Seutuhnya",
    "zh": "深邃感官的驻留艺术"
  },
  "section1_num": {
    "en": "SECTION 01",
    "id": "BAGIAN 01",
    "zh": "核心美学 01"
  },
  "section1_title": {
    "en": "The Ritual of the Stay",
    "id": "Ritual Dalam Berdiam",
    "zh": "栖居的感官仪式"
  },
  "section1_desc": {
    "en": "Architecture is more than form; it is a sensory dialogue between the earth's raw elements and the human spirit. At SASALLE, we curate stillness through stone and linen.",
    "id": "Arsitektur melampaui batas wujud fisik; ia adalah dialog yang menyentuh panca indera antara elemen bumi dan suksma manusia. Di SASALLE, kami membingkai sunyi lewat untaian batu dan kain linen.",
    "zh": "建筑非徒具外在形式，而是大地原生媒介与人类灵魂的深度共鸣。在沙萨勒，我们借温润石英与自然亚麻织就恒久的静止感。"
  },
  "craft_title": {
    "en": "Material Honesty",
    "id": "Kejujuran Material",
    "zh": "筑物材质的真实之美"
  },
  "craft_desc": {
    "en": "Untouched textures that ground the senses in the physical world.",
    "id": "Tekstur murni tanpa cela yang menambatkan indera Anda pada realitas material bumi.",
    "zh": "摒弃修饰的原生肌理，极尽克制沉稳，重塑身体在物理维度的感官触及。"
  },
  "space_title": {
    "en": "The Quietude",
    "id": "Tenteram Senyap",
    "zh": "侘寂之境 (The Quietude)"
  },
  "space_desc": {
    "en": "Expansive volumes designed to facilitate a state of effortless being.",
    "id": "Sajian volume lapang demi mewujudkan kondisi kedamaian batin tanpa terbeban.",
    "zh": "精雕细琢的宏广尺度，借光线、影调与声学阻断，使精神自由舒展、不假外求。"
  },
  "stillness_banner": {
    "en": "Stillness as Luxury",
    "id": "Keheningan Sebagai Kemewahan",
    "zh": "绝对静谧即是至臻奢华"
  },
  "discover_rooms": {
    "en": "DISCOVER SANCTUARIES",
    "id": "TELUSURI SANCTUARY",
    "zh": "探索灵魂圣殿"
  },
  "house_principles": {
    "en": "The House Principles",
    "id": "Etika Agung Kediaman",
    "zh": "沙萨勒庄园栖居法则"
  },
  "p1_title": {
    "en": "Tactile Integrity",
    "id": "Integritas Taktil Murni",
    "zh": "原材触感的完整性"
  },
  "p2_title": {
    "en": "Silent Service",
    "id": "Layanan Dalam Sunyi",
    "zh": "无形而极致的隐形伺服"
  },
  "p3_title": {
    "en": "Chrono-Minimalism",
    "id": "Minimalisme Waktu (Chrono)",
    "zh": "时间的纯粹极简主义"
  },
  // Rooms page
  "residential_architecture": {
    "en": "RESIDENTIAL ARCHITECTURE",
    "id": "ARSITEKTUR RESIDENSIAL",
    "zh": "当代高端建筑典范"
  },
  "sanctuaries_stillness": {
    "en": "Sanctuaries of Material Stillness",
    "id": "Ruang Sunyi dan Kediaman Agung",
    "zh": "大理石与粘土之上的避世幽境"
  },
  "view_sanctuary": {
    "en": "VIEW SANCTUARY",
    "id": "AMATI SANCTUARY",
    "zh": "尊享入内探索"
  },
  "starting_from": {
    "en": "Starting From",
    "id": "Mulai Dari",
    "zh": "体验奉献价起"
  },
  // Spa Page
  "spa_title": {
    "en": "The Architectural Stillness",
    "id": "Suhu Keheningan Arsitektur",
    "zh": "水之殿堂的宁静回响"
  },
  "spa_intro_quote": {
    "en": "\"Restoration through architectural silence.\"",
    "id": "\"Pemulih jiwa melalui arsitektur yang hening.\"",
    "zh": "“借静默的砖石秩序重塑疲惫之躯”"
  },
  "spa_intro_body": {
    "en": "Experience SASALLE's spa—a museum of the senses. Here, we honor the permanence of stone, the warmth of clay, and the clarity of water. Every ritual is designed as a physical dialogue between the body and the space it inhabits.",
    "id": "Saksikan spa SASALLE—museum panca indera yang agung. Kami menghayati keabadian batu, kehangatan lempung merah, serta kemurnian aliran air. Setiap ritual dirancang sebagai sebuah bahasa spiritual yang menyatukan raga Anda ke dalam dimensi arsitektural.",
    "zh": "亲临沙萨勒理疗殿堂——这是声色和触觉的感官艺术馆。我们致敬巨石的静立、粘土的微温、以及水流的洞澈。每一节疗愈，皆是人体生命律动与物理宇宙介质的静默交谈。"
  },
  "curated_experiences": {
    "en": "CURATED EXPERIENCES",
    "id": "PENGALAMAN PILIHAN",
    "zh": "全球甄选体验"
  },
  "sanctuary_rituals": {
    "en": "Sanctuary Rituals",
    "id": "Ritual Suaka Agung",
    "zh": "水疗奢享套系"
  },
  "stone_ritual": {
    "en": "The Stone Bathing Ritual",
    "id": "Ritual Mandi Batu Basalt",
    "zh": "玄武古石温愈热疗"
  },
  "clay_wrap": {
    "en": "The Hijau Nyonya Clay Wrap",
    "id": "Balutan Lempung Hijau Nyonya",
    "zh": "特制印尼娘惹绿翡翠泥裹覆"
  },
  "reserve_moment": {
    "en": "Reserve Your Moment",
    "id": "Kunci Waktu Kedamaian Anda",
    "zh": "预约尊贵静谧"
  },
  "reserve_moment_desc": {
    "en": "Our sanctuary concierge is available to curate a bespoke wellness journey tailored to your physical narrative.",
    "id": "Concierge kami siap menata garis waktu relaksasi yang diselaraskan khusus untuk raga agung Anda.",
    "zh": "水疗礼宾团队随时效劳，竭诚为您编写契合个人气血生机的量身定制定制理疗旅程。"
  },
  "inquire_ritual": {
    "en": "INQUIRE FOR A RITUAL",
    "id": "HUBUNGI CONCIERGE SPA",
    "zh": "奢华邀约尊享"
  },
  // Dining Page
  "dining_subtitle": {
    "en": "NOW SERVING",
    "id": "SEDANG BERLANGSUNG",
    "zh": "至臻上膳空间"
  },
  "dining_title": {
    "en": "The Brick & Iron",
    "id": "Ruang Bata & Besi Saji",
    "zh": "砖窑与铸铁 (The Brick & Iron)"
  },
  "seasonal_manifestations": {
    "en": "Seasonal Manifestations",
    "id": "Manifestasi Harmoni Musiman",
    "zh": "风土与四季的物质投影"
  },
  "dining_desc": {
    "en": "A dialogue between the elemental and the refined. Our menu is a curated progression through the textures of the landscape, translated into architectural plates.",
    "id": "Dialog sublim antara yang purba dan yang luhur. Menu kami merupakan kemajuan tertib melintasi tekstur lansekap Batam, diterjemahkan menjadi piring-piring seni bercita rasa arsitektur.",
    "zh": "一幕在粗粝原质与细腻烹饪艺术之间的默契调解。奢华菜单如同一首地理交响诗，将万物肌理转化为舌尖上的立体构成。"
  },
  "phase1_title": {
    "en": "Phase I: Earth",
    "id": "Tahap I: Tanah Subur",
    "zh": "第一纪：重土 (Earth)"
  },
  "phase1_desc": {
    "en": "Root textures. Smoked clay. Subterranean aromatics. A study in the permanence of the soil.",
    "id": "Tekstur umbi terpendam. Clay yang diasapi. Rempah tanah harum. Sebuah ulikan atas keabadian tanah liat.",
    "zh": "生根块茎。熏烧粘土微尘。幽暗地底芳香物。这是一场对永恒大地深处之养分与土壤酸碱度的研究。"
  },
  "phase2_title": {
    "en": "Phase II: Metal",
    "id": "Tahap II: Besi Tempa",
    "zh": "第二纪：熔金 (Metal)"
  },
  "phase2_desc": {
    "en": "Conductive heat. Cold-pressed reduction. The precision of the blade meets the intensity of the flame.",
    "id": "Konduktivitas suhu tinggi. Reduksi perahan dingin. Ketajaman bilah pisau bertemu dengan amukan bara api.",
    "zh": "传导高热。冷榨纯粹浸膏。锋利钢刃的规整，与熊熊铸炉焰火在时间刻度里的交响。"
  },
  "phase3_title": {
    "en": "Phase III: Glass",
    "id": "Tahap III: Kaca Jernih",
    "zh": "第三纪：熔晶 (Glass)"
  },
  "phase3_desc": {
    "en": "Translucence. Fragile crystalline structures. Sweetness filtered through clarity and light.",
    "id": "Efek semi-transparan. Struktur kristal rapuh yang anggun. Rasa manis surgawi disaring lewat pendaran cahaya murni.",
    "zh": "半透明的光束折射。脆弱的水晶微晶态空间。透过水晶般晶莹清澈的光晕，滤出的无糖清冽甘甜。"
  },
  "secure_table": {
    "en": "Secure a Table",
    "id": "Pesan Meja Restorasi",
    "zh": "预约珍藏席位"
  },
  "guests": {
    "en": "GUESTS",
    "id": "JUMLAH TAMU",
    "zh": "华席贵客"
  },
  "calendar": {
    "en": "CALENDAR",
    "id": "KALENDER SELEKSI",
    "zh": "甄选日期"
  },
  "available_hours": {
    "en": "AVAILABLE HOURS",
    "id": "JAM YANG TERSEDIA",
    "zh": "可侍时间"
  },
  "request_reservation": {
    "en": "REQUEST RESERVATION",
    "id": "KIRIM PERMINTAAN MEJA",
    "zh": "申请尊贵膳席"
  },
  "reservation_subtext": {
    "en": "Confirmations are subject to architectural availability.",
    "id": "Konfirmasi mutlak bergantung pada kelonggaran tempat sedia.",
    "zh": "席位最终确认受当日空间物理容量及静谧度等级限制。"
  },
  // Dynamic features
  "pre_arrival": {
    "en": "Pre-Arrival Settings",
    "id": "Pengaturan Pra-Kedatangan",
    "zh": "抵达前尊享定制"
  },
  "pillows": {
    "en": "Pillow Menu",
    "id": "Pilihan Bantal",
    "zh": "寝枕定制菜单"
  },
  "temp": {
    "en": "Room Climate",
    "id": "Suhu Udara Kamar",
    "zh": "室内精确气温"
  },
  "transfer": {
    "en": "Elite Airport Transfer",
    "id": "Antar Jemput Bandara Eksklusif",
    "zh": "机场豪车接驳"
  },
  "dining_service": {
    "en": "In-Room Dining",
    "id": "Makan Di Dalam Kamar",
    "zh": "客房尊尚私宴"
  },
  "housekeeping": {
    "en": "Housekeeping service",
    "id": "Pelayanan Tata Griya",
    "zh": "房务静默打理"
  },
  "chat_placeholder": {
    "en": "Inquire with Sasalle Concierge...",
    "id": "Diskusikan dengan Concierge Sasalle...",
    "zh": "向沙萨勒奢华礼宾致询..."
  },
  // Key page
  "key_title": {
    "en": "Digital Room Sanctuary Key",
    "id": "Kunci Digital Suaka Kamar",
    "zh": "数码栖居殿堂钥匙"
  },
  "key_desc": {
    "en": "Hold close to the custom clay lock plate. Experience seamless, secure architectural access.",
    "id": "Dekatkan ke plat kunci tanah liat kustom pintu. Nikmati akses masuk arsitektur tanpa hambatan.",
    "zh": "将钥匙紧贴定制的印尼窑烧粘土锁盘。体验无死角、静静滑开的殿堂门禁。"
  },
  "unlocked_message": {
    "en": "Sanctuary Access Granted. Welcome Home.",
    "id": "Akses Suaka Terbuka. Selamat Datang Di Rumah.",
    "zh": "栖居门锁已温和滑开。恭迎归府。"
  },
  "slide_to_unlock": {
    "en": "SLIDE TO DISENGAGE RESTRAINT",
    "id": "GESER UNTUK MEMBUKA KUNCI",
    "zh": "右滑温和解锁大门"
  },
  "app_title": {
    "en": "SASALLE SYSTEM",
    "id": "SISTEM SASALLE",
    "zh": "沙萨勒酒店系统"
  }
};

export const INITIAL_BOOKINGS = [
  {
    id: 'RSV-0104',
    roomId: 'heritage-suite',
    roomName: 'The Heritage Suite',
    checkIn: '2026-06-15',
    checkOut: '2026-06-20',
    guests: 2,
    totalAmount: 4250,
    status: 'confirmed' as const,
    preferences: {
      pillowType: 'feather' as const,
      roomTemp: 21.5,
      dietaryNotes: 'Gluten-free preference',
      preArrivalPantry: ['Vanuatu Cocoa Beans', 'Sparkling Mineral Spring Water'],
      airportTransfer: {
        enabled: true,
        flightNumber: 'GA-152',
        arrivalTime: '14:30',
        vehiclePref: 'velfire' as const
      }
    }
  }
];

export const INDONESIA_BOTANICALS = [
  'Lemongrass Infusion Oils',
  'Sumatran Jasmine Mist',
  'Batam Sea Kelp Scent',
  'Aged Sandalwood Sticks',
  'Volcanic Clay Soap'
];
