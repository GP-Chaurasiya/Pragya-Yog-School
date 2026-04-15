import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getBookings, cancelBooking, Booking } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Calendar, Clock, ArrowLeft, Trash2, BookOpen, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const userBookings = getBookings(user.id);
      setBookings(userBookings);
    }
  }, [user]);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm(t.cancelConfirm)) {
      cancelBooking(bookingId);
      loadBookings();
      toast.success(t.cancelSuccess);
    }
  };

  const loadBookings = () => {
    if (user) {
      const updatedBookings = getBookings(user.id);
      setBookings(updatedBookings);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#f4f1ea] to-[#fff8e1]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#6a8973]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
            <div>
              <h1 className="text-2xl">{t.myBookingsTitle}</h1>
              <p className="text-sm text-muted-foreground">{t.upcomingBookings}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl mb-2">{t.noBookings}</h3>
              <p className="text-muted-foreground mb-6">
                {t.noBookingsDesc}
              </p>
              <Button onClick={() => navigate('/')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                {t.browseSessionsBtn}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{booking.sessionName}</CardTitle>
                      <CardDescription className="mt-1">
                        {t.bookedOn} {new Date(booking.bookedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className="bg-[#c8e6c9] text-[#2e7d32] hover:bg-[#c8e6c9]">
                      {t.confirmed}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.time}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t.cancelBooking}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}