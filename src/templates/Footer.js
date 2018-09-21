import React from 'react';
import { Footer } from 'registers-react-library';

const FooterModule = () => {
  return (
    <Footer footerSection={[
      {title: "Help", items:[
        {text: "Accessibility", link: "/Accessibility"},
        {text: "Search History", link: "/SearchHistory"}
      ]},
      {title: "Support", items:[
        {text: "Support", link: "/Support"}
      ]},
      {title: 'Connect with us', items: [
        { text: 'statistical.business.register@ons.gov.uk',emailHref: 'mailto:statistical.business.register@ons.gov.uk?subject=SBR&body=message%20goes%20here'}]},
      ]}
    />
  );
};


export default FooterModule;
