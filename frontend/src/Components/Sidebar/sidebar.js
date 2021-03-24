import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MenuIcon from "@material-ui/icons/Menu";
import LogoPath from "./logo.svg";
import { NavLink, Link, useHistory } from "react-router-dom";

import CSSTransition from "react-transition-group/CSSTransitionGroup";

const Logo = <img src={LogoPath} alt="" className="logo" />;

const profilePic = <img src="./profile.jpg" alt="Profile Pic" />;

function SidebarItem({
  label,
  isActive,
  showLabel = true,
  icon,
  index,
  items,
  depthStep = 10,
  depth = 1,
  arrow,
  redirect = null,
  selected = false,
  parentIndex = false,
  toggleMenu,
  isMobile,
  hideLabels,
  handleArrow,
  handleSelect,

  ...rest
}) {

const history = useHistory();

  const handleSelectItem = ({ parentIndex, index }) => {
    handleSelect({ parentIndex, index });
	if(redirect){
	 history.push(redirect);
	 toggleMenu();
	 }
  };

  const handleClickArrow = (index) => {
    if (parentIndex) {
    } else {
      handleArrow(index);
    }
  };

  const handleClickLink = () => {
    //if (isMobile) {
    toggleMenu();
    hideLabels();
    // }
  };

  const handleClickIcon = () => {
    if (!showLabel) {
      toggleMenu();
    }
  };

  const color = selected ? "rgb(36 177 181)" : "rgb(20, 29, 43)";

  return (
    <>
      <div className="menuButton" style={{ backgroundColor: color }}  onClick={() => handleSelectItem({ parentIndex, index })} >
        <ListItem
          button
          onClick={() => handleSelectItem({ parentIndex, index })}
          dense
          {...rest}
        >
          <ListItemText style={{ paddingLeft: "10$%" }}>
            <span
              style={{ position: "relative", top: "0.3em" }}
              className="sidebar_icon"
              onClick={handleClickIcon}
            >
              {icon}
            </span>
            <span> </span>

            {redirect !== null ? (
              <>
                {showLabel ? (
                  <NavLink
                    activeClassName="is-active"
                    to={redirect}
                    onClick={handleClickLink}
                  >
                    <span className="sidebar_label"> {label}</span>
                  </NavLink>
                ) : null}
              </>
            ) : (
              <>
                {showLabel ? (
                  <span className="sidebar_label">{label}</span>
                ) : null}
              </>
            )}

            {showLabel ? (
              <>
                <span
                  style={{ position: "relative", top: "0.6em" }}
                  className="sidebar_icon"
                  onClick={() => handleClickArrow(index)}
                >
                  {" "}
                  {arrow}
                </span>
              </>
            ) : null}
          </ListItemText>
        </ListItem>
      </div>

      {Array.isArray(items) && isActive && showLabel ? (
        <List disablePadding dense>
          {items.map((subItem, i) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 4}
              depthStep={depthStep}
              parentIndex={index}
              index={i}
              toggleMenu={toggleMenu}
              isMobile={isMobile}
              hideLabels={hideLabels}
              handleArrow={handleArrow}
              handleSelect={handleSelect}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
    </>
  );
}

export default function Sidebar({
  items,
  depthStep,
  depth,
  handleGridWidth,
  isMobile,
  sidebarClass,
}) {
  const [menu_items, setMenu] = useState(items);
  const [showmenu, setshowmenu] = useState(true);

  const toggleMenu = () => {
    const menuState = showmenu ? false : true;
    setshowmenu(menuState);

    const new_menu = menu_items;
    let new_menu_items = [];

    let i;
    for (i = 0; i < new_menu.length; i++) {
      new_menu[i].showLabel = menuState;
      new_menu_items.push(new_menu[i]);
    }

    setMenu(new_menu_items);
    handleGridWidth();
  };

  const handleArrow = (id) => {
    console.log(id);
    const new_menu = menu_items;
    let new_menu_items = [];
    new_menu.map((menu_item, i) => {
      if (i !== 0) {
        if (menu_item.isActive === false && i === id) {
          menu_item.isActive = true;
          menu_item.arrow = <ExpandLessIcon />;
        } else {
          menu_item.isActive = false;
          menu_item.arrow = <ExpandMoreIcon />;
        }
      }
      new_menu_items.push(menu_item);
    });
    setMenu(new_menu_items);
  };

  const handleSelect = (indexArray) => {
    let parentId = indexArray.parentIndex;
    let id = indexArray.index;
    const new_menu = menu_items;
    let new_menu_items = [];

    new_menu.map((itemArray, i) => {
      if (parentId) {
        itemArray.selected = false;
        if (itemArray.items) {
          itemArray.items.map((child, j) => {
            if (j === id && parentId === i) {
              child.selected = true;
            } else {
              child.selected = false;
            }
            return child;
          });
        }
      } else {
        id === i ? (itemArray.selected = true) : (itemArray.selected = false);

        if (itemArray.items) {
          itemArray.items.map((child) => {
            child.selected = false;

            return child;
          });
        }
      }

      new_menu_items.push(itemArray);
    });
    setMenu(new_menu_items);
  };

  const hideLabels = () => {
    const new_menu = menu_items;
    let new_menu_items = [];
    new_menu.map((item) => {
      item.showmenu = false;
      new_menu_items.push(item);
      return item;
    });

    setMenu(new_menu_items);
  };

  //when component mounts
  useEffect(() => {
    if (isMobile && showmenu) {
      toggleMenu();
    }
  }, []);

  //when component updates
  useEffect(() => {
    if (isMobile && showmenu) {
      toggleMenu();
    } else if (isMobile === false && showmenu === false) {
      toggleMenu();
    }
  }, [isMobile]);

  return (
    <div id="sidebar" className={sidebarClass}>
      <div className="sidebar_header">
        <MenuIcon
          onClick={toggleMenu}
          style={{
            display: "inline-block",
            marginBottom: "-4px",
            cursor: "pointer",
          }}
        />

        {showmenu ? (
          <div style={{ display: "inline-block" }}>Data Explorer</div>
        ) : null}
      </div>

      <div style={{ paddingTop: "20px" }}>
        <List disablePadding dense>
          {menu_items.map(
            (
              sidebarItem,
              index,
              showLabel,
              icon,
              arrow,
              isActive,
              redirect,
              selected
            ) => (
              <SidebarItem
                key={`${sidebarItem.name}${index}`}
                index={index}
                depthStep={depthStep}
                depth={depth}
                isActive={isActive}
                showLabel={showLabel}
                index={menu_items.indexOf(sidebarItem)}
                icon={icon}
                arrow={arrow}
                redirect={redirect}
                selected={selected}
                toggleMenu={toggleMenu}
                isMobile={isMobile}
                hideLabels={hideLabels}
                handleSelect={handleSelect}
                handleArrow={handleArrow}
                {...sidebarItem}
              />
            )
          )}
        </List>
      </div>

      <div className="profile_pic"></div>
    </div>
  );
}
