import { AddressConfig, Network } from '.';

export type NetworkConfig = {
    network: Network;
    governance: AddressConfig;
    guardian: AddressConfig;
    management: AddressConfig;
    treasury: AddressConfig;
    subgraphUrl: string;
    usdcAddress: string;
    oracleAddress: string;
    strategiesHelperAddress: string;
    toTokenExplorerUrl: (token: string) => string;
    toAddressExplorerUrl: (token: string) => string;
    toTxExplorerUrl: (token: string) => string;
};

export const toNetworkConfig = (
    network: Network,
    governance: AddressConfig,
    guardian: AddressConfig,
    management: AddressConfig,
    treasury: AddressConfig
) => ({
    network,
    governance,
    guardian,
    management,
    treasury,
});
