import { CardGroup } from 'react-bootstrap';
import { Fragment } from 'react';
import FurnitureCover from './FurnitureCover';
import DesignerCover from './DesignerCover';
import VendorCover from './VendorCover';

const Categories = () => {
  return (
    <Fragment>
      <FurnitureCover />
      <CardGroup>
        <DesignerCover />
        <VendorCover />
      </CardGroup>
    </Fragment>
  );
};

export default Categories;
