import { CreateWorkflowCard } from './CreateWorkflowCard';
import { HomeWelcomeCard } from './HomeWelcomeCard';

type HomeHeroProps = {
  displayName: string;
};

export const HomeHero = ({ displayName }: HomeHeroProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr]">
      <HomeWelcomeCard displayName={displayName} />
      <CreateWorkflowCard />
    </div>
  );
};
