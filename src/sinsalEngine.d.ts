// sinsalEngine.d.ts

// --- 타입 정의 ---
export type PillarPosition = 'year' | 'month' | 'day' | 'hour';

export interface AnalyzeSinsalsParams {
    year: [string, string];
    month: [string, string];
    day: [string, string];
    hour: [string, string];
    gender: 'male' | 'female' | string;
    hourKnown: boolean;
}

export interface SinsalResultItem {
    key: string;
    name: string;
    hanja: string;
    meaning: string;
    type: string;
}

export interface SinsalAnalysisResult {
    sinsals: Record<PillarPosition, SinsalResultItem[]>;
    sinsals12: Record<PillarPosition, SinsalResultItem[]>;
}

// --- 함수 선언 ---
/**
 * 통합 신살 계산 엔진 메인 함수
 */
export declare function analyzeSinsals(params: AnalyzeSinsalsParams): SinsalAnalysisResult;