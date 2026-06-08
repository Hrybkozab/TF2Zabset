import { ExternalLink, Hammer, Lightbulb, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import zabziroImg from "@/assets/about/zabziro.jpg";
import setImg from "@/assets/about/set.jpg";

const helpers = [
  "Uzb3K1r0V",
] as const;

const founders = [
  {
    name: "Zabziro",
    role: "Lead Developer and Project Idea",
    steam: "https://steamcommunity.com/profiles/76561199492843415/",
    image: setImg,
    icon: Lightbulb,
    text: "The Main Creator of the concept, a retired player with over 10,000 hours of TF2 experience website development, direction, and core functionality of TF2 Guides. ",
  },
  {
    name: "sEt",
    role: "Co-Founder",
    steam: "https://steamcommunity.com/id/osdalv",
    image: zabziroImg,
    icon: Hammer,
    text: "The Co-founder, a player with over 13,000 hours of TF2 experience, knows the game well. He contributes ideas and shares his experience to help improve the site's functionality.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-dark text-surface-dark-foreground border-b-4 border-primary">
          <div className="container mx-auto px-4 py-14 sm:py-20">
            <div className="tf-stamp inline-block bg-primary text-primary-foreground px-4 py-1 text-xs mb-5">
              About the Project
            </div>
            <h1 className="font-display text-5xl sm:text-7xl tf-headline mb-4">TF2 GUIDES</h1>
            <p className="font-slab text-base sm:text-lg text-surface-dark-foreground/75 max-w-3xl">
              This site was created to help newcomers and long-time players advance in TF2. Here you'll find all the classes, guides, the current patch meta, and much more!
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-6">
            {founders.map((person) => {
              const Icon = person.icon;

              return (
                <article key={person.name} className="bg-surface-dark text-surface-dark-foreground border-2 border-border shadow-card overflow-hidden">
                  <div className="h-1 bg-primary" />
                  <img src={person.image} alt={person.name} className="h-72 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Icon size={20} />
                      <span className="text-xs uppercase tracking-[0.25em] font-bold">{person.role}</span>
                    </div>
                    <h2 className="font-display text-4xl text-white mb-3">{person.name}</h2>
                    <p className="font-slab text-sm text-surface-dark-foreground/70 mb-5">{person.text}</p>
                    <a
                      href={person.steam}
                      target="_blank"
                      rel="noreferrer"
                      className="tf-stamp inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm"
                    >
                      Steam Profile
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 sm:pb-20">
          <div className="tf-paper border-2 border-border shadow-card overflow-hidden">
            <div className="bg-surface-dark text-surface-dark-foreground px-5 py-4 border-b-4 border-primary">
              <div className="flex items-center gap-3">
                <Users className="text-primary" size={28} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">Community</div>
                  <h2 className="font-display text-3xl sm:text-4xl">Also thanks to those who helped us:</h2>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="font-slab text-sm text-muted-foreground mb-4">
                Thank you for the inspiration and joint promotion in the community!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {helpers.map((name) => (
                <div key={name} className="border border-border bg-card/70 px-3 py-2 font-slab text-sm text-center">
                  {name}
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
