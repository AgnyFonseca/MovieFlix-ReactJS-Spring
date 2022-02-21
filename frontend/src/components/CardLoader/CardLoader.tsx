import ContentLoader from 'react-content-loader';
import './CardLoader.css';

const CardLoader = () => (
  <div className="card-loader-container">
    <ContentLoader
      speed={2}
      width={320}
      height={450}
      viewBox="0 0 320 450"
      backgroundColor="#6C6C6C"
      foregroundColor="#d6d2d2"
    >
      <rect x="0" y="0" rx="2" ry="2" width="310" height="300" />
    </ContentLoader>
  </div>
);

export default CardLoader;