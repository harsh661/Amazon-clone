import React from 'react';

function CurrencyFormat({value}) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return <span>{formattedValue.replace('$', '')}</span>;
}

export default CurrencyFormat;