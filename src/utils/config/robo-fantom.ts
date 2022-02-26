import {
    Network,
    NetworkConfig,
    toAddressConfig,
    toNetworkConfig,
} from '../../types';

// TODO: droidmuncher: figure out how to handle dev & prod environments
const FANTOM_SUBGRAPH_URL =
    'https://api.thegraph.com/subgraphs/name/droidmuncher/robo-vault-dev-subgraph';

// TODO: droidmuncher: confirm if the changes made in this files are correct

// Changed to match Robo vaults
const GOVERNANCE_ENS = 'governance';
const GOVERNANCE = '0xD074CDae76496d81Fab83023fee4d8631898bBAf';

// Changed to match Robo vaults
const GUARDIAN_ENS = 'guardian';
const GUARDIAN = '0x25637F50C42318A182dD77bE25dE444422811552';

// Changed to match Robo vaults
const MANAGEMENT_ENS = 'brain';
const MANAGEMENT = '0x7601630eC802952ba1ED2B6e4db16F699A0a5A87';

// Changed to match Robo vaults
const TREASURY_ENS = 'treasury';
const TREASURY = '0xD074CDae76496d81Fab83023fee4d8631898bBAf';

// Changed to match Robo vaults
const MANAGEMENT_FEE = 0;

// Changed to match Robo vaults
const PERFORMANCE_FEE = 800;

const FTM_USDC_ADDRESS = '0x04068da6c83afcfa0e13ba15a6696662335d5b75';
const FTM_ORACLE_CONTRACT_ADDRESS =
    '0x57aa88a0810dfe3f9b71a9b179dd8bf5f956c46a';
const FTM_STRATEGIES_HELPER_CONTRACT_ADDRESS =
    '0x97d0be2a72fc4db90ed9dbc2ea7f03b4968f6938';

export const roboFantom: NetworkConfig = {
    ...toNetworkConfig(
        Network.mainnet,
        toAddressConfig(GOVERNANCE, GOVERNANCE_ENS),
        toAddressConfig(GUARDIAN, GUARDIAN_ENS),
        toAddressConfig(MANAGEMENT, MANAGEMENT_ENS),
        toAddressConfig(TREASURY, TREASURY_ENS),
        MANAGEMENT_FEE,
        PERFORMANCE_FEE
    ),
    toTokenExplorerUrl: (token: string): string =>
        `https://ftmscan.com/token/${token}`,
    toAddressExplorerUrl: (token: string): string =>
        `https://ftmscan.com/address/${token}`,
    toTxExplorerUrl: (tx: string): string => `https://ftmscan.com/tx/${tx}`,
    subgraphUrl: FANTOM_SUBGRAPH_URL,
    usdcAddress: FTM_USDC_ADDRESS,
    oracleAddress: FTM_ORACLE_CONTRACT_ADDRESS,
    strategiesHelperAddress: FTM_STRATEGIES_HELPER_CONTRACT_ADDRESS,
};
