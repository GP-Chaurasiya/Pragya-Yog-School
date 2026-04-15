import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  getSessions, 
  getBookings, 
  addSession, 
  updateSession, 
  deleteSession,
  YogaSession,
  Booking 
} from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { ArrowLeft, Plus, Pencil, Trash2, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<YogaSession[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<YogaSession | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    date: '',
    time: '',
    duration: 60,
    totalSlots: 10,
    description: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setSessions(getSessions());
    setBookings(getBookings());
  };

  const resetForm = () => {
    setFormData({
      name: '',
      instructor: '',
      date: '',
      time: '',
      duration: 60,
      totalSlots: 10,
      description: '',
      level: 'Beginner',
    });
    setEditingSession(null);
  };

  const handleAddSession = () => {
    const newSession: YogaSession = {
      id: `session-${Date.now()}`,
      ...formData,
      availableSlots: formData.totalSlots,
    };

    addSession(newSession);
    loadData();
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(t.addSessionSuccess);
  };

  const handleUpdateSession = () => {
    if (!editingSession) return;

    const updatedSession: YogaSession = {
      ...editingSession,
      ...formData,
    };

    updateSession(updatedSession);
    loadData();
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(t.updateSessionSuccess);
  };

  const handleDeleteSession = (id: string) => {
    deleteSession(id);
    loadData();
    toast.success(t.deleteSessionSuccess);
  };

  const handleEditClick = (session: YogaSession) => {
    setEditingSession(session);
    setFormData({
      name: session.name,
      instructor: session.instructor,
      date: session.date,
      time: session.time,
      duration: session.duration,
      totalSlots: session.totalSlots,
      description: session.description,
      level: session.level,
    });
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

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
              <h1 className="text-2xl">{t.adminDashboard}</h1>
              <p className="text-sm text-muted-foreground">{t.manageSessions}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sessions">
              <Calendar className="h-4 w-4 mr-2" />
              {t.sessions}
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Users className="h-4 w-4 mr-2" />
              {t.bookings}
            </TabsTrigger>
          </TabsList>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{t.manageSessions}</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addSession}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSession ? t.editSession : t.addNewSession}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for the yoga session
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Session Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Morning Hatha Yoga"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={formData.instructor}
                          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                          placeholder="e.g., Priya Sharma"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (min)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                          min="30"
                          step="15"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalSlots">Total Slots</Label>
                        <Input
                          id="totalSlots"
                          type="number"
                          value={formData.totalSlots}
                          onChange={(e) => setFormData({ ...formData, totalSlots: parseInt(e.target.value) })}
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <Select
                          value={formData.level}
                          onValueChange={(value: any) => setFormData({ ...formData, level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the session..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={() => handleDialogClose(false)} className="flex-1">
                        {t.cancel}
                      </Button>
                      <Button 
                        onClick={editingSession ? handleUpdateSession : handleAddSession}
                        className="flex-1"
                      >
                        {editingSession ? t.save : t.addSession}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.sessionName}</TableHead>
                      <TableHead>{t.instructor}</TableHead>
                      <TableHead>{t.date} & {t.time}</TableHead>
                      <TableHead>{t.level}</TableHead>
                      <TableHead>{t.totalSlots}</TableHead>
                      <TableHead className="text-right">{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.name}</TableCell>
                        <TableCell>{session.instructor}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(session.date).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">{session.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{session.level}</Badge>
                        </TableCell>
                        <TableCell>
                          {session.availableSlots} / {session.totalSlots}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(session)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSession(session.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>{t.allBookings}</CardTitle>
                <CardDescription>{t.viewAllBookings}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.userName}</TableHead>
                      <TableHead>{t.userEmail}</TableHead>
                      <TableHead>{t.sessionName}</TableHead>
                      <TableHead>{t.date} & {t.time}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.bookedOn}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          {t.noBookingsYet}
                        </TableCell>
                      </TableRow>
                    ) : (
                      bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.userName}</TableCell>
                          <TableCell>{booking.userEmail}</TableCell>
                          <TableCell>{booking.sessionName}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(booking.date).toLocaleDateString()}</div>
                              <div className="text-muted-foreground">{booking.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                booking.status === 'confirmed'
                                  ? 'bg-[#c8e6c9] text-[#2e7d32] hover:bg-[#c8e6c9]'
                                  : 'bg-[#ffcdd2] text-[#c62828] hover:bg-[#ffcdd2]'
                              }
                            >
                              {booking.status === 'confirmed' ? t.confirmed : t.cancelled}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(booking.bookedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}