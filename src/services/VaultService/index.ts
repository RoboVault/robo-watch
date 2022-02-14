import { Network, VaultService } from '../../types';
import RoboFantomService from './robo-fantom';
import EthereumService from './ethereum';
import ArbitrumService from './arbitrum';

import { checkNetworkSupported } from '../../utils/network';

export const getService = (network: Network): VaultService => {
    checkNetworkSupported(network);

    switch (network) {
        case Network.mainnet:
            return new EthereumService();
        case Network.fantom:
            return new RoboFantomService();
        case Network.arbitrum:
            return new ArbitrumService();
        default:
            throw new Error(`Network - ${network} is not supported`);
    }
};
