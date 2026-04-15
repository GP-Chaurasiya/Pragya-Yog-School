import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getSessions, YogaSession } from '../utils/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { MeditationTimer } from '../components/MeditationTimer';
import { Calendar, Clock, User, Users, LogOut, BookOpen, LayoutDashboard, Search } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<YogaSession[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredSessions, setFilteredSessions] = useState<YogaSession[]>([]);

  useEffect(() => {
    const allSessions = getSessions();
    setSessions(allSessions);
    setFilteredSessions(allSessions);
  }, []);

  useEffect(() => {
    if (searchDate) {
      const filtered = sessions.filter(session => session.date === searchDate);
      setFilteredSessions(filtered);
    } else {
      setFilteredSessions(sessions);
    }
  }, [searchDate, sessions]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBookSession = (sessionId: string) => {
    navigate(`/book/${sessionId}`);
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
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a7c59] to-[#6a8973] flex items-center justify-center">
                <span className="text-2xl">🧘</span>
              </div>
              <div>
                <h1 className="text-2xl text-[#2d3436]">{t.appName}</h1>
                <p className="text-sm text-[#6c7a89]">{t.welcome}, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <MeditationTimer />
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={() => navigate('/bookings')}>
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t.myBookings}</span>
              </Button>
              {user?.isAdmin && (
                <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t.admin}</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t.logout}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/meetings')}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#c8e6c9] flex items-center justify-center">
                  <User className="h-6 w-6 text-[#2e7d32]" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.meetings}</CardTitle>
                  <CardDescription className="text-xs">{t.privateSession}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/classes')}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#ffe0b2] flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#e65100]" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.classes}</CardTitle>
                  <CardDescription className="text-xs">Multi-session programs</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/bookings')}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e1bee7] flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-[#7b1fa2]" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t.myBookings}</CardTitle>
                  <CardDescription className="text-xs">{t.upcomingBookings}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t.tagline}</CardTitle>
              <CardDescription>{t.searchByDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm mb-2 block">{t.filterByLevel}</label>
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {searchDate && (
                  <Button variant="outline" onClick={() => setSearchDate('')}>
                    {t.cancel}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Grid */}
        <div className="mb-6">
          <h2 className="text-xl mb-4">{t.availableSessions}</h2>
          {filteredSessions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">{t.noBookingsDesc}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{session.name}</CardTitle>
                      <Badge className={getLevelColor(session.level)}>
                        {getLevelText(session.level)}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {session.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(session.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.time} ({session.duration} {t.min})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{session.availableSlots} / {session.totalSlots} {t.slotsAvailable}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#6a8973]/20">
                        <span className="text-lg font-semibold text-[#4a7c59]">HKD ${session.price}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-auto"
                      onClick={() => handleBookSession(session.id)}
                      disabled={session.availableSlots === 0}
                    >
                      {session.availableSlots === 0 ? t.sessionFull : t.bookNow}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}