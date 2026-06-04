import hi from './hi';
import ta from './ta';
import te from './te';

const overlays = { hi, ta, te };

function pick(overlay, original) {
  return overlay !== undefined && overlay !== null ? overlay : original;
}

function mergeChoice(choice, overlay) {
  if (!overlay) return choice;
  return {
    ...choice,
    text: pick(overlay.text, choice.text),
    explanation: pick(overlay.explanation, choice.explanation),
    consequence: pick(overlay.consequence, choice.consequence),
  };
}

function mergeStep(step, overlay) {
  if (!overlay) return step;
  return {
    ...step,
    title: pick(overlay.title, step.title),
    description: pick(overlay.description, step.description),
    situation: pick(overlay.situation, step.situation),
    dialogue: step.dialogue?.map((d, i) => ({
      ...d,
      text: pick(overlay.dialogue?.[i], d.text),
    })),
    choices: step.choices?.map((c, i) => mergeChoice(c, overlay.choices?.[i])),
    content: step.content
      ? {
          ...step.content,
          title: pick(overlay.content?.title, step.content.title),
          sections: step.content.sections?.map((s, i) => ({
            ...s,
            heading: pick(overlay.content?.sections?.[i]?.heading, s.heading),
            text: pick(overlay.content?.sections?.[i]?.text, s.text),
          })),
        }
      : step.content,
    verificationMethods: step.verificationMethods?.map((m, i) => ({
      ...m,
      method: pick(overlay.verificationMethods?.[i]?.method, m.method),
      description: pick(overlay.verificationMethods?.[i]?.description, m.description),
    })),
    examples: step.examples?.map((e, i) => ({
      ...e,
      description: pick(overlay.examples?.[i]?.description, e.description),
    })),
    keyPoints: step.keyPoints?.map((p, i) => pick(overlay.keyPoints?.[i], p)),
    redFlags: step.redFlags?.map((f, i) => pick(overlay.redFlags?.[i], f)),
    warningSigns: step.warningSigns?.map((w, i) => pick(overlay.warningSigns?.[i], w)),
  };
}

export function getTranslatedScenario(scenario, scenarioId, lang) {
  if (!scenario || lang === 'en' || !overlays[lang]) return scenario;
  const overlay = overlays[lang][scenarioId];
  if (!overlay) return scenario;

  return {
    ...scenario,
    title: pick(overlay.title, scenario.title),
    description: pick(overlay.description, scenario.description),
    steps: scenario.steps?.map((step) => mergeStep(step, overlay.steps?.[step.id])),
    keyTakeaways: scenario.keyTakeaways?.map((k, i) => pick(overlay.keyTakeaways?.[i], k)),
  };
}
