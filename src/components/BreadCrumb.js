import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const BreadCrumb = ({ breadCrumbItems, title, description, marginBottom }) => {
  function getBreadCrumbItems() {
    return breadCrumbItems.map((obj) => {
      if (obj.link === '') {
        return (<li key={obj.name} className="breadcrumb__item">
          {obj.name}
        </li>);
      }
      return (<li key={obj.name} className="breadcrumb__item">
        <Link to={obj.link}>
          <a className="breadcrumb__link">
            {obj.name}
          </a>
        </Link>
      </li>);
    });
  }
  return (
    <div className="page-intro background--gallery">
      <div className="wrapper">
        <div className="col-wrap">
          <div className="col">
            <nav>
              <div className="breadcrumb print--hide">
                <ol className="breadcrumb__list">
                  <li className="breadcrumb__item">
                    <Link to="/Home">
                      <a className="breadcrumb__link">
                        Home
                      </a>
                    </Link>
                  </li>
                  {getBreadCrumbItems()}
                </ol>
              </div>
            </nav>
            <div className="col col--md-47 col--lg-48">
              <h1 className="page-intro__title ">
                {title}
              </h1>
              <p className={`page-intro__content margin-bottom--${marginBottom}`}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BreadCrumb.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  marginBottom: PropTypes.string.isRequired,
  breadCrumbItems: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default BreadCrumb;
