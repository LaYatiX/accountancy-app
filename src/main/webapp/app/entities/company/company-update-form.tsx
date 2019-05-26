import { CheckBoxFormGroup } from 'app/shared/layout/styled-components/styled';
import { Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label } from 'reactstrap';
import React from 'react';
import { ICompany } from 'app/shared/model/company.model';

export function CompanyUpdateForm(props: {
  company: any | ICompany | {} | Readonly<ICompany>;
  onSubmit: (event, errors, values) => void;
  disabled: any;
}) {
  return (
    <AvForm model={props.company} onSubmit={props.onSubmit}>
      <AvGroup>
        <Label id="companyNameLabel" for="company-companyName">
          Nazwa firmy
        </Label>
        <AvField id="company-companyName" type="text" name="companyName" />
      </AvGroup>
      <AvGroup>
        <Label id="shortNameLabel" for="company-shortName">
          Krótka nazwa
        </Label>
        <AvField id="company-shortName" type="text" name="shortName" />
      </AvGroup>
      <AvGroup>
        <Label id="nameLabel" for="company-name">
          Imię
        </Label>
        <AvField id="company-name" type="text" name="name" />
      </AvGroup>
      <AvGroup>
        <Label id="surnameLabel" for="company-surname">
          Nazwisko
        </Label>
        <AvField id="company-surname" type="text" name="surname" />
      </AvGroup>
      <AvGroup>
        <Label id="addressLabel" for="company-address">
          Adres
        </Label>
        <AvField id="company-address" type="text" name="address" />
      </AvGroup>
      <AvGroup>
        <Label id="postalCodeLabel" for="company-postalCode">
          Kod pocztowy
        </Label>
        <AvField id="company-postalCode" type="text" name="postalCode" />
      </AvGroup>
      <AvGroup>
        <Label id="cityLabel" for="company-city">
          Miasto
        </Label>
        <AvField id="company-city" type="text" name="city" />
      </AvGroup>
      <AvGroup>
        <Label id="nIPLabel" for="company-nIP">
          NIP
        </Label>
        <AvField id="company-nIP" type="text" name="nIP" />
      </AvGroup>
      <AvGroup>
        <Label id="phoneLabel" for="company-phone">
          Telefon
        </Label>
        <AvField id="company-phone" type="string" className="form-control" name="phone" />
      </AvGroup>
      <AvGroup>
        <Label id="formOfTaxationLabel" for="company-formOfTaxation">
          Sposób opodatkowania
        </Label>
        <AvInput id="company-formOfTaxation" type="select" name="formOfTaxation">
          <option value="LINEAR" key="0">
            Liniowo 19%
          </option>
          <option value="COMMON" key="1">
            Na zasadach ogólnych 18%
          </option>
          <option value="LUPSUM" key="2">
            Ryczałt ewidencjonowany
          </option>
        </AvInput>
      </AvGroup>
      <CheckBoxFormGroup>
        <AvGroup>
          <Label id="vATpayerLabel" check>
            <AvInput tag={Checkbox} color="primary" id="company-vATpayer" type="checkbox" name="vATpayer" />
            Czy jest płatnikiem VAT?
          </Label>
        </AvGroup>
        <AvGroup>
          <Label id="zUSeasyStartLabel" check>
            <AvInput tag={Checkbox} color="primary" id="company-zUSeasyStart" type="checkbox" name="zUSeasyStart" />
            Czy może korzystać z ulgi na start?
          </Label>
        </AvGroup>
        <AvGroup>
          <Label id="zUSmallLabel" check>
            <AvInput tag={Checkbox} color="primary" id="company-zUSmall" type="checkbox" name="zUSmall" />
            Czy może skorzystać z "MAŁEGO ZUSU?
          </Label>
        </AvGroup>
        <AvGroup>
          <Label id="zUSdiseaseLabel" check>
            <AvInput tag={Checkbox} color="primary" id="company-zUSdisease" type="checkbox" name="zUSdisease" />
            Czy chcesz opłacać dobrowolną składkę na ubezpieczenie chorobowe
          </Label>
        </AvGroup>
        <AvGroup>
          <Label id="isZUSpayerLabel" check>
            <AvInput tag={Checkbox} color="primary" id="company-isZUSpayer" type="checkbox" name="isZUSpayer" />
            Czy jesteś płatnikiem ZUS?
          </Label>
        </AvGroup>
      </CheckBoxFormGroup>
      <Button tag={Link} id="cancel-save" to="/entity/company" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />
        &nbsp;
        <span className="d-none d-md-inline">Wróć</span>
      </Button>
      &nbsp;
      <Button color="primary" id="save-entity" type="submit" disabled={props.disabled}>
        <FontAwesomeIcon icon="save" />
        &nbsp; Zapisz
      </Button>
    </AvForm>
  );
}
