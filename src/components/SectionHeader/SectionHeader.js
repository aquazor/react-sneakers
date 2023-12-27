import { memo } from 'react';
import './SectionHeader.scss';

const SectionHeader = memo(({ heading, children }) => {
  return (
    <div className="section__header">
      <div className="section__header-heading flex__center">{heading}</div>
      {children}
    </div>
  );
});

export default SectionHeader;
