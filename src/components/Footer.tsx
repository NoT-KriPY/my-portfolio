import { footerData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <p className="footer__name">{footerData.name}</p>
            <p className="footer__built">{footerData.builtWith}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {footerData.nav.map((item) => (
              <a key={item.href} href={item.href} className="footer__nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer__social">
            {footerData.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.name} profile`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
