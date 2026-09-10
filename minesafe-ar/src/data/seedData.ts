import { SafetyModule, Question, UserProfile, Attempt, Progress, Certificate, AIFeedback, AdminAnalytics } from '../types';

export const SEED_MODULES: SafetyModule[] = [
  {
    id: 'ppe-safety',
    title: 'Personal Protective Equipment (PPE) in Mines',
    titleHindi: 'खदानों में व्यक्तिगत सुरक्षा उपकरण (पीपीई)',
    description: 'Master mandatory mining safety gear: helmets, reflective jackets, high-ankle steel-toe boots, ear muffs, and dust masks.',
    descriptionHindi: 'अनिवार्य खनन सुरक्षा गियर सीखें: हेलमेट, रिफ्लेक्टिव जैकेट, स्टील-टो बूट, ईयर मफ और डस्ट मास्क।',
    category: 'Personal Protection',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    arEnabled: true,
    published: true,
    createdAt: '2026-01-15T08:00:00Z',
    briefing: {
      title: 'Mandatory DGMS Safety Induction Briefing',
      titleHindi: 'अनिवार्य डीजीएमएस सुरक्षा प्रारंभिक ब्रीफिंग',
      points: [
        'Hard hat with chin-strap must be worn at all times past the security gantry.',
        'High-visibility Class-3 reflective apparel is compulsory in haul roads and underground seams.',
        'Steel-toe safety footwear with slip-resistant puncture-proof soles is required.',
        'Eye and ear protection must be donned prior to approaching heavy drilling or crushing units.'
      ],
      pointsHindi: [
        'सुरक्षा बैरियर के आगे हर समय चिन-स्ट्रैप वाला हार्ड हैट पहनना अनिवार्य है।',
        'हॉल सड़कों और भूमिगत सीमों में उच्च-दृश्यता क्लास-3 रिफ्लेक्टिव वस्त्र अनिवार्य हैं।',
        'फिसलन-रोधी और पंचर-प्रूफ सोल वाले स्टील-टो सुरक्षा जूते आवश्यक हैं।',
        'भारी ड्रिलिंग या क्रशिंग इकाइयों के पास जाने से पहले आंख और कान की सुरक्षा पहनें।'
      ],
      voiceTextEn: 'Welcome to the MineSafe AR Personal Protective Equipment briefing. Before entering any mining sector in Jharkhand, verify that your hard hat, high visibility vest, safety boots, and goggles are secure and undamaged.',
      voiceTextHi: 'माइनसेफ एआर व्यक्तिगत सुरक्षा उपकरण ब्रीफिंग में आपका स्वागत है। झारखंड के किसी भी खनन क्षेत्र में प्रवेश करने से पहले सुनिश्चित करें कि आपका हार्ड हैट, रिफ्लेक्टिव जैकेट, सुरक्षा जूते और चश्मा सुरक्षित और सही हैं।',
      sopReference: 'DGMS Tech Circular No. 04 / Mines Act 1952 Sec 22'
    },
    arScenario: {
      markerTitle: 'MINESAFE-TARGET-01: PPE INSPECTION',
      markerSubtitle: 'Coal Face Incline Entrance - Dhanbad Seam 4',
      objective: 'Identify and correct all 4 safety hazards on the worker before allowing entry into the coal seam.',
      objectiveHindi: 'कोयला सीम में प्रवेश की अनुमति देने से पहले कार्यकर्ता पर सभी 4 सुरक्षा खतरों को पहचानें और ठीक करें।',
      instructions: 'Scan the marker or use simulator. Tap each unsafe item to fit the approved safety gear.',
      instructionsHindi: 'मार्कर स्कैन करें या सिम्युलेटर का उपयोग करें। अनुमोदित गियर फिट करने के लिए प्रत्येक असुरक्षित वस्तु पर टैप करें।',
      targetCount: 4,
      interactiveObjects: [
        {
          id: 'ppe_head',
          name: 'Unprotected Head / Missing Hard Hat',
          nameHindi: 'बिना हेलमेट का सिर / गायब हार्ड हैट',
          isHazard: true,
          hazardDescription: 'Worker is wearing a casual cloth cap. Risk of fatal injury from falling roof rock or coal spall.',
          hazardDescriptionHindi: 'श्रमिक ने साधारण कपड़े की टोपी पहनी है। गिरती छत की चट्टान या कोयले से जानलेवा चोट का खतरा।',
          correction: 'Fitted IS 2925 approved Hard Hat with miner cap-lamp mount and tightened chin strap.',
          correctionHindi: 'माइनर कैप-लैंप माउंट और कड़े चिन स्ट्रैप के साथ अनुमोदित हार्ड हैट लगाया गया।',
          position: [0, 1.8, 0],
          category: 'Head Protection'
        },
        {
          id: 'ppe_torso',
          name: 'Dark Clothing / No Reflective Vest',
          nameHindi: 'काले कपड़े / कोई रिफ्लेक्टिव जैकेट नहीं',
          isHazard: true,
          hazardDescription: 'Low visibility in underground darkness. Heavy dumpers and haulers cannot spot the worker.',
          hazardDescriptionHindi: 'भूमिगत अंधेरे में कम दृश्यता। भारी डंपर और हॉलर कार्यकर्ता को नहीं देख सकते।',
          correction: 'Equipped EN 471 Class 3 Fluorescent Safety Vest with silver retroreflective micro-prismatic bands.',
          correctionHindi: 'सिल्वर रेट्रोरिफ्लेक्टिव बैंड के साथ फ्लोरोसेंट सुरक्षा जैकेट पहनाई गई।',
          position: [0, 1.1, 0],
          category: 'Visibility'
        },
        {
          id: 'ppe_eyes',
          name: 'Unshielded Eyes / Missing Safety Goggles',
          nameHindi: 'बिना सुरक्षा चश्मे की आंखें',
          isHazard: true,
          hazardDescription: 'High velocity airborne coal dust and flying mineral chips cause corneal lacerations.',
          hazardDescriptionHindi: 'हवा में उड़ने वाली कोयले की धूल और उड़ते खनिज चिप्स कॉर्निया को नुकसान पहुंचा सकते हैं।',
          correction: 'Equipped anti-fog UV-rated ballistic polycarbonate safety eye spectacles with side shields.',
          correctionHindi: 'साइड शील्ड्स के साथ एंटी-फॉग यूवी-रेटेड पॉलीकार्बोनेट सुरक्षा चश्मा पहनाया गया।',
          position: [0, 1.65, 0.15],
          category: 'Eye Protection'
        },
        {
          id: 'ppe_feet',
          name: 'Canvas Sneakers / No Steel-Toe Boots',
          nameHindi: 'कैनवास के जूते / बिना स्टील-टो सुरक्षा जूते',
          isHazard: true,
          hazardDescription: 'Substandard footwear prone to puncture from jagged rock, track spikes, and heavy foot crush.',
          hazardDescriptionHindi: 'नुकीले पत्थरों, ट्रैक स्पाइक्स और भारी दबाव से पंक्चर होने की संभावना वाले खराब जूते।',
          correction: 'Laced IS 15298 Certified High-Ankle Safety Boots with 200J steel impact toe cap and anti-skid nitrile sole.',
          correctionHindi: '200J स्टील टो कैप और एंटी-स्किड नाइट्राइल सोल वाले प्रमाणित हाई-एंकल सुरक्षा जूते पहनाए गए।',
          position: [0, 0.1, 0],
          category: 'Foot Protection'
        },
        {
          id: 'ppe_ears',
          name: 'Hearing Conservation Muffs',
          nameHindi: 'ईयर मफ सुरक्षा',
          isHazard: false,
          hazardDescription: 'Ear protection is already staged on the side belt.',
          hazardDescriptionHindi: 'कान की सुरक्षा पहले से ही साइड बेल्ट पर रखी है।',
          correction: 'Equipment already verified safe.',
          correctionHindi: 'उपकरण पहले ही सुरक्षित सत्यापित है।',
          position: [0.35, 1.7, 0],
          category: 'Hearing Protection'
        }
      ]
    }
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Safety & Lockout/Tagout (LOTO)',
    titleHindi: 'विद्युत सुरक्षा और लॉकआउट/टैगआउट (LOTO)',
    description: 'Learn safe de-energization, dielectric PPE, insulation testing, and hazardous arc flash avoidance.',
    descriptionHindi: 'सुरक्षित डी-एनर्जाइजेशन, डाइइलेक्ट्रिक पीपीई, इंसुलेशन टेस्टिंग और खतरनाक आर्क फ्लैश से बचाव सीखें।',
    category: 'Electrical Safety',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    arEnabled: true,
    published: true,
    createdAt: '2026-01-20T10:00:00Z',
    briefing: {
      title: 'High-Voltage Switchgear & LOTO Standard Protocol',
      titleHindi: 'हाई-वोल्टेज स्विचगियर और LOTO मानक प्रोटोकॉल',
      points: [
        'Never open any 415V or 3.3kV panel door without verifying zero energy with a calibrated multimeter.',
        'Attach personal red safety padlock and danger tag before commencing maintenance.',
        'Never work around electrical gear with standing water or soaked clothing.',
        'Wear 1000V rated Class 0 rubber insulating gloves with leather outer protectors.'
      ],
      pointsHindi: [
        'कैलिब्रेटेड मल्टीमीटर से शून्य ऊर्जा सत्यापित किए बिना कभी भी 415V या 3.3kV पैनल का दरवाजा न खोलें।',
        'रखरखाव शुरू करने से पहले व्यक्तिगत लाल सुरक्षा पैडलॉक और खतरा टैग लगाएं।',
        'जमा पानी या गीले कपड़ों के साथ कभी भी विद्युत उपकरणों के आसपास काम न करें।',
        'चमड़े के बाहरी रक्षक के साथ 1000V रेटेड क्लास 0 रबर इंसुलेटिंग दस्ताने पहनें।'
      ],
      voiceTextEn: 'Warning: High Voltage electrical hazards can be fatal within milliseconds. Always isolate the feeder switch, verify zero energy, apply lockout tagout locks, and wear certified dielectric gloves before touching any terminal.',
      voiceTextHi: 'चेतावनी: हाई वोल्टेज बिजली के खतरे मिलीसेकंड में जानलेवा हो सकते हैं। किसी भी टर्मिनल को छूने से पहले हमेशा फीडर स्विच को अलग करें, शून्य ऊर्जा सत्यापित करें, और लॉकआउट टैगआउट लॉक लगाएं।',
      sopReference: 'Central Electricity Authority (Measures relating to Safety & Electric Supply) Reg 2010'
    },
    arScenario: {
      markerTitle: 'MINESAFE-TARGET-02: SUBSTATION PANEL',
      markerSubtitle: 'Underground Dewatering Substation - Bokaro Washery',
      objective: 'Identify 4 dangerous electrical hazards around the 415V MCC panel before maintenance work starts.',
      objectiveHindi: 'रखरखाव कार्य शुरू होने से पहले 415V MCC पैनल के आसपास 4 खतरनाक विद्युत खतरों को पहचानें।',
      instructions: 'Inspect the panel. Identify energized exposed conductors, standing water, and apply the LOTO isolation switch.',
      instructionsHindi: 'पैनल का निरीक्षण करें। खुले कंडक्टर, जमा पानी की पहचान करें और LOTO आइसोलेशन स्विच लगाएं।',
      targetCount: 4,
      interactiveObjects: [
        {
          id: 'elec_switch',
          name: 'Live Main Circuit Breaker / No LOTO Lock',
          nameHindi: 'लाइव मेन सर्किट ब्रेकर / कोई LOTO लॉक नहीं',
          isHazard: true,
          hazardDescription: 'The breaker handle is in CLOSED (ON) state while door is unbolted. Unexpected energization hazard.',
          hazardDescriptionHindi: 'दरवाजा खुला होने पर भी ब्रेकर हैंडल चालू (ON) स्थिति में है। अचानक करंट का खतरा।',
          correction: 'Breaker opened to OFF position, Lockout Hasps attached with individual technician padlocks and Danger Tags.',
          correctionHindi: 'ब्रेकर को OFF स्थिति में किया गया, व्यक्तिगत पैडलॉक और खतरे के टैग के साथ लॉकआउट हस्प लगाया गया।',
          position: [-0.4, 1.4, 0.2],
          category: 'Energy Isolation'
        },
        {
          id: 'elec_cable',
          name: 'Chafed Insulation on 415V Feeder Cable',
          nameHindi: '415V फीडर केबल पर छिला हुआ इंसुलेशन',
          isHazard: true,
          hazardDescription: 'Bare copper conductor exposed due to mechanical rubbing against steel cable tray. Immediate electrocution risk.',
          hazardDescriptionHindi: 'स्टील केबल ट्रे से घर्षण के कारण तांबे का नंगा तार दिख रहा है। तत्काल करंट लगने का खतरा।',
          correction: 'Power de-energized, cable replaced and enclosed in heavy-duty fire-retardant armored conduit.',
          correctionHindi: 'बिजली बंद की गई, केबल को बदला गया और भारी अग्निरोधी बख्तरबंद नाली में बंद किया गया।',
          position: [0.5, 0.6, 0.1],
          category: 'Physical Wiring'
        },
        {
          id: 'elec_water',
          name: 'Standing Puddle of Water in Front of Panel',
          nameHindi: 'पैनल के सामने पानी का जमाव',
          isHazard: true,
          hazardDescription: 'Ground water accumulation creates a low-resistance path to earth through technician body.',
          hazardDescriptionHindi: 'जमा हुआ पानी श्रमिक के शरीर के माध्यम से जमीन तक करंट का तेज मार्ग बना देता है।',
          correction: 'Drainage sump activated, puddle cleared and dry IS 5424 certified vulcanized rubber insulating mat placed.',
          correctionHindi: 'पानी निकाला गया और सूखा प्रमाणित वल्केनाइज्ड रबर इंसुलेटिंग मैट बिछाया गया।',
          position: [0, 0.05, 0.6],
          category: 'Environmental Hazard'
        },
        {
          id: 'elec_gloves',
          name: 'Missing Dielectric Insulating Gloves',
          nameHindi: 'डाइइलेक्ट्रिक इंसुलेटिंग दस्तानों की कमी',
          isHazard: true,
          hazardDescription: 'Technician reached for panel handle bare-handed without testing for stray induced voltage.',
          hazardDescriptionHindi: 'तकनीशियन ने बिना जांच किए नंगे हाथों से पैनल हैंडल को छूने की कोशिश की।',
          correction: 'Equipped Class 0 (1000V) ASTM D120 tested rubber insulating gloves with protective goat-skin outers.',
          correctionHindi: 'सुरक्षात्मक बकरी की चमड़ी वाले कवर के साथ क्लास 0 (1000V) रबर इंसुलेटिंग दस्ताने पहनाए गए।',
          position: [-0.3, 1.1, 0.4],
          category: 'Electrical PPE'
        }
      ]
    }
  },
  {
    id: 'fire-emergency',
    title: 'Fire Safety & Mine Emergency Evacuation',
    titleHindi: 'अग्नि सुरक्षा और खदान आपातकालीन निकासी',
    description: 'Learn fire classifications, PASS extinguisher protocol, toxic mine gas awareness, and self-rescuer deployment.',
    descriptionHindi: 'अग्नि वर्गीकरण, PASS अग्निशामक प्रोटोकॉल, जहरीली खदान गैस जागरूकता और आपातकालीन निकास सीखें।',
    category: 'Emergency Response',
    difficulty: 'Intermediate',
    estimatedMinutes: 14,
    thumbnail: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80',
    arEnabled: true,
    published: true,
    createdAt: '2026-02-01T12:00:00Z',
    briefing: {
      title: 'Underground Conveyor Fire & Self-Rescuer Action Plan',
      titleHindi: 'भूमिगत कन्वेयर आग और आत्म-रक्षक कार्य योजना',
      points: [
        'Pull the manual break-glass fire alarm station immediately upon observing smoke or burning rubber smell.',
        'Never attempt to fight an out-of-control fire or a fire blocking your sole escape exit.',
        'Use the PASS technique for portable extinguishers: Pull pin, Aim nozzle, Squeeze lever, Sweep base.',
        'Don chemical oxygen self-rescuer (SCSR) immediately in toxic Carbon Monoxide (CO) conditions.'
      ],
      pointsHindi: [
        'धुआं या जलते रबर की गंध देखते ही तुरंत मैनुअल ब्रेक-ग्लास फायर अलार्म खींचें।',
        'कभी भी अनियंत्रित आग या आपके एकमात्र निकास मार्ग को अवरुद्ध करने वाली आग से न लड़ें।',
        'अग्निशामक के लिए PASS तकनीक का उपयोग करें: पिन खींचें, नोजल को लक्षित करें, लीवर दबाएं, आधार पर घुमाएं।',
        'जहरीली कार्बन मोनोऑक्साइड (CO) स्थितियों में तुरंत रासायनिक ऑक्सीजन सेल्फ-रेस्क्यूअर पहनें।'
      ],
      voiceTextEn: 'Emergency response protocol: In case of mine fire, activate the audible alarm first. Assess if the fire is small enough for a dry chemical extinguisher using the PASS method, ensure your exit path is clear, and alert the central control room.',
      voiceTextHi: 'आपातकालीन प्रतिक्रिया प्रोटोकॉल: खदान में आग लगने की स्थिति में सबसे पहले अलार्म बजाएं। सुनिश्चित करें कि आपका निकास मार्ग साफ है, PASS विधि का उपयोग करें, और नियंत्रण कक्ष को सतर्क करें।',
      sopReference: 'Coal Mines Regulations 2017 Chapter XII / Fire & Safety'
    },
    arScenario: {
      markerTitle: 'MINESAFE-TARGET-03: FIRE HAZARD SCENE',
      markerSubtitle: 'Belt Conveyor Gallery 2B - Jharia Coalfield',
      objective: 'Identify the active fire threat, activate the alarm, clear the exit blockage, and apply the correct extinguisher.',
      objectiveHindi: 'सक्रिय आग के खतरे की पहचान करें, अलार्म बजाएं, निकास मार्ग की रुकावट हटाएं और सही अग्निशामक का उपयोग करें।',
      instructions: 'Analyze the emergency scene. Tap the fire hazards and execute the safe response tree in order.',
      instructionsHindi: 'आपातकालीन दृश्य का विश्लेषण करें। आग के खतरों पर टैप करें और क्रम में सुरक्षित प्रतिक्रिया वृक्ष को निष्पादित करें।',
      targetCount: 4,
      interactiveObjects: [
        {
          id: 'fire_source',
          name: 'Friction Blaze on Coal Conveyor Roller',
          nameHindi: 'कोयला कन्वेयर रोलर पर घर्षण की आग',
          isHazard: true,
          hazardDescription: 'Seized idler bearing ignited spilled coal dust on moving neoprene conveyor belt. Rapid smoke generation.',
          hazardDescriptionHindi: 'जाम हो चुके रोलर बेरिंग ने कन्वेयर बेल्ट पर गिरे कोयले की धूल में आग लगा दी। तेजी से धुआं फैल रहा है।',
          correction: 'Conveyor interlock pull-wire tripped immediately; targeted dry chemical powder deployed at fire root.',
          correctionHindi: 'कन्वेयर इंटरलॉक तार खींचा गया; आग की जड़ पर सूखा रासायनिक पाउडर छिड़का गया।',
          position: [0.6, 0.9, -0.2],
          category: 'Fire Hazard'
        },
        {
          id: 'fire_alarm',
          name: 'Un-pulled Emergency Break-Glass Alarm',
          nameHindi: 'न खींचा गया आपातकालीन ब्रेक-ग्लास अलार्म',
          isHazard: true,
          hazardDescription: 'Alarm has not been sounded yet. Underground crews in downstream air split are unaware of toxic smoke.',
          hazardDescriptionHindi: 'अलार्म अभी तक नहीं बजाया गया है। हवा के बहाव की ओर काम करने वाले श्रमिकों को धुएं की खबर नहीं है।',
          correction: 'Station glass broken, siren sounded, and central surface control room automated alert dispatched.',
          correctionHindi: 'अलार्म ग्लास तोड़ा गया, सायरन बजा और केंद्रीय नियंत्रण कक्ष को स्वचालित चेतावनी भेजी गई।',
          position: [-0.6, 1.5, 0.1],
          category: 'Alert System'
        },
        {
          id: 'fire_exit',
          name: 'Blocked Emergency Escape Door',
          nameHindi: 'अवरुद्ध आपातकालीन निकास द्वार',
          isHazard: true,
          hazardDescription: 'Discarded wooden lagging timbers and scrap steel pipes stacked in front of illuminated exit door.',
          hazardDescriptionHindi: 'रोशन निकास द्वार के सामने लकड़ी के लट्ठे और कबाड़ पाइप रखे हैं, जिससे रास्ता बंद है।',
          correction: 'Obstructions cleared immediately; emergency exit push-bar verified unobstructed and green exit sign illuminated.',
          correctionHindi: 'रुकावटें तुरंत हटाई गईं; आपातकालीन निकास पुश-बार साफ किया गया और हरा एग्जिट साइन जलाया गया।',
          position: [-0.8, 0.7, -0.5],
          category: 'Evacuation Route'
        },
        {
          id: 'fire_extinguisher',
          name: 'Inspection-Expired Foam Extinguisher for Electrical Seam',
          nameHindi: 'बिजली क्षेत्र के लिए अनुपयुक्त/एक्सपायर अग्निशामक',
          isHazard: true,
          hazardDescription: 'Wrong agent (water/foam) placed near electrical junction box; pressure gauge in red recharge zone.',
          hazardDescriptionHindi: 'विद्युत जंक्शन बॉक्स के पास गलत अग्निशामक रखा है और इसका प्रेशर गेज लाल निशान पर है।',
          correction: 'Replaced with fully charged IS 15683 certified MAP-based ABC Dry Chemical Powder 6kg extinguisher.',
          correctionHindi: 'पूरी तरह से चार्ज प्रमाणित 6 किग्रा एबीसी ड्राई केमिकल पाउडर अग्निशामक से बदला गया।',
          position: [0.2, 0.5, 0.5],
          category: 'Extinguishing Equipment'
        }
      ]
    }
  }
];

export const SEED_QUESTIONS: Question[] = [
  // PPE Safety Questions
  {
    id: 'q_ppe_1',
    moduleId: 'ppe-safety',
    question: 'According to Directorate General of Mines Safety (DGMS) norms, what is the primary function of the chin-strap on a mining helmet?',
    questionHindi: 'महानिदेशालय खान सुरक्षा (DGMS) के नियमों के अनुसार, खनन हेलमेट पर चिन-स्ट्रैप का मुख्य कार्य क्या है?',
    options: [
      'Purely for cosmetic compliance during inspections',
      'To prevent the hard hat from dislodging during head impacts, slips, or roof falls',
      'To hang ear plugs when not actively in use',
      'To hold the miner headlamp battery in balance'
    ],
    optionsHindi: [
      'निरीक्षण के दौरान केवल औपचारिकता दिखाने के लिए',
      'सिर पर चोट, फिसलने या छत गिरने के दौरान हेलमेट को गिरने से बचाने के लिए',
      'उपयोग में न होने पर ईयर प्लग लटकाने के लिए',
      'माइनर हेडलैम्प बैटरी को संतुलित रखने के लिए'
    ],
    correctAnswer: 1,
    explanation: 'A safety helmet without a fastened chin-strap easily falls off when a worker trips or recoils, leaving the head completely unprotected during primary or secondary rock falls.',
    explanationHindi: 'बिना चिन-स्ट्रैप का हेलमेट फिसलने या झटके से तुरंत गिर जाता है, जिससे चट्टान गिरने पर सिर पूरी तरह असुरक्षित हो जाता है।',
    difficulty: 'Easy',
    topic: 'Head Protection',
    published: true
  },
  {
    id: 'q_ppe_2',
    moduleId: 'ppe-safety',
    question: 'Which class of high-visibility safety vest is mandatory in opencast mines and heavy vehicular haulage roads in Jharkhand?',
    questionHindi: 'झारखंड में ओपनकास्ट खदानों और भारी वाहनों की हॉल सड़कों में किस श्रेणी की हाई-विजिबिलिटी सुरक्षा जैकेट अनिवार्य है?',
    options: [
      'Class 1 (Minimal background material)',
      'Class 2 (Standard highway parking)',
      'Class 3 (Maximum fluorescent surface with 360-degree retroreflective bands)',
      'Any dark jacket with fluorescent stickers'
    ],
    optionsHindi: [
      'क्लास 1 (न्यूनतम बैकग्राउंड फैब्रिक)',
      'क्लास 2 (मानक पार्किंग क्षेत्र)',
      'क्लास 3 (360-डिग्री रेट्रोरिफ्लेक्टिव बैंड के साथ अधिकतम फ्लोरोसेंट क्षेत्र)',
      'फ्लोरोसेंट स्टिकर वाली कोई भी साधारण जैकेट'
    ],
    correctAnswer: 2,
    explanation: 'Class 3 safety apparel provides the highest visibility from all angles at distances exceeding 300 meters, critical around 100-tonne haul dumpers.',
    explanationHindi: 'क्लास 3 सुरक्षा वस्त्र 300 मीटर से अधिक की दूरी पर सभी कोणों से उच्चतम दृश्यता प्रदान करते हैं, जो भारी डंपरों के पास जीवन रक्षक है।',
    difficulty: 'Medium',
    topic: 'Visibility PPE',
    published: true
  },
  {
    id: 'q_ppe_3',
    moduleId: 'ppe-safety',
    question: 'Why are standard non-reinforced sports sneakers strictly prohibited in industrial mines and mineral processing yards?',
    questionHindi: 'औद्योगिक खदानों और खनिज प्रसंस्करण यार्डों में साधारण खेल के जूते (स्नीकर्स) सख्त वर्जित क्यों हैं?',
    options: [
      'They make squeaking noises on wet concrete',
      'They lack 200-Joule steel toe impact resistance and puncture-proof steel midsole shanks',
      'They are too colorful for industrial aesthetic standards',
      'They absorb water vapor too rapidly'
    ],
    optionsHindi: [
      'वे गीले कंक्रीट पर आवाज करते हैं',
      'उनमें 200-जूल स्टील टो कैप और पंक्चर-प्रूफ सोल नहीं होता',
      'वे औद्योगिक मानकों के लिए बहुत रंगीन हैं',
      'वे जल वाष्प को बहुत तेजी से अवशोषित करते हैं'
    ],
    correctAnswer: 1,
    explanation: 'Mining safety boots (IS 15298) feature steel or composite toe-caps withstanding 200J falling impacts and puncture plates protecting feet against sharp track dog spikes and jagged quartz.',
    explanationHindi: 'खनन सुरक्षा जूते 200J प्रभाव को झेलने वाले स्टील टो-कैप और नुकीले पत्थरों व कीलों से बचाने वाली पंक्चर प्लेट से लैस होते हैं।',
    difficulty: 'Easy',
    topic: 'Foot Protection',
    published: true
  },
  {
    id: 'q_ppe_4',
    moduleId: 'ppe-safety',
    question: 'When operating in an underground coal environment with Respirable Crystalline Silica (RCS), which respiratory gear is approved?',
    questionHindi: 'रेस्पिरेबल क्रिस्टलीय सिलिका (RCS) वाले भूमिगत कोयला वातावरण में काम करते समय कौन सा श्वसन गियर अनुमोदित है?',
    options: [
      'Standard surgical paper mask',
      'Simple cloth handkerchief tied around mouth',
      'Certified N95 or FFP2/FFP3 particulate respirator fitted with airtight seal',
      'No mask needed if water spraying is done once a week'
    ],
    optionsHindi: [
      'साधारण सर्जिकल पेपर मास्क',
      'मुंह पर बंधा साधारण सूती रुमाल',
      'एयरटाइट सील के साथ प्रमाणित N95 या FFP2/FFP3 पार्टिकुलेट रेस्पिरेटर',
      'हफ्ते में एक बार पानी का छिड़काव होने पर मास्क की जरूरत नहीं'
    ],
    correctAnswer: 2,
    explanation: 'Silica and coal dust particles below 2.5 microns penetrate deep into lung alveoli causing Coal Workers Pneumoconiosis (Black Lung). Only certified particulate respirators filter dangerous respirable dust.',
    explanationHindi: 'सिलिका और कोयले के 2.5 माइक्रोन से छोटे कण फेफड़ों में गहराई तक जाकर ब्लैक लंग बीमारी का कारण बनते हैं। केवल प्रमाणित रेस्पिरेटर ही इसे रोक सकते हैं।',
    difficulty: 'Hard',
    topic: 'Respiratory Protection',
    published: true
  },
  {
    id: 'q_ppe_5',
    moduleId: 'ppe-safety',
    question: 'Before entering an active quarry with acoustic noise levels above 85 dBA (such as rotary blasthole drilling), what must the worker do?',
    questionHindi: '85 dBA से अधिक शोर स्तर वाले सक्रिय खदान क्षेत्र में प्रवेश करने से पहले कार्यकर्ता को क्या करना चाहिए?',
    options: [
      'Don approved hearing protectors (ear plugs or ear muffs with minimum 25dB NRR)',
      'Ignore the sound if acclimatized to working in mines',
      'Listen to high volume music on personal earphones to block the drill noise',
      'Cover ears with bare hands only when the drill explodes'
    ],
    optionsHindi: [
      'अनुमोदित श्रवण रक्षक (न्यूनतम 25dB NRR वाले ईयर प्लग या ईयर मफ) पहनें',
      'यदि खदान में काम करने की आदत हो तो शोर को नजरअंदाज करें',
      'ड्रिल के शोर को रोकने के लिए ईयरफोन पर तेज संगीत सुनें',
      'केवल ड्रिलिंग के समय नंगे हाथों से कान ढकें'
    ],
    correctAnswer: 0,
    explanation: 'Continuous exposure to noise over 85 dBA causes irreversible sensorineural hearing loss. Personal music earphones do not attenuate industrial frequencies.',
    explanationHindi: '85 dBA से अधिक शोर के लगातार संपर्क में रहने से सुनने की क्षमता हमेशा के लिए खत्म हो सकती है। प्रमाणित ईयर मफ अनिवार्य हैं।',
    difficulty: 'Medium',
    topic: 'Hearing Protection',
    published: true
  },

  // Electrical Safety Questions
  {
    id: 'q_elec_1',
    moduleId: 'electrical-safety',
    question: 'What is the absolute first step a maintenance electrician must take before opening an industrial 415V switchgear panel?',
    questionHindi: 'औद्योगिक 415V स्विचगियर पैनल का दरवाजा खोलने से पहले रखरखाव इलेक्ट्रीशियन को सबसे पहला कदम क्या उठाना चाहिए?',
    options: [
      'Wipe the exterior dust with a wet sponge',
      'Disconnect power source, isolate breaker, and attach Lockout/Tagout (LOTO) lock and tag',
      'Tap the metal frame with bare fingers to test for voltage',
      'Bypass the circuit breaker fuses'
    ],
    optionsHindi: [
      'गीले स्पंज से बाहरी धूल पोंछें',
      'बिजली स्रोत को डिस्कनेक्ट करें, ब्रेकर को अलग करें और LOTO लॉक व टैग लगाएं',
      'वोल्टेज जांचने के लिए नंगे हाथों से मेटल फ्रेम को छुएं',
      'सर्किट ब्रेकर फ्यूज को बायपास करें'
    ],
    correctAnswer: 1,
    explanation: 'The primary rule of electrical safety is Positive Isolation through LOTO. Power must be physically broken and locked out before any enclosure is unsealed.',
    explanationHindi: 'विद्युत सुरक्षा का प्राथमिक नियम LOTO के माध्यम से सुरक्षित आइसोलेशन है। किसी भी पैनल को खोलने से पहले बिजली को बंद और लॉक किया जाना चाहिए।',
    difficulty: 'Easy',
    topic: 'LOTO Protocol',
    published: true
  },
  {
    id: 'q_elec_2',
    moduleId: 'electrical-safety',
    question: 'What is the purpose of the "Test Before Touch" rule using a verified two-pole contact voltage tester?',
    questionHindi: 'सत्यापित टू-पोल वोल्टेज टेस्टर का उपयोग करके "छूने से पहले परीक्षण" नियम का क्या उद्देश्य है?',
    options: [
      'To prove zero electrical energy exists across phase-to-phase and phase-to-ground terminals',
      'To check the ambient humidity of the switch room',
      'To test if the tester battery is low only',
      'To drain residual capacitance into the floor'
    ],
    optionsHindi: [
      'यह साबित करने के लिए कि फेज-टू-फेज और फेज-टू-ग्राउंड टर्मिनलों पर शून्य बिजली ऊर्जा मौजूद है',
      'स्विच रूम की नमी की जांच करने के लिए',
      'केवल टेस्टर की बैटरी की जांच के लिए',
      'अवशिष्ट करंट को फर्श में प्रवाहित करने के लिए'
    ],
    correctAnswer: 0,
    explanation: 'Even when switches are thrown, faulty interlocks, backfeeds, or stored capacitor charges can keep terminals lethal. Technicians must verify zero energy using live-dead-live testing.',
    explanationHindi: 'स्विच बंद होने के बाद भी बैकफीड या कैपेसिटर चार्ज टर्मिनलों को घातक बनाए रख सकते हैं। छूने से पहले शून्य ऊर्जा की पुष्टि जरूरी है।',
    difficulty: 'Medium',
    topic: 'Zero Energy Verification',
    published: true
  },
  {
    id: 'q_elec_3',
    moduleId: 'electrical-safety',
    question: 'Why is standing in accumulated mine sump water while manipulating high-voltage switches exceptionally hazardous?',
    questionHindi: 'हाई-वोल्टेज स्विच चलाते समय खदान के जमा पानी में खड़ा होना अत्यधिक खतरनाक क्यों है?',
    options: [
      'Water makes boots muddy',
      'Water drastically reduces total body contact resistance, causing maximum shock current to discharge through vital organs to earth',
      'Water extinguishes sparks too fast',
      'Water cools down the electrical busbars prematurely'
    ],
    optionsHindi: [
      'पानी से जूते गंदे हो जाते हैं',
      'पानी शरीर के संपर्क प्रतिरोध को भारी रूप से कम कर देता है, जिससे घातक करंट शरीर से सीधे जमीन में प्रवाहित होता है',
      'पानी चिंगारी को बहुत तेजी से बुझा देता है',
      'पानी बसबार को समय से पहले ठंडा कर देता है'
    ],
    correctAnswer: 1,
    explanation: 'Dry skin has resistance between 10,000 to 100,000 ohms, but wet skin in standing conductive mine water drops to under 1,000 ohms, converting a minor leakage into fatal ventricular fibrillation.',
    explanationHindi: 'गीले पैरों से शरीर का प्रतिरोध 1000 ओम से भी कम हो जाता है, जिससे मामूली रिसाव भी तुरंत दिल का दौरा और मौत का कारण बन सकता है।',
    difficulty: 'Medium',
    topic: 'Electrocution Physics',
    published: true
  },
  {
    id: 'q_elec_4',
    moduleId: 'electrical-safety',
    question: 'Who is authorized to remove a personal Lockout/Tagout (LOTO) padlock from a de-energized substation isolator?',
    questionHindi: 'बंद सबस्टेशन आइसोलेटर से व्यक्तिगत LOTO पैडलॉक हटाने का अधिकार किसे है?',
    options: [
      'Any coworker who wants to restart the belt quickly',
      'Only the authorized worker who originally placed the lock, after all personnel are accounted for and clear',
      'The contractor driver on site',
      'The security guard at the gate'
    ],
    optionsHindi: [
      'कोई भी सहकर्मी जो बेल्ट को जल्दी चालू करना चाहता है',
      'केवल वही अधिकृत कर्मचारी जिसने लॉक लगाया था, सभी कर्मियों की सुरक्षा जांचने के बाद',
      'साइट पर मौजूद ठेकेदार का ड्राइवर',
      'गेट पर तैनात सुरक्षा गार्ड'
    ],
    correctAnswer: 1,
    explanation: 'One worker, one lock, one key principle. Only the person who put the lock on can take it off. If they are absent, a strict emergency management bypass protocol overseen by the mine manager is legally required.',
    explanationHindi: 'एक कर्मचारी, एक ताला, एक चाबी का नियम। ताला केवल वही व्यक्ति हटा सकता है जिसने इसे लगाया था, ताकि किसी की जान खतरे में न पड़े।',
    difficulty: 'Hard',
    topic: 'LOTO Ownership',
    published: true
  },
  {
    id: 'q_elec_5',
    moduleId: 'electrical-safety',
    question: 'What is an Arc Flash, and what is the primary protective equipment against it?',
    questionHindi: 'आर्क फ्लैश क्या है, और इसके खिलाफ प्राथमिक सुरक्षात्मक उपकरण क्या है?',
    options: [
      'A minor photo flash that blinds the eyes for 2 seconds with zero heat',
      'A high-temperature plasma explosion exceeding 19,000°C caused by phase short-circuit; protected by Arc-Rated (AR) face shields and flame-resistant suits',
      'A laser beam used to align mining conveyor belts',
      'A standard torch light attached to miner helmets'
    ],
    optionsHindi: [
      'एक हल्का फोटो फ्लैश जो बिना गर्मी के 2 सेकंड के लिए आंखों को चकाचौंध करता है',
      'फेज शॉर्ट-सर्किट से उत्पन्न 19,000°C से अधिक का प्लाज्मा विस्फोट; इससे बचाव आर्क-रेटेड सूट और शील्ड से होता है',
      'कन्वेयर बेल्ट को सीधा करने के लिए उपयोग की जाने वाली लेजर लाइट',
      'माइनर हेलमेट से जुड़ी साधारण टॉर्च'
    ],
    correctAnswer: 1,
    explanation: 'Arc flashes vaporize copper busbars instantly, projecting molten shrapnel and lethal acoustic pressure. Arc-rated Category 2 or 4 PPE is mandatory for switchgear opening under potential load.',
    explanationHindi: 'आर्क फ्लैश तांबे को तुरंत वाष्पीकृत कर देता है और भारी विस्फोट करता है। इसके खिलाफ विशेष आर्क-रेटेड सूट और फेस शील्ड अनिवार्य हैं।',
    difficulty: 'Hard',
    topic: 'Arc Flash Mitigation',
    published: true
  },

  // Fire Safety Questions
  {
    id: 'q_fire_1',
    moduleId: 'fire-emergency',
    question: 'What does the acronym PASS stand for when discharging a portable dry chemical fire extinguisher?',
    questionHindi: 'पोर्टेबल ड्राई केमिकल अग्निशामक का उपयोग करते समय PASS शब्द का क्या अर्थ है?',
    options: [
      'Push lever, Alert team, Stop running, Step away',
      'Pull pin, Aim at base of fire, Squeeze handle, Sweep side-to-side',
      'Press gauge, Apply water, Spray smoke, Shield body',
      'Prepare hose, Activate siren, Stop ventilation, Wait for fire brigade'
    ],
    optionsHindi: [
      'लीवर दबाएं, टीम को सतर्क करें, भागना बंद करें, दूर हटें',
      'पिन खींचें (Pull), आग के आधार पर निशाना लगाएं (Aim), हैंडल दबाएं (Squeeze), दाएं-बाएं घुमाएं (Sweep)',
      'गेज दबाएं, पानी डालें, धुएं पर स्प्रे करें, शरीर को ढालें',
      'पाइप तैयार करें, सायरन बजाएं, वेंटिलेशन बंद करें, दमकल का इंतजार करें'
    ],
    correctAnswer: 1,
    explanation: 'PASS is the internationally standardized four-step fire response: Pull locking pin, Aim nozzle at the burning fuel base (not flames), Squeeze operating lever, and Sweep across the hazard width.',
    explanationHindi: 'PASS अंतरराष्ट्रीय अग्निशमन तकनीक है: पिन खींचना (P), आग की जड़ पर निशाना (A), लीवर दबाना (S) और दाएं-बाएं स्प्रे करना (S)।',
    difficulty: 'Easy',
    topic: 'Extinguisher Operations',
    published: true
  },
  {
    id: 'q_fire_2',
    moduleId: 'fire-emergency',
    question: 'In an underground coal mine fire, which toxic gas represents the most lethal immediate threat to workers?',
    questionHindi: 'भूमिगत कोयला खदान की आग में कौन सी जहरीली गैस श्रमिकों के लिए सबसे घातक तत्काल खतरा है?',
    options: [
      'Carbon Monoxide (CO), an odorless, colorless gas that binds with hemoglobin 200 times faster than oxygen',
      'Nitrogen gas, which makes workers feel cold',
      'Water vapor steam from rock humidity',
      'Oxygen enrichment above 25%'
    ],
    optionsHindi: [
      'कार्बन मोनोऑक्साइड (CO), एक गंधहीन व रंगहीन गैस जो ऑक्सीजन से 200 गुना तेजी से हीमोग्लोबिन से जुड़ती है',
      'नाइट्रोजन गैस, जिससे श्रमिकों को ठंड लगती है',
      'चट्टानों की नमी से निकलने वाली भाप',
      '25% से अधिक ऑक्सीजन संवर्धन'
    ],
    correctAnswer: 0,
    explanation: 'Carbon monoxide binds to hemoglobin forming carboxyhemoglobin, asphyxiating victims silently within minutes without irritation warning. Miners must don Self-Rescuers immediately.',
    explanationHindi: 'कार्बन मोनोऑक्साइड खून में ऑक्सीजन का प्रवाह रोक देती है और कुछ ही मिनटों में व्यक्ति बेहोश हो जाता है। खदान में आग लगते ही सेल्फ-रेस्क्यूअर पहनना अनिवार्य है।',
    difficulty: 'Medium',
    topic: 'Mine Atmosphere Toxicology',
    published: true
  },
  {
    id: 'q_fire_3',
    moduleId: 'fire-emergency',
    question: 'What is the correct immediate action if a fire inside a coal conveyor gallery is larger than a wastebasket and spreading rapidly toward your escape route?',
    questionHindi: 'यदि कोयला कन्वेयर गैलरी में आग तेजी से फैल रही है और आपके निकास मार्ग की ओर बढ़ रही है, तो तत्काल सही कदम क्या है?',
    options: [
      'Stay behind and attempt to extinguish it with small hand-held bottles alone',
      'Trigger the alarm, alert all personnel, don Self-Rescuer, and evacuate immediately via the designated intake airway',
      'Hide inside an unventilated blind header',
      'Wait for the fire to burn out of fuel naturally'
    ],
    optionsHindi: [
      'वहीं रुकें और अकेले छोटी बोतलों से आग बुझाने की कोशिश करें',
      'अलार्म बजाएं, सभी को सतर्क करें, सेल्फ-रेस्क्यूअर पहनें और निर्धारित सुरक्षित हवादार रास्ते से तुरंत बाहर निकलें',
      'बिना वेंटिलेशन वाले अंधेरे कोने में छिप जाएं',
      'आग के अपने आप बुझने का इंतजार करें'
    ],
    correctAnswer: 1,
    explanation: 'Never fight a fire that threatens your escape line. The golden rule is: Sound alarm, notify dispatch, don respiratory protection, and evacuate via the fresh air intake split.',
    explanationHindi: 'कभी भी ऐसी आग से न लड़ें जो आपके भागने का रास्ता रोक सकती है। तुरंत अलार्म बजाएं, सेल्फ-रेस्क्यूअर पहनें और ताजी हवा वाले रास्ते से बाहर निकलें।',
    difficulty: 'Medium',
    topic: 'Evacuation Decision Tree',
    published: true
  },
  {
    id: 'q_fire_4',
    moduleId: 'fire-emergency',
    question: 'Why must WATER NEVER be applied to energized electrical panels or transformer oil fires in mineral substations?',
    questionHindi: 'खनिज सबस्टेशनों में बिजली के चालू पैनलों या ट्रांसफार्मर तेल की आग पर कभी भी पानी क्यों नहीं डालना चाहिए?',
    options: [
      'Water cools down the oil too quickly',
      'Water conducts electricity directly to the operator and causes explosive steam vaporization of burning oil',
      'Water damages the paint finish of the substation',
      'Water is too expensive to use in mining'
    ],
    optionsHindi: [
      'पानी तेल को बहुत तेजी से ठंडा करता है',
      'पानी ऑपरेटर को जोरदार करंट पहुंचाता है और जलते तेल पर डालने से भाप का भयानक विस्फोट होता है',
      'पानी सबस्टेशन के पेंट को खराब करता है',
      'खनन में पानी बहुत महंगा है'
    ],
    correctAnswer: 1,
    explanation: 'Water is conductive, shocking anyone holding the stream. Pouring water on boiling transformer oil creates a violent boiling liquid expanding vapor explosion (BLEVE). Use CO2 or dry powder.',
    explanationHindi: 'पानी बिजली का सुचालक है जिससे पानी डालने वाले को करंट लग जाता है, और जलते तेल पर पानी पड़ने से भीषण विस्फोट होता है। CO2 या ड्राई पाउडर का उपयोग करें।',
    difficulty: 'Easy',
    topic: 'Fire Agent Compatibility',
    published: true
  },
  {
    id: 'q_fire_5',
    moduleId: 'fire-emergency',
    question: 'What is a Self-Contained Self-Rescuer (SCSR) and how long does it provide breathable oxygen during a mine fire escape?',
    questionHindi: 'सेल्फ-कंटेंड सेल्फ-रेस्क्यूअर (SCSR) क्या है और यह आग के दौरान कितनी देर सांस लेने योग्य ऑक्सीजन देता है?',
    options: [
      'A portable chemical/compressed oxygen generator providing 30 to 60 minutes of closed-circuit oxygen independent of toxic mine air',
      'A simple paper filter that lasts for 10 hours',
      'An oxygen balloon that inflates a life jacket',
      'A water spray can used to wet face towels'
    ],
    optionsHindi: [
      'एक पोर्टेबल ऑक्सीजन जनरेटर जो खदान की जहरीली हवा से अलग 30 से 60 मिनट तक बंद-सर्किट ऑक्सीजन प्रदान करता है',
      'एक साधारण कागज का फिल्टर जो 10 घंटे चलता है',
      'एक ऑक्सीजन गुब्बारा जो लाइफ जैकेट को फुलाता है',
      'तौलिए गीले करने के लिए पानी का स्प्रे'
    ],
    correctAnswer: 0,
    explanation: 'An SCSR creates a closed breathing loop using KO2 chemical or compressed oxygen, delivering life-sustaining oxygen in zero-oxygen and 100% toxic smoke environments.',
    explanationHindi: 'SCSR एक लाइफ-सेविंग बंद-सर्किट ब्रीदिंग डिवाइस है जो जहरीले धुएं और शून्य ऑक्सीजन में भी 30 से 60 मिनट तक शुद्ध ऑक्सीजन प्रदान करता है।',
    difficulty: 'Hard',
    topic: 'Respiratory Escape Systems',
    published: true
  }
];

export const SEED_TRAINEES: UserProfile[] = [
  {
    uid: 'trainee_01',
    name: 'Ramesh Murmu',
    email: 'ramesh.murmu@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-01-10T09:00:00Z',
    lastLoginAt: '2026-03-08T14:20:00Z',
    mineLocation: 'BCCL Jharia Colliery, Dhanbad'
  },
  {
    uid: 'trainee_02',
    name: 'Pooja Besra',
    email: 'pooja.besra@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'en',
    createdAt: '2026-01-12T10:30:00Z',
    lastLoginAt: '2026-03-09T08:15:00Z',
    mineLocation: 'CCL Piparwar Open Cast, Chatra'
  },
  {
    uid: 'trainee_03',
    name: 'Manoj Tudu',
    email: 'manoj.tudu@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-01-15T11:00:00Z',
    lastLoginAt: '2026-03-07T16:45:00Z',
    mineLocation: 'ECL Rajmahal Open Cast, Godda'
  },
  {
    uid: 'trainee_04',
    name: 'Sunita Soren',
    email: 'sunita.soren@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-01-18T14:10:00Z',
    lastLoginAt: '2026-03-08T11:05:00Z',
    mineLocation: 'Tata Steel West Bokaro Colliery, Ramgarh'
  },
  {
    uid: 'trainee_05',
    name: 'Amit Mahto',
    email: 'amit.mahto@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'en',
    createdAt: '2026-01-20T08:45:00Z',
    lastLoginAt: '2026-03-06T15:30:00Z',
    mineLocation: 'UCIL Jaduguda Uranium Mine, East Singhbhum'
  },
  {
    uid: 'trainee_06',
    name: 'Rajesh Hembram',
    email: 'rajesh.hembram@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-01-25T13:20:00Z',
    lastLoginAt: '2026-03-09T07:50:00Z',
    mineLocation: 'HCL Mosaboni Copper Complex, Ghatsila'
  },
  {
    uid: 'trainee_07',
    name: 'Anil Kumar Singh',
    email: 'anil.singh@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-02-01T09:15:00Z',
    lastLoginAt: '2026-03-05T12:10:00Z',
    mineLocation: 'SAIL Kiriburu Iron Ore Mine, West Singhbhum'
  },
  {
    uid: 'trainee_08',
    name: 'Priya Gope',
    email: 'priya.gope@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'en',
    createdAt: '2026-02-05T10:00:00Z',
    lastLoginAt: '2026-03-08T18:00:00Z',
    mineLocation: 'SAIL Meghahatuburu Mine, West Singhbhum'
  },
  {
    uid: 'trainee_09',
    name: 'Deepak Mundu',
    email: 'deepak.mundu@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-02-10T11:40:00Z',
    lastLoginAt: '2026-03-07T09:30:00Z',
    mineLocation: 'BCCL Kusunda Underground Seam, Dhanbad'
  },
  {
    uid: 'trainee_10',
    name: 'Suman Hansda',
    email: 'suman.hansda@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-02-15T15:25:00Z',
    lastLoginAt: '2026-03-09T06:40:00Z',
    mineLocation: 'Hindalco Bauxite Mines, Lohardaga'
  },
  {
    uid: 'trainee_11',
    name: 'Vikash Kerketta',
    email: 'vikash.kerketta@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'en',
    createdAt: '2026-02-20T12:00:00Z',
    lastLoginAt: '2026-03-04T17:15:00Z',
    mineLocation: 'CCL North Karanpura Washery, Hazaribagh'
  },
  {
    uid: 'trainee_12',
    name: 'Neha Tirkey',
    email: 'neha.tirkey@jharkhandmines.gov.in',
    role: 'TRAINEE',
    preferredLanguage: 'hi',
    createdAt: '2026-02-25T14:50:00Z',
    lastLoginAt: '2026-03-08T13:10:00Z',
    mineLocation: 'NMDC Iron Ore Sinter Plant, Chaibasa'
  }
];

