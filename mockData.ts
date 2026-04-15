export interface YogaSession {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: number; // in minutes
  availableSlots: number;
  totalSlots: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  userName: string;
  userEmail: string;
  sessionName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled';
  bookedAt: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export interface Meeting {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  price: number;
  description: string;
  availableSlots: string[]; // Available time slots
  type: 'consultation' | 'private-session';
}

export interface MeetingBooking {
  id: string;
  userId: string;
  meetingId: string;
  userName: string;
  userEmail: string;
  meetingTitle: string;
  instructor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled';
  bookedAt: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  notes?: string;
}

export interface YogaClass {
  id: string;
  name: string;
  instructor: string;
  startDate: string;
  endDate: string;
  schedule: string; // e.g., "Mon, Wed, Fri 6:00 PM"
  totalSessions: number;
  duration: number;
  price: number;
  availableSlots: number;
  totalSlots: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  syllabus: string[];
}

export interface ClassEnrollment {
  id: string;
  userId: string;
  classId: string;
  userName: string;
  userEmail: string;
  className: string;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  type: 'session' | 'meeting' | 'class';
  itemId: string;
  itemName: string;
  method: 'card' | 'paypal' | 'alipay' | 'wechat';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}

export const initializeMockData = () => {
  // Initialize sessions if not exists
  const sessions = localStorage.getItem('yogaSessions');
  if (!sessions) {
    const mockSessions: YogaSession[] = [
      {
        id: 'session-1',
        name: 'Morning Hatha Yoga',
        instructor: 'Priya Sharma',
        date: '2026-04-05',
        time: '06:00',
        duration: 60,
        availableSlots: 12,
        totalSlots: 15,
        description: 'Start your day with traditional Hatha yoga practice focusing on asanas and breathing.',
        level: 'Beginner',
        price: 20,
      },
      {
        id: 'session-2',
        name: 'Vinyasa Flow',
        instructor: 'Arjun Patel',
        date: '2026-04-05',
        time: '08:00',
        duration: 75,
        availableSlots: 8,
        totalSlots: 12,
        description: 'Dynamic flowing sequences that link breath with movement.',
        level: 'Intermediate',
        price: 25,
      },
      {
        id: 'session-3',
        name: 'Restorative Yoga',
        instructor: 'Meera Singh',
        date: '2026-04-05',
        time: '18:00',
        duration: 60,
        availableSlots: 10,
        totalSlots: 10,
        description: 'Gentle, relaxing practice using props to support the body in restful poses.',
        level: 'Beginner',
        price: 15,
      },
      {
        id: 'session-4',
        name: 'Power Yoga',
        instructor: 'Arjun Patel',
        date: '2026-04-06',
        time: '07:00',
        duration: 90,
        availableSlots: 6,
        totalSlots: 10,
        description: 'Vigorous, fitness-based approach to vinyasa-style yoga.',
        level: 'Advanced',
        price: 30,
      },
      {
        id: 'session-5',
        name: 'Pranayama & Meditation',
        instructor: 'Guru Rajesh',
        date: '2026-04-06',
        time: '17:00',
        duration: 45,
        availableSlots: 15,
        totalSlots: 20,
        description: 'Focus on breath control techniques and mindfulness meditation.',
        level: 'Beginner',
        price: 10,
      },
      {
        id: 'session-6',
        name: 'Ashtanga Yoga',
        instructor: 'Priya Sharma',
        date: '2026-04-07',
        time: '06:30',
        duration: 90,
        availableSlots: 5,
        totalSlots: 8,
        description: 'Traditional Ashtanga primary series practice.',
        level: 'Advanced',
        price: 35,
      },
      {
        id: 'session-7',
        name: 'Yin Yoga',
        instructor: 'Meera Singh',
        date: '2026-04-07',
        time: '19:00',
        duration: 75,
        availableSlots: 12,
        totalSlots: 15,
        description: 'Slow-paced practice with long-held passive poses targeting deep connective tissues.',
        level: 'Beginner',
        price: 20,
      },
      {
        id: 'session-8',
        name: 'Kundalini Yoga',
        instructor: 'Guru Rajesh',
        date: '2026-04-08',
        time: '06:00',
        duration: 60,
        availableSlots: 10,
        totalSlots: 12,
        description: 'Awaken your inner energy through dynamic movements, breathing, and chanting.',
        level: 'Intermediate',
        price: 25,
      },
    ];
    localStorage.setItem('yogaSessions', JSON.stringify(mockSessions));
  }

  // Initialize bookings if not exists
  const bookings = localStorage.getItem('bookings');
  if (!bookings) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }

  // Initialize meetings if not exists
  const meetings = localStorage.getItem('meetings');
  if (!meetings) {
    const mockMeetings: Meeting[] = [
      {
        id: 'meeting-1',
        title: 'Initial Consultation',
        instructor: 'Guru Rajesh',
        duration: 30,
        price: 50,
        description: 'One-on-one consultation to discuss your goals and create a personalized yoga plan.',
        availableSlots: ['2026-04-05 09:00', '2026-04-05 11:00'],
        type: 'consultation',
      },
      {
        id: 'meeting-2',
        title: 'Private Yoga Session',
        instructor: 'Arjun Patel',
        duration: 60,
        price: 75,
        description: 'Private yoga session tailored to your needs and abilities.',
        availableSlots: ['2026-04-06 10:00', '2026-04-06 14:00'],
        type: 'private-session',
      },
    ];
    localStorage.setItem('meetings', JSON.stringify(mockMeetings));
  }

  // Initialize meeting bookings if not exists
  const meetingBookings = localStorage.getItem('meetingBookings');
  if (!meetingBookings) {
    localStorage.setItem('meetingBookings', JSON.stringify([]));
  }

  // Initialize yoga classes if not exists
  const yogaClasses = localStorage.getItem('yogaClasses');
  if (!yogaClasses) {
    const mockYogaClasses: YogaClass[] = [
      {
        id: 'class-1',
        name: 'Hatha Yoga Series',
        instructor: 'Priya Sharma',
        startDate: '2026-04-05',
        endDate: '2026-04-19',
        schedule: 'Mon, Wed, Fri 6:00 PM',
        totalSessions: 5,
        duration: 60,
        price: 100,
        availableSlots: 10,
        totalSlots: 15,
        description: 'A series of traditional Hatha yoga practices focusing on asanas and breathing.',
        level: 'Beginner',
        syllabus: [
          'Introduction to Hatha Yoga',
          'Basic Asanas and Breathing Techniques',
          'Advanced Asanas and Breathing Techniques',
          'Relaxation and Meditation',
          'Final Class and Review',
        ],
      },
      {
        id: 'class-2',
        name: 'Vinyasa Flow Series',
        instructor: 'Arjun Patel',
        startDate: '2026-04-05',
        endDate: '2026-04-19',
        schedule: 'Mon, Wed, Fri 8:00 PM',
        totalSessions: 5,
        duration: 75,
        price: 125,
        availableSlots: 8,
        totalSlots: 12,
        description: 'Dynamic flowing sequences that link breath with movement.',
        level: 'Intermediate',
        syllabus: [
          'Introduction to Vinyasa Flow',
          'Basic Flow Sequences',
          'Advanced Flow Sequences',
          'Relaxation and Meditation',
          'Final Class and Review',
        ],
      },
    ];
    localStorage.setItem('yogaClasses', JSON.stringify(mockYogaClasses));
  }

  // Initialize class enrollments if not exists
  const classEnrollments = localStorage.getItem('classEnrollments');
  if (!classEnrollments) {
    localStorage.setItem('classEnrollments', JSON.stringify([]));
  }

  // Initialize payments if not exists
  const payments = localStorage.getItem('payments');
  if (!payments) {
    localStorage.setItem('payments', JSON.stringify([]));
  }
};

