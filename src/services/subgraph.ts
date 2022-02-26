import axios from 'axios';
import {
    SubgraphResponse,
    SubgraphAPIResponse,
    StratReportGraphResult,
    StrategyWithReports,
    VaultWithStrategies,
} from '../types';

/**
 * TODO: droidmuncher: Add memoize funcs
 */
export class Subgraph {
    constructor(private readonly subgraphUrl: string) {}

    public async getVaultsWithStrategies(
        vaultAddresses?: string[]
    ): Promise<VaultWithStrategies[]> {
        let vaultFilter = '';
        if (vaultAddresses !== undefined) {
            const addressesLower = vaultAddresses.map((a) => a.toLowerCase());
            vaultFilter = `where: { id_in: ${JSON.stringify(addressesLower)} }`;
        }

        const query = `{
            vaults ${vaultFilter} {
                id
                strategies {
                    name,
                    address,
                }
            }
        }`;
        const results = await this.querySubgraph(query);
        return results?.data?.vaults ?? [];
    }

    public async getStrategyReports(
        strategyAddresses: string[]
    ): Promise<StrategyWithReports[]> {
        const addressesLower = strategyAddresses.map((s) => s.toLowerCase());
        const query = `{
            strategies(where: {
              id_in: ${JSON.stringify(addressesLower)}
            }) {
                id
                reports(first: 10, orderBy: timestamp, orderDirection: desc)  {
                  id
                  transaction {
                    hash
                  }
                  timestamp
                  gain
                  loss
                  totalGain
                  totalLoss
                  totalDebt
                  debtLimit
                  debtAdded
                  debtPaid
                  results {
                    startTimestamp
                    endTimestamp
                    duration
                    apr
                    durationPr
                    currentReport {
                        id
                        gain
                        loss
                        totalDebt
                        totalGain
                        totalLoss
                        timestamp
                        transaction { hash blockNumber }
                    }
                    previousReport {
                        id
                        gain
                        loss
                        totalDebt
                        totalGain
                        totalLoss
                        timestamp
                        transaction { hash blockNumber }
                    }
                  }
                }
            }
        }`;

        const results: StratReportGraphResult = await this.querySubgraph(query);

        return results?.data?.strategies ?? [];
    }

    private async querySubgraph(query: string): Promise<SubgraphResponse> {
        try {
            const response: SubgraphAPIResponse = await axios.post(
                `${this.subgraphUrl}`,
                {
                    query,
                }
            );
            if (response.data.errors && response.data.errors.length > 0) {
                throw Error(
                    response.data.errors[0].message ||
                        'Error: retrieving data from subgraph'
                );
            }
            return {
                data: response.data.data,
            };
        } catch (error) {
            console.error('subgraph error', error);
            throw error;
        }
    }
}
