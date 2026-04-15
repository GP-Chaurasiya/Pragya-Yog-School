import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'hi';

interface Translations {
  // Common
  welcome: string;
  login: string;
  register: string;
  email: string;
  password: string;
  name: string;
  logout: string;
  back: string;
  cancel: string;
  confirm: string;
  delete: string;
  edit: string;
  save: string;
  loading: string;
  
  // App specific
  appName: string;
  tagline: string;
  findPeace: string;
  
  // Auth
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  loginSuccess: string;
  registerSuccess: string;
  loginError: string;
  registerError: string;
  
  // Home
  availableSessions: string;
  searchByDate: string;
  filterByLevel: string;
  allLevels: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  instructor: string;
  duration: string;
  minutes: string;
  min: string;
  slotsAvailable: string;
  bookNow: string;
  myBookings: string;
  admin: string;
  
  // Booking
  bookingDetails: string;
  sessionDetails: string;
  date: string;
  time: string;
  level: string;
  description: string;
  confirmBooking: string;
  bookingSuccess: string;
  bookingError: string;
  sessionFull: string;
  
  // My Bookings
  myBookingsTitle: string;
  upcomingBookings: string;
  noBookings: string;
  noBookingsDesc: string;
  browseSessionsBtn: string;
  confirmed: string;
  cancelled: string;
  bookedOn: string;
  cancelBooking: string;
  cancelConfirm: string;
  cancelSuccess: string;
  viewBookings: string;
  bookAnother: string;
  
  // Admin
  adminDashboard: string;
  manageSessions: string;
  manageBookings: string;
  sessions: string;
  bookings: string;
  addSession: string;
  editSession: string;
  addNewSession: string;
  sessionName: string;
  totalSlots: string;
  actions: string;
  allBookings: string;
  viewAllBookings: string;
  userName: string;
  userEmail: string;
  status: string;
  noBookingsYet: string;
  addSessionSuccess: string;
  updateSessionSuccess: string;
  deleteSessionSuccess: string;
  
  // Meditation Timer
  meditationTimer: string;
  meditationTimerDesc: string;
  selectDuration: string;
  start: string;
  pause: string;
  reset: string;
  sessionComplete: string;
  breathingGuide: string;
  inhaleExhale: string;
  
  // Meetings
  meetings: string;
  consultation: string;
  privateSession: string;
  bookMeeting: string;
  meetingDetails: string;
  selectTimeSlot: string;
  myMeetings: string;
  
  // Classes
  classes: string;
  enrollNow: string;
  classEnrollment: string;
  enrollmentDetails: string;
  myClasses: string;
  totalSessions: string;
  syllabus: string;
  startDate: string;
  endDate: string;
  schedule: string;
  
  // Payment
  payment: string;
  paymentMethod: string;
  cardPayment: string;
  paypal: string;
  alipay: string;
  wechat: string;
  price: string;
  total: string;
  payNow: string;
  paymentSuccess: string;
  paymentFailed: string;
  processingPayment: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    logout: 'Logout',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    loading: 'Loading...',
    
    // App specific
    appName: 'Pragya Yog School',
    tagline: 'Find your inner peace',
    findPeace: 'Find your inner peace in the heart of Hong Kong',
    
    // Auth
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    loginError: 'Invalid credentials',
    registerError: 'Email already exists',
    
    // Home
    availableSessions: 'Available Yoga Sessions',
    searchByDate: 'Search by date',
    filterByLevel: 'Filter by level',
    allLevels: 'All Levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    instructor: 'Instructor',
    duration: 'Duration',
    minutes: 'minutes',
    min: 'min',
    slotsAvailable: 'slots available',
    bookNow: 'Book Now',
    myBookings: 'My Bookings',
    admin: 'Admin',
    
    // Booking
    bookingDetails: 'Booking Details',
    sessionDetails: 'Session Details',
    date: 'Date',
    time: 'Time',
    level: 'Level',
    description: 'Description',
    confirmBooking: 'Confirm Booking',
    bookingSuccess: 'Booking confirmed successfully',
    bookingError: 'Session is full',
    sessionFull: 'No slots available',
    
