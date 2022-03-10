import { Yearn } from '@yfi/sdk';
import { utils } from 'ethers';
import memoize from 'lodash/memoize';
import { getEthersDefaultProvider } from '../../utils/ethers';
import { mapVaultDataToVault } from '../../utils/vaultDataMapping';
import { mapVaultSdkToVaultApi, sortVaultsByVersion } from './mappings';
import { Subgraph } from '../subgraph';
import getNetworkConfig from '../../utils/config';
import {
    NetworkId,
    Network,
    VaultService,
    Vault,
    VaultApi,
    StrategyApi,
    QueryParam,
    DEFAULT_QUERY_PARAM,
    StrategyMetaData,
    StrategyWithReports,
} from '../../types';

type StrategyBasicData = {
    [vault: string]: StrategyApi[];
};

export default class ArbitrumService implements VaultService {
    private subgraph: Subgraph;
    private sdk: Yearn<NetworkId.arbitrum>;
    constructor() {
        const network = this.getNetwork();
        const provider = getEthersDefaultProvider(network);
        this.sdk = new Yearn(this.getNetworkId(), {
            provider,
            cache: { useCache: false },
        });
        const config = getNetworkConfig(network);
        this.subgraph = new Subgraph(config.subgraphUrl);
    }

    public getNetwork = (): Network => {
        return Network.arbitrum;
    };

    public getNetworkId = (): NetworkId => {
        return NetworkId.arbitrum;
    };

    public getTotalVaults = async (): Promise<number> => {
        const vaults = await this._getVaults();
        return vaults.length;
    };

    public getVaultsWithPagination = memoize(
        (queryParams: QueryParam = DEFAULT_QUERY_PARAM) =>
            this.getEndorsedVaults([], queryParams)
    );

    public getVault = async (address: string): Promise<Vault> => {
        if (!address || !utils.isAddress(address)) {
            throw new Error('Expected a valid vault address');
        }

        const vaults = await this.getEndorsedVaults([address]);

        const [foundVault]: Vault[] = vaults.filter(
            (vault) => vault.address.toLowerCase() === address.toLowerCase()
        );

        if (!foundVault) {
            throw new Error(
                'Requested address not recognized as a yearn vault'
            );
        }

        return foundVault;
    };

    // TODO: implement filters and query params
    public getEndorsedVaults = async (
        allowList: string[] = [],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        queryParams?: QueryParam
    ): Promise<Vault[]> => {
        console.log('Getting vaults');
        const results = await this._getVaults();
        const filterList = new Set(allowList.map((addr) => addr.toLowerCase()));
        const filteredVaults = results.filter(
            (vault) =>
                filterList.size === 0 ||
                filterList.has(vault.address.toLowerCase())
        );

        const vaultAddresses = filteredVaults.map((vault) =>
            vault.address.toLowerCase()
        );

        const strategyResultsByVaults = await this._getStrategiesByVaults(
            vaultAddresses
        );

        const mergedVaults = filteredVaults.map((vault) => ({
            ...vault,
            strategies: strategyResultsByVaults[vault.address.toLowerCase()],
        }));

        // map strategies to vaults as results
        const vaults = await mapVaultDataToVault(
            mergedVaults,
            this.getNetwork()
        );

        return vaults;
    };

    private _getInnerVaults = async (): Promise<VaultApi[]> => {
        const results = await this.sdk.vaults.get();

        const vaults = mapVaultSdkToVaultApi(results);

        const sortedVaultList = sortVaultsByVersion([...vaults]);

        return sortedVaultList;
    };

    private _getVaults = memoize(this._getInnerVaults);

    private _getInnerStrategiesByVaults = async (
        vaults: string[]
    ): Promise<StrategyBasicData> => {
        if (!vaults || vaults.length === 0) {
            throw new Error(
                'Error: _getInnerStrategiesByVaults expected valid vaults argument'
            );
        }

        const vaultsWithStrats = await this.subgraph.getVaultsWithStrategies(
            vaults
        );

        const vaultDict: StrategyBasicData = {};

        vaultsWithStrats.forEach(({ id, strategies }) => {
            vaultDict[id] = strategies;
        });

        return vaultDict;
    };

    private _getStrategiesByVaults = memoize(this._getInnerStrategiesByVaults);

    // TODO: implement this
    // private _getExperimentalVaults = memoize(this._getInnerVaults);

    public getStrategyMetaData = async (
        vaultAddress: string,
        strategyAddress: string
    ): Promise<StrategyMetaData> => {
        const result = await this.sdk.strategies.vaultsStrategiesMetadata([
            vaultAddress,
        ]);
        const res = result[0];
        const metaData = res.strategiesMetadata.find((strategy) => {
            strategy.address == strategyAddress;
        });
        return {
            description: metaData?.description,
        };
    };

    public async getStrategyReports(
        strategyAddresses: string[]
    ): Promise<StrategyWithReports[]> {
        return this.subgraph.getStrategyReports(strategyAddresses);
    }
}
