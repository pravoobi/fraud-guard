import ModulePage from '@/components/ModulePage';
import { fraudModules } from '@/data/modules';

export async function generateStaticParams() {
  return fraudModules.map((module) => ({
    moduleId: module.id,
  }));
}

export default async function Module({ params }) {
  const { moduleId } = await params;
  return <ModulePage moduleId={moduleId} />;
} 