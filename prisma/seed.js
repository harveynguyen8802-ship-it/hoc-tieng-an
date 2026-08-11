// Prisma seed - Nạp dữ liệu mẫu vào database
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const MOCK_VOCABULARY = [
  { word: 'hello', ipa: '/həˈloʊ/', meaning: 'xin chào', partOfSpeech: 'exclamation', example: 'Hello, how are you today?', exampleVi: 'Xin chào, hôm nay bạn có khỏe không?', synonyms: JSON.stringify(['hi']), antonyms: JSON.stringify(['goodbye']), collocations: JSON.stringify(['say hello']), topic: 'daily', level: 'A1' },
  { word: 'family', ipa: '/ˈfæm.əl.i/', meaning: 'gia đình', partOfSpeech: 'noun', example: 'I love my family very much.', exampleVi: 'Tôi yêu gia đình tôi rất nhiều.', synonyms: JSON.stringify(['relatives']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['family member']), topic: 'family', level: 'A1' },
  { word: 'work', ipa: '/wɜːrk/', meaning: 'công việc', partOfSpeech: 'noun', example: 'I work at a software company.', exampleVi: 'Tôi làm việc tại một công ty phần mềm.', synonyms: JSON.stringify(['job']), antonyms: JSON.stringify(['rest']), collocations: JSON.stringify(['go to work']), topic: 'work', level: 'A1' },
  { word: 'food', ipa: '/fuːd/', meaning: 'thức ăn', partOfSpeech: 'noun', example: 'The food is delicious.', exampleVi: 'Thức ăn rất ngon.', synonyms: JSON.stringify(['meal']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['fast food']), topic: 'food', level: 'A1' },
  { word: 'house', ipa: '/haʊs/', meaning: 'ngôi nhà', partOfSpeech: 'noun', example: 'My house is small but cozy.', exampleVi: 'Nhà tôi nhỏ nhưng ấm cúng.', synonyms: JSON.stringify(['home']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['at home']), topic: 'home', level: 'A1' },
  { word: 'friend', ipa: '/frend/', meaning: 'bạn bè', partOfSpeech: 'noun', example: 'She is my best friend.', exampleVi: 'Cô ấy là bạn thân nhất của tôi.', synonyms: JSON.stringify(['pal']), antonyms: JSON.stringify(['enemy']), collocations: JSON.stringify(['make friends']), topic: 'daily', level: 'A1' },
  { word: 'school', ipa: '/skuːl/', meaning: 'trường học', partOfSpeech: 'noun', example: 'I go to school by bus.', exampleVi: 'Tôi đi học bằng xe buýt.', synonyms: JSON.stringify(['academy']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['go to school']), topic: 'education', level: 'A1' },
  { word: 'book', ipa: '/bʊk/', meaning: 'sách', partOfSpeech: 'noun', example: 'I read a book every night.', exampleVi: 'Tôi đọc sách mỗi tối.', synonyms: JSON.stringify(['volume']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['read a book']), topic: 'education', level: 'A1' },
  { word: 'water', ipa: '/ˈwɔː.tər/', meaning: 'nước', partOfSpeech: 'noun', example: 'Please give me some water.', exampleVi: 'Làm ơn cho tôi xin ít nước.', synonyms: JSON.stringify([]), antonyms: JSON.stringify([]), collocations: JSON.stringify(['drink water']), topic: 'daily', level: 'A1' },
  { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'vui vẻ', partOfSpeech: 'adjective', example: 'I am happy to see you.', exampleVi: 'Tôi vui khi gặp bạn.', synonyms: JSON.stringify(['joyful']), antonyms: JSON.stringify(['sad']), collocations: JSON.stringify(['happy birthday']), topic: 'emotion', level: 'A1' },
  { word: 'travel', ipa: '/ˈtræv.əl/', meaning: 'đi du lịch', partOfSpeech: 'verb', example: 'I want to travel around the world.', exampleVi: 'Tôi muốn đi vòng quanh thế giới.', synonyms: JSON.stringify(['journey']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['travel abroad']), topic: 'travel', level: 'A2' },
  { word: 'airport', ipa: '/ˈer.pɔːrt/', meaning: 'sân bay', partOfSpeech: 'noun', example: 'We arrived at the airport early.', exampleVi: 'Chúng tôi đến sân bay sớm.', synonyms: JSON.stringify([]), antonyms: JSON.stringify([]), collocations: JSON.stringify(['at the airport']), topic: 'travel', level: 'A2' },
  { word: 'hotel', ipa: '/hoʊˈtel/', meaning: 'khách sạn', partOfSpeech: 'noun', example: 'I booked a hotel for three nights.', exampleVi: 'Tôi đã đặt khách sạn ba đêm.', synonyms: JSON.stringify(['inn']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['book a hotel']), topic: 'travel', level: 'A2' },
  { word: 'meeting', ipa: '/ˈmiː.tɪŋ/', meaning: 'cuộc họp', partOfSpeech: 'noun', example: 'We have a meeting at 10 AM.', exampleVi: 'Chúng tôi có cuộc họp lúc 10 giờ sáng.', synonyms: JSON.stringify(['conference']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['have a meeting']), topic: 'business', level: 'B1' },
  { word: 'salary', ipa: '/ˈsæl.ər.i/', meaning: 'lương', partOfSpeech: 'noun', example: 'The salary is competitive.', exampleVi: 'Mức lương rất cạnh tranh.', synonyms: JSON.stringify(['wage']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['high salary']), topic: 'business', level: 'B1' },
  { word: 'interview', ipa: '/ˈɪn.tər.vjuː/', meaning: 'phỏng vấn', partOfSpeech: 'noun', example: 'I have a job interview tomorrow.', exampleVi: 'Tôi có buổi phỏng vấn vào ngày mai.', synonyms: JSON.stringify([]), antonyms: JSON.stringify([]), collocations: JSON.stringify(['job interview']), topic: 'work', level: 'B1' },
  { word: 'negotiate', ipa: '/nɪˈɡoʊ.ʃi.eɪt/', meaning: 'đàm phán', partOfSpeech: 'verb', example: 'We need to negotiate the terms.', exampleVi: 'Chúng ta cần đàm phán các điều khoản.', synonyms: JSON.stringify(['bargain']), antonyms: JSON.stringify([]), collocations: JSON.stringify(['negotiate a deal']), topic: 'business', level: 'B2' },
  { word: 'achieve', ipa: '/əˈtʃiːv/', meaning: 'đạt được', partOfSpeech: 'verb', example: 'She achieved her goal this year.', exampleVi: 'Cô ấy đã đạt được mục tiêu năm nay.', synonyms: JSON.stringify(['accomplish']), antonyms: JSON.stringify(['fail']), collocations: JSON.stringify(['achieve success']), topic: 'business', level: 'B2' }
];

