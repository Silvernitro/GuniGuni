import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import BrandNav from '../BrandNav';
import BreadCrumb from '../BreadCrumb';
import './index.scss';

interface Props {
  title?: string;
  callToAction?: any;
  breadcrumb?: any;
  history?: any;
}

const PageHeader = (props:Props) => {
    const { title, callToAction, breadcrumb, history } = props;

    return (
      <>
        <Helmet>
          <title>Hashtap - {title}</title>
        </Helmet>

        <div className="page-header">
          <BrandNav history={history} />
          {breadcrumb && breadcrumb.length && <BreadCrumb sections={breadcrumb} />}
          <div className="page-header__left">
            <Header as="h2">
              <Header.Content>{callToAction}</Header.Content>
            </Header>
          </div>
        </div>
      </>
    );
}

export default PageHeader;
