
export type SacrificeCategory = 'Health' | 'Time' | 'Business' | 'Financial';

export interface Sacrifice {
    id: number;
    sacrifice: string;
    category: SacrificeCategory;
    hoursSaved: number;
    financialImpact: number;
    monthlyTimeGain: number;
    productivityScore: number;
    healthScore: number;
    moodScore: number;
    initialCost: number;
    roiTimeline: number;
}

export interface RoiCategory {
    category: string;
    investment: number;
    annualReturn: number;
    breakEven: number;
    roi5Year: number | '∞';
}

export interface MonthlyProgression {
    month: number;
    hours: number;
    financial: number;
    productivity: number;
    health: number;
    mood: number;
}
