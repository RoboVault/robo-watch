import { ethers } from 'ethers';
import { Subgraph } from './subgraph';
import RoboVaultAbiV3 from '../utils/contracts/ABI/RoboVaultAbiV3.json';
import {
    VaultApi,
    VaultVersion,
    StrategyWithReports,
    VaultWithStrategies,
} from '../types';

const vaultIcons = [
    {
        token: 'USDC',
        url: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    },
    {
        token: 'WFTM',
        url: 'https://www.robo-vault.com/static/media/FTM.36219035.png',
    },
    {
        token: 'WETH',
        url: 'https://www.robo-vault.com/static/media/ETH.86b356aa.png',
    },
    {
        token: 'WBTC',
        url: 'https://www.robo-vault.com/static/media/BTC.d6a21bc3.png',
    },
    {
        token: 'MIM',
        url: 'https://www.robo-vault.com/static/media/MIM.0ed572ce.png',
    },
    {
        token: 'DAI',
        url: 'https://www.robo-vault.com/static/media/DAI.26d4501f.png',
    },
];

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
        const apiVersion = await vaultContract.apiVersion();
        const name = await vaultContract.name();
        const symbol = await vaultContract.symbol();
        const decimals = parseInt(await vaultContract.decimals());
        const tokenAddress = await vaultContract.token();
        const emergencyShutdown = await vaultContract.emergencyShutdown();
        const managementFee = parseInt(await vaultContract.managementFee());
        const performanceFee = parseInt(await vaultContract.performanceFee());
        const iconUrl = this.findVaultIcon(name);

        const vaultDetails: VaultApi = {
            address: vault.id,
            apiVersion: apiVersion,
            decimals: decimals,
            endorsed: true,
            icon: iconUrl,
            symbol: symbol,
            name: name,
            want: tokenAddress, // TODO droidmuncher: Is this correct?
            token: {
                // TODO: droidmuncher: I think these token fields are same as the above fields
                address: tokenAddress,
                decimals: decimals,
                symbol: symbol,
                icon: iconUrl,
                name: name,
            },
            type: VaultVersion.V2,
            emergencyShutdown: emergencyShutdown,
            fees: {
                general: {
                    managementFee: managementFee,
                    performanceFee: performanceFee,
                },
            },
            tvl: { totalAssets: 0 }, // TODO: droidmuncher: Figure this out
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

    private findVaultIcon(vaultName: string): string {
        const vaultNameSplit = vaultName.toUpperCase().split(' ');

        const icon = vaultIcons.find((icon) =>
            vaultNameSplit.some((str) => str === icon.token)
        );

        return icon !== undefined
            ? icon.url
            : 'http://cdn.onlinewebfonts.com/svg/img_554507.png';
    }
}