export const getSessions = (): YogaSession[] => {
  const sessions = localStorage.getItem('yogaSessions');
  return sessions ? JSON.parse(sessions) : [];
};

export const getSessionById = (id: string): YogaSession | undefined => {
  const sessions = getSessions();
  return sessions.find(s => s.id === id);
};

export const updateSession = (session: YogaSession): void => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  if (index !== -1) {
    sessions[index] = session;
    localStorage.setItem('yogaSessions', JSON.stringify(sessions));
  }
};

export const addSession = (session: YogaSession): void => {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem('yogaSessions', JSON.stringify(sessions));
};

export const deleteSession = (id: string): void => {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== id);
  localStorage.setItem('yogaSessions', JSON.stringify(filtered));
};

export const getBookings = (): Booking[] => {
  const bookings = localStorage.getItem('bookings');
  return bookings ? JSON.parse(bookings) : [];
};

export const getUserBookings = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(b => b.userId === userId && b.status === 'confirmed');
};

export const addBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // Update available slots
  const session = getSessionById(booking.sessionId);
  if (session && session.availableSlots > 0) {
    session.availableSlots -= 1;
    updateSession(session);
  }
};

export const cancelBooking = (bookingId: string): void => {
  const bookings = getBookings();
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    booking.status = 'cancelled';
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Restore available slots
    const session = getSessionById(booking.sessionId);
    if (session) {
      session.availableSlots += 1;
      updateSession(session);
    }
  }
};

export const getMeetings = (): Meeting[] => {
  const meetings = localStorage.getItem('meetings');
  return meetings ? JSON.parse(meetings) : [];
};

export const getMeetingById = (id: string): Meeting | undefined => {
  const meetings = getMeetings();
  return meetings.find(m => m.id === id);
};

export const updateMeeting = (meeting: Meeting): void => {
  const meetings = getMeetings();
  const index = meetings.findIndex(m => m.id === meeting.id);
  if (index !== -1) {
    meetings[index] = meeting;
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }
};

export const addMeeting = (meeting: Meeting): void => {
  const meetings = getMeetings();
  meetings.push(meeting);
  localStorage.setItem('meetings', JSON.stringify(meetings));
};

export const deleteMeeting = (id: string): void => {
  const meetings = getMeetings();
  const filtered = meetings.filter(m => m.id !== id);
  localStorage.setItem('meetings', JSON.stringify(filtered));
};

