import { AppProvider } from '@/contexts/AppContext';
import ModulePage from '@/components/ModulePage';
import { fraudModules } from '@/data/modules';

// Generate static params for all module IDs
export async function generateStaticParams() {
  return fraudModules.map((module) => ({
    moduleId: module.id,
  }));
}

export default function Module({ params }) {
  const moduleId = params.moduleId;

  return (
    <AppProvider>
      <ModulePage moduleId={moduleId} />
    </AppProvider>
  );
} 