import styled from 'styled-components';

const StyledImg = styled.img`
    height: 40px;
`;

type VaultIconProps = {
    name?: string;
};

export const VaultIcon = (props: VaultIconProps) => {
    const icon = props.name !== undefined ? props.name : 'unknown';

    return (
        <StyledImg
            src={`${process.env.PUBLIC_URL}/vaults/${icon}.png`}
            alt={icon}
        />
    );
};