    // My Bookings
    myBookingsTitle: 'My Bookings',
    upcomingBookings: 'Your Upcoming Sessions',
    noBookings: 'No bookings yet',
    noBookingsDesc: "You haven't booked any sessions yet. Browse available sessions to get started.",
    browseSessionsBtn: 'Browse Sessions',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    bookedOn: 'Booked on',
    cancelBooking: 'Cancel Booking',
    cancelConfirm: 'Are you sure you want to cancel this booking?',
    cancelSuccess: 'Booking cancelled successfully',
    viewBookings: 'View Bookings',
    bookAnother: 'Book Another',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    manageSessions: 'Manage Sessions',
    manageBookings: 'Manage Bookings',
    sessions: 'Sessions',
    bookings: 'Bookings',
    addSession: 'Add Session',
    editSession: 'Edit Session',
    addNewSession: 'Add New Session',
    sessionName: 'Session Name',
    totalSlots: 'Total Slots',
    actions: 'Actions',
    allBookings: 'All Bookings',
    viewAllBookings: 'View all user bookings',
    userName: 'User Name',
    userEmail: 'Email',
    status: 'Status',
    noBookingsYet: 'No bookings yet',
    addSessionSuccess: 'Session added successfully',
    updateSessionSuccess: 'Session updated successfully',
    deleteSessionSuccess: 'Session deleted successfully',
    
    // Meditation Timer
    meditationTimer: 'Meditation Timer',
    meditationTimerDesc: 'Prepare your mind and body before your session',
    selectDuration: 'Select Duration',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    sessionComplete: 'Complete! 🙏',
    breathingGuide: 'Follow your breath',
    inhaleExhale: 'Inhale... Exhale...',
    
    // Meetings
    meetings: 'Meetings',
    consultation: 'Consultation',
    privateSession: 'Private Session',
    bookMeeting: 'Book Meeting',
    meetingDetails: 'Meeting Details',
    selectTimeSlot: 'Select Time Slot',
    myMeetings: 'My Meetings',
    
    // Classes
    classes: 'Classes',
    enrollNow: 'Enroll Now',
    classEnrollment: 'Class Enrollment',
    enrollmentDetails: 'Enrollment Details',
    myClasses: 'My Classes',
    totalSessions: 'Total Sessions',
    syllabus: 'Syllabus',
    startDate: 'Start Date',
    endDate: 'End Date',
    schedule: 'Schedule',
    
