import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getSessionById, addBooking, YogaSession, Booking } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { PaymentDialog } from '../components/PaymentDialog';
import { Calendar, Clock, User, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [session, setSession] = useState<YogaSession | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (sessionId) {
      const foundSession = getSessionById(sessionId);
      setSession(foundSession || null);
    }
  }, [sessionId]);

  const handleConfirmBooking = () => {
    if (!session || !user) return;

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      userId: user.id,
      sessionId: session.id,
      userName: user.name,
      userEmail: user.email,
      sessionName: session.name,
      date: session.date,
      time: session.time,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      paymentStatus: 'pending',
    };

    setPendingBooking(booking);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    if (!pendingBooking) return;

    const booking = { ...pendingBooking, paymentId, paymentStatus: 'completed' as const };
    addBooking(booking);
    setIsBooked(true);
    toast.success(t.bookingSuccess);
    setPendingBooking(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-[#c8e6c9] text-[#2e7d32] hover:bg-[#c8e6c9]';
      case 'Intermediate':
        return 'bg-[#ffe0b2] text-[#e65100] hover:bg-[#ffe0b2]';
      case 'Advanced':
        return 'bg-[#ffcdd2] text-[#c62828] hover:bg-[#ffcdd2]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'Beginner':
        return t.beginner;
      case 'Intermediate':
        return t.intermediate;
      case 'Advanced':
        return t.advanced;
      default:
        return level;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#f4f1ea] to-[#fff8e1]">
        <Card>
          <CardContent className="py-8">
            <p>Session not found</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              {t.back}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#f4f1ea] to-[#fff8e1] p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-[#c8e6c9] p-3">
                <CheckCircle className="h-12 w-12 text-[#2e7d32]" />
              </div>
            </div>
            <CardTitle>{t.bookingSuccess}</CardTitle>
            <CardDescription>{t.sessionDetails}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <p><strong>{t.sessionName}:</strong> {session.name}</p>
              <p><strong>{t.instructor}:</strong> {session.instructor}</p>
              <p><strong>{t.date}:</strong> {new Date(session.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>{t.time}:</strong> {session.time}</p>
              <p><strong>{t.duration}:</strong> {session.duration} minutes</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/bookings')} className="flex-1">
                {t.viewBookings}
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                {t.bookAnother}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f4f1ea] to-[#fff8e1] p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sessions
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-2xl">{session.name}</CardTitle>
              <Badge className={getLevelColor(session.level)}>
                {getLevelText(session.level)}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {session.instructor}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2">About this session</h3>
              <p className="text-muted-foreground">{session.description}</p>
            </div>

            <div className="space-y-3 border-t pt-4">
              <h3 className="mb-3">Session Details</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{new Date(session.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{session.time} ({session.duration} minutes)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{session.availableSlots} / {session.totalSlots} slots available</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-3">Booking Information</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmBooking} 
                className="flex-1"
                disabled={session.availableSlots === 0}
              >
                Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Payment Dialog */}
      {pendingBooking && session && (
        <PaymentDialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          amount={session.price}
          itemType="session"
          itemId={session.id}
          itemName={session.name}
          userId={user?.id || ''}
          userName={user?.name || ''}
          userEmail={user?.email || ''}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}