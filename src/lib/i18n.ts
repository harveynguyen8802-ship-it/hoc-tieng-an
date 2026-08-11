// =====================================================
// TOÀN BỘ CHUỖI TIẾNG VIỆT DÙNG TRONG APP
// Theo yêu cầu: ngôn ngữ mặc định = Tiếng Việt
// =====================================================

export const VI = {
  // Chung
  appName: 'Học Tiếng Anh AI',
  appTagline: 'Nền tảng học tiếng Anh cá nhân hóa bằng AI',
  loading: 'Đang tải...',
  save: 'Lưu',
  cancel: 'Hủy',
  delete: 'Xóa',
  edit: 'Chỉnh sửa',
  confirm: 'Xác nhận',
  continue: 'Tiếp tục',
  back: 'Quay lại',
  next: 'Tiếp theo',
  previous: 'Trước',
  finish: 'Hoàn thành',
  search: 'Tìm kiếm',
  filter: 'Lọc',
  all: 'Tất cả',
  yes: 'Có',
  no: 'Không',
  optional: '(tùy chọn)',
  required: '(bắt buộc)',
  minutes: 'phút',
  days: 'ngày',
  points: 'điểm',

  // Menu
  menu: {
    home: 'Trang chủ',
    learning: 'Học tập',
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Luyện nghe',
    speaking: 'Luyện nói',
    reading: 'Luyện đọc',
    writing: 'Luyện viết',
    aiConversation: 'Trò chuyện với AI',
    toeic: 'Luyện thi TOEIC',
    progress: 'Tiến độ học tập',
    account: 'Tài khoản',
    admin: 'Quản trị',
    logout: 'Đăng xuất'
  },

  // Auth
  auth: {
    login: 'Đăng nhập',
    register: 'Đăng ký',
    forgotPassword: 'Quên mật khẩu',
    resetPassword: 'Đặt lại mật khẩu',
    changePassword: 'Đổi mật khẩu',
    email: 'Email',
    password: 'Mật khẩu',
    fullName: 'Họ và tên',
    confirmPassword: 'Xác nhận mật khẩu',
    forgotPasswordHint: 'Nhập email để nhận liên kết đặt lại mật khẩu',
    sendResetLink: 'Gửi liên kết đặt lại',
    noAccount: 'Chưa có tài khoản?',
    hasAccount: 'Đã có tài khoản?',
    registerNow: 'Đăng ký ngay',
    loginNow: 'Đăng nhập ngay',
    logout: 'Đăng xuất',
    welcomeBack: 'Chào mừng bạn quay lại!',
    welcomeNew: 'Chào mừng bạn đến với Học Tiếng Anh AI',
    loggedOut: 'Bạn đã đăng xuất thành công',
    loginSuccess: 'Đăng nhập thành công',
    registerSuccess: 'Đăng ký thành công! Hãy làm bài kiểm tra trình độ để bắt đầu.',
    invalidCredentials: 'Email hoặc mật khẩu không đúng',
    emailExists: 'Email đã được sử dụng',
    passwordTooShort: 'Mật khẩu phải có ít nhất 6 ký tự',
    passwordMismatch: 'Mật khẩu xác nhận không khớp'
  },

  // Profile
  profile: {
    title: 'Hồ sơ cá nhân',
    avatar: 'Ảnh đại diện',
    updateProfile: 'Cập nhật hồ sơ',
    profileUpdated: 'Đã cập nhật hồ sơ',
    currentLevel: 'Trình độ hiện tại',
    targetLevel: 'Trình độ mục tiêu',
    targetExam: 'Mục tiêu kỳ thi',
    targetScore: 'Điểm mục tiêu',
    dailyMinutes: 'Thời gian học mỗi ngày',
    phone: 'Số điện thoại',
    dateOfBirth: 'Ngày sinh',
    occupation: 'Nghề nghiệp',
    bio: 'Giới thiệu',
    goalNotes: 'Ghi chú mục tiêu'
  },

  // Levels
  level: {
    A1: 'A1 – Cơ bản',
    A2: 'A2 – Sơ cấp',
    B1: 'B1 – Trung cấp',
    B2: 'B2 – Khá',
    C1: 'C1 – Cao cấp',
    C2: 'C2 – Thành thạo'
  },

  // Dashboard
  dashboard: {
    title: 'Trang tổng quan',
    greeting: 'Xin chào',
    todayPlan: 'Hôm nay bạn nên học gì?',
    todayPlanDesc: 'AI đã phân tích lịch sử học tập và đề xuất lộ trình phù hợp nhất với bạn.',
    stats: {
      level: 'Cấp độ',
      xp: 'Điểm kinh nghiệm',
      streak: 'Chuỗi ngày học',
      totalDays: 'Tổng ngày học',
      totalTime: 'Tổng thời gian học',
      vocabLearned: 'Số từ vựng đã học',
      lessonsDone: 'Số bài đã hoàn thành',
      avgScore: 'Điểm trung bình',
      goalProgress: 'Tiến độ mục tiêu'
    },
    charts: {
      dailyProgress: 'Tiến bộ theo ngày',
      weeklyProgress: 'Tiến bộ theo tuần',
      monthlyProgress: 'Tiến bộ theo tháng',
      skills: 'Điểm các kỹ năng'
    },
    start: 'Bắt đầu học',
    dailyGoal: 'Mục tiêu hôm nay',
    dailyGoalDone: 'Đã hoàn thành mục tiêu!'
  },

  // Placement test
  placement: {
    title: 'Kiểm tra trình độ đầu vào',
    desc: 'Hoàn thành bài kiểm tra để AI xác định trình độ và đề xuất lộ trình phù hợp.',
    sections: {
      vocab: 'Từ vựng',
      grammar: 'Ngữ pháp',
      reading: 'Đọc hiểu',
      listening: 'Nghe hiểu',
      reflex: 'Phản xạ'
    },
    question: 'Câu hỏi',
    of: 'trên',
    submit: 'Nộp bài',
    result: 'Kết quả',
    totalScore: 'Điểm tổng',
    skillScores: 'Điểm từng kỹ năng',
    strengths: 'Điểm mạnh',
    weaknesses: 'Điểm yếu cần cải thiện',
    recommendations: 'Nội dung cần cải thiện',
    learningPath: 'Lộ trình học đề xuất',
    startTest: 'Bắt đầu làm bài',
    retake: 'Làm lại bài kiểm tra',
    skip: 'Bỏ qua (làm sau)',
    yourLevel: 'Trình độ của bạn'
  },

  // Vocabulary
  vocab: {
    title: 'Từ vựng',
    learn: 'Học từ mới',
    flashcard: 'Flashcard',
    favorite: 'Yêu thích',
    unfavorite: 'Bỏ yêu thích',
    pronunciation: 'Phát âm',
    synonyms: 'Từ đồng nghĩa',
    antonyms: 'Từ trái nghĩa',
    collocations: 'Collocations (cụm từ)',
    example: 'Ví dụ',
    partOfSpeech: 'Loại từ',
    topic: 'Chủ đề',
    mark: 'Đánh dấu',
    known: 'Đã biết',
    unknown: 'Chưa biết',
    review: 'Ôn tập',
    nextWord: 'Từ tiếp theo',
    showMeaning: 'Hiện nghĩa',
    hideMeaning: 'Ẩn nghĩa',
    hearAgain: 'Nghe lại',
    summary: 'Tổng kết',
    streakDays: 'Chuỗi ngày học',
    noWords: 'Chưa có từ vựng để học hôm nay',
    completedToday: 'Bạn đã hoàn thành phần ôn tập hôm nay!',
    addFavorite: 'Đã thêm vào yêu thích',
    removeFavorite: 'Đã bỏ khỏi yêu thích',
    correct: 'Đúng!',
    incorrect: 'Sai rồi, từ này sẽ được ôn lại sớm',
    repetitionNote: 'Hệ thống sẽ tự động ôn lại những từ bạn hay sai'
  },

  // Grammar
  grammar: {
    title: 'Ngữ pháp',
    categories: {
      present: 'Thì hiện tại',
      past: 'Thì quá khứ',
      future: 'Thì tương lai',
      conditional: 'Câu điều kiện',
      passive: 'Câu bị động',
      'relative-clause': 'Mệnh đề quan hệ',
      'gerund-infinitive': 'Gerund / Infinitive',
      modal: 'Modal verbs',
      articles: 'Articles (mạo từ)',
      prepositions: 'Giới từ',
      comparatives: 'So sánh',
      'reported-speech': 'Câu tường thuật',
      advanced: 'Cấu trúc nâng cao'
    },
    explanation: 'Giải thích',
    formula: 'Công thức',
    examples: 'Ví dụ',
    notes: 'Lưu ý',
    exercises: 'Bài tập',
    answers: 'Đáp án',
    explanationAnswer: 'Giải thích đáp án',
    startExercise: 'Làm bài tập',
    checkAnswer: 'Kiểm tra đáp án',
    yourAnswer: 'Bạn chọn',
    correct: 'Đúng',
    wrong: 'Sai',
    score: 'Điểm',
    of: 'trên'
  },

  // Listening
  listening: {
    title: 'Luyện nghe',
    levels: {
      Beginner: 'Cơ bản',
      Elementary: 'Sơ cấp',
      Intermediate: 'Trung cấp',
      'Upper Intermediate': 'Trung cao cấp',
      Advanced: 'Nâng cao'
    },
    play: 'Phát',
    pause: 'Tạm dừng',
    slow: 'Phát chậm',
    normal: 'Phát bình thường',
    playSentence: 'Phát từng câu',
    repeat: 'Lặp lại câu',
    showTranscript: 'Hiện transcript',
    hideTranscript: 'Ẩn transcript',
    transcript: 'Transcript',
    translation: 'Dịch tiếng Việt',
    questions: 'Câu hỏi',
    fillBlank: 'Điền từ',
    multipleChoice: 'Trắc nghiệm',
    listenWrite: 'Nghe và viết lại câu',
    submit: 'Nộp bài',
    listen: 'Nghe'
  },

  // Speaking
  speaking: {
    title: 'Luyện nói',
    topics: {
      introduce: 'Giới thiệu bản thân',
      work: 'Công việc',
      family: 'Gia đình',
      travel: 'Du lịch',
      shopping: 'Mua sắm',
      restaurant: 'Nhà hàng',
      office: 'Công sở',
      interview: 'Phỏng vấn xin việc',
      daily: 'Giao tiếp hàng ngày',
      'toeic-speaking': 'TOEIC Speaking',
      'ielts-speaking': 'IELTS Speaking'
    },
    recordOrType: 'Nhập câu trả lời của bạn',
    analyze: 'Phân tích',
    pronunciation: 'Phát âm',
    fluency: 'Độ trôi chảy',
    grammar: 'Ngữ pháp',
    vocabulary: 'Từ vựng',
    sentenceStructure: 'Cấu trúc câu',
    naturalness: 'Tự nhiên',
    yourText: 'Câu của bạn',
    corrected: 'Câu đúng',
    explanation: 'Giải thích',
    moreNatural: 'Cách nói tự nhiên hơn',
    feedback: 'Phản hồi',
    score: 'Điểm',
    tryAnother: 'Thử câu khác',
    placeholder: 'Ví dụ: I really enjoy learning English.'
  },

  // AI Conversation
  aiConv: {
    title: 'Trò chuyện với AI',
    roles: {
      friend: 'Bạn bè',
      teacher: 'Giáo viên',
      colleague: 'Đồng nghiệp',
      recruiter: 'Nhà tuyển dụng',
      customer: 'Khách hàng',
      restaurant: 'Nhân viên nhà hàng',
      airport: 'Nhân viên sân bay'
    },
    explainInVietnamese: 'Giải thích bằng tiếng Việt',
    typeMessage: 'Nhập tin nhắn tiếng Anh...',
    send: 'Gửi',
    newConversation: 'Cuộc trò chuyện mới',
    topic: 'Chủ đề',
    selectRole: 'Chọn vai trò',
    free: 'Tự do',
    explainNote: 'AI sẽ giải thích câu nói, từ vựng và ngữ pháp bằng tiếng Việt',
    aiTyping: 'AI đang trả lời...'
  },

  // Reading
  reading: {
    title: 'Luyện đọc',
    categories: {
      daily: 'Tiếng Anh hàng ngày',
      business: 'Tiếng Anh thương mại',
      toeic: 'TOEIC',
      ielts: 'IELTS'
    },
    passage: 'Bài đọc',
    keyWords: 'Từ vựng quan trọng',
    translation: 'Dịch tiếng Việt',
    questions: 'Câu hỏi',
    answers: 'Đáp án',
    explanation: 'Giải thích',
    difficulty: 'Độ khó'
  },

  // Writing
  writing: {
    title: 'Luyện viết',
    placeholder: 'Nhập đoạn văn tiếng Anh của bạn...',
    analyze: 'Phân tích bài viết',
    yourText: 'Bài viết của bạn',
    corrected: 'Phiên bản sửa',
    explanation: 'Giải thích',
    moreNatural: 'Phiên bản tự nhiên hơn',
    grammar: 'Ngữ pháp',
    spelling: 'Chính tả',
    vocabulary: 'Từ vựng',
    structure: 'Cấu trúc câu',
    coherence: 'Tính mạch lạc',
    naturalness: 'Tự nhiên',
    score: 'Điểm tổng',
    prompt: 'Chủ đề'
  },

  // TOEIC
  toeic: {
    title: 'Luyện thi TOEIC',
    desc: 'Luyện thi TOEIC với các bài test theo từng Part và bài thi đầy đủ.',
    mini: 'Mini Test',
    full: 'Full Test',
    parts: {
      'listening-1': 'Part 1 – Photographs',
      'listening-2': 'Part 2 – Question-Response',
      'listening-3': 'Part 3 – Conversations',
      'listening-4': 'Part 4 – Talks',
      'reading-5': 'Part 5 – Incomplete Sentences',
      'reading-6': 'Part 6 – Text Completion',
      'reading-7': 'Part 7 – Reading Comprehension'
    },
    target: 'Mục tiêu điểm TOEIC',
    targets: {
      450: '450 – Sơ cấp',
      550: '550 – Có nền tảng',
      650: '650 – Trung cấp',
      750: '750 – Khá',
      850: '850+ – Giỏi',
      900: '900+ – Xuất sắc'
    },
    listeningScore: 'Điểm Listening',
    readingScore: 'Điểm Reading',
    totalScore: 'Tổng điểm',
    predicted: 'Dự đoán trình độ',
    analysis: 'Phân tích câu sai',
    start: 'Bắt đầu làm bài',
    result: 'Kết quả',
    questions: 'Câu hỏi',
    of: 'trên',
    next: 'Câu tiếp',
    submit: 'Nộp bài',
    correct: 'Đúng',
    wrong: 'Sai',
    yourAnswer: 'Bạn chọn',
    correctAnswer: 'Đáp án đúng'
  },

  // XP / Streak / Achievement
  gamification: {
    level: 'Cấp độ',
    xp: 'XP',
    streak: 'Streak',
    achievements: 'Thành tựu',
    badges: 'Huy hiệu',
    dailyGoal: 'Mục tiêu hàng ngày',
    streakDays: 'Chuỗi ngày học',
    unlocked: 'Đã mở khóa',
    locked: 'Chưa mở khóa',
    progress: 'Tiến độ',
    toNextLevel: 'Để lên cấp tiếp theo'
  },

  // AI Personalized
  aiPersonal: {
    title: 'Lộ trình cá nhân hóa',
    analysis: 'Phân tích năng lực',
    strongSkills: 'Kỹ năng mạnh',
    weakSkills: 'Kỹ năng yếu',
    recommendation: 'Khuyến nghị',
    suggestedPlan: 'Lộ trình gợi ý',
    weeklyFocus: 'Trọng tâm tuần này',
    timeAllocation: 'Phân bổ thời gian',
    regenerate: 'Tạo lộ trình mới'
  },

  // Daily Plan
  dailyPlan: {
    title: 'Kế hoạch học hôm nay',
    today: 'Hôm nay',
    minutes: 'phút',
    vocab: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Luyện nghe',
    speaking: 'Luyện nói',
    reading: 'Luyện đọc',
    writing: 'Luyện viết',
    review: 'Ôn tập',
    done: 'Hoàn thành',
    markDone: 'Đánh dấu hoàn thành',
    completed: 'Đã hoàn thành!',
    newPlan: 'Tạo kế hoạch mới'
  },

  // Notification
  notification: {
    title: 'Thông báo',
    studyTime: 'Đã đến giờ học rồi!',
    streakWarning: 'Sắp mất chuỗi ngày học, hãy học ngay hôm nay nhé!',
    vocabReview: 'Bạn có từ vựng cần ôn tập',
    newLesson: 'Có bài học mới',
    achievement: 'Bạn vừa đạt thành tựu mới!',
    goalComplete: 'Hoàn thành mục tiêu hôm nay!',
    markAllRead: 'Đánh dấu tất cả đã đọc',
    noNotif: 'Không có thông báo'
  },

  // Admin
  admin: {
    title: 'Quản trị hệ thống',
    overview: 'Tổng quan',
    users: 'Người dùng',
    lessons: 'Bài học',
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Luyện nghe',
    reading: 'Luyện đọc',
    quiz: 'Bài kiểm tra',
    toeic: 'TOEIC',
    stats: 'Thống kê',
    totalUsers: 'Tổng người dùng',
    activeUsers: 'Người dùng hoạt động',
    newUsers: 'Người dùng mới',
    totalLessons: 'Tổng bài học',
    totalAttempts: 'Tổng lượt học',
    totalStudyTime: 'Tổng thời gian học',
    completionRate: 'Tỷ lệ hoàn thành',
    correctRate: 'Tỷ lệ trả lời đúng',
    aiContent: 'Nội dung AI'
  },

  // Errors
  errors: {
    generic: 'Đã có lỗi xảy ra, vui lòng thử lại',
    network: 'Lỗi kết nối mạng',
    unauthorized: 'Bạn cần đăng nhập để tiếp tục',
    forbidden: 'Bạn không có quyền truy cập',
    notFound: 'Không tìm thấy',
    validation: 'Dữ liệu không hợp lệ'
  },

  // Success
  success: {
    saved: 'Đã lưu',
    updated: 'Đã cập nhật',
    deleted: 'Đã xóa',
    completed: 'Hoàn thành!'
  }
};

export type ViDict = typeof VI;