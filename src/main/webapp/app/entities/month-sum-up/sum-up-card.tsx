import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const SumUpCard = (props: { monthSumUp: Readonly<IMonthSumUp>; icon; color; text; heading }) => (
  <div className={`card border-bottom-${props.color} shadow h-100 py-2`}>
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{props.heading}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">{props.text}</div>
        </div>
        <div className="col-auto">
          <FontAwesomeIcon icon={props.icon} size={'2x'} className={'text-gray-300'} />
        </div>
      </div>
    </div>
  </div>
);
