import './Menu.scss';

export type MenuProps = {
  items: MenuItemProps[];
};

export type MenuItemProps = {
  label: string;
  href: string;
  id: string;
};

/**
 * Menu
 */
export const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className="Menu">
      <input type="checkbox" className="Menu__toggler" />
      <div className="Menu__hamburger">
        <div></div>
      </div>
      <div className="Menu__items">
        <div>
          <ul>
            {items.map(({ label, href, id }) => (
              <li key={id}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
