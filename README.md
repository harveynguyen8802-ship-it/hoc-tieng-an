# 🇬🇧 Học Tiếng Anh AI

> **Nền tảng học tiếng Anh cá nhân hóa bằng AI dành cho người Việt Nam**

Ứng dụng học tiếng Anh hiện đại với lộ trình được AI cá nhân hóa cho từng người dùng. Hỗ trợ đầy đủ từ cơ bản đến TOEIC/IELTS, giao tiếp thực tế với nhiều vai trò.

---

## ✨ Tính năng chính

### 🎯 Hệ thống tài khoản
- Đăng ký / Đăng nhập / Đăng xuất
- Quên mật khẩu / Đổi mật khẩu
- Cập nhật hồ sơ, mục tiêu TOEIC/IELTS
- JWT Authentication + Refresh Token

### 📊 Kiểm tra trình độ đầu vào
- 15 câu hỏi đa dạng: Từ vựng, Ngữ pháp, Đọc hiểu, Nghe hiểu, Phản xạ
- AI phân tích và xác định trình độ A1-C2
- Đề xuất lộ trình học cá nhân

### 🏠 Dashboard thông minh
- Hiển thị trực quan: Level, XP, Streak, tiến bộ
- Biểu đồ: Tiến bộ ngày/tuần/tháng, điểm 6 kỹ năng
- **"Hôm nay bạn nên học gì?"** - AI đề xuất bài học

### 🧠 Học từ vựng thông minh
- 18+ từ vựng mẫu với IPA, nghĩa, ví dụ, synonyms
- **Spaced Repetition (SM-2)** - ôn từ bạn hay sai
- Flashcard + ôn tập + đánh dấu yêu thích
- Phân loại theo chủ đề

### 📖 Ngữ pháp (10+ bài)
- Phân loại: Thì, Câu điều kiện, Bị động, Gerund, Modal, v.v.
- Giải thích + công thức + ví dụ + bài tập + đáp án tiếng Việt

### 🎧 Luyện nghe (3+ bài)
- Theo 5 trình độ: Beginner → Advanced
- Phát chậm / bình thường / từng câu
- Transcript tiếng Anh + dịch tiếng Việt

### 🗣️ Luyện nói với AI
- 9+ chủ đề: Giới thiệu, Du lịch, Phỏng vấn, v.v.
- AI phân tích: Pronunciation, Fluency, Grammar, Vocabulary, v.v.
- Sửa lỗi + câu tự nhiên hơn

### 🤖 Trò chuyện với AI (7 vai trò)
- Bạn bè / Giáo viên / Đồng nghiệp / Nhà tuyển dụng / Khách hàng / Nhà hàng / Sân bay
- Nút "Giải thích bằng tiếng Việt"

### 📚 Luyện đọc + ✍️ Luyện viết
- Reading theo 4 chủ đề: Daily, Business, TOEIC, IELTS
- Writing với AI chấm 6 tiêu chí

### 🎯 Luyện thi TOEIC
- 7 Parts: Listening 1-4, Reading 5-7
- Mini Test + Full Test
- Chấm điểm + dự đoán trình độ

### 🏆 Gamification
- XP, Level, Streak, Achievements
- 8+ huy hiệu

### 🛡️ Admin Panel
- Thống kê tổng quan
- Quản lý người dùng

---

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js >= 18.x
- npm hoặc yarn

### Bước 1: Cài đặt dependencies

```bash
cd "E:/Hoc Tieng an"
npm install
```

### Bước 2: Tạo database và nạp dữ liệu mẫu

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Bước 3: Chạy dev server

```bash
npm run dev
```

