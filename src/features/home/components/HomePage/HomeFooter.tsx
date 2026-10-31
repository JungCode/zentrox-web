type HomeFooterProps = {
  links: string[];
};

export const HomeFooter = ({ links }: HomeFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-on-surface-variant flex flex-wrap items-center justify-between gap-4 text-[10px] font-semibold tracking-[0.3em] uppercase">
      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </div>
      <span className="text-on-surface-variant/60">
        (c) {currentYear} zentrox ai. all rights reserved.
      </span>
    </footer>
  );
};
