import { Network, VaultService } from '../../types';
import FantomService from './fantom';

import { checkNetworkSupported } from '../../utils/network';

export const getService = (network: Network): VaultService => {
    checkNetworkSupported(network);

    switch (network) {
        case Network.fantom:
            return new FantomService();
        /**
         * Networks aren't supported yet by RoboVault
         */
        // case Network.mainnet:
        //     return new EthereumService();
        // case Network.arbitrum:
        //     return new ArbitrumService();
        default:
            throw new Error(`Network - ${network} is not supported`);
    }
};
