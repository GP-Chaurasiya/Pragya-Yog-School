import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getMeetings, addMeetingBooking, Meeting, MeetingBooking } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { PaymentDialog } from '../components/PaymentDialog';
import { ArrowLeft, Clock, User, Video, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

export default function MeetingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<MeetingBooking | null>(null);

  useEffect(() => {
    const allMeetings = getMeetings();
    setMeetings(allMeetings);
  }, []);

  const handleBookMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setSelectedTimeSlot('');
    setNotes('');
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedMeeting || !selectedTimeSlot || !user) return;

    const [date, time] = selectedTimeSlot.split(' ');
    const booking: MeetingBooking = {
      id: `meeting-booking-${Date.now()}`,
      userId: user.id,
      meetingId: selectedMeeting.id,
      userName: user.name,
      userEmail: user.email,
      meetingTitle: selectedMeeting.title,
      instructor: selectedMeeting.instructor,
      date,
      time,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      notes,
      paymentStatus: 'pending',
    };

    setPendingBooking(booking);
    setIsBookingDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    if (!pendingBooking) return;

    const booking = { ...pendingBooking, paymentId, paymentStatus: 'completed' as const };
    addMeetingBooking(booking);
    toast.success(t.bookingSuccess);
    
    // Refresh meetings
    setMeetings(getMeetings());
    setPendingBooking(null);
  };

  const getTypeLabel = (type: string) => {
    return type === 'consultation' ? t.consultation : t.privateSession;
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
              <h1 className="text-2xl">{t.meetings}</h1>
              <p className="text-sm text-muted-foreground">Book private sessions and consultations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{meeting.title}</CardTitle>
                  <Badge className="bg-[#ffe0b2] text-[#e65100] hover:bg-[#ffe0b2]">
                    {getTypeLabel(meeting.type)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {meeting.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">{meeting.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{meeting.duration} {t.minutes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{meeting.availableSlots.length} {t.slotsAvailable}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[#4a7c59] font-semibold">HKD ${meeting.price}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-auto"
                  onClick={() => handleBookMeeting(meeting)}
                  disabled={meeting.availableSlots.length === 0}
                >
                  {meeting.availableSlots.length === 0 ? t.sessionFull : t.bookMeeting}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.meetingDetails}</DialogTitle>
            <DialogDescription>{selectedMeeting?.title}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <p><strong>{t.instructor}:</strong> {selectedMeeting?.instructor}</p>
              <p><strong>{t.duration}:</strong> {selectedMeeting?.duration} {t.minutes}</p>
              <p><strong>{t.price}:</strong> HKD ${selectedMeeting?.price}</p>
            </div>

            <div className="space-y-2">
              <Label>{t.selectTimeSlot}</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectTimeSlot} />
                </SelectTrigger>
                <SelectContent>
                  {selectedMeeting?.availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {new Date(slot).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special requests or questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)} className="flex-1">
                {t.cancel}
              </Button>
              <Button 
                onClick={handleConfirmBooking}
                className="flex-1"
                disabled={!selectedTimeSlot}
              >
                {t.confirmBooking}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      {pendingBooking && selectedMeeting && (
        <PaymentDialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          amount={selectedMeeting.price}
          itemType="meeting"
          itemId={selectedMeeting.id}
          itemName={selectedMeeting.title}
          userId={user?.id || ''}
          userName={user?.name || ''}
          userEmail={user?.email || ''}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
