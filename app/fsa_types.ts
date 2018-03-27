// fsa_types.ts
// Interface, Types for Flux Standard Actions

interface FluxStandardAction {
    action: string;
    payload: any;
    error?: boolean;
    meta?: object;
}

