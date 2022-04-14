import styled from 'styled-components';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const StyledButtonGroup = styled(ToggleButtonGroup)`
    && {
        height: 57px;
        border-radius: 8px;
        background: ${({ theme }) => theme.container};
    }
`;

const StyledButton = styled(ToggleButton)`
    && {
        border-color: transparent;
        background-color: ${({ theme }) => theme.container};
        color: ${(props) =>
            props.selected ? props.theme.title : props.theme.subtitle};
    }
`;

const StyledButtonLeft = styled(StyledButton)`
    && {
        border-right-color: ${({ theme }) => theme.backgroundColor};
    }
`;

const StyledButtonRight = styled(StyledButton)`
    && {
        border-left-color: ${({ theme }) => theme.backgroundColor};
    }
`;

export enum VaultType {
    Standard = 'standard',
    Degen = 'degen',
}

type VaultSelectorProps = {
    selected: VaultType;
    onChange: (vault: VaultType) => void;
};

export const VaultTypeSelector = (props: VaultSelectorProps) => {
    return (
        <StyledButtonGroup
            exclusive
            color="primary"
            value={props.selected}
            onChange={(_event, value) => value && props.onChange(value)}
        >
            <StyledButtonLeft value={VaultType.Standard}>
                Standard Vaults
            </StyledButtonLeft>
            <StyledButtonRight value={VaultType.Degen}>
                Degen Vaults
            </StyledButtonRight>
        </StyledButtonGroup>
    );
};