const MOCK_GRAMMAR = [
  { slug: 'present-simple', title: 'Present Simple', titleVi: 'Thì hiện tại đơn', category: 'present', level: 'A1', explanation: 'Thì hiện tại đơn dùng để diễn tả thói quen, sự thật, lịch trình cố định hoặc trạng thái kéo dài. Chủ ngữ ngôi thứ 3 số ít (he, she, it) thêm "s" vào động từ.', formula: 'S + V(s/es) + O (khẳng định)', examples: JSON.stringify([{ en: 'I work at a company.', vi: 'Tôi làm việc tại một công ty.' }]), notes: 'Dấu hiệu nhận biết: always, usually, often, sometimes, never, every day/week/month.', exercises: JSON.stringify([{ question: 'She ___ (go) to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1, explanationVi: 'Chủ ngữ "She" (ngôi 3 số ít) → động từ thêm "es".' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Chủ ngữ "She" → động từ thêm "es".']), order: 1 },
  { slug: 'present-continuous', title: 'Present Continuous', titleVi: 'Thì hiện tại tiếp diễn', category: 'present', level: 'A2', explanation: 'Thì hiện tại tiếp diễn diễn tả hành động đang xảy ra tại thời điểm nói. Cấu trúc: be + V-ing.', formula: 'S + am/is/are + V-ing + O', examples: JSON.stringify([{ en: 'I am studying English now.', vi: 'Tôi đang học tiếng Anh bây giờ.' }]), notes: 'Dấu hiệu: now, right now, at the moment, currently.', exercises: JSON.stringify([{ question: 'I ___ (read) a book right now.', options: ['read', 'am reading', 'reads', 'reading'], answer: 1, explanationVi: 'Hành động đang xảy ra → am/is/are + V-ing.' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Hành động đang xảy ra → am + V-ing.']), order: 2 },
  { slug: 'past-simple', title: 'Past Simple', titleVi: 'Thì quá khứ đơn', category: 'past', level: 'A2', explanation: 'Thì quá khứ đơn diễn tả hành động đã xảy ra và kết thúc trong quá khứ. Động từ có quy tắc thêm "ed", bất quy tắc cần học thuộc.', formula: 'S + V(ed/V2) + O', examples: JSON.stringify([{ en: 'I visited Hanoi last year.', vi: 'Tôi đã thăm Hà Nội năm ngoái.' }]), notes: 'Dấu hiệu: yesterday, last week/month/year, ago, in 2020.', exercises: JSON.stringify([{ question: 'I ___ (go) to the cinema last night.', options: ['go', 'went', 'going', 'gone'], answer: 1, explanationVi: '"go" là động từ bất quy tắc → went.' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['"go" bất quy tắc → went.']), order: 3 },
  { slug: 'future-simple', title: 'Future Simple', titleVi: 'Thì tương lai đơn', category: 'future', level: 'A2', explanation: 'Thì tương lai đơn với "will" dùng để diễn tả quyết định, dự đoán, lời hứa.', formula: 'S + will + V + O', examples: JSON.stringify([{ en: 'I will call you tomorrow.', vi: 'Tôi sẽ gọi cho bạn ngày mai.' }]), notes: 'Dấu hiệu: tomorrow, next week/month/year, later, soon.', exercises: JSON.stringify([{ question: 'I think it ___ (rain) tomorrow.', options: ['rains', 'will rain', 'is raining', 'rained'], answer: 1, explanationVi: 'Dự đoán tương lai → will + V nguyên.' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Dự đoán tương lai → will + V nguyên.']), order: 4 },
  { slug: 'conditional-type-1', title: 'Conditional Type 1', titleVi: 'Câu điều kiện loại 1', category: 'conditional', level: 'A2', explanation: 'Câu điều kiện loại 1 diễn tả điều kiện có thật hoặc có khả năng xảy ra.', formula: 'If + S + V(hiện tại đơn), S + will + V', examples: JSON.stringify([{ en: 'If it rains, I will stay home.', vi: 'Nếu trời mưa, tôi sẽ ở nhà.' }]), notes: 'Mệnh đề If dùng thì hiện tại đơn, mệnh đề chính dùng will.', exercises: JSON.stringify([{ question: 'If it ___ (rain), we will cancel the trip.', options: ['rains', 'will rain', 'rained', 'is raining'], answer: 0, explanationVi: 'Mệnh đề If dùng hiện tại đơn.' }]), answerKey: JSON.stringify([0]), explanationVi: JSON.stringify(['Mệnh đề If → hiện tại đơn.']), order: 5 },
  { slug: 'passive-voice', title: 'Passive Voice', titleVi: 'Câu bị động', category: 'passive', level: 'B1', explanation: 'Câu bị động dùng khi chủ thể của hành động không quan trọng.', formula: 'S + be + V(ed/V3) + by + O', examples: JSON.stringify([{ en: 'English is spoken worldwide.', vi: 'Tiếng Anh được nói trên toàn thế giới.' }]), notes: 'Chuyển từ chủ động sang bị động: O → S, S → by + O.', exercises: JSON.stringify([{ question: 'The cake ___ (make) by my mother.', options: ['made', 'is made', 'makes', 'making'], answer: 1, explanationVi: 'Hiện tại đơn bị động: is + V3.' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Bị động: is + V3.']), order: 6 },
  { slug: 'modal-verbs', title: 'Modal Verbs', titleVi: 'Động từ khuyết thiếu', category: 'modal', level: 'B1', explanation: 'Modal verbs (can, could, may, might, must, should, would, will) diễn tả khả năng, sự cho phép, nghĩa vụ, lời khuyên.', formula: 'S + modal + V (nguyên mẫu)', examples: JSON.stringify([{ en: 'You should study harder.', vi: 'Bạn nên học chăm hơn.' }]), notes: 'Modal không thêm "s" và không dùng với "to".', exercises: JSON.stringify([{ question: 'You ___ (should/could) see a doctor.', options: ['should', 'are should', 'shoulding', 'to should'], answer: 0, explanationVi: 'Theo sau modal là V nguyên mẫu.' }]), answerKey: JSON.stringify([0]), explanationVi: JSON.stringify(['Modal + V nguyên mẫu.']), order: 7 },
  { slug: 'comparatives', title: 'Comparatives', titleVi: 'So sánh hơn và so sánh nhất', category: 'comparatives', level: 'A2', explanation: 'So sánh hai hoặc nhiều sự vật. Tính từ ngắn thêm "-er/-est", tính từ dài dùng "more/most".', formula: 'A + be + comparative + than + B', examples: JSON.stringify([{ en: 'She is taller than her sister.', vi: 'Cô ấy cao hơn chị gái.' }]), notes: 'Tính từ ngắn (1 âm tiết): tall → taller. Tính từ dài: more beautiful.', exercises: JSON.stringify([{ question: 'This book is ___ (interesting) than that one.', options: ['more interesting', 'interestinger', 'most interesting', 'interesting'], answer: 0, explanationVi: '"interesting" dài → "more".' }]), answerKey: JSON.stringify([0]), explanationVi: JSON.stringify(['Tính từ dài → dùng "more".']), order: 8 },
  { slug: 'articles', title: 'Articles', titleVi: 'Mạo từ', category: 'articles', level: 'A1', explanation: '"a" trước phụ âm, "an" trước nguyên âm, "the" cho danh từ đã xác định.', formula: 'a/an + danh từ chưa xác định, the + danh từ đã xác định', examples: JSON.stringify([{ en: 'I have a cat.', vi: 'Tôi có một con mèo.' }]), notes: 'Không dùng a/an với danh từ không đếm được.', exercises: JSON.stringify([{ question: 'She is ___ (a/an) honest person.', options: ['a', 'an', 'the', 'no article'], answer: 1, explanationVi: '"honest" bắt đầu bằng nguyên âm → "an".' }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Nguyên âm → "an".']), order: 9 },
  { slug: 'gerund-infinitive', title: 'Gerund & Infinitive', titleVi: 'Gerund và Infinitive', category: 'gerund-infinitive', level: 'B1', explanation: 'Gerund (V-ing) và Infinitive (to V). Một số động từ theo sau bằng V-ing, một số bằng to V.', formula: 'enjoy/avoid + V-ing, want/need + to V', examples: JSON.stringify([{ en: 'I enjoy learning English.', vi: 'Tôi thích học tiếng Anh.' }]), notes: 'enjoy + V-ing, want + to V.', exercises: JSON.stringify([{ question: 'I enjoy ___ (read) books.', options: ['read', 'to read', 'reading', 'reads'], answer: 2, explanationVi: '"enjoy" theo sau bằng V-ing.' }]), answerKey: JSON.stringify([2]), explanationVi: JSON.stringify(['enjoy + V-ing.']), order: 10 }
];

const MOCK_LISTENING = [
  { title: 'At the Coffee Shop', titleVi: 'Tại quán cà phê', level: 'Beginner', topic: 'daily', duration: 45, transcript: 'Waiter: Good morning! What can I get you today? Customer: Hi, can I have a cappuccino, please? Waiter: Sure. Small, medium, or large? Customer: Medium, please. Waiter: Anything else? Customer: Yes, I would also like a chocolate cookie. Waiter: That will be $5.50. Customer: Here you go. Waiter: Thank you! Your order will be ready in 5 minutes.', transcriptVi: 'Nhân viên: Chào buổi sáng! Anh dùng gì hôm nay? Khách: Chào, cho tôi một cappuccino nhé. Nhân viên: Vâng. Cốc nhỏ, vừa hay lớn? Khách: Cốc vừa. Nhân viên: Gì nữa không? Khách: Có, tôi cũng muốn một bánh quy sô cô la. Nhân viên: Tổng 5,50 đô. Khách: Đây nhé. Nhân viên: Cảm ơn! Đơn sẽ sẵn sàng trong 5 phút.', questions: JSON.stringify([{ type: 'multiple', q: 'What does the customer order?', options: ['Tea', 'Cappuccino', 'Juice', 'Water'], answer: 1 }]) },
  { title: 'Job Interview', titleVi: 'Phỏng vấn xin việc', level: 'Intermediate', topic: 'business', duration: 90, transcript: 'Interviewer: Tell me about yourself. Candidate: I have five years of experience in marketing. Interviewer: Why do you want to work here? Candidate: I admire your company culture. Interviewer: What are your salary expectations? Candidate: Around 70,000 dollars per year. Interviewer: Do you have any questions? Candidate: Yes, what does career growth look like?', transcriptVi: 'Phỏng vấn: Giới thiệu về bạn. Ứng viên: Tôi có 5 năm kinh nghiệm marketing. Phỏng vấn: Tại sao muốn làm ở đây? Ứng viên: Tôi ngưỡng mộ văn hóa công ty. Phỏng vấn: Mức lương mong muốn? Ứng viên: Khoảng 70.000 đô/năm. Phỏng vấn: Bạn có câu hỏi nào không? Ứng viên: Có, cơ hội phát triển nghề nghiệp như thế nào?', questions: JSON.stringify([{ type: 'multiple', q: 'Years of experience?', options: ['3', '5', '7', '10'], answer: 1 }]) },
  { title: 'Travel Plans', titleVi: 'Kế hoạch du lịch', level: 'Elementary', topic: 'travel', duration: 60, transcript: 'Anna: Hey Tom, do you have any plans for the summer? Tom: Yes! I am going to Japan next month. Anna: How long will you stay? Tom: I will stay for ten days. Anna: I went to Tokyo last year. The food is incredible. Tom: I cannot wait to try the sushi!', transcriptVi: 'Anna: Tom, bạn có kế hoạch mùa hè nào không? Tom: Có! Mình sẽ đi Nhật tháng sau. Anna: Ở bao lâu? Tom: Mười ngày. Anna: Mình đã đi Tokyo năm ngoái. Đồ ăn tuyệt vời. Tom: Mình nóng lòng muốn thử sushi!', questions: JSON.stringify([{ type: 'multiple', q: 'Where is Tom going?', options: ['Korea', 'Japan', 'China', 'Thailand'], answer: 1 }]) }
];

const MOCK_READING = [
  { title: 'The Importance of Learning English', titleVi: 'Tầm quan trọng của việc học tiếng Anh', level: 'A2', topic: 'daily', content: 'English is one of the most widely spoken languages in the world. It is the official language in over 60 countries. Learning English opens doors to better job opportunities, higher education, and global communication. With the rise of technology and the internet, English has become essential for accessing information.', contentVi: 'Tiếng Anh là một trong những ngôn ngữ được sử dụng rộng rãi nhất. Đây là ngôn ngữ chính thức tại hơn 60 quốc gia. Học tiếng Anh mở ra cánh cửa cho cơ hội việc làm tốt hơn, giáo dục cao hơn và giao tiếp toàn cầu. Với sự phát triển của công nghệ và internet, tiếng Anh đã trở nên thiết yếu.', keyWords: JSON.stringify([{ word: 'lingua franca', meaning: 'ngôn ngữ chung' }, { word: 'essential', meaning: 'thiết yếu' }]), questions: JSON.stringify([{ q: 'How many countries have English as official language?', options: ['30', '60', '90', '120'], answer: 1 }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['Đáp án 60 được nêu rõ trong bài.']) },
  { title: 'The Future of Remote Work', titleVi: 'Tương lai của làm việc từ xa', level: 'B1', topic: 'business', content: 'The COVID-19 pandemic accelerated the adoption of remote work. According to recent surveys, about 70 percent of workers prefer a hybrid model. Employees save commuting time and enjoy better work-life balance. Companies face challenges in maintaining team cohesion and company culture.', contentVi: 'Đại dịch COVID-19 đã đẩy nhanh việc áp dụng làm việc từ xa. Theo khảo sát, khoảng 70 phần trăm người lao động thích mô hình kết hợp. Nhân viên tiết kiệm thời gian đi lại và có cân bằng cuộc sống tốt hơn. Các công ty đối mặt với thách thức duy trì sự gắn kết và văn hóa.', keyWords: JSON.stringify([{ word: 'accelerated', meaning: 'đẩy nhanh' }, { word: 'hybrid', meaning: 'kết hợp' }]), questions: JSON.stringify([{ q: 'What percentage prefer hybrid model?', options: ['50%', '70%', '80%', '90%'], answer: 1 }]), answerKey: JSON.stringify([1]), explanationVi: JSON.stringify(['70% được nêu trong bài.']) }
];

const MOCK_TOEIC = [
  { title: 'TOEIC Part 1 - Mini Test', part: 'listening-1', type: 'mini', questions: JSON.stringify([{ question: 'What is the man doing?', options: ['He is reading a newspaper.', 'He is jogging.', 'He is buying a coffee.', 'He is sleeping.'], answer: 0, explanationVi: 'Người đàn ông đang đọc báo → A.' }, { question: 'What is the woman doing?', options: ['She is cooking.', 'She is typing on a laptop.', 'She is driving.', 'She is swimming.'], answer: 1, explanationVi: 'Phụ nữ đang gõ laptop → B.' }, { question: 'Where are the people?', options: ['At a bus stop', 'At an airport', 'At a restaurant', 'At a hospital'], answer: 0, explanationVi: 'Mọi người ở trạm xe buýt → A.' }, { question: 'Who is in the kitchen?', options: ['A teacher', 'A chef', 'A doctor', 'A driver'], answer: 1, explanationVi: 'Đầu bếp trong bếp → B.' }, { question: 'What are the men doing?', options: ['Fighting', 'Shaking hands', 'Reading', 'Sleeping'], answer: 1, explanationVi: 'Hai người bắt tay → B.' }]), audioUrl: null },
  { title: 'TOEIC Part 2 - Question-Response', part: 'listening-2', type: 'mini', questions: JSON.stringify([{ question: '"Where is the meeting room?" - Choose the best response.', options: ['It\'s on the second floor.', 'At 10 AM.', 'Yes, I will.', 'I like meetings.'], answer: 0, explanationVi: 'Where → trả lời địa điểm.' }, { question: '"When does the train leave?" - Choose the best response.', options: ['At the station.', 'In Tokyo.', 'At 3 PM.', 'By bus.'], answer: 2, explanationVi: 'When → trả lời thời gian.' }, { question: '"Could you help me with this report?" - Choose the best response.', options: ['Sure, what do you need?', 'It\'s a report.', 'I\'m busy now.', 'No, thanks.'], answer: 0, explanationVi: 'Lời nhờ giúp → đồng ý giúp.' }]), audioUrl: null },
  { title: 'TOEIC Part 5 - Incomplete Sentences', part: 'reading-5', type: 'mini', questions: JSON.stringify([{ question: 'The meeting ___ at 9 AM tomorrow.', options: ['start', 'starts', 'starting', 'is start'], answer: 1, explanationVi: 'Chủ ngữ số ít → động từ +s.' }, { question: 'Please ___ the report by Friday.', options: ['submit', 'submits', 'submitting', 'to submit'], answer: 0, explanationVi: 'Sau Please → V nguyên.' }, { question: 'She has been working here ___ 2015.', options: ['since', 'for', 'from', 'at'], answer: 0, explanationVi: 'Since + mốc thời gian.' }]), audioUrl: null }
];

const MOCK_ACHIEVEMENTS = [
  { slug: 'first-lesson', title: 'First Lesson', titleVi: 'Bài học đầu tiên', description: 'Hoàn thành bài học đầu tiên', icon: '🎓', condition: JSON.stringify({ type: 'lessons', threshold: 1 }), xpReward: 20 },
  { slug: 'vocab-100', title: '100 Words', titleVi: '100 từ vựng', description: 'Học được 100 từ vựng', icon: '📚', condition: JSON.stringify({ type: 'vocab', threshold: 100 }), xpReward: 100 },
  { slug: 'streak-7', title: '7-Day Streak', titleVi: '7 ngày liên tục', description: 'Học liên tục 7 ngày', icon: '🔥', condition: JSON.stringify({ type: 'streak', threshold: 7 }), xpReward: 50 },
  { slug: 'streak-30', title: '30-Day Streak', titleVi: '30 ngày liên tục', description: 'Học liên tục 30 ngày', icon: '🌟', condition: JSON.stringify({ type: 'streak', threshold: 30 }), xpReward: 200 },
  { slug: 'listening-50', title: 'Listening Master', titleVi: 'Bậc thầy nghe', description: 'Hoàn thành 50 bài nghe', icon: '🎧', condition: JSON.stringify({ type: 'listening', threshold: 50 }), xpReward: 150 },
  { slug: 'grammar-80', title: 'Grammar Pro', titleVi: 'Cao thủ ngữ pháp', description: 'Đạt 80% bài ngữ pháp', icon: '✍️', condition: JSON.stringify({ type: 'grammar', threshold: 80 }), xpReward: 100 },
  { slug: 'placement-done', title: 'Placement Done', titleVi: 'Hoàn thành kiểm tra', description: 'Hoàn thành bài kiểm tra đầu vào', icon: '✅', condition: JSON.stringify({ type: 'placement', threshold: 1 }), xpReward: 30 }
];

async function main() {
  console.log('🌱 Bắt đầu nạp dữ liệu mẫu...');

  // 1. Admin account
  const adminHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hoctiengan.ai' },
    update: {},
    create: {
      email: 'admin@hoctiengan.ai',
      passwordHash: adminHash,
      fullName: 'Quản trị viên',
      role: 'ADMIN',
      placementDone: true,
      currentLevel: 'C2'
    }
  });
  console.log('✅ Tài khoản admin:', admin.email, '/ admin123');

  // 2. Demo user
  const userHash = await bcrypt.hash('user123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@hoctiengan.ai' },
    update: {},
    create: {
      email: 'demo@hoctiengan.ai',
      passwordHash: userHash,
      fullName: 'Người dùng Demo',
      role: 'USER',
      placementDone: true,
      currentLevel: 'B1',
      targetLevel: 'C1',
      targetExam: 'IELTS',
      targetScore: 7,
      dailyMinutes: 45,
      xp: 350,
      level: 4,
      streak: 5,
      longestStreak: 12,
      totalStudyDays: 15,
      totalStudyMinutes: 720
    }
  });
  console.log('✅ Tài khoản demo:', demoUser.email, '/ user123');

  // 3. Vocabulary
  for (const v of MOCK_VOCABULARY) {
    await prisma.vocabulary.upsert({
      where: { word_level: { word: v.word, level: v.level } },
      update: {},
      create: v
    });
  }
  console.log(`✅ Đã nạp ${MOCK_VOCABULARY.length} từ vựng`);

  // 4. Grammar
  for (const g of MOCK_GRAMMAR) {
    await prisma.grammarLesson.upsert({
      where: { slug: g.slug },
      update: {},
      create: g
    });
  }
  console.log(`✅ Đã nạp ${MOCK_GRAMMAR.length} bài ngữ pháp`);

  // 5. Listening
  for (const l of MOCK_LISTENING) {
    await prisma.listeningLesson.create({ data: l });
  }
  console.log(`✅ Đã nạp ${MOCK_LISTENING.length} bài nghe`);

  // 6. Reading
  for (const r of MOCK_READING) {
    await prisma.readingPassage.create({ data: r });
  }
  console.log(`✅ Đã nạp ${MOCK_READING.length} bài đọc`);

  // 7. TOEIC
  for (const t of MOCK_TOEIC) {
    await prisma.toeicTest.create({ data: t });
  }
  console.log(`✅ Đã nạp ${MOCK_TOEIC.length} bài TOEIC`);

  // 8. Achievements
  for (const a of MOCK_ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { slug: a.slug },
      update: {},
      create: a
    });
  }
  console.log(`✅ Đã nạp ${MOCK_ACHIEVEMENTS.length} thành tựu`);

  // 9. LearningProgress for demo user
  const skills = ['vocabulary', 'grammar', 'listening', 'reading', 'speaking', 'writing'];
  for (const skill of skills) {
    await prisma.learningProgress.upsert({
      where: { userId_skill: { userId: demoUser.id, skill } },
      update: {},
      create: {
        userId: demoUser.id,
        skill,
        score: skill === 'listening' ? 55 : skill === 'speaking' ? 40 : 80 + Math.random() * 15,
        totalTime: Math.floor(Math.random() * 200),
        lessonsDone: Math.floor(Math.random() * 30)
      }
    });
  }
  console.log('✅ Đã tạo tiến độ học cho user demo');

  // 10. Notifications
  await prisma.notification.createMany({
    data: [
      { userId: demoUser.id, type: 'reminder', title: 'Đã đến giờ học rồi!', message: 'Hãy dành 30 phút học tiếng Anh hôm nay nhé.' },
      { userId: demoUser.id, type: 'streak', title: 'Đừng để mất chuỗi ngày học!', message: 'Bạn đang có chuỗi 5 ngày. Hãy học hôm nay để duy trì!' },
      { userId: demoUser.id, type: 'vocab-review', title: 'Có 5 từ vựng cần ôn', message: 'AI nhắc bạn ôn lại những từ vựng sắp quên.' }
    ]
  });
  console.log('✅ Đã tạo thông báo mẫu');

  console.log('🎉 Hoàn thành nạp dữ liệu!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });