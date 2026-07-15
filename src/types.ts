export type PhaseId = 1 | 2 | 3;

export interface Task {
  id: string;
  phaseId: PhaseId;
  type: 'question' | 'touch' | 'sensual' | 'ritual';
  target: 'partnerA' | 'partnerB' | 'both';
  text: string;
  description?: string;
  // Dynamic replacement tags can be used like {A} or {B} to insert real names
}

export interface Phase {
  id: PhaseId;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  description: string;
}

export interface GameState {
  playerAName: string;
  playerBName: string;
  currentPhaseId: PhaseId;
  activeTaskIndex: { [key in PhaseId]: number };
  completedTaskIds: string[];
  safeWordActive: boolean;
  safeWordMode: 'hug' | 'drink' | 'soften' | null;
  soundEnabled: boolean;
  history: string[];
}
