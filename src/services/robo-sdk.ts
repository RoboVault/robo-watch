import { ethers } from 'ethers';
import { Subgraph } from './subgraph';
import {
    VaultApi,
    VaultVersion,
    StrategyWithReports,
    VaultWithStrategies,
} from '../types';

const RoboVaultAbiV3 =
    '[{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"debtRatio","type":"uint256"},{"indexed":false,"name":"minDebtPerHarvest","type":"uint256"},{"indexed":false,"name":"maxDebtPerHarvest","type":"uint256"},{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"StrategyAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"gain","type":"uint256"},{"indexed":false,"name":"loss","type":"uint256"},{"indexed":false,"name":"debtPaid","type":"uint256"},{"indexed":false,"name":"totalGain","type":"uint256"},{"indexed":false,"name":"totalLoss","type":"uint256"},{"indexed":false,"name":"totalDebt","type":"uint256"},{"indexed":false,"name":"debtAdded","type":"uint256"},{"indexed":false,"name":"debtRatio","type":"uint256"}],"name":"StrategyReported","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"governance","type":"address"}],"name":"UpdateGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"governance","type":"address"}],"name":"NewPendingGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"management","type":"address"}],"name":"UpdateManagement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rewards","type":"address"}],"name":"UpdateRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"depositLimit","type":"uint256"}],"name":"UpdateDepositLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"UpdatePerformanceFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"managementFee","type":"uint256"}],"name":"UpdateManagementFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"guardian","type":"address"}],"name":"UpdateGuardian","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"active","type":"bool"}],"name":"EmergencyShutdown","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"queue","type":"address[20]"}],"name":"UpdateWithdrawalQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"debtRatio","type":"uint256"}],"name":"StrategyUpdateDebtRatio","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"minDebtPerHarvest","type":"uint256"}],"name":"StrategyUpdateMinDebtPerHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"maxDebtPerHarvest","type":"uint256"}],"name":"StrategyUpdateMaxDebtPerHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"},{"indexed":false,"name":"performanceFee","type":"uint256"}],"name":"StrategyUpdatePerformanceFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldVersion","type":"address"},{"indexed":true,"name":"newVersion","type":"address"}],"name":"StrategyMigrated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyRemovedFromQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"strategy","type":"address"}],"name":"StrategyAddedToQueue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"healthCheck","type":"address"}],"name":"UpdateHealthCheck","type":"event"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"},{"name":"healthCheck","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":4546,"inputs":[],"name":"apiVersion","outputs":[{"name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"gas":106972,"inputs":[{"name":"name","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":71822,"inputs":[{"name":"symbol","type":"string"}],"name":"setSymbol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38261,"inputs":[{"name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38187,"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38325,"inputs":[{"name":"management","type":"address"}],"name":"setManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38876,"inputs":[{"name":"rewards","type":"address"}],"name":"setRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":36489,"inputs":[{"name":"degradation","type":"uint256"}],"name":"setLockedProfitDegradation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38315,"inputs":[{"name":"limit","type":"uint256"}],"name":"setDepositLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38449,"inputs":[{"name":"fee","type":"uint256"}],"name":"setPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":38479,"inputs":[{"name":"fee","type":"uint256"}],"name":"setManagementFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":39723,"inputs":[{"name":"guardian","type":"address"}],"name":"setGuardian","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":39794,"inputs":[{"name":"active","type":"bool"}],"name":"setEmergencyShutdown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1259287,"inputs":[{"name":"queue","type":"address[20]"}],"name":"setWithdrawalQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":77948,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":119011,"inputs":[{"name":"sender","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":39541,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":41582,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":41606,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":83428,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"amount","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"signature","type":"bytes"}],"name":"permit","outputs":[{"name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"gas":4698,"inputs":[],"name":"totalAssets","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_amount","type":"uint256"}],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_amount","type":"uint256"},{"name":"recipient","type":"address"}],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"gas":828175,"inputs":[],"name":"maxAvailableShares","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"},{"name":"maxLoss","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"gas":40934,"inputs":[],"name":"pricePerShare","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"profitLimitRatio","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"profitLimitRatio","type":"uint256"},{"name":"lossLimitRatio","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":115872,"inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"}],"name":"updateStrategyDebtRatio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":43120,"inputs":[{"name":"strategy","type":"address"},{"name":"minDebtPerHarvest","type":"uint256"}],"name":"updateStrategyMinDebtPerHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":43150,"inputs":[{"name":"strategy","type":"address"},{"name":"maxDebtPerHarvest","type":"uint256"}],"name":"updateStrategyMaxDebtPerHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":41035,"inputs":[{"name":"strategy","type":"address"},{"name":"performanceFee","type":"uint256"}],"name":"updateStrategyPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":40721,"inputs":[{"name":"_healthCheck","type":"address"}],"name":"setHealthCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1140513,"inputs":[{"name":"oldVersion","type":"address"},{"name":"newVersion","type":"address"}],"name":"migrateStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"revokeStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":1195529,"inputs":[{"name":"strategy","type":"address"}],"name":"addStrategyToQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":23032443,"inputs":[{"name":"strategy","type":"address"}],"name":"removeStrategyFromQueue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"debtOutstanding","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"debtOutstanding","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creditAvailable","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"creditAvailable","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":10811,"inputs":[],"name":"availableDepositLimit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"expectedReturn","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"strategy","type":"address"}],"name":"expectedReturn","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":1098145,"inputs":[{"name":"gain","type":"uint256"},{"name":"loss","type":"uint256"},{"name":"_debtPayment","type":"uint256"}],"name":"report","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"gas":8678,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"stateMutability":"view","type":"function"},{"gas":7731,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"stateMutability":"view","type":"function"},{"gas":2408,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2653,"inputs":[{"name":"arg0","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2898,"inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2498,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2528,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2558,"inputs":[],"name":"governance","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2588,"inputs":[],"name":"management","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2618,"inputs":[],"name":"guardian","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2648,"inputs":[],"name":"healthCheck","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":10353,"inputs":[{"name":"arg0","type":"address"}],"name":"strategies","outputs":[{"name":"performanceFee","type":"uint256"},{"name":"activation","type":"uint256"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"lastReport","type":"uint256"},{"name":"totalDebt","type":"uint256"},{"name":"totalGain","type":"uint256"},{"name":"totalLoss","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2753,"inputs":[{"name":"arg0","type":"uint256"}],"name":"withdrawalQueue","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":2738,"inputs":[],"name":"emergencyShutdown","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"gas":2768,"inputs":[],"name":"depositLimit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2798,"inputs":[],"name":"debtRatio","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2828,"inputs":[],"name":"totalDebt","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2858,"inputs":[],"name":"lastReport","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2888,"inputs":[],"name":"activation","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2918,"inputs":[],"name":"lockedProfit","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2948,"inputs":[],"name":"lockedProfitDegradation","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":2978,"inputs":[],"name":"rewards","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"gas":3008,"inputs":[],"name":"managementFee","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3038,"inputs":[],"name":"performanceFee","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3283,"inputs":[{"name":"arg0","type":"address"}],"name":"nonces","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"gas":3098,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]';

const vaultIcons = [
    {
        token: 'USDC',
        url: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    },
    {
        token: 'MIM',
        url: 'https://www.robo-vault.com/static/media/MIM.0ed572ce.png',
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

        const icon = vaultIcons.find((icon) => {
            const vaultNameSplit = String(name).toUpperCase().split(' ');
            const isMatch = vaultNameSplit.some((str) => str === icon.token);
            return isMatch;
        });

        const vaultDetails: VaultApi = {
            address: vault.id,
            apiVersion: apiVersion,
            decimals: decimals,
            endorsed: true,
            icon: icon?.url,
            symbol: symbol,
            name: name,
            want: tokenAddress, // TODO droidmuncher: Is this correct?
            token: {
                // TODO: droidmuncher: I think these token fields are same as the above fields
                address: tokenAddress,
                decimals: decimals,
                symbol: symbol,
                icon: icon?.url,
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
        return new ethers.Contract(vaultAddress, RoboVaultAbiV3, this.provider);
    }
}
