/* eslint-disable @typescript-eslint/no-explicit-any */

export type SubgraphAPIResponse = {
    data: {
        data?: any;
        errors?: any[];
    };
    status: number;
    statusText: string;
    config: any;
    request: any;
    headers: any;
};

export type SubgraphResponse = {
    data: any;
};

export type VaultWithStrategies = {
    id: string;
    strategies: [
        {
            name: string;
            address: string;
        }
    ];
};

export type StratReportGraphType = {
    debtAdded: string;
    debtLimit: string;
    debtPaid: string;
    gain: string;
    loss: string;
    timestamp: string;
    totalDebt: string;
    totalGain: string;
    totalLoss: string;
    results: Array<{
        apr: string;
        duration: string;
        durationPr: string;
        startTimestamp: string;
        endTimestamp: string;
        currentReport: {
            id: string;
            gain: string;
            loss: string;
            totalDebt: string;
            totalGain: string;
            totalLoss: string;
            timestamp: number;
            transaction: {
                hash: string;
            };
        };
        previousReport: {
            id: string;
            gain: string;
            loss: string;
            totalDebt: string;
            totalGain: string;
            totalLoss: string;
            timestamp: number;
            transaction: {
                hash: string;
            };
        };
    }>;
    transaction: {
        hash: string;
    };
};

export type StrategyWithReports = {
    id: string;
    reports: StratReportGraphType[];
};

export type StratReportGraphResult = {
    data: {
        strategies: StrategyWithReports[];
    };
};