export const DEMO_ADMIN: UserProfile = {
  uid: 'admin_01',
  name: 'Er. S. K. Soren, Chief Safety Director',
  email: 'director.safety@jharkhandmines.gov.in',
  role: 'ADMIN',
  preferredLanguage: 'en',
  createdAt: '2025-12-01T08:00:00Z',
  lastLoginAt: '2026-03-09T07:45:00Z',
  mineLocation: 'Dept of Higher & Technical Education, Ranchi'
};

export const SEED_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_001',
    certificateId: 'MSAR-2026-000101',
    userId: 'trainee_01',
    userName: 'Ramesh Murmu',
    moduleId: 'ppe-safety',
    moduleName: 'Personal Protective Equipment (PPE) in Mines',
    score: 100,
    performanceLevel: 'Excellent',
    issueDate: '2026-03-01',
    verificationCode: 'VERIF-PPE-882193',
    status: 'VERIFIED',
    issuer: 'MineSafe AR Certification Authority',
    stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
  },
  {
    id: 'cert_002',
    certificateId: 'MSAR-2026-000102',
    userId: 'trainee_02',
    userName: 'Pooja Besra',
    moduleId: 'ppe-safety',
    moduleName: 'Personal Protective Equipment (PPE) in Mines',
    score: 80,
    performanceLevel: 'Competent',
    issueDate: '2026-03-02',
    verificationCode: 'VERIF-PPE-441290',
    status: 'VERIFIED',
    issuer: 'MineSafe AR Certification Authority',
    stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
  },
  {
    id: 'cert_003',
    certificateId: 'MSAR-2026-000103',
    userId: 'trainee_02',
    userName: 'Pooja Besra',
    moduleId: 'electrical-safety',
    moduleName: 'Electrical Safety & Lockout/Tagout (LOTO)',
    score: 80,
    performanceLevel: 'Competent',
    issueDate: '2026-03-05',
    verificationCode: 'VERIF-ELE-719302',
    status: 'VERIFIED',
    issuer: 'MineSafe AR Certification Authority',
    stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
  },
  {
    id: 'cert_004',
    certificateId: 'MSAR-2026-000104',
    userId: 'trainee_04',
    userName: 'Sunita Soren',
    moduleId: 'fire-emergency',
    moduleName: 'Fire Safety & Mine Emergency Evacuation',
    score: 100,
    performanceLevel: 'Excellent',
    issueDate: '2026-03-06',
    verificationCode: 'VERIF-FIR-993821',
    status: 'VERIFIED',
    issuer: 'MineSafe AR Certification Authority',
    stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
  },
  {
    id: 'cert_005',
    certificateId: 'MSAR-2026-000105',
    userId: 'trainee_07',
    userName: 'Anil Kumar Singh',
    moduleId: 'ppe-safety',
    moduleName: 'Personal Protective Equipment (PPE) in Mines',
    score: 100,
    performanceLevel: 'Excellent',
    issueDate: '2026-03-07',
    verificationCode: 'VERIF-PPE-102938',
    status: 'VERIFIED',
    issuer: 'MineSafe AR Certification Authority',
    stateDept: 'Department of Higher & Technical Education, Govt of Jharkhand'
  }
];