    // Payment
    payment: 'Payment',
    paymentMethod: 'Payment Method',
    cardPayment: 'Card Payment',
    paypal: 'PayPal',
    alipay: 'Alipay',
    wechat: 'WeChat',
    price: 'Price',
    total: 'Total',
    payNow: 'Pay Now',
    paymentSuccess: 'Payment Successful',
    paymentFailed: 'Payment Failed',
    processingPayment: 'Processing Payment',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardholderName: 'Cardholder Name',
  },
  zh: {
    // Common
    welcome: '歡迎',
    login: '登入',
    register: '註冊',
    email: '電郵',
    password: '密碼',
    name: '姓名',
    logout: '登出',
    back: '返回',
    cancel: '取消',
    confirm: '確認',
    delete: '刪除',
    edit: '編輯',
    save: '儲存',
    loading: '載入中...',
    
    // App specific
    appName: '般若瑜伽學校',
    tagline: '尋找內心的平靜',
    findPeace: '在香港心臟地帶尋找您的內心平靜',
    
    // Auth
    dontHaveAccount: '還沒有帳戶？',
    alreadyHaveAccount: '已有帳戶？',
    loginSuccess: '登入成功',
    registerSuccess: '註冊成功',
    loginError: '登入資料無效',
    registerError: '電郵已被使用',
    
    // Home
    availableSessions: '可預約的瑜伽課程',
    searchByDate: '按日期搜尋',
    filterByLevel: '按程度篩選',
    allLevels: '所有程度',
    beginner: '初級',
    intermediate: '中級',
    advanced: '高級',
    instructor: '導師',
    duration: '時長',
    minutes: '分鐘',
    min: '分鐘',
    slotsAvailable: '個名額',
    bookNow: '立即預約',
    myBookings: '我的預約',
    admin: '管理員',
    
    // Booking
    bookingDetails: '預約詳情',
    sessionDetails: '課程詳情',
    date: '日期',
    time: '時間',
    level: '程度',
    description: '描述',
    confirmBooking: '確認預約',
    bookingSuccess: '預約成功',
    bookingError: '課程已滿',
    sessionFull: '沒有名額',
    
    // My Bookings
    myBookingsTitle: '我的預約',
    upcomingBookings: '您即將參加的課程',
    noBookings: '暫無預約',
    noBookingsDesc: '您還未預約任何課程。瀏覽可預約的課程以開始。',
    browseSessionsBtn: '瀏覽課程',
    confirmed: '已確認',
    cancelled: '已取消',
    bookedOn: '預約於',
    cancelBooking: '取消預約',
    cancelConfirm: '您確定要取消此預約嗎？',
    cancelSuccess: '預約已成功取消',
    viewBookings: '查看預約',
    bookAnother: '再預約',
    
    // Admin
    adminDashboard: '管理員儀表板',
    manageSessions: '管理課程',
    manageBookings: '管理預約',
    sessions: '課程',
    bookings: '預約',
    addSession: '新增課程',
    editSession: '編輯課程',
    addNewSession: '新增課程',
    sessionName: '課程名稱',
    totalSlots: '總名額',
    actions: '操作',
    allBookings: '所有預約',
    viewAllBookings: '查看所有用戶預約',
    userName: '用戶名稱',
    userEmail: '電郵',
    status: '狀態',
    noBookingsYet: '暫無預約',
    addSessionSuccess: '課程新增成功',
    updateSessionSuccess: '課程更新成功',
    deleteSessionSuccess: '課程刪除成功',
    
    // Meditation Timer
    meditationTimer: '冥想計時器',
    meditationTimerDesc: '在課程開始前準備您的身心',
    selectDuration: '選擇時長',
    start: '開始',
    pause: '暫停',
    reset: '重設',
    sessionComplete: '完成！🙏',
    breathingGuide: '專注呼吸',
    inhaleExhale: '吸氣...呼氣...',
    
    // Meetings
    meetings: '會面',
    consultation: '諮詢',
    privateSession: '私人課程',
    bookMeeting: '預約會面',
    meetingDetails: '會面詳情',
    selectTimeSlot: '選擇時間段',
    myMeetings: '我的會面',
    
    // Classes
    classes: '課程',
    enrollNow: '立即報名',
    classEnrollment: '課程報名',
    enrollmentDetails: '報名詳情',
    myClasses: '我的課程',
    totalSessions: '總課時',
    syllabus: '課程大綱',
    startDate: '開始日期',
    endDate: '結束日期',
    schedule: '課程時間表',
    
    // Payment
    payment: '付款',
    paymentMethod: '付款方式',
    cardPayment: '信用卡付款',
    paypal: 'PayPal',
    alipay: 'Alipay',
    wechat: 'WeChat',
    price: '價格',
    total: '總計',
    payNow: '立即付款',
    paymentSuccess: '付款成功',
    paymentFailed: '付款失敗',
    processingPayment: '處理付款中',
    cardNumber: '信用卡號碼',
    expiryDate: '到期日期',
    cvv: 'CVV',
    cardholderName: '持卡人姓名',
  },
  hi: {
    // Common
    welcome: 'स्वागत है',
    login: 'लॉग इन',
    register: 'रजिस्टर',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाम',
    logout: 'लॉग आउट',
    back: 'पीछा',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    save: 'सहेजें',
    loading: 'लोड हो रहा है...',
    
    // App specific
    appName: 'प्राग्या योग स्कूल',
    tagline: 'आंतरिक शांति खोजें',
    findPeace: 'होंग कंग्रेस के हृदय में आंतरिक शांति खोजें',
    
    // Auth
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से ही खाता है?',
    loginSuccess: 'लॉग इन सफल',
    registerSuccess: 'रजिस्टर सफल',
    loginError: 'अमान्य प्रमाणिकांकन',
    registerError: 'ईमेल पहले से ही मौजूद है',
    
    // Home
    availableSessions: 'उपलब्ध योग सत्र',
    searchByDate: 'दिनांक द्वारा खोजें',
    filterByLevel: 'स्तर द्वारा फ़िल्टर करें',
    allLevels: 'सभी स्तर',
    beginner: 'नवीनतम',
    intermediate: 'मध्यम',
    advanced: 'उन्नत',
    instructor: 'शिक्षक',
    duration: 'अवधि',
    minutes: 'मिनट',
    min: 'मिनट',
    slotsAvailable: 'उपलब्ध स्थान',
    bookNow: 'अभी बुक करें',
    myBookings: 'मेरे बुकिंग्स',
    admin: 'ैनेजर',
    
    // Booking
    bookingDetails: 'बुकिंग विवरण',
    sessionDetails: 'सत्र विवरण',
    date: 'दिनांक',
    time: 'समय',
    level: 'स्तर',
    description: 'विवरण',
    confirmBooking: 'बुकिंग पुष्टि करें',
    bookingSuccess: 'बुकिंग सफलतापूर्वक पुष्टि की गई',
    bookingError: 'सत्र पूर्ण है',
    sessionFull: 'कोई स्थान नहीं है',
    
    // My Bookings
    myBookingsTitle: 'मेरे बुकिंग्स',
    upcomingBookings: 'आपके आगामी सत्र',
    noBookings: 'अभी तक कोई बुकिंग नहीं',
    noBookingsDesc: 'आपने अभी तक किसी सत्र का बुकिंग नहीं किया है। उपलब्ध सत्रों की ब्राउज़ करें और शुरू करें।',
    browseSessionsBtn: 'सत्र ब्राउज़ करें',
    confirmed: 'पुष्टि किया गया',
    cancelled: 'रद्द किया गया',
    bookedOn: 'बुकिंग दिनांक',
    cancelBooking: 'बुकिंग रद्द करें',
    cancelConfirm: 'क्या आप वास्तव में इस बुकिंग को रद्द करना चाहते हैं?',
    cancelSuccess: 'बुकिंग सफलतापूर्वक रद्द की गई',
    viewBookings: 'बुकिंग्स देखें',
    bookAnother: 'दूसरा बुक करें',
    
    // Admin
    adminDashboard: 'ैनेजर डैशबोर्ड',
    manageSessions: 'सत्र प्रबंधन',
    manageBookings: 'बुकिंग्स प्रबंधन',
    sessions: 'सत्र',
    bookings: 'बुकिंग्स',
    addSession: 'सत्र जोड़ें',
    editSession: 'सत्र संपादित करें',
    addNewSession: 'नया सत्र जोड़ें',
    sessionName: 'सत्र नाम',
    totalSlots: 'कुल स्थान',
    actions: 'कार्रवाई',
    allBookings: 'सभी बुकिंग्स',
    viewAllBookings: 'सभी उपयोगकर्ता बुकिंग्स देखें',
    userName: 'उपयोगकर्ता नाम',
    userEmail: 'ईमेल',
    status: 'स्थिति',
    noBookingsYet: 'अभी तक कोई बुकिंग नहीं',
    addSessionSuccess: 'सत्र सफलतापूर्वक जोड़ा गया',
    updateSessionSuccess: 'सत्र सफलतापूर्वक अद्यतन किया गया',
    deleteSessionSuccess: 'सत्र सफलतापूर्वक हटाया गया',
    
    // Meditation Timer
    meditationTimer: 'ध्यान टाइमर',
    meditationTimerDesc: 'अपने सत्र से पहले अपने मन और शरीर की तैयारी करें',
    selectDuration: 'अवधि चुनें',
    start: 'शुरू करें',
    pause: 'रोकें',
    reset: 'रीसेट',
    sessionComplete: 'पूरा! 🙏',
    breathingGuide: 'अपने आंसू का अनुसरण करें',
    inhaleExhale: 'हवा लें... हवा बाहर निकालें...',
    
    // Meetings
    meetings: 'मीटिंग्स',
    consultation: 'कामनाधार्मिक सलाह',
    privateSession: 'निजी सत्र',
    bookMeeting: 'मीटिंग बुक करें',
    meetingDetails: 'मीटिंग विवरण',
    selectTimeSlot: 'समय अंतराल चुनें',
    myMeetings: 'मेरे मीटिंग्स',
    
    // Classes
    classes: 'क्लासेस',
    enrollNow: 'अभी निबंधन करें',
    classEnrollment: 'क्लास निबंधन',
    enrollmentDetails: 'निबंधन विवरण',
    myClasses: 'मेरी क्लासेस',
    totalSessions: 'कुल सत्र',
    syllabus: 'सिलेबस',
    startDate: 'शुरुआत दिनांक',
    endDate: 'अंतिम दिनांक',
    schedule: 'कार्यक्रम',
    
    // Payment
    payment: 'भुगतान',
    paymentMethod: 'भुगतान विधि',
    cardPayment: 'कार्ड भुगतान',
    paypal: 'पेपल पे',
    alipay: 'अलिपे',
    wechat: 'वेचाट',
    price: 'मूल्य',
    total: 'कुल',
    payNow: 'अभी भुगतान करें',
    paymentSuccess: 'भुगतान सफल',
    paymentFailed: 'भुगतान विफल',
    processingPayment: 'भुगतान प्रसंस्करण में',
    cardNumber: 'कार्ड नंबर',
    expiryDate: 'समाप्ति तिथि',
    cvv: 'CVV',
    cardholderName: 'कार्ड धारक का नाम',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'zh' ? 'zh' : saved === 'hi' ? 'hi' : 'en') as Language;
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}