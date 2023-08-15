const AdviceContainer = ({ children, maxWidth = '270px' }) => (
  <div
    style={{ maxWidth }}
    className="w-100 mx-auto  d-flex flex-column align-items-center"
  >
    {children}
  </div>
);

export default AdviceContainer;
