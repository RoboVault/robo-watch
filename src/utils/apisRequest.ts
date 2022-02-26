/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { memoize } from 'lodash';

export const { get, all, post, put, spread } = axios;

type ApiDataResponse = {
    data: any[];
};

export const VAULTS_ALL_EXPERIMENTAL = '/vaults/experimental';
export const VAULTS_ALL = '/vaults/all';
const API_URL = 'https://api.yearn.finance/v1/chains/1';

// const filterToExperimentals = (res: any): ApiDataResponse => {
//     const response = { data: [] };
//     response.data =
//         res &&
//         res.data &&
//         res.data.filter(
//             (vault: any) =>
//                 vault.endorsed === false &&
//                 vault.type.toLowerCase() === VaultVersion.V2
//         );
//     return response;
// };

const getData = async (url: string): Promise<ApiDataResponse> => {
    try {
        const response = await axios.get(`${API_URL}${url}`);
        return response as ApiDataResponse;
    } catch (error) {
        console.log('error fetching data', error);
        throw error;
    }
};

export const BuildGet = memoize(getData);
