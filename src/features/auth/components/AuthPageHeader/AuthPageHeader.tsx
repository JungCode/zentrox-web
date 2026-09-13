type AuthPageHeaderProps = {
  description: string;
  title: string;
};

export const AuthPageHeader = ({ description, title }: AuthPageHeaderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="bg-primary text-on-primary flex h-8 w-8 items-center justify-center rounded">
          <span
            className="material-symbols-outlined text-[14px] text-white"
            data-icon="auto_settings"
          >
            auto_mode
          </span>
        </div>
        <span className="text-primary text-lg font-semibold tracking-tight">
          Zentrox
        </span>
      </div>
      <h2 className="text-primary text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-on-surface-variant text-sm">{description}</p>
    </div>
  );
};