export const INITIAL_ANALYTICS: AdminAnalytics = {
  totalTrainees: 12,
  trainingCompletions: 34,
  averageScore: 78.4,
  passRate: 76.5,
  certificatesIssued: 26,
  moduleStats: [
    {
      id: 'ppe-safety',
      title: 'PPE & Personal Safety',
      avgScore: 84.6,
      completionRate: 83.3,
      totalAttempts: 15
    },
    {
      id: 'electrical-safety',
      title: 'Electrical Safety & LOTO',
      avgScore: 68.2,
      completionRate: 66.7,
      totalAttempts: 11
    },
    {
      id: 'fire-emergency',
      title: 'Fire & Emergency Response',
      avgScore: 79.1,
      completionRate: 75.0,
      totalAttempts: 8
    }
  ],
  weakTopicFrequencies: [
    { topic: 'Zero Energy Verification / LOTO', count: 7, module: 'Electrical Safety' },
    { topic: 'Arc Flash Mitigation', count: 5, module: 'Electrical Safety' },
    { topic: 'Mine Gas Toxicology (CO & SCSR)', count: 4, module: 'Fire & Emergency' },
    { topic: 'Respirable Dust (Silica Standards)', count: 3, module: 'PPE Safety' }
  ],
  scoreDistribution: [
    { range: '0–49% (Needs Improvement)', count: 3 },
    { range: '50–69% (Basic Understanding)', count: 5 },
    { range: '70–84% (Competent)', count: 14 },
    { range: '85–100% (Excellent)', count: 12 }
  ],
  recentActivity: [
    { id: 'act_1', userName: 'Ramesh Murmu', moduleName: 'PPE Safety', score: 100, status: 'Passed', date: '2026-03-09' },
    { id: 'act_2', userName: 'Pooja Besra', moduleName: 'Electrical Safety', score: 80, status: 'Passed', date: '2026-03-08' },
    { id: 'act_3', userName: 'Deepak Mundu', moduleName: 'Electrical Safety', score: 60, status: 'Failed', date: '2026-03-07' },
    { id: 'act_4', userName: 'Sunita Soren', moduleName: 'Fire Emergency', score: 100, status: 'Passed', date: '2026-03-07' },
    { id: 'act_5', userName: 'Manoj Tudu', moduleName: 'PPE Safety', score: 80, status: 'Passed', date: '2026-03-06' }
  ]
};