Mở trình duyệt: [http://localhost:3000](http://localhost:3000)

### Tài khoản demo

| Role | Email | Password |
|------|-------|----------|
| 👤 User | `demo@hoctiengan.ai` | `user123` |
| 🛡️ Admin | `admin@hoctiengan.ai` | `admin123` |

---

## 📁 Cấu trúc dự án

```
Hoc Tieng an/
├── prisma/
│   ├── schema.prisma           # 21 bảng database
│   └── seed.js                 # Dữ liệu mẫu
├── src/
│   ├── app/
│   │   ├── api/                # REST API
│   │   │   ├── auth/           # login, register, profile, forgot-password
│   │   │   ├── placement/      # placement test
│   │   │   ├── dashboard/      # stats, recommend
│   │   │   ├── vocabulary/     # list, review, favorite
│   │   │   ├── grammar/        # list, complete
│   │   │   ├── listening/      # list, complete
│   │   │   ├── reading/        # list, complete
│   │   │   ├── speaking/       # AI feedback
│   │   │   ├── writing/        # AI analysis
│   │   │   ├── toeic/          # tests, submit
│   │   │   ├── ai-conversation/# role-based chat
│   │   │   ├── progress/       # learning stats
│   │   │   ├── notifications/  # list, unread-count
│   │   │   └── admin/          # admin stats
│   │   ├── login/              # Trang đăng nhập
│   │   ├── register/           # Trang đăng ký
│   │   ├── forgot-password/    # Quên mật khẩu
│   │   ├── placement/          # Kiểm tra trình độ
│   │   ├── dashboard/          # Trang tổng quan
│   │   ├── learn/              # Hub học tập
│   │   ├── vocabulary/         # Từ vựng
│   │   ├── grammar/            # Ngữ pháp
│   │   ├── listening/          # Luyện nghe
│   │   ├── speaking/           # Luyện nói
│   │   ├── ai-conversation/    # Trò chuyện AI
│   │   ├── reading/            # Luyện đọc
│   │   ├── writing/            # Luyện viết
│   │   ├── toeic/              # TOEIC
│   │   ├── progress/           # Tiến độ
│   │   ├── profile/            # Hồ sơ
│   │   ├── notifications/      # Thông báo
│   │   └── admin/              # Quản trị
│   ├── components/
│   │   ├── AppShell.tsx        # Layout chính
│   │   ├── Layout.tsx          # Sidebar + Header
│   │   └── States.tsx          # Loading, Empty, Error
│   ├── lib/
│   │   ├── prisma.ts           # Prisma Client
│   │   ├── auth.ts             # JWT + bcrypt
│   │   ├── auth-context.tsx    # Auth React Context
│   │   ├── api-helpers.ts      # requireAuth/requireAdmin
│   │   ├── i18n.ts             # Toàn bộ text tiếng Việt
│   │   ├── utils.ts            # cn, formatDate, sm2...
│   │   └── mock-data.ts        # Mock data + AI prompts
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Redirect
│   │   └── globals.css         # Tailwind + custom CSS
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env
└── README.md
```

---

## 🗄️ Database Schema (21 bảng)

| # | Bảng | Mô tả |
|---|------|-------|
| 1 | `User` | Tài khoản người dùng |
| 2 | `Profile` | Hồ sơ chi tiết |
| 3 | `LearningProgress` | Tiến độ theo kỹ năng |
| 4 | `Vocabulary` | Từ vựng |
| 5 | `VocabularyReview` | Spaced Repetition data |
| 6 | `GrammarLesson` | Bài ngữ pháp |
| 7 | `ListeningLesson` | Bài nghe |
| 8 | `ReadingPassage` | Bài đọc |
| 9 | `SpeakingSession` | Lịch sử luyện nói |
| 10 | `WritingSubmission` | Bài viết đã nộp |
| 11 | `QuizQuestion` | Câu hỏi trắc nghiệm |
| 12 | `QuizAttempt` | Lịch sử làm bài |
| 13 | `PlacementResult` | Kết quả kiểm tra đầu vào |
| 14 | `ToeicTest` | Đề thi TOEIC |
| 15 | `ToeicResult` | Kết quả TOEIC |
| 16 | `Achievement` | Thành tựu |
| 17 | `UserAchievement` | Đã mở khóa thành tựu |
| 18 | `DailyLearningPlan` | Kế hoạch hàng ngày |
| 19 | `AiConversation` | Lịch sử chat AI |
| 20 | `Notification` | Thông báo |

---

## 🤖 Tích hợp AI thật

Hiện tại app dùng **Mock AI** (xử lý trong `src/lib/mock-data.ts`).

Để tích hợp AI thật (OpenAI/Claude/Gemini), chỉ cần thay thế hàm trong các file:
- `src/app/api/speaking/route.ts` → `generateSpeakingFeedback()`
- `src/app/api/writing/route.ts` → `analyzeWriting()`
- `src/app/api/ai-conversation/route.ts` → `generateAIReply()`

Ví dụ với OpenAI:
```javascript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSpeakingFeedback(userText) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: 'You are an English teacher. Analyze the student\'s English and give feedback in JSON...' }, { role: 'user', content: userText }]
  });
  return JSON.parse(completion.choices[0].message.content);
}
```

---

## 🌐 Ngôn ngữ

**Toàn bộ UI mặc định bằng tiếng Việt.** Tất cả text tiếng Anh trong app đều là nội dung học tập.

Chỉnh sửa text trong `src/lib/i18n.ts`.

---

## 🛡️ Bảo mật

- Password hash với bcrypt
- JWT + Refresh Token
- Role-based access control (USER, ADMIN)
- Cookie httpOnly
- Validate input trên tất cả API
- User chỉ truy cập dữ liệu của mình

Để production: đổi `JWT_SECRET` trong `.env`.

---

## 🎨 UI/UX

- **Tailwind CSS** + **Lucide Icons**
- **Recharts** cho biểu đồ
- Mobile-first responsive
- Glass morphism + gradient
- Animation với framer-motion ready

---

## 📱 Responsive

- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

---

## 🚢 Production

```bash
npm run build
npm start
```

**Lưu ý trước khi deploy:**
1. Đổi `JWT_SECRET` và `JWT_REFRESH_SECRET` trong `.env`
2. Đổi `DATABASE_URL` sang PostgreSQL nếu cần scale
3. Cấu hình email service thật cho "Quên mật khẩu"
4. Tích hợp AI provider thật (OpenAI/Claude/Gemini)
5. Bật HTTPS và secure cookies

---

## 📝 License

Dự án cá nhân - sử dụng cho mục đích học tập và thương mại.

---

**🇻🇳 Học tiếng Anh cùng AI - Hành trình cá nhân hóa cho mỗi người Việt.**