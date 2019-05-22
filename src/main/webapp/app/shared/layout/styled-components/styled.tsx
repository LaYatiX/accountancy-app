import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ListGroup, Spinner } from 'react-bootstrap';
import React from 'react';

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.8);
`;
export const MenuRightFontAwesomeIcon = styled(FontAwesomeIcon)`
  display: none;
  margin: 0 10px;
  float: right;
  color: rgba(255, 255, 255, 0.8);
  transform: rotate(0deg);
  @media (min-width: 768px) {
    display: ${props => (props.navtoggled ? 'block' : 'none')};
  }
`;

export const Flex = styled.div`
  display: flex;
`;
export const FlexCommon = styled(Flex)`
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: center;
`;

export const FlexRight = styled(Flex)`
  justify-content: flex-end;
`;

export const VerticalSpacer = styled.div`
  flex: 1 1 auto;
`;

export const SpaceBetweenFlex = styled(Flex)`
  justify-content: space-between;
`;

export const CursorPointer = styled.div`
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-flow: nowrap;
  align-items: center;
`;

export const Loading = () => (
  <div>
    <Spinner animation="border" variant="primary" />
  </div>
);
