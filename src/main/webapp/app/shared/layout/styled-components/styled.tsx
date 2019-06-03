import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Spinner, FormText, FormControl } from 'react-bootstrap';
import React from 'react';

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.8);
`;

export const PointerIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
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

export const InlineFlex = styled.div`
  display: inline-flex;
  align-items: center;
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

export const SpaceBetweenCenter = styled(SpaceBetweenFlex)`
  align-items: center;
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

export const EqualHeightColumns = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: center;
  & > div {
    flex: 1 300px;
    max-width: 500px;
    margin-bottom: 1rem;
  }
  .card-body {
    display: flex;
    flex-direction: column;
  }
`;

export const Loading = () => (
  <div>
    <Spinner animation="border" variant="primary" />
  </div>
);

export const EditOrUpdate = ({ isNew }) => (isNew ? <span>Dodaj</span> : <span>Edytuj</span>);

export const ButtonBar = styled.div`
  width: 100%;
  padding-top: 1rem;
  display: flex;
`;

export const ButtonBarList = styled.div`
  width: 100%;
  display: flex;
`;

export const HeaderButton = styled.h2`
  display: flex;
  justify-content: space-between;
`;

export const Searcher = styled(FormControl)`
  display: flex;
`;

export const CheckBoxFormGroup = styled.div`
  .form-group {
    margin-bottom: 0;
  }
`;