export const getMeetingBookings = (): MeetingBooking[] => {
  const meetingBookings = localStorage.getItem('meetingBookings');
  return meetingBookings ? JSON.parse(meetingBookings) : [];
};

export const getUserMeetingBookings = (userId: string): MeetingBooking[] => {
  const meetingBookings = getMeetingBookings();
  return meetingBookings.filter(b => b.userId === userId && b.status === 'confirmed');
};

export const addMeetingBooking = (booking: MeetingBooking): void => {
  const meetingBookings = getMeetingBookings();
  meetingBookings.push(booking);
  localStorage.setItem('meetingBookings', JSON.stringify(meetingBookings));

  // Update available slots
  const meeting = getMeetingById(booking.meetingId);
  if (meeting && meeting.availableSlots.includes(booking.time)) {
    meeting.availableSlots = meeting.availableSlots.filter(t => t !== booking.time);
    updateMeeting(meeting);
  }
};

export const cancelMeetingBooking = (bookingId: string): void => {
  const meetingBookings = getMeetingBookings();
  const booking = meetingBookings.find(b => b.id === bookingId);
  
  if (booking) {
    booking.status = 'cancelled';
    localStorage.setItem('meetingBookings', JSON.stringify(meetingBookings));

    // Restore available slots
    const meeting = getMeetingById(booking.meetingId);
    if (meeting) {
      meeting.availableSlots.push(booking.time);
      updateMeeting(meeting);
    }
  }
};

export const getYogaClasses = (): YogaClass[] => {
  const yogaClasses = localStorage.getItem('yogaClasses');
  return yogaClasses ? JSON.parse(yogaClasses) : [];
};

export const getYogaClassById = (id: string): YogaClass | undefined => {
  const yogaClasses = getYogaClasses();
  return yogaClasses.find(c => c.id === id);
};

export const updateYogaClass = (yogaClass: YogaClass): void => {
  const yogaClasses = getYogaClasses();
  const index = yogaClasses.findIndex(c => c.id === yogaClass.id);
  if (index !== -1) {
    yogaClasses[index] = yogaClass;
    localStorage.setItem('yogaClasses', JSON.stringify(yogaClasses));
  }
};

export const addYogaClass = (yogaClass: YogaClass): void => {
  const yogaClasses = getYogaClasses();
  yogaClasses.push(yogaClass);
  localStorage.setItem('yogaClasses', JSON.stringify(yogaClasses));
};

export const deleteYogaClass = (id: string): void => {
  const yogaClasses = getYogaClasses();
  const filtered = yogaClasses.filter(c => c.id !== id);
  localStorage.setItem('yogaClasses', JSON.stringify(filtered));
};

export const getClassEnrollments = (): ClassEnrollment[] => {
  const classEnrollments = localStorage.getItem('classEnrollments');
  return classEnrollments ? JSON.parse(classEnrollments) : [];
};

export const getUserClassEnrollments = (userId: string): ClassEnrollment[] => {
  const classEnrollments = getClassEnrollments();
  return classEnrollments.filter(e => e.userId === userId && e.status === 'active');
};

export const addClassEnrollment = (enrollment: ClassEnrollment): void => {
  const classEnrollments = getClassEnrollments();
  classEnrollments.push(enrollment);
  localStorage.setItem('classEnrollments', JSON.stringify(classEnrollments));

  // Update available slots
  const yogaClass = getYogaClassById(enrollment.classId);
  if (yogaClass && yogaClass.availableSlots > 0) {
    yogaClass.availableSlots -= 1;
    updateYogaClass(yogaClass);
  }
};

export const cancelClassEnrollment = (enrollmentId: string): void => {
  const classEnrollments = getClassEnrollments();
  const enrollment = classEnrollments.find(e => e.id === enrollmentId);
  
  if (enrollment) {
    enrollment.status = 'cancelled';
    localStorage.setItem('classEnrollments', JSON.stringify(classEnrollments));

    // Restore available slots
    const yogaClass = getYogaClassById(enrollment.classId);
    if (yogaClass) {
      yogaClass.availableSlots += 1;
      updateYogaClass(yogaClass);
    }
  }
};

export const getPayments = (): Payment[] => {
  const payments = localStorage.getItem('payments');
  return payments ? JSON.parse(payments) : [];
};

export const getPaymentById = (id: string): Payment | undefined => {
  const payments = getPayments();
  return payments.find(p => p.id === id);
};

export const updatePayment = (payment: Payment): void => {
  const payments = getPayments();
  const index = payments.findIndex(p => p.id === payment.id);
  if (index !== -1) {
    payments[index] = payment;
    localStorage.setItem('payments', JSON.stringify(payments));
  }
};

export const addPayment = (payment: Payment): void => {
  const payments = getPayments();
  payments.push(payment);
  localStorage.setItem('payments', JSON.stringify(payments));
};

export const deletePayment = (id: string): void => {
  const payments = getPayments();
  const filtered = payments.filter(p => p.id !== id);
  localStorage.setItem('payments', JSON.stringify(filtered));
};