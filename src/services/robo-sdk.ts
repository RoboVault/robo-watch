import { ethers, BigNumber } from 'ethers';
import { Subgraph } from './subgraph';
import RoboVaultAbiV3 from '../utils/contracts/ABI/RoboVaultAbiV3.json';
import {
    VaultApi,
    VaultVersion,
    StrategyWithReports,
    VaultWithStrategies,
} from '../types';

export class RoboSdk {
    constructor(
        private readonly provider: ethers.providers.JsonRpcProvider,
        private readonly subgraph: Subgraph
    ) {}

    public async getVaultsWithStrategies(): Promise<VaultWithStrategies[]> {
        return this.subgraph.getVaultsWithStrategies();
    }

    public async getDetailedVaults(
        vaults: VaultWithStrategies[]
    ): Promise<VaultApi[]> {
        const vaultPromises = vaults.map((vault) =>
            this.getDetailedVault(vault)
        );
        return Promise.all(vaultPromises);
    }

    public async getDetailedVault(
        vault: VaultWithStrategies
    ): Promise<VaultApi> {
        const vaultContract = this.getVaultContract(vault.id);
        const apiVersion = String(await vaultContract.apiVersion());
        const name = String(await vaultContract.name());
        const symbol = String(await vaultContract.symbol());
        const decimals = parseInt(await vaultContract.decimals());
        const tokenAddress = String(await vaultContract.token());
        const shutdown = Boolean(await vaultContract.emergencyShutdown());
        const managementFee = parseInt(await vaultContract.managementFee());
        const performanceFee = parseInt(await vaultContract.performanceFee());
        const totalAssets = BigNumber.from(await vaultContract.totalAssets());

        // All vault icon pngs are named after the symbol. Replace slash to prevent it messing with paths
        const iconName = symbol.replace('/', '-');

        const vaultDetails: VaultApi = {
            address: vault.id,
            apiVersion: apiVersion,
            decimals: decimals,
            endorsed: true,
            icon: iconName,
            symbol: symbol,
            name: name,
            want: tokenAddress,
            token: {
                address: tokenAddress,
                decimals: decimals,
                symbol: symbol,
                icon: iconName,
                name: name,
            },
            type: VaultVersion.V2,
            emergencyShutdown: shutdown,
            fees: {
                general: {
                    managementFee,
                    performanceFee,
                },
            },
            tvl: { totalAssets },
            strategies: vault.strategies,
        };

        return vaultDetails;
    }

    public async getStrategyReports(
        strategyAddresses: string[]
    ): Promise<StrategyWithReports[]> {
        return this.subgraph.getStrategyReports(strategyAddresses);
    }

    private getVaultContract(vaultAddress: string): ethers.Contract {
        const abiString = JSON.stringify(RoboVaultAbiV3.abi);
        return new ethers.Contract(vaultAddress, abiString, this.provider);
    }
}
