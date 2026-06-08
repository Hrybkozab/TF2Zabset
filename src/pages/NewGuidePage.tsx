import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ImagePlus, Link as LinkIcon, PlayCircle, Save, Activity } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function NewGuidePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tf2Class, setTf2Class] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      await api.createGuide({
        title,
        content,
        tf2Class: tf2Class || undefined,
        tags: tagsArray,
        published,
      });
      toast.success('Guide created successfully!');
      navigate('/guides');
    } catch (error) {
      console.error('Error creating guide:', error);
      const message = error instanceof Error ? error.message : 'Failed to create guide';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-10 sm:py-14 flex-1">
        <Link to="/guides" className="text-xs uppercase tracking-widest text-primary hover:underline">
          Back to Guides
        </Link>

        <div className="mt-5 mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Community Guide</div>
          <h1 className="font-display text-4xl sm:text-6xl tf-headline">Add Your Guide</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={handleSubmit} className="tf-paper border-2 border-border shadow-card p-6 sm:p-8 space-y-5">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none"
                placeholder="Scout flank timing on Badlands"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">TF2 Class (optional)</span>
              <select
                value={tf2Class}
                onChange={(e) => setTf2Class(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none"
              >
                <option value="">Select a class</option>
                <option value="Scout">Scout</option>
                <option value="Soldier">Soldier</option>
                <option value="Pyro">Pyro</option>
                <option value="Demoman">Demoman</option>
                <option value="Heavy">Heavy</option>
                <option value="Engineer">Engineer</option>
                <option value="Medic">Medic</option>
                <option value="Sniper">Sniper</option>
                <option value="Spy">Spy</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Content</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2 min-h-[180px] w-full border border-border bg-background px-4 py-3 text-foreground outline-none"
                placeholder="Write your guide here..."
                required
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Tags (comma-separated)</span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-foreground outline-none"
                placeholder="movement, positioning, strategy"
              />
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Publish immediately</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="tf-stamp inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm disabled:opacity-50"
            >
              {loading ? <Activity className="animate-spin" size={16} /> : <Save size={16} />}
              {loading ? 'Saving...' : published ? 'Publish Guide' : 'Save Draft'}
            </button>
          </form>

          <aside className="tf-paper border-2 border-border shadow-card p-5 self-start">
            <div className="tf-stamp inline-block bg-primary text-primary-foreground px-3 py-1 text-xs mb-4">
              Preview
            </div>
            <div className="aspect-video border-2 border-border bg-surface-dark overflow-hidden grid place-items-center">
              {previewImage ? (
                <img src={previewImage} alt="Guide preview" className="h-full w-full object-cover" />
              ) : (
                <span className="font-slab text-sm text-surface-dark-foreground/50">Image preview coming soon</span>
              )}
            </div>
            <p className="font-slab text-sm text-muted-foreground mt-4">
              Your guide will be saved to the database and linked to your Steam profile.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
