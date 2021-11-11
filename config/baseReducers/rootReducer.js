import { combineReducers } from "redux";
import { blockedReducer } from "./blockedReducer";
import { modalReducer } from "./modalReducer";

import { screenReducer } from "./screenReducer";
import { asyncReducer } from "./asyncReducer";

import { topRightDrawerReducer } from "../../layout/TopRightDrawer/topRightDrawerReducer";
import { fullBottomDrawerReducer } from "../../layout/FullBottomDrawer/fullBottomDrawerReducer";
import { footerDrawerReducer } from "../../layout/FooterDrawer/footerDrawerReducer";
import { rightDrawerReducer } from "../../layout/RightDrawer/rightDrawerReducer";
import { headerDrawerReducer } from "../../layout/HeaderDrawer/headerDrawerReducer";

const rootReducer = combineReducers({
  blocked: blockedReducer,
  modal: modalReducer,
  screen: screenReducer,

  async: asyncReducer,

  topRightDrawer: topRightDrawerReducer,
  fullBottomDrawer: fullBottomDrawerReducer,
  footerDrawer: footerDrawerReducer,

  rightDrawer: rightDrawerReducer,
  headerDrawer: headerDrawerReducer,
});

export default rootReducer;
