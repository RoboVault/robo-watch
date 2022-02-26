import { difference, omit, memoize } from 'lodash';
import { Network, StratReportGraphType } from '../types';
import { getService } from '../services/VaultService';

import { StrategyReportContextValue } from '../contexts/StrategyReportContext';

const OMIT_FIELDS = ['results', 'transaction', 'id'];

export type StrategyReport = {
    debtAdded: string;
    debtLimit: string;
    debtPaid: string;
    profit: string;
    loss: string;
    timestamp: string;
    totalDebt: string;
    totalProfit: string;
    totalLoss: string;
    transactionHash: string;
    results?: {
        startTimestamp: number;
        endTimestamp: number;
        duration: number;
        apr: number;
        durationPr: number;
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
    };
};

export type AllStrategyReports = {
    [id: string]: StrategyReport[];
};

const _parseReportValues = (
    reports: StratReportGraphType[]
): StrategyReport[] => {
    return reports.map((report) => {
        let results;
        if (report.results.length > 0) {
            const result = report.results[0];
            results = {
                ...result,
                currentReport: {
                    ...result.currentReport,
                    timestamp: result.currentReport.timestamp,
                },
                previousReport: {
                    ...result.previousReport,
                    timestamp: result.previousReport.timestamp,
                },
                startTimestamp: parseInt(result.startTimestamp),
                endTimestamp: parseInt(result.endTimestamp),
                duration: parseInt(result.duration),
                durationPr: parseFloat(result.durationPr),
                apr: parseFloat(result.apr) * 100,
            };
        }
        return {
            ...(omit(report, OMIT_FIELDS) as StratReportGraphType),
            profit: report.gain,
            loss: report.loss,
            totalProfit: report.totalGain,
            transactionHash: report.transaction.hash,
            results,
        };
    });
};

const _getReportsForStrategies = async (
    strategies: string[],
    network: Network,
    strategyReportContext: StrategyReportContextValue
): Promise<void> => {
    if (strategies.length === 0) {
        throw new Error(
            'Error: getReportsForStrategies expected valid strategy address'
        );
    }
    const { strategyReports, updateStrategyReports } = strategyReportContext;
    const cachedStrategies = strategies.filter(
        (s) => s.toLowerCase() in strategyReports
    );

    // Only query for uncached strategies
    const strategiesToQuery = difference(strategies, cachedStrategies);
    if (strategiesToQuery.length <= 0) return;

    const service = getService(network);

    const reportsByStrategy = await service.getStrategyReports(
        strategiesToQuery
    );

    for (const strategy of reportsByStrategy) {
        const parsedReports = _parseReportValues(strategy.reports);
        strategyReports[strategy.id.toLowerCase()] = parsedReports;
    }

    updateStrategyReports(strategyReports);
};

export const getReportsForStrategies = memoize(_getReportsForStrategies);
