import './SectionHeader.scss';

const SectionHeader = ({ heading, children }) => {
  return (
    <div className="section__header">
      <div className="section__header-heading flex__center">{heading}</div>
      {children}
    </div>
  );
};

export default SectionHeader;
