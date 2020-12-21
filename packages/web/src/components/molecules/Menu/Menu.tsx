import './Menu.scss';

/**
 * Menu
 */
export const Menu: React.FC = () => {
  return (
    <div className="Menu">
      <input type="checkbox" className="toggler" />
      <div className="Menu__hamburger">
        <div></div>
      </div>
      <div className="Menu__items">
        <div>
          <ul>
            <li>
              <a href="#">DVD</a>
            </li>
            <li>
              <a href="#">BLU-RAY</a>
            </li>
            <li>
              <a href="#">BESTSELLERS</a>
            </li>
            <li>
              <a href="#">CATEGORIES</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">ABOUT US</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
