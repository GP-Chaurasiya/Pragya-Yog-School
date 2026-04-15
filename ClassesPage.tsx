import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getYogaClasses, addClassEnrollment, YogaClass, ClassEnrollment } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { PaymentDialog } from '../components/PaymentDialog';
import { ArrowLeft, Calendar, Clock, User, Users, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export default function ClassesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [yogaClasses, setYogaClasses] = useState<YogaClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<YogaClass | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pendingEnrollment, setPendingEnrollment] = useState<ClassEnrollment | null>(null);

  useEffect(() => {
    const allClasses = getYogaClasses();
    setYogaClasses(allClasses);
  }, []);

  const handleViewDetails = (yogaClass: YogaClass) => {
    setSelectedClass(yogaClass);
    setIsDetailsDialogOpen(true);
  };

  const handleEnroll = () => {
    if (!selectedClass || !user) return;

    const enrollment: ClassEnrollment = {
      id: `enrollment-${Date.now()}`,
      userId: user.id,
      classId: selectedClass.id,
      userName: user.name,
      userEmail: user.email,
      className: selectedClass.name,
      status: 'active',
      enrolledAt: new Date().toISOString(),
      paymentStatus: 'pending',
    };

    setPendingEnrollment(enrollment);
    setIsDetailsDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    if (!pendingEnrollment) return;

    const enrollment = { ...pendingEnrollment, paymentId, paymentStatus: 'completed' as const };
    addClassEnrollment(enrollment);
    toast.success(`Enrolled in ${selectedClass?.name}`);
    
    // Refresh classes
    setYogaClasses(getYogaClasses());
    setPendingEnrollment(null);
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
              <h1 className="text-2xl">{t.classes}</h1>
              <p className="text-sm text-muted-foreground">Multi-session yoga programs</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {yogaClasses.map((yogaClass) => (
            <Card key={yogaClass.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{yogaClass.name}</CardTitle>
                  <Badge className={getLevelColor(yogaClass.level)}>
                    {getLevelText(yogaClass.level)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {yogaClass.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">{yogaClass.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(yogaClass.startDate).toLocaleDateString()} - {new Date(yogaClass.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{yogaClass.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{yogaClass.totalSessions} {t.sessions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{yogaClass.availableSlots} / {yogaClass.totalSlots} {t.slotsAvailable}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pt-2 border-t border-[#6a8973]/20">
                  <span className="text-2xl font-semibold text-[#4a7c59]">HKD ${yogaClass.price}</span>
                  <span className="text-sm text-muted-foreground">${(yogaClass.price / yogaClass.totalSessions).toFixed(0)}/{t.sessionName}</span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(yogaClass)}
                  >
                    View Details
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setSelectedClass(yogaClass);
                      handleEnroll();
                    }}
                    disabled={yogaClass.availableSlots === 0}
                  >
                    {yogaClass.availableSlots === 0 ? t.sessionFull : t.enrollNow}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedClass?.name}</DialogTitle>
            <DialogDescription>
              {selectedClass?.instructor} • {selectedClass?.totalSessions} {t.sessions}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-semibold mb-2">{t.description}</h3>
              <p className="text-sm text-muted-foreground">{selectedClass?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{t.startDate}</div>
                <div className="font-medium">{selectedClass && new Date(selectedClass.startDate).toLocaleDateString()}</div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">{t.endDate}</div>
                <div className="font-medium">{selectedClass && new Date(selectedClass.endDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{t.schedule}</div>
              <div className="font-medium">{selectedClass?.schedule}</div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">{t.syllabus}</h3>
              <ul className="space-y-2">
                {selectedClass?.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="bg-[#4a7c59] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#6a8973]/20">
              <div>
                <div className="text-sm text-muted-foreground">{t.total}</div>
                <div className="text-2xl font-semibold text-[#4a7c59]">HKD ${selectedClass?.price}</div>
              </div>
              <Button 
                onClick={handleEnroll}
                size="lg"
                disabled={selectedClass?.availableSlots === 0}
              >
                {selectedClass?.availableSlots === 0 ? t.sessionFull : t.enrollNow}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      {pendingEnrollment && selectedClass && (
        <PaymentDialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          amount={selectedClass.price}
          itemType="class"
          itemId={selectedClass.id}
          itemName={selectedClass.name}
          userId={user?.id || ''}
          userName={user?.name || ''}
          userEmail={user?.email || ''}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
