import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock3, ExternalLink, LogOut, RefreshCw, Activity, PlugZap, Trophy, BookOpen } from "lucide-react";
import { api } from "@/lib/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { getSteamProfile } from "@/api/steam";
import steamIcon from "@/assets/steam-icon.png";

interface SteamStats {
  playtime_hours: number;
  achievements_count: number;
}

function StatTile({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-2 text-primary">{icon}</div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/45">{label}</div>
      <div className="font-display text-2xl text-white leading-none mt-1">{value}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loading, login, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get("auth_error");
  const [steamProfile, setSteamProfile] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [myGuides, setMyGuides] = useState<Array<{ id: number; title: string; published: boolean }>>([]);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchMyGuides();
    }
  }, [user]);

  const fetchMyGuides = async () => {
    try {
      const guides = (await api.getMyGuides()) as Array<{
        id: number;
        title: string;
        published: boolean;
      }>;
      setMyGuides(guides);
    } catch {
      setMyGuides([]);
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    setLoadingStats(true);
    try {
      const player = await getSteamProfile(user.steamId);
      setSteamProfile(player);
    } catch (error) {
      console.error('Error fetching Steam stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface-dark text-surface-dark-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="animate-spin mx-auto mb-4 text-primary" size={48} />
            <p className="text-surface-dark-foreground/70">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-surface-dark text-surface-dark-foreground">
        <Header />
        <main className="flex-1">
          <section className="relative overflow-hidden border-b-4 border-primary bg-gradient-dark">
            <div className="absolute inset-0 bg-gradient-team opacity-10" aria-hidden />
            <div className="container mx-auto px-4 py-16 sm:py-24 relative">
              <div className="max-w-3xl">
                <div className="tf-stamp inline-block bg-primary text-primary-foreground px-4 py-1 text-xs mb-5">
                  Authentication Required
                </div>
                <h1 className="font-display text-5xl sm:text-7xl tf-headline mb-4">
                  LOGIN WITH STEAM
                </h1>
                <p className="font-slab text-base sm:text-lg text-surface-dark-foreground/75 max-w-2xl mb-8">
                  Connect your Steam account to access your profile, statistics, and create guides.
                </p>
                {authError && (
                  <p className="mb-6 border-2 border-destructive/70 bg-destructive/10 px-4 py-3 font-slab text-sm text-destructive">
                    Login failed: {authError}
                  </p>
                )}
                <button
                  onClick={login}
                  className="tf-stamp inline-flex items-center gap-3 px-8 py-4 text-lg"
                  style={{ background: '#e8520a', color: '#fff8ea' }}
                >
                  <img src={steamIcon} alt="Steam" className="h-6 w-6" />
                  Sign in with Steam
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-dark text-surface-dark-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b-4 border-primary bg-gradient-dark">
          <div className="absolute inset-0 bg-gradient-team opacity-10" aria-hidden />
          <div className="container mx-auto px-4 py-16 sm:py-24 relative">
            <div className="max-w-3xl">
              <div className="tf-stamp inline-block bg-primary text-primary-foreground px-4 py-1 text-xs mb-5">
                Your Profile
              </div>
              <h1 className="font-display text-5xl sm:text-7xl tf-headline mb-4">
                WELCOME, {user.username.toUpperCase()}
              </h1>
              <p className="font-slab text-base sm:text-lg text-surface-dark-foreground/75 max-w-2xl">
                Manage your connections, view your statistics, and access your guides.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-6">
              {/* User Profile Card */}
              <article className="bg-[#231a0e] border-2 border-[#3d2c1a] shadow-card overflow-hidden">
                <div className="h-1 bg-primary" />
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="h-16 w-16 rounded-full border-2 border-primary/70 object-cover"
                        />
                      )}
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2 font-bold">
                          Steam Profile
                        </div>
                        <h2 className="font-display text-3xl text-white">{user.username}</h2>
                        <div className="text-xs text-surface-dark-foreground/50 mt-1">
                          Steam ID: {user.steamId}
                        </div>
                        {user.country && (
                          <div className="text-xs text-surface-dark-foreground/50 mt-1">
                            Country: {user.country}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>

                  {user.profileUrl && (
                    <a
                      href={user.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:underline"
                    >
                      View Steam Profile
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>

              {/* Steam Stats */}
              <article className="bg-[#231a0e] border-2 border-[#3d2c1a] shadow-card overflow-hidden">
                <div className="h-1" style={{ background: '#e8520a' }} />
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2 font-bold">
                        Steam Statistics
                      </div>
                      <h2 className="font-display text-3xl text-white">TF2 Stats</h2>
                    </div>
                    <button
                      onClick={fetchStats}
                      disabled={loadingStats}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw size={16} className={loadingStats ? 'animate-spin' : ''} />
                      Refresh
                    </button>
                  </div>

                  {loadingStats ? (
                    <div className="text-center py-8 text-surface-dark-foreground/50">
                      <Activity className="animate-spin mx-auto mb-2" size={32} />
                      <p>Loading profile...</p>
                    </div>
                  ) : steamProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatTile icon={<Clock3 size={18} />} label="Steam ID" value={steamProfile.steamid.slice(-8)} />
                        <StatTile icon={<Trophy size={18} />} label="Country" value={steamProfile.loccountrycode || 'N/A'} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-surface-dark-foreground/50">
                      <p>No profile data available</p>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* Quick Actions */}
            <aside className="bg-[#21170d] text-surface-dark-foreground border-2 border-border shadow-card self-start overflow-hidden">
              <div className="h-1 bg-primary" />
              <div className="p-6">
                <div className="tf-stamp inline-block bg-destructive text-destructive-foreground px-3 py-1 text-xs mb-5">
                  Quick Actions
                </div>
                <h2 className="font-display text-3xl text-white mb-3">Your Activity</h2>
                <p className="font-slab text-sm text-surface-dark-foreground/65 leading-relaxed mb-5">
                  Access your guides and manage your content.
                </p>

                <div className="space-y-3">
                  <Link
                    to="/guides/new"
                    className="block w-full tf-stamp inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-center"
                    style={{ background: '#e8520a', color: '#fff8ea' }}
                  >
                    <PlugZap size={17} />
                    Create New Guide
                  </Link>
                  <Link
                    to="/guides"
                    className="block w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Activity size={17} />
                    Browse Guides
                  </Link>
                </div>

                {myGuides.length > 0 && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <BookOpen size={16} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Your guides</span>
                    </div>
                    <ul className="space-y-2">
                      {myGuides.slice(0, 5).map((guide) => (
                        <li key={guide.id}>
                          <Link
                            to={`/guides/${guide.id}`}
                            className="font-slab text-sm text-surface-dark-foreground/80 hover:text-primary line-clamp-1"
                          >
                            {guide.title}
                            {!guide.published && (
                              <span className="ml-2 text-[10px] uppercase text-surface-dark-foreground/40">
                                draft
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href="https://steamcommunity.com/dev"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:underline"
                >
                  Steam developer page
                  <ExternalLink size={14} />
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
