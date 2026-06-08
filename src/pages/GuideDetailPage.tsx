import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Activity, Clock, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface ApiGuide {
  id: number;
  title: string;
  content: string;
  tf2_class: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  username: string;
  avatar: string | null;
  avg_rating: number;
  rating_count: number;
  user_rating: number | null;
}

const CLASS_COLORS: Record<string, string> = {
  Scout: "#5c8cff",
  Soldier: "#4b69ff",
  Pyro: "#f56800",
  Demoman: "#de3b00",
  Heavy: "#7d4071",
  Engineer: "#8c6e1f",
  Medic: "#47a29a",
  Sniper: "#5c8cff",
  Spy: "#5c8cff",
};

export default function GuideDetailPage() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [guide, setGuide] = useState<ApiGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingBusy, setRatingBusy] = useState(false);

  useEffect(() => {
    if (!guideId) return;

    (async () => {
      setLoading(true);
      try {
        const data = (await api.getGuide(guideId)) as ApiGuide;
        setGuide(data);
      } catch {
        setGuide(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [guideId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface-dark text-surface-dark-foreground">
        <Header />
        <main className="flex-1 grid place-items-center">
          <Activity className="animate-spin text-primary" size={48} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!guide) return <Navigate to="/guides" replace />;

  const classColor = guide.tf2_class ? CLASS_COLORS[guide.tf2_class] || "#e8520a" : "#e8520a";
  const paragraphs = guide.content.split(/\n{2,}|\n/).filter(Boolean);
  const readMinutes = Math.max(1, Math.ceil(guide.content.length / 900));

  async function submitRating(value: number) {
    if (!user) {
      toast.error("Sign in with Steam to rate guides");
      return;
    }

    setRatingBusy(true);
    try {
      await api.rateGuide(guide.id, value);
      setGuide((current) =>
        current ? { ...current, user_rating: value } : current
      );
      toast.success("Rating saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to rate");
    } finally {
      setRatingBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-dark text-surface-dark-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b-4 border-primary bg-gradient-dark">
          <div className="absolute inset-0 bg-gradient-team opacity-10" aria-hidden />
          <div className="container mx-auto px-4 py-12 sm:py-16 relative">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:underline mb-6"
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-end">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tf2_class && (
                    <span
                      className="tf-stamp px-3 py-1 text-xs"
                      style={{ background: classColor, color: "#fff8ea" }}
                    >
                      {guide.tf2_class}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-surface-dark-foreground/60">
                    <Clock size={14} />
                    {readMinutes} min read
                  </span>
                  {guide.avg_rating > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-primary">
                      <Star size={14} />
                      {guide.avg_rating.toFixed(1)} ({guide.rating_count})
                    </span>
                  )}
                </div>

                <h1 className="font-display text-5xl sm:text-7xl tf-headline mb-4">{guide.title}</h1>
              </div>

              <aside className="border-2 border-white/10 bg-white/[0.04] p-5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-3 font-bold">
                  Shared by
                </div>
                <div className="flex items-center gap-4">
                  {guide.avatar ? (
                    <img
                      src={guide.avatar}
                      alt={guide.username}
                      className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-primary bg-surface-dark font-display text-2xl">
                      {guide.username.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    <div className="font-display text-3xl text-white">{guide.username}</div>
                    <div className="text-xs text-surface-dark-foreground/50">
                      {new Date(guide.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 sm:py-14">
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            <article className="tf-paper border-2 border-border shadow-card p-6 sm:p-8">
              <div className="space-y-5 font-slab text-sm sm:text-base leading-relaxed text-foreground">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {guide.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-card px-3 py-1 text-xs uppercase tracking-widest text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            <aside className="space-y-5 self-start">
              <div className="tf-paper border-2 border-border shadow-card p-5">
                <h2 className="font-display text-2xl mb-3">Rate this guide</h2>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      disabled={ratingBusy}
                      onClick={() => submitRating(value)}
                      className={`h-10 w-10 border-2 font-display text-lg transition-colors ${
                        (guide.user_rating ?? 0) >= value
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                {!user && (
                  <p className="mt-3 font-slab text-xs text-muted-foreground">
                    <Link to="/profile" className="text-primary hover:underline">
                      Sign in
                    </Link>{" "}
                    to leave a rating.
                  </p>
                )}
              </div>

              <Link
                to="/guides"
                className="tf-stamp block bg-card text-foreground px-5 py-3 text-center text-sm"
              >
                All Guides
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
