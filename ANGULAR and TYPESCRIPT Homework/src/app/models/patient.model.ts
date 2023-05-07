export interface Patient {
    readonly id: number;
    readonly name: string;
    readonly height: number;
    weight: number;
    showDetails: boolean;
}