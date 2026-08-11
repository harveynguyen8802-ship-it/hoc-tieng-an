// =====================================================
// MOCK DATA - Dữ liệu mẫu đầy đủ cho ứng dụng
// =====================================================

export const MOCK_VOCABULARY = [
  // A1 - Daily
  { word: 'hello', ipa: '/həˈloʊ/', meaning: 'xin chào', partOfSpeech: 'exclamation', example: 'Hello, how are you today?', exampleVi: 'Xin chào, hôm nay bạn có khỏe không?', synonyms: ['hi', 'greetings'], antonyms: ['goodbye'], collocations: ['say hello', 'hello there'], topic: 'daily', level: 'A1' },
  { word: 'family', ipa: '/ˈfæm.əl.i/', meaning: 'gia đình', partOfSpeech: 'noun', example: 'I love my family very much.', exampleVi: 'Tôi yêu gia đình tôi rất nhiều.', synonyms: ['relatives', 'kin'], antonyms: [], collocations: ['family member', 'family time'], topic: 'family', level: 'A1' },
  { word: 'work', ipa: '/wɜːrk/', meaning: 'công việc, làm việc', partOfSpeech: 'verb/noun', example: 'I work at a software company.', exampleVi: 'Tôi làm việc tại một công ty phần mềm.', synonyms: ['job', 'labor'], antonyms: ['rest'], collocations: ['go to work', 'work hard'], topic: 'work', level: 'A1' },
  { word: 'food', ipa: '/fuːd/', meaning: 'thức ăn', partOfSpeech: 'noun', example: 'The food is delicious.', exampleVi: 'Thức ăn rất ngon.', synonyms: ['meal', 'cuisine'], antonyms: [], collocations: ['fast food', 'junk food'], topic: 'food', level: 'A1' },
  { word: 'house', ipa: '/haʊs/', meaning: 'ngôi nhà', partOfSpeech: 'noun', example: 'My house is small but cozy.', exampleVi: 'Nhà tôi nhỏ nhưng ấm cúng.', synonyms: ['home', 'residence'], antonyms: [], collocations: ['at home', 'house key'], topic: 'home', level: 'A1' },
  { word: 'friend', ipa: '/frend/', meaning: 'bạn bè', partOfSpeech: 'noun', example: 'She is my best friend.', exampleVi: 'Cô ấy là bạn thân nhất của tôi.', synonyms: ['pal', 'buddy'], antonyms: ['enemy'], collocations: ['make friends', 'close friend'], topic: 'daily', level: 'A1' },
  { word: 'school', ipa: '/skuːl/', meaning: 'trường học', partOfSpeech: 'noun', example: 'I go to school by bus.', exampleVi: 'Tôi đi học bằng xe buýt.', synonyms: ['academy', 'institution'], antonyms: [], collocations: ['go to school', 'school year'], topic: 'education', level: 'A1' },
  { word: 'book', ipa: '/bʊk/', meaning: 'sách', partOfSpeech: 'noun', example: 'I read a book every night.', exampleVi: 'Tôi đọc sách mỗi tối.', synonyms: ['volume', 'tome'], antonyms: [], collocations: ['read a book', 'book store'], topic: 'education', level: 'A1' },
  { word: 'water', ipa: '/ˈwɔː.tər/', meaning: 'nước', partOfSpeech: 'noun', example: 'Please give me some water.', exampleVi: 'Làm ơn cho tôi xin ít nước.', synonyms: ['H2O'], antonyms: [], collocations: ['drink water', 'cold water'], topic: 'daily', level: 'A1' },
  { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'vui vẻ, hạnh phúc', partOfSpeech: 'adjective', example: 'I am happy to see you.', exampleVi: 'Tôi vui khi gặp bạn.', synonyms: ['joyful', 'glad'], antonyms: ['sad'], collocations: ['happy birthday', 'happy life'], topic: 'emotion', level: 'A1' },

  // A2 - Travel
  { word: 'travel', ipa: '/ˈtræv.əl/', meaning: 'đi du lịch', partOfSpeech: 'verb/noun', example: 'I want to travel around the world.', exampleVi: 'Tôi muốn đi vòng quanh thế giới.', synonyms: ['journey', 'trip'], antonyms: [], collocations: ['travel abroad', 'travel agency'], topic: 'travel', level: 'A2' },
  { word: 'airport', ipa: '/ˈer.pɔːrt/', meaning: 'sân bay', partOfSpeech: 'noun', example: 'We arrived at the airport early.', exampleVi: 'Chúng tôi đến sân bay sớm.', synonyms: ['airfield'], antonyms: [], collocations: ['at the airport', 'airport security'], topic: 'travel', level: 'A2' },
  { word: 'hotel', ipa: '/hoʊˈtel/', meaning: 'khách sạn', partOfSpeech: 'noun', example: 'I booked a hotel for three nights.', exampleVi: 'Tôi đã đặt khách sạn ba đêm.', synonyms: ['inn', 'resort'], antonyms: [], collocations: ['book a hotel', 'hotel room'], topic: 'travel', level: 'A2' },
  { word: 'ticket', ipa: '/ˈtɪk.ɪt/', meaning: 'vé', partOfSpeech: 'noun', example: 'I bought a plane ticket online.', exampleVi: 'Tôi đã mua vé máy bay trực tuyến.', synonyms: ['pass', 'coupon'], antonyms: [], collocations: ['plane ticket', 'bus ticket'], topic: 'travel', level: 'A2' },
  { word: 'luggage', ipa: '/ˈlʌɡ.ɪdʒ/', meaning: 'hành lý', partOfSpeech: 'noun', example: 'Please check your luggage at the counter.', exampleVi: 'Làm ơn kiểm tra hành lý tại quầy.', synonyms: ['baggage', 'suitcase'], antonyms: [], collocations: ['check luggage', 'carry-on luggage'], topic: 'travel', level: 'A2' },
  { word: 'restaurant', ipa: '/ˈres.tə.rɑːnt/', meaning: 'nhà hàng', partOfSpeech: 'noun', example: 'This restaurant serves great food.', exampleVi: 'Nhà hàng này phục vụ đồ ăn tuyệt vời.', synonyms: ['diner', 'eatery'], antonyms: [], collocations: ['eat at a restaurant', 'fancy restaurant'], topic: 'food', level: 'A2' },
  { word: 'menu', ipa: '/ˈmen.juː/', meaning: 'thực đơn', partOfSpeech: 'noun', example: 'Could I see the menu, please?', exampleVi: 'Cho tôi xem thực đơn được không?', synonyms: ['list', 'card'], antonyms: [], collocations: ['main menu', 'order from menu'], topic: 'food', level: 'A2' },
  { word: 'delicious', ipa: '/dɪˈlɪʃ.əs/', meaning: 'ngon', partOfSpeech: 'adjective', example: 'This soup is delicious.', exampleVi: 'Súp này rất ngon.', synonyms: ['tasty', 'yummy'], antonyms: ['tasteless'], collocations: ['delicious food', 'delicious meal'], topic: 'food', level: 'A2' },

  // B1 - Business
  { word: 'meeting', ipa: '/ˈmiː.tɪŋ/', meaning: 'cuộc họp', partOfSpeech: 'noun', example: 'We have a meeting at 10 AM.', exampleVi: 'Chúng tôi có cuộc họp lúc 10 giờ sáng.', synonyms: ['conference', 'gathering'], antonyms: [], collocations: ['have a meeting', 'attend a meeting'], topic: 'business', level: 'B1' },
  { word: 'salary', ipa: '/ˈsæl.ər.i/', meaning: 'lương', partOfSpeech: 'noun', example: 'The salary is competitive.', exampleVi: 'Mức lương rất cạnh tranh.', synonyms: ['wage', 'pay'], antonyms: [], collocations: ['high salary', 'salary increase'], topic: 'business', level: 'B1' },
  { word: 'project', ipa: '/ˈprɑː.dʒekt/', meaning: 'dự án', partOfSpeech: 'noun', example: 'The project will be completed next month.', exampleVi: 'Dự án sẽ hoàn thành vào tháng sau.', synonyms: ['plan', 'task'], antonyms: [], collocations: ['start a project', 'project manager'], topic: 'business', level: 'B1' },
  { word: 'deadline', ipa: '/ˈded.laɪn/', meaning: 'hạn chót', partOfSpeech: 'noun', example: 'We must meet the deadline.', exampleVi: 'Chúng ta phải hoàn thành trước hạn chót.', synonyms: ['limit', 'due date'], antonyms: [], collocations: ['meet a deadline', 'tight deadline'], topic: 'business', level: 'B1' },
  { word: 'colleague', ipa: '/ˈkɑː.liːɡ/', meaning: 'đồng nghiệp', partOfSpeech: 'noun', example: 'My colleagues are very supportive.', exampleVi: 'Các đồng nghiệp của tôi rất hỗ trợ.', synonyms: ['coworker', 'peer'], antonyms: [], collocations: ['work colleague', 'close colleague'], topic: 'work', level: 'B1' },
  { word: 'interview', ipa: '/ˈɪn.tər.vjuː/', meaning: 'phỏng vấn', partOfSpeech: 'noun/verb', example: 'I have a job interview tomorrow.', exampleVi: 'Tôi có buổi phỏng vấn xin việc vào ngày mai.', synonyms: ['meeting', 'audition'], antonyms: [], collocations: ['job interview', 'attend an interview'], topic: 'work', level: 'B1' },
  { word: 'experience', ipa: '/ɪkˈspɪr.i.əns/', meaning: 'kinh nghiệm, trải nghiệm', partOfSpeech: 'noun/verb', example: 'She has 5 years of experience.', exampleVi: 'Cô ấy có 5 năm kinh nghiệm.', synonyms: ['knowledge', 'expertise'], antonyms: [], collocations: ['work experience', 'life experience'], topic: 'work', level: 'B1' },
  { word: 'opportunity', ipa: '/ˌɑː.pərˈtuː.nə.ti/', meaning: 'cơ hội', partOfSpeech: 'noun', example: 'This is a great opportunity for you.', exampleVi: 'Đây là một cơ hội tuyệt vời cho bạn.', synonyms: ['chance', 'opening'], antonyms: [], collocations: ['job opportunity', 'great opportunity'], topic: 'business', level: 'B1' },

  // B2 - Advanced
  { word: 'negotiate', ipa: '/nɪˈɡoʊ.ʃi.eɪt/', meaning: 'đàm phán', partOfSpeech: 'verb', example: 'We need to negotiate the terms.', exampleVi: 'Chúng ta cần đàm phán các điều khoản.', synonyms: ['bargain', 'discuss'], antonyms: [], collocations: ['negotiate a deal', 'negotiate with'], topic: 'business', level: 'B2' },
  { word: 'achieve', ipa: '/əˈtʃiːv/', meaning: 'đạt được', partOfSpeech: 'verb', example: 'She achieved her goal this year.', exampleVi: 'Cô ấy đã đạt được mục tiêu năm nay.', synonyms: ['accomplish', 'reach'], antonyms: ['fail'], collocations: ['achieve success', 'achieve a goal'], topic: 'business', level: 'B2' },
  { word: 'strategy', ipa: '/ˈstræt.ə.dʒi/', meaning: 'chiến lược', partOfSpeech: 'noun', example: 'We need a new marketing strategy.', exampleVi: 'Chúng ta cần một chiến lược tiếp thị mới.', synonyms: ['plan', 'tactic'], antonyms: [], collocations: ['business strategy', 'marketing strategy'], topic: 'business', level: 'B2' },
  { word: 'efficient', ipa: '/ɪˈfɪʃ.ənt/', meaning: 'hiệu quả', partOfSpeech: 'adjective', example: 'This method is more efficient.', exampleVi: 'Phương pháp này hiệu quả hơn.', synonyms: ['effective', 'productive'], antonyms: ['inefficient'], collocations: ['highly efficient', 'energy efficient'], topic: 'business', level: 'B2' }
];

export const MOCK_GRAMMAR = [
  {
    slug: 'present-simple',
    title: 'Present Simple',
    titleVi: 'Thì hiện tại đơn',
    category: 'present',
    level: 'A1',
    explanation: 'Thì hiện tại đơn dùng để diễn tả thói quen, sự thật, lịch trình cố định hoặc trạng thái kéo dài. Chủ ngữ ngôi thứ 3 số ít (he, she, it) thêm "s" vào động từ.',
    formula: 'S + V(s/es) + O (khẳng định)\nS + do/does + not + V + O (phủ định)\nDo/Does + S + V + O? (nghi vấn)',
    examples: [
      { en: 'I work at a company.', vi: 'Tôi làm việc tại một công ty.' },
      { en: 'She goes to school every day.', vi: 'Cô ấy đi học mỗi ngày.' },
      { en: 'The sun rises in the east.', vi: 'Mặt trời mọc ở phía đông.' }
    ],
    notes: 'Dấu hiệu nhận biết: always, usually, often, sometimes, never, every day/week/month.',
    exercises: [
      { question: 'She ___ (go) to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1, explanation: 'Chủ ngữ "She" (ngôi 3 số ít) → động từ thêm "es".' },
      { question: 'They ___ (play) football on Sundays.', options: ['plays', 'playing', 'play', 'played'], answer: 2, explanation: 'Chủ ngữ "They" (số nhiều) → động từ giữ nguyên.' },
      { question: '___ you like coffee?', options: ['Does', 'Do', 'Are', 'Is'], answer: 1, explanation: 'Chủ ngữ "you" → dùng "Do" để hỏi.' },
      { question: 'He ___ (not/eat) meat.', options: ['not eats', 'doesn\'t eat', 'don\'t eat', 'isn\'t eat'], answer: 1, explanation: 'Phủ định ngôi 3 số ít: does not = doesn\'t.' }
    ]
  },
  {
    slug: 'present-continuous',
    title: 'Present Continuous',
    titleVi: 'Thì hiện tại tiếp diễn',
    category: 'present',
    level: 'A2',
    explanation: 'Thì hiện tại tiếp diễn diễn tả hành động đang xảy ra tại thời điểm nói hoặc xung quanh thời điểm nói. Cấu trúc: be + V-ing.',
    formula: 'S + am/is/are + V-ing + O',
    examples: [
      { en: 'I am studying English now.', vi: 'Tôi đang học tiếng Anh bây giờ.' },
      { en: 'They are playing football.', vi: 'Họ đang chơi bóng đá.' }
    ],
    notes: 'Dấu hiệu: now, right now, at the moment, currently.',
    exercises: [
      { question: 'I ___ (read) a book right now.', options: ['read', 'am reading', 'reads', 'reading'], answer: 1, explanation: 'Hành động đang xảy ra → am/is/are + V-ing.' },
      { question: 'Look! It ___ (rain).', options: ['rains', 'is raining', 'rain', 'raining'], answer: 1, explanation: '"Look!" cho thấy hành động đang diễn ra.' }
    ]
  },
  {
    slug: 'past-simple',
    title: 'Past Simple',
    titleVi: 'Thì quá khứ đơn',
    category: 'past',
    level: 'A2',
    explanation: 'Thì quá khứ đơn diễn tả hành động đã xảy ra và kết thúc trong quá khứ. Động từ có quy tắc thêm "ed", bất quy tắc cần học thuộc.',
    formula: 'S + V(ed/V2) + O',
    examples: [
      { en: 'I visited Hanoi last year.', vi: 'Tôi đã thăm Hà Nội năm ngoái.' },
      { en: 'She went to school yesterday.', vi: 'Cô ấy đã đi học hôm qua.' }
    ],
    notes: 'Dấu hiệu: yesterday, last week/month/year, ago, in 2020.',
    exercises: [
      { question: 'I ___ (go) to the cinema last night.', options: ['go', 'went', 'going', 'gone'], answer: 1, explanation: '"go" là động từ bất quy tắc → went.' },
      { question: 'They ___ (play) football yesterday.', options: ['plays', 'played', 'playing', 'play'], answer: 1, explanation: 'Động từ có quy tắc → thêm "ed".' }
    ]
  },
  {
    slug: 'future-simple',
    title: 'Future Simple (will)',
    titleVi: 'Thì tương lai đơn',
    category: 'future',
    level: 'A2',
    explanation: 'Thì tương lai đơn với "will" dùng để diễn tả quyết định tại thời điểm nói, dự đoán, lời hứa hoặc đề nghị.',
    formula: 'S + will + V + O',
    examples: [
      { en: 'I will call you tomorrow.', vi: 'Tôi sẽ gọi cho bạn ngày mai.' },
      { en: 'It will rain later.', vi: 'Trời sẽ mưa sau đó.' }
    ],
    notes: 'Dấu hiệu: tomorrow, next week/month/year, later, soon, in the future.',
    exercises: [
      { question: 'I think it ___ (rain) tomorrow.', options: ['rains', 'will rain', 'is raining', 'rained'], answer: 1, explanation: 'Dự đoán tương lai → will + V nguyên.' },
      { question: '___ you help me, please?', options: ['Will', 'Are', 'Do', 'Did'], answer: 0, explanation: 'Lời đề nghị → Will you...?' }
    ]
  },
  {
    slug: 'conditional-type-1',
    title: 'Conditional Type 1',
    titleVi: 'Câu điều kiện loại 1',
    category: 'conditional',
    level: 'A2',
    explanation: 'Câu điều kiện loại 1 diễn tả điều kiện có thật hoặc có khả năng xảy ra ở hiện tại hoặc tương lai.',
    formula: 'If + S + V(hiện tại đơn), S + will + V',
    examples: [
      { en: 'If it rains, I will stay home.', vi: 'Nếu trời mưa, tôi sẽ ở nhà.' },
      { en: 'If you study hard, you will pass the exam.', vi: 'Nếu bạn học chăm, bạn sẽ vượt qua kỳ thi.' }
    ],
    notes: 'Mệnh đề If dùng thì hiện tại đơn, mệnh đề chính dùng will/won\'t.',
    exercises: [
      { question: 'If it ___ (rain), we will cancel the trip.', options: ['rains', 'will rain', 'rained', 'is raining'], answer: 0, explanation: 'Mệnh đề If dùng hiện tại đơn.' },
      { question: 'If you ___ (study) harder, you will get better grades.', options: ['study', 'studies', 'studied', 'will study'], answer: 0, explanation: 'Chủ ngữ "you" → V nguyên.' }
    ]
  },
  {
    slug: 'passive-voice',
    title: 'Passive Voice',
    titleVi: 'Câu bị động',
    category: 'passive',
    level: 'B1',
    explanation: 'Câu bị động dùng khi chủ thể của hành động không quan trọng hoặc không được biết. Chủ ngữ trong câu bị động chịu tác động của hành động.',
    formula: 'S + be + V(ed/V3) + by + O',
    examples: [
      { en: 'English is spoken worldwide.', vi: 'Tiếng Anh được nói trên toàn thế giới.' },
      { en: 'The book was written by my friend.', vi: 'Cuốn sách được viết bởi bạn tôi.' }
    ],
    notes: 'Chuyển từ câu chủ động sang bị động: O → S, S → by + O.',
    exercises: [
      { question: 'The cake ___ (make) by my mother.', options: ['made', 'is made', 'makes', 'making'], answer: 1, explanation: 'Thì hiện tại đơn bị động: am/is/are + V3/ed.' },
      { question: 'This letter ___ (write) by John yesterday.', options: ['wrote', 'was written', 'is written', 'writes'], answer: 1, explanation: 'Quá khứ đơn bị động: was/were + V3.' }
    ]
  },
  {
    slug: 'modal-verbs',
    title: 'Modal Verbs',
    titleVi: 'Động từ khuyết thiếu',
    category: 'modal',
    level: 'B1',
    explanation: 'Modal verbs (can, could, may, might, must, should, would, will...) dùng để diễn tả khả năng, sự cho phép, nghĩa vụ, lời khuyên. Theo sau modal luôn là động từ nguyên mẫu.',
    formula: 'S + modal + V (nguyên mẫu)',
    examples: [
      { en: 'You should study harder.', vi: 'Bạn nên học chăm hơn.' },
      { en: 'I can speak English.', vi: 'Tôi có thể nói tiếng Anh.' }
    ],
    notes: 'Modal không thêm "s" và không dùng với "to".',
    exercises: [
      { question: 'You ___ (should/could) see a doctor.', options: ['should', 'are should', 'shoulding', 'to should'], answer: 0, explanation: 'Theo sau modal là V nguyên mẫu, không thêm "to".' },
      { question: 'She ___ (can/may) speak three languages.', options: ['cans', 'can', 'can to', 'is can'], answer: 1, explanation: '"can" là modal, không thêm "s".' }
    ]
  },
  {
    slug: 'comparatives',
    title: 'Comparatives & Superlatives',
    titleVi: 'So sánh hơn và so sánh nhất',
    category: 'comparatives',
    level: 'A2',
    explanation: 'Dùng để so sánh hai hoặc nhiều sự vật, sự việc. Tính từ ngắn thêm "-er/-est", tính từ dài dùng "more/most".',
    formula: 'A + be + comparative + than + B (so sánh hơn)\nA + be + the + superlative (so sánh nhất)',
    examples: [
      { en: 'She is taller than her sister.', vi: 'Cô ấy cao hơn chị gái.' },
      { en: 'He is the tallest in the class.', vi: 'Cậu ấy cao nhất lớp.' }
    ],
    notes: 'Tính từ ngắn (1 âm tiết): tall → taller. Tính từ dài (2+ âm tiết): beautiful → more beautiful.',
    exercises: [
      { question: 'This book is ___ (interesting) than that one.', options: ['more interesting', 'interestinger', 'most interesting', 'interesting'], answer: 0, explanation: '"interesting" là tính từ dài → dùng "more".' },
      { question: 'She is ___ (fast) runner in the team.', options: ['faster', 'fastest', 'the fastest', 'more fast'], answer: 2, explanation: 'So sánh nhất với "fast" (1 âm tiết) → "the fastest".' }
    ]
  },
  {
    slug: 'articles',
    title: 'Articles (a, an, the)',
    titleVi: 'Mạo từ',
    category: 'articles',
    level: 'A1',
    explanation: '"a" dùng trước phụ âm, "an" dùng trước nguyên âm, "the" dùng cho danh từ đã xác định.',
    formula: 'a/an + danh từ đếm được số ít (chưa xác định)\nthe + danh từ đã xác định',
    examples: [
      { en: 'I have a cat.', vi: 'Tôi có một con mèo.' },
      { en: 'She is an engineer.', vi: 'Cô ấy là một kỹ sư.' },
      { en: 'The sun is bright.', vi: 'Mặt trời rất sáng.' }
    ],
    notes: 'Không dùng a/an với danh từ không đếm được (water, information).',
    exercises: [
      { question: 'She is ___ (a/an) honest person.', options: ['a', 'an', 'the', 'no article'], answer: 1, explanation: 'Danh từ bắt đầu bằng nguyên âm âm thanh (/ɒ/...)? Thực tế "honest" phát âm /ˈɒn.ɪst/ bắt đầu bằng nguyên âm → dùng "an".' },
      { question: '___ (The/A) Eiffel Tower is in Paris.', options: ['A', 'An', 'The', 'No article'], answer: 2, explanation: 'Đã xác định (duy nhất) → dùng "the".' }
    ]
  },
  {
    slug: 'gerund-infinitive',
    title: 'Gerund & Infinitive',
    titleVi: 'Gerund và Infinitive',
    category: 'gerund-infinitive',
    level: 'B1',
    explanation: 'Gerund (V-ing) và Infinitive (to V) đều có thể làm tân ngữ. Một số động từ theo sau bằng gerund, một số bằng infinitive.',
    formula: 'enjoy/avoid/finish/mind + V-ing\nwant/need/decide/plan + to V',
    examples: [
      { en: 'I enjoy learning English.', vi: 'Tôi thích học tiếng Anh.' },
      { en: 'She wants to travel abroad.', vi: 'Cô ấy muốn đi du lịch nước ngoài.' }
    ],
    notes: 'Động từ theo sau bằng V-ing: enjoy, finish, avoid, mind, suggest. Bằng to V: want, need, decide, hope, plan.',
    exercises: [
      { question: 'I enjoy ___ (read) books.', options: ['read', 'to read', 'reading', 'reads'], answer: 2, explanation: '"enjoy" theo sau bằng V-ing.' },
      { question: 'She decided ___ (go) home early.', options: ['going', 'to go', 'go', 'gone'], answer: 1, explanation: '"decide" theo sau bằng "to V".' }
    ]
  },
  {
    slug: 'relative-clause',
    title: 'Relative Clauses',
    titleVi: 'Mệnh đề quan hệ',
    category: 'relative-clause',
    level: 'B1',
    explanation: 'Mệnh đề quan hệ bổ sung thông tin cho danh từ đứng trước. Dùng who (người), which/that (vật), where (nơi chốn), when (thời gian).',
    formula: 'Danh từ + who/which/that + V...',
    examples: [
      { en: 'The man who lives next door is kind.', vi: 'Người đàn ông sống bên cạnh rất tốt bụng.' },
      { en: 'I love the book that you gave me.', vi: 'Tôi thích cuốn sách bạn tặng tôi.' }
    ],
    notes: 'Dùng "that" thay cho who/which trong câu không chính thức.',
    exercises: [
      { question: 'The student ___ won the prize is my friend.', options: ['who', 'which', 'whose', 'where'], answer: 0, explanation: '"student" là người → dùng "who".' },
      { question: 'This is the house ___ I was born.', options: ['who', 'which', 'where', 'when'], answer: 2, explanation: 'Chỉ nơi chốn → dùng "where".' }
    ]
  }
];

export const MOCK_LISTENING = [
  {
    title: 'At the Coffee Shop',
    titleVi: 'Tại quán cà phê',
    level: 'Beginner',
    topic: 'daily',
    duration: 45,
    transcript: 'Waiter: Good morning! What can I get you today? Customer: Hi, can I have a cappuccino, please? Waiter: Sure. Small, medium, or large? Customer: Medium, please. Waiter: Anything else? Customer: Yes, I would also like a chocolate cookie. Waiter: That will be $5.50. Customer: Here you go. Waiter: Thank you! Your order will be ready in 5 minutes.',
    transcriptVi: 'Nhân viên phục vụ: Chào buổi sáng! Anh/chị dùng gì hôm nay? Khách hàng: Chào, cho tôi một cà phê cappuccino nhé. Nhân viên: Vâng. Cốc nhỏ, vừa hay lớn? Khách hàng: Cốc vừa. Nhân viên: Gì nữa không? Khách hàng: Có, tôi cũng muốn một cái bánh quy sô cô la. Nhân viên: Tổng cộng 5,50 đô. Khách hàng: Đây nhé. Nhân viên: Cảm ơn! Đơn của anh/chị sẽ sẵn sàng trong 5 phút.',
    questions: [
      { type: 'multiple', q: 'What does the customer order?', options: ['Tea', 'Cappuccino', 'Juice', 'Water'], answer: 1 },
      { type: 'fill', q: 'How much does it cost? ___ dollars.', answer: '5.50' },
      { type: 'multiple', q: 'How long will the order be ready?', options: ['3 minutes', '5 minutes', '10 minutes', '15 minutes'], answer: 1 }
    ]
  },
  {
    title: 'Job Interview',
    titleVi: 'Phỏng vấn xin việc',
    level: 'Intermediate',
    topic: 'business',
    duration: 90,
    transcript: 'Interviewer: Tell me about yourself. Candidate: I have five years of experience in marketing, and I recently led a successful campaign that increased our brand awareness by 40 percent. Interviewer: That sounds impressive. Why do you want to work here? Candidate: I admire your company culture and the innovation in your products. I believe I can contribute to your growth. Interviewer: What are your salary expectations? Candidate: Based on my experience and research, I expect around 70,000 dollars per year. Interviewer: We can discuss that. Do you have any questions for us? Candidate: Yes, what does career growth look like for this position?',
    transcriptVi: 'Người phỏng vấn: Hãy giới thiệu về bản thân bạn. Ứng viên: Tôi có 5 năm kinh nghiệm trong lĩnh vực marketing, và gần đây tôi đã dẫn dắt một chiến dịch thành công giúp tăng nhận diện thương hiệu 40 phần trăm. Người phỏng vấn: Nghe ấn tượng đấy. Tại sao bạn muốn làm việc ở đây? Ứng viên: Tôi ngưỡng mộ văn hóa công ty và sự đổi mới trong sản phẩm của các bạn. Tôi tin mình có thể đóng góp cho sự phát triển của công ty. Người phỏng vấn: Mức lương bạn mong muốn là bao nhiêu? Ứng viên: Dựa trên kinh nghiệm và nghiên cứu của tôi, tôi mong muốn khoảng 70.000 đô một năm. Người phỏng vấn: Chúng ta có thể thảo luận về điều đó. Bạn có câu hỏi nào cho chúng tôi không? Ứng viên: Có, cơ hội phát triển nghề nghiệp cho vị trí này như thế nào?',
    questions: [
      { type: 'multiple', q: 'How many years of experience does the candidate have?', options: ['3', '5', '7', '10'], answer: 1 },
      { type: 'multiple', q: 'What is the expected salary?', options: ['50,000', '60,000', '70,000', '80,000'], answer: 2 },
      { type: 'fill', q: 'The campaign increased brand awareness by ___ percent.', answer: '40' }
    ]
  },
  {
    title: 'Travel Plans',
    titleVi: 'Kế hoạch du lịch',
    level: 'Elementary',
    topic: 'travel',
    duration: 60,
    transcript: 'Anna: Hey Tom, do you have any plans for the summer? Tom: Yes! I am going to Japan next month. Anna: Wow, that sounds amazing! How long will you stay? Tom: I will stay for ten days. I want to visit Tokyo, Kyoto, and Osaka. Anna: Have you booked your flight? Tom: Not yet. I am looking for good deals online. Anna: I went to Tokyo last year. The food is incredible there. Tom: I cannot wait to try the sushi and ramen!',
    transcriptVi: 'Anna: Này Tom, bạn có kế hoạch gì cho mùa hè không? Tom: Có! Mình sẽ đi Nhật Bản vào tháng sau. Anna: Ồ, nghe tuyệt vời! Bạn sẽ ở bao lâu? Tom: Mình sẽ ở mười ngày. Mình muốn thăm Tokyo, Kyoto và Osaka. Anna: Bạn đã đặt vé máy bay chưa? Tom: Chưa. Mình đang tìm vé giá tốt trên mạng. Anna: Mình đã đi Tokyo năm ngoái. Đồ ăn ở đó tuyệt vời. Tom: Mình nóng lòng muốn thử sushi và ramen!',
    questions: [
      { type: 'multiple', q: 'Where is Tom going?', options: ['Korea', 'Japan', 'China', 'Thailand'], answer: 1 },
      { type: 'fill', q: 'Tom will stay for ___ days.', answer: 'ten' },
      { type: 'multiple', q: 'Which city is NOT mentioned?', options: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido'], answer: 3 }
    ]
  }
];

export const MOCK_READING = [
  {
    title: 'The Importance of Learning English',
    titleVi: 'Tầm quan trọng của việc học tiếng Anh',
    level: 'A2',
    topic: 'daily',
    content: 'English is one of the most widely spoken languages in the world. It is the official language in over 60 countries and is used as a lingua franca in many international settings. Learning English opens doors to better job opportunities, higher education, and global communication. In Vietnam, many students study English from primary school to university. With the rise of technology and the internet, English has become essential for accessing information and connecting with people worldwide. Whether you want to travel, work abroad, or simply enjoy English movies and books, learning English is a valuable investment in your future.',
    contentVi: 'Tiếng Anh là một trong những ngôn ngữ được sử dụng rộng rãi nhất trên thế giới. Đây là ngôn ngữ chính thức tại hơn 60 quốc gia và được sử dụng như ngôn ngữ chung trong nhiều môi trường quốc tế. Học tiếng Anh mở ra cánh cửa cho các cơ hội việc làm tốt hơn, giáo dục cao hơn và giao tiếp toàn cầu. Tại Việt Nam, nhiều học sinh học tiếng Anh từ tiểu học đến đại học. Với sự phát triển của công nghệ và internet, tiếng Anh đã trở nên thiết yếu để tiếp cận thông tin và kết nối với mọi người trên toàn thế giới. Cho dù bạn muốn đi du lịch, làm việc ở nước ngoài hay đơn giản là thưởng thức phim và sách tiếng Anh, học tiếng Anh là một khoản đầu tư có giá trị cho tương lai của bạn.',
    keyWords: [
      { word: 'lingua franca', meaning: 'ngôn ngữ chung (phương tiện giao tiếp chung)' },
      { word: 'essential', meaning: 'thiết yếu' },
      { word: 'access', meaning: 'truy cập, tiếp cận' },
      { word: 'investment', meaning: 'sự đầu tư' }
    ],
    questions: [
      { q: 'How many countries have English as official language?', options: ['30', '60', '90', '120'], answer: 1 },
      { q: 'What does English open doors to?', options: ['Sleeping', 'Job opportunities', 'Cooking', 'Swimming'], answer: 1 },
      { q: 'When do Vietnamese students start learning English?', options: ['University', 'High school', 'Primary school', 'After graduation'], answer: 2 }
    ],
    explanationVi: [
      'Đáp án: 60 quốc gia — được nêu rõ trong bài.',
      'Đáp án: Cơ hội việc làm — câu 2 trong bài.',
      'Đáp án: Tiểu học — câu 3 trong bài.'
    ]
  },
  {
    title: 'The Future of Remote Work',
    titleVi: 'Tương lai của làm việc từ xa',
    level: 'B1',
    topic: 'business',
    content: 'The COVID-19 pandemic accelerated the adoption of remote work worldwide. Companies that once required employees to be in the office five days a week now embrace flexible work arrangements. According to recent surveys, about 70 percent of workers prefer a hybrid model that combines office and home work. This shift has benefits and challenges. On one hand, employees save commuting time and enjoy better work-life balance. On the other hand, companies face challenges in maintaining team cohesion and company culture. The future of work will likely involve a mix of in-person collaboration and remote flexibility, with technology playing a central role in bridging the gap.',
    contentVi: 'Đại dịch COVID-19 đã đẩy nhanh việc áp dụng làm việc từ xa trên toàn thế giới. Các công ty từng yêu cầu nhân viên có mặt tại văn phòng năm ngày một tuần giờ đây chấp nhận các hình thức làm việc linh hoạt. Theo các khảo sát gần đây, khoảng 70 phần trăm người lao động thích mô hình kết hợp giữa văn phòng và làm việc tại nhà. Sự chuyển đổi này có cả lợi ích và thách thức. Một mặt, nhân viên tiết kiệm thời gian đi lại và có sự cân bằng công việc - cuộc sống tốt hơn. Mặt khác, các công ty đối mặt với thách thức trong việc duy trì sự gắn kết của nhóm và văn hóa công ty. Tương lai của công việc có lẽ sẽ liên quan đến sự kết hợp giữa cộng tác trực tiếp và sự linh hoạt từ xa, với công nghệ đóng vai trò trung tâm trong việc thu hẹp khoảng cách.',
    keyWords: [
      { word: 'accelerated', meaning: 'đẩy nhanh' },
      { word: 'hybrid', meaning: 'kết hợp' },
      { word: 'cohesion', meaning: 'sự gắn kết' },
      { word: 'commuting', meaning: 'đi lại (đi làm)' }
    ],
    questions: [
      { q: 'What percentage of workers prefer hybrid model?', options: ['50%', '70%', '80%', '90%'], answer: 1 },
      { q: 'What is NOT a benefit of remote work?', options: ['Save commuting time', 'Better work-life balance', 'Higher salary', 'Flexible hours'], answer: 2 },
      { q: 'What challenge do companies face?', options: ['Lower productivity', 'Less technology', 'Team cohesion', 'Higher rent'], answer: 2 }
    ],
    explanationVi: [
      'Đáp án: 70 phần trăm — được nêu trong bài.',
      'Đáp án: Lương cao hơn — không được đề cập trong bài.',
      'Đáp án: Sự gắn kết nhóm — được nêu rõ trong bài.'
    ]
  }
];

export const MOCK_TOEIC = [
  {
    title: 'TOEIC Part 1 - Mini Test (Photographs)',
    part: 'listening-1',
    type: 'mini',
    questions: [
      { audio: '[Audio: A man is reading a newspaper in the park.]', question: 'Look at the picture. What is the man doing?', options: ['He is reading a newspaper.', 'He is jogging.', 'He is buying a coffee.', 'He is sleeping.'], answer: 0, explanationVi: 'Trong ảnh người đàn ông đang đọc báo → đáp án A.' },
      { audio: '[Audio: A woman is typing on her laptop at a desk.]', question: 'What is the woman doing?', options: ['She is cooking.', 'She is typing on a laptop.', 'She is driving.', 'She is swimming.'], answer: 1, explanationVi: 'Hình ảnh cho thấy người phụ nữ đang gõ laptop → đáp án B.' },
      { audio: '[Audio: People are waiting at a bus stop.]', question: 'Where are the people?', options: ['At a bus stop', 'At an airport', 'At a restaurant', 'At a hospital'], answer: 0, explanationVi: 'Mọi người đang đợi ở trạm xe buýt → đáp án A.' },
      { audio: '[Audio: A chef is cooking in a restaurant kitchen.]', question: 'Who is in the kitchen?', options: ['A teacher', 'A chef', 'A doctor', 'A driver'], answer: 1, explanationVi: 'Một đầu bếp đang nấu ăn trong bếp nhà hàng → đáp án B.' },
      { audio: '[Audio: Two men are shaking hands in an office.]', question: 'What are the men doing?', options: ['Fighting', 'Shaking hands', 'Reading', 'Sleeping'], answer: 1, explanationVi: 'Hai người đàn ông đang bắt tay nhau → đáp án B.' }
    ]
  },
  {
    title: 'TOEIC Part 2 - Question-Response',
    part: 'listening-2',
    type: 'mini',
    questions: [
      { audio: '[Audio: Where is the meeting room?]', question: 'Choose the best response.', options: ['It\'s on the second floor.', 'At 10 AM.', 'Yes, I will.', 'I like meetings.'], answer: 0, explanationVi: 'Câu hỏi "Where" → trả lời bằng địa điểm.' },
      { audio: '[Audio: When does the train leave?]', question: 'Choose the best response.', options: ['At the station.', 'In Tokyo.', 'At 3 PM.', 'By bus.'], answer: 2, explanationVi: 'Câu hỏi "When" → trả lời bằng thời gian.' },
      { audio: '[Audio: Could you help me with this report?]', question: 'Choose the best response.', options: ['Sure, what do you need?', 'It\'s a report.', 'I\'m busy now.', 'No, thanks.'], answer: 0, explanationVi: 'Lời nhờ giúp đỡ → đồng ý giúp.' }
    ]
  },
  {
    title: 'TOEIC Part 5 - Incomplete Sentences',
    part: 'reading-5',
    type: 'mini',
    questions: [
      { question: 'The meeting ___ at 9 AM tomorrow.', options: ['start', 'starts', 'starting', 'is start'], answer: 1, explanationVi: 'Chủ ngữ "The meeting" (số ít) → động từ thêm "s".' },
      { question: 'Please ___ the report by Friday.', options: ['submit', 'submits', 'submitting', 'to submit'], answer: 0, explanationVi: 'Sau "Please" dùng V nguyên mẫu.' },
      { question: 'She has been working here ___ 2015.', options: ['since', 'for', 'from', 'at'], answer: 0, explanationVi: '"Since + thời điểm", "for + khoảng thời gian".' }
    ]
  }
];

export const MOCK_PLACEMENT = [
  // Vocabulary
  { category: 'vocab', level: 'A1', question: 'What does "hello" mean?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], answer: 1 },
  { category: 'vocab', level: 'A1', question: '"Family" means?', options: ['Gia đình', 'Bạn bè', 'Công ty', 'Trường học'], answer: 0 },
  { category: 'vocab', level: 'A2', question: '"Travel" means?', options: ['Làm việc', 'Đi du lịch', 'Nấu ăn', 'Học'], answer: 1 },
  { category: 'vocab', level: 'B1', question: '"Colleague" means?', options: ['Khách hàng', 'Đồng nghiệp', 'Giáo viên', 'Bác sĩ'], answer: 1 },
  { category: 'vocab', level: 'B2', question: '"Negotiate" means?', options: ['Đàm phán', 'Tranh luận', 'Mua sắm', 'Đi dạo'], answer: 0 },

  // Grammar
  { category: 'grammar', level: 'A1', question: 'She ___ (go) to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1 },
  { category: 'grammar', level: 'A2', question: 'I ___ (read) a book now.', options: ['read', 'am reading', 'reads', 'reading'], answer: 1 },
  { category: 'grammar', level: 'B1', question: 'If it rains, I ___ (stay) home.', options: ['stay', 'stays', 'will stay', 'stayed'], answer: 2 },
  { category: 'grammar', level: 'B2', question: 'The cake ___ (make) by my mother.', options: ['made', 'is made', 'makes', 'making'], answer: 1 },

  // Reading
  { category: 'reading', level: 'A2', question: 'Reading: "Anna is a teacher. She works at a school." What does Anna do?', options: ['Doctor', 'Teacher', 'Engineer', 'Chef'], answer: 1 },
  { category: 'reading', level: 'B1', question: 'Reading: "Tom went to the market and bought some fruits. He then went home." Where did Tom go first?', options: ['Home', 'Market', 'School', 'Park'], answer: 1 },

  // Listening
  { category: 'listening', level: 'A1', question: '[Audio: "Hello, my name is John."]', options: ['Goodbye', 'My name is John', 'Thank you', 'See you'], answer: 1 },
  { category: 'listening', level: 'A2', question: '[Audio: "I am going to the store."]', options: ['I am cooking', 'I am going to the store', 'I am sleeping', 'I am working'], answer: 1 },

  // Reflex
  { category: 'reflex', level: 'A2', question: 'You meet a friend on the street. What do you say?', options: ['Goodbye', 'Nice to meet you', 'Hello!', 'See you later'], answer: 2 },
  { category: 'reflex', level: 'B1', question: 'Someone says "Thank you". You respond:', options: ['Sorry', 'You\'re welcome', 'Hello', 'Please'], answer: 1 }
];

export const MOCK_ACHIEVEMENTS = [
  { slug: 'first-lesson', title: 'First Lesson', titleVi: 'Bài học đầu tiên', description: 'Hoàn thành bài học đầu tiên', icon: '🎓', condition: '{"type":"lessons","threshold":1}', xpReward: 20 },
  { slug: 'vocab-100', title: '100 Words', titleVi: '100 từ vựng', description: 'Học được 100 từ vựng', icon: '📚', condition: '{"type":"vocab","threshold":100}', xpReward: 100 },
  { slug: 'streak-7', title: '7-Day Streak', titleVi: '7 ngày liên tục', description: 'Học liên tục 7 ngày', icon: '🔥', condition: '{"type":"streak","threshold":7}', xpReward: 50 },
  { slug: 'streak-30', title: '30-Day Streak', titleVi: '30 ngày liên tục', description: 'Học liên tục 30 ngày', icon: '🌟', condition: '{"type":"streak","threshold":30}', xpReward: 200 },
  { slug: 'listening-50', title: 'Listening Master', titleVi: 'Bậc thầy nghe', description: 'Hoàn thành 50 bài nghe', icon: '🎧', condition: '{"type":"listening","threshold":50}', xpReward: 150 },
  { slug: 'grammar-80', title: 'Grammar Pro', titleVi: 'Cao thủ ngữ pháp', description: 'Đạt 80% bài ngữ pháp', icon: '✍️', condition: '{"type":"grammar","threshold":80}', xpReward: 100 },
  { slug: 'speaking-10', title: 'Speaker', titleVi: 'Diễn giả', description: 'Luyện nói 10 lần', icon: '🎤', condition: '{"type":"speaking","threshold":10}', xpReward: 80 },
  { slug: 'placement-done', title: 'Placement Done', titleVi: 'Hoàn thành kiểm tra', description: 'Hoàn thành bài kiểm tra đầu vào', icon: '✅', condition: '{"type":"placement","threshold":1}', xpReward: 30 }
];

// Mock AI responses cho speaking/writing/conversation (sẵn sàng thay bằng API thật)
export const MOCK_AI_FEEDBACK = {
  speaking: (userText: string) => {
    const lower = userText.toLowerCase();
    // Phát hiện lỗi phổ biến
    if (lower.includes('very like')) {
      return {
        score: 65,
        pronunciation: 75,
        fluency: 70,
        grammar: 50,
        vocabulary: 65,
        sentenceStructure: 60,
        naturalness: 65,
        corrected: 'I really like this job.',
        moreNatural: 'I\'m really into this job.',
        explanation: 'Không dùng "very" trực tiếp trước động từ "like". Hãy dùng "really" hoặc "a lot".'
      };
    }
    if (lower.includes('i am go')) {
      return {
        score: 70,
        pronunciation: 80,
        fluency: 75,
        grammar: 55,
        vocabulary: 70,
        sentenceStructure: 65,
        naturalness: 70,
        corrected: 'I am going to the store.',
        moreNatural: 'I\'m heading to the store.',
        explanation: 'Sau "am/is/are" cần dùng V-ing, không dùng V nguyên mẫu.'
      };
    }
    return {
      score: 85 + Math.floor(Math.random() * 10),
      pronunciation: 80 + Math.floor(Math.random() * 15),
      fluency: 82 + Math.floor(Math.random() * 13),
      grammar: 85 + Math.floor(Math.random() * 10),
      vocabulary: 80 + Math.floor(Math.random() * 15),
      sentenceStructure: 83 + Math.floor(Math.random() * 12),
      naturalness: 82 + Math.floor(Math.random() * 13),
      corrected: userText,
      moreNatural: userText,
      explanation: 'Câu của bạn đã khá tốt! Tiếp tục luyện tập để nâng cao độ tự nhiên.'
    };
  },
  writing: (text: string) => {
    const errors: string[] = [];
    const corrected = text;
    if (!/[.!?]$/.test(text.trim())) errors.push('Câu chưa có dấu kết thúc.');
    if (text.includes('  ')) errors.push('Có khoảng trắng thừa.');
    return {
      score: 78 + Math.floor(Math.random() * 15),
      grammar: 80 + Math.floor(Math.random() * 15),
      spelling: 85 + Math.floor(Math.random() * 10),
      vocabulary: 75 + Math.floor(Math.random() * 15),
      structure: 80 + Math.floor(Math.random() * 15),
      coherence: 78 + Math.floor(Math.random() * 12),
      naturalness: 80 + Math.floor(Math.random() * 15),
      corrected,
      moreNatural: corrected,
      explanation: errors.length > 0 ? errors.join(' ') : 'Bài viết của bạn khá tốt. Có thể cải thiện bằng cách sử dụng từ vựng đa dạng hơn.'
    };
  }
};

export const AI_CONVERSATION_PROMPTS: Record<string, { system: string; greeting: { en: string; vi: string } }> = {
  friend: {
    system: 'Bạn là một người bạn thân thiện đang trò chuyện với người học tiếng Anh. Hãy nói bằng tiếng Anh, ngắn gọn, tự nhiên, đôi khi dùng tiếng lóng.',
    greeting: {
      en: "Hey! How's it going? What did you do today?",
      vi: 'Chào bạn! Hôm nay bạn làm gì vậy?'
    }
  },
  teacher: {
    system: 'Bạn là một giáo viên tiếng Anh đang trò chuyện với học sinh. Hãy nói bằng tiếng Anh, chậm rãi, rõ ràng, sửa lỗi khi cần.',
    greeting: {
      en: "Hello! I'm glad to help you practice English today. How are you feeling?",
      vi: 'Xin chào! Tôi rất vui được giúp bạn luyện tiếng Anh hôm nay. Bạn cảm thấy thế nào?'
    }
  },
  colleague: {
    system: 'Bạn là đồng nghiệp đang trò chuyện về công việc. Nói tiếng Anh tự nhiên, thân thiện.',
    greeting: {
      en: "Hi there! How's the project going?",
      vi: 'Chào bạn! Dự án tiến triển thế nào rồi?'
    }
  },
  recruiter: {
    system: 'Bạn là nhà tuyển dụng đang phỏng vấn ứng viên. Hỏi về kinh nghiệm, kỹ năng, mục tiêu nghề nghiệp bằng tiếng Anh.',
    greeting: {
      en: "Welcome! Thank you for coming. Could you tell me about yourself and your experience?",
      vi: 'Chào mừng bạn! Cảm ơn bạn đã đến. Bạn có thể giới thiệu về bản thân và kinh nghiệm của bạn không?'
    }
  },
  customer: {
    system: 'Bạn là khách hàng đang mua sắm. Hỏi về sản phẩm, giá cả bằng tiếng Anh.',
    greeting: {
      en: "Excuse me, could you help me? I'm looking for something.",
      vi: 'Xin lỗi, bạn có thể giúp tôi không? Tôi đang tìm một thứ gì đó.'
    }
  },
  restaurant: {
    system: 'Bạn là nhân viên nhà hàng. Chào khách, gợi ý món, nhận order bằng tiếng Anh.',
    greeting: {
      en: "Good evening! Welcome to our restaurant. Table for how many?",
      vi: 'Chào buổi tối! Chào mừng đến nhà hàng của chúng tôi. Bàn cho mấy người?'
    }
  },
  airport: {
    system: 'Bạn là nhân viên sân bay. Kiểm tra vé, hộ chiếu, hướng dẫn cổng bằng tiếng Anh.',
    greeting: {
      en: "Good morning. May I see your passport and boarding pass, please?",
      vi: 'Chào buổi sáng. Cho tôi xem hộ chiếu và thẻ lên máy bay của bạn nhé?'
    }
  }
};

export const MOCK_NOTIFICATIONS = [
  { type: 'reminder', title: 'Đã đến giờ học rồi!', message: 'Hãy dành 30 phút học tiếng Anh hôm nay nhé.' },
  { type: 'streak', title: 'Đừng để mất chuỗi ngày học!', message: 'Bạn đang có chuỗi 7 ngày. Hãy học hôm nay để duy trì!' },
  { type: 'vocab-review', title: 'Có 5 từ vựng cần ôn', message: 'AI nhắc bạn ôn lại những từ vựng sắp quên.' },
  { type: 'achievement', title: 'Bạn vừa đạt thành tựu mới!', message: 'Chúc mừng! Bạn vừa mở khóa "100 từ vựng".' }
];