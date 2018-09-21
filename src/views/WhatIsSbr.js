import React from 'react';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const WhatIsSbr = () => {
  const items = [
    { name: 'Home', link: '/Home' },
    { name: 'What Is SBR', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        marginBottom="1"
        title="What is SBR?"
        description="SBR details etc."
      />
    </div>
  );
};

export default WhatIsSbr;
