import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-gradient-dark text-surface-dark-foreground mt-20 border-t-4 border-primary font-sans">
    <div className="container mx-auto px-4 pt-16 pb-8">
      {/* Основная сетка: 4 колонки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
                {/* КОЛОНКА 1: Заголовок и описание */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="font-display text-3xl tracking-wider uppercase text-white">TF2 Guides</div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold">ZabsEt</div>
          </div>
          <p className="text-sm text-surface-dark-foreground/70 leading-relaxed max-w-[240px]">
            Guides, tips, and account connections for all 9 classes.
          </p>
          
          {/* ОБНОВЛЕННЫЕ ИКОНКИ: ТЕПЕРЬ С ВИДИМЫМИ SVG */}
          <div className="flex gap-2">
            {[ 
              { icon: "steam", link: "#", title: "Steam" }, 
              { icon: "tiktok", link: "#", title: "TikTok" }, 
              { icon: "twitter", link: "#", title: "Twitter/X" }, 
              { icon: "discord", link: "#", title: "Discord" } 
            ].map((social, index) => (
              <a 
                key={index}
                href={social.link} 
                title={social.title}
                className="w-10 h-10 border border-surface-dark-foreground/20 rounded-lg flex items-center justify-center text-surface-dark-foreground/60 hover:border-primary hover:text-primary transition-all bg-surface-dark-foreground/5"
              >
                {/* В зависимости от названия иконки вставляем нужный SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  {social.icon === 'steam' && (
                    <path d="M12 0c-4.962 0-9.11 3.208-10.45 7.643l5.05 2.09c.404-.265.885-.42 1.4-.42 1.38 0 2.5 1.12 2.5 2.5 0 .074-.01.146-.02.217l3.96 2.76c.394-.28.874-.447 1.393-.447 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5c0-.14.015-.276.04-.41l-3.87-2.7c-.432.316-.96.51-1.536.51-.83 0-1.554-.407-2-1.026l-5.11-2.115C2.04 10.37 2 11.173 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10z"/>
                  )}
                  {social.icon === 'tiktok' && (
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.17-.07 2.1-.03 4.2-.02 6.3-.01 1.29-.16 2.64-.7 3.84-.71 1.63-2.14 2.92-3.85 3.42-1.62.5-3.42.42-4.96-.28-1.74-.77-3.07-2.45-3.32-4.33-.3-2.16.48-4.47 2.12-5.91 1.43-1.25 3.41-1.77 5.26-1.39v4.1c-.88-.23-1.85-.14-2.63.38-.85.55-1.33 1.57-1.18 2.57.08.82.63 1.58 1.4 1.89.76.32 1.66.27 2.37-.17.51-.31.83-.88.84-1.48l.02-11.41c.01-.1-.01-.2 0-.3z"/>
                  )}
                  {social.icon === 'twitter' && (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  )}
                  {social.icon === 'discord' && (
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.1 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.196.37.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* КОЛОНКА 2: Navigation */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-[0.2em] mb-8 text-sm">Navigation</h4>
          <ul className="flex flex-col gap-4 text-surface-dark-foreground/70 text-sm">
            <li><Link to="/classes" className="hover:text-primary transition-colors">Classes</Link></li>
            <li><Link to="/meta" className="hover:text-primary transition-colors">Meta</Link></li>
            <li><Link to="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors">Profile Connections</Link></li>
            <li className="text-surface-dark-foreground/40 cursor-default">Community Tips</li>
          </ul>
        </div>

        {/* КОЛОНКА 3: Пустая или дополнительная (для симметрии структуры) */}
        <div>
           {/* Здесь можно оставить пустое место или добавить еще ссылок в будущем */}
        </div>

        {/* КОЛОНКА 4: Not Affiliated (Дисклеймер) */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold uppercase tracking-[0.2em] mb-2 text-sm text-right lg:text-left">Support</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Affiliation</p>
              <p className="text-xs text-surface-dark-foreground/60 leading-relaxed italic">
                Team Fortress 2 and Valve. This website is a fan project and is not affiliated with Valve Corporation.
              </p>
            </div>
          </div>

          {/* Кнопка обратной связи (в стиле Discord из примера) */}
          <a 
            href="mailto:your-email@example.com" 
            className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-primary/50 rounded-full text-primary text-sm font-bold hover:bg-primary hover:text-black transition-all group"
          >
            <i className="fas fa-envelope"></i>
            Contact Support
          </a>
        </div>
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ: Copyright */}
      <div className="pt-8 border-t border-surface-dark-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-surface-dark-foreground/40 uppercase tracking-widest">
        <p>Copyright {new Date().getFullYear()} TF2 Guides ZabsEt. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="cursor-default">v1.0.0</span>
        </div>
      </div>
    </div>
  </footer>
);
