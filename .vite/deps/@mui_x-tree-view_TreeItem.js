import {
  Collapse_default
} from "./chunk-HPRCYWGB.js";
import {
  Checkbox_default,
  CircularProgress_default
} from "./chunk-ZYDPO2VZ.js";
import "./chunk-BTQNRCH7.js";
import "./chunk-T7HKKLYA.js";
import {
  createSvgIcon,
  unsupportedProp
} from "./chunk-6PESYHST.js";
import "./chunk-7QCYNUQP.js";
import {
  TreeViewItemDepthContext,
  createUseThemeProps,
  generateTreeItemIdAttribute,
  isTargetInDescendants,
  selectorCanItemBeFocused,
  selectorIsCheckboxSelectionEnabled,
  selectorIsItemSelectionEnabled,
  selectorIsItemTheDefaultFocusableItem,
  selectorItemExpansionTrigger,
  selectorTreeViewId,
  useSelector,
  useTreeItemUtils,
  useTreeViewContext,
  useTreeViewStyleContext
} from "./chunk-DMWGUBH7.js";
import "./chunk-PFZ3O7PO.js";
import "./chunk-P4Z2EOCI.js";
import {
  useSlotProps_default
} from "./chunk-RHXUIIFF.js";
import {
  extractEventHandlers_default,
  resolveComponentProps_default
} from "./chunk-BRMSPYXY.js";
import {
  _objectWithoutPropertiesLoose,
  useForkRef
} from "./chunk-RL6DPJF4.js";
import "./chunk-NMEDIWFY.js";
import {
  _extends,
  alpha,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_prop_types,
  shouldForwardProp,
  styled_default2 as styled_default
} from "./chunk-3PJXMUCV.js";
import "./chunk-BGZ4WZNU.js";
import "./chunk-MWUQT4FA.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_jsx_runtime
} from "./chunk-63EICGZE.js";
import {
  require_react
} from "./chunk-4X6FFAZQ.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/x-tree-view/esm/TreeItem/TreeItem.js
var React6 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-tree-view/esm/useTreeItem/useTreeItem.js
var React = __toESM(require_react(), 1);
var useTreeItem = (parameters) => {
  const {
    runItemPlugins,
    instance,
    publicAPI,
    store
  } = useTreeViewContext();
  const depthContext = React.useContext(TreeViewItemDepthContext);
  const depth = useSelector(store, (...params) => {
    if (typeof depthContext === "function") {
      return depthContext(...params);
    }
    return depthContext;
  }, parameters.itemId);
  const {
    id,
    itemId,
    label,
    children,
    rootRef
  } = parameters;
  const {
    rootRef: pluginRootRef,
    contentRef,
    propsEnhancers
  } = runItemPlugins(parameters);
  const {
    interactions,
    status
  } = useTreeItemUtils({
    itemId,
    children
  });
  const rootRefObject = React.useRef(null);
  const contentRefObject = React.useRef(null);
  const handleRootRef = useForkRef(rootRef, pluginRootRef, rootRefObject);
  const handleContentRef = useForkRef(contentRef, contentRefObject);
  const checkboxRef = React.useRef(null);
  const treeId = useSelector(store, selectorTreeViewId);
  const isSelectionEnabledForItem = useSelector(store, selectorIsItemSelectionEnabled, itemId);
  const isCheckboxSelectionEnabled = useSelector(store, selectorIsCheckboxSelectionEnabled);
  const idAttribute = generateTreeItemIdAttribute({
    itemId,
    treeId,
    id
  });
  const shouldBeAccessibleWithTab = useSelector(store, selectorIsItemTheDefaultFocusableItem, itemId);
  const sharedPropsEnhancerParams = {
    rootRefObject,
    contentRefObject,
    interactions
  };
  const createRootHandleFocus = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onFocus) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (!status.focused && selectorCanItemBeFocused(store.value, itemId) && event.currentTarget === event.target) {
      instance.focusItem(event, itemId);
    }
  };
  const createRootHandleBlur = (otherHandlers) => (event) => {
    var _a, _b, _c, _d, _e;
    (_a = otherHandlers.onBlur) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const rootElement = instance.getItemDOMElement(itemId);
    if (status.editing || // we can exit the editing state by clicking outside the input (within the Tree Item) or by pressing Enter or Escape -> we don't want to remove the focused item from the state in these cases
    // we can also exit the editing state by clicking on the root itself -> want to remove the focused item from the state in this case
    event.relatedTarget && isTargetInDescendants(event.relatedTarget, rootElement) && (event.target && ((_c = (_b = event.target) == null ? void 0 : _b.dataset) == null ? void 0 : _c.element) === "labelInput" && isTargetInDescendants(event.target, rootElement) || ((_e = (_d = event.relatedTarget) == null ? void 0 : _d.dataset) == null ? void 0 : _e.element) === "labelInput")) {
      return;
    }
    instance.removeFocusedItem();
  };
  const createRootHandleKeyDown = (otherHandlers) => (event) => {
    var _a, _b, _c;
    (_a = otherHandlers.onKeyDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented || ((_c = (_b = event.target) == null ? void 0 : _b.dataset) == null ? void 0 : _c.element) === "labelInput") {
      return;
    }
    instance.handleItemKeyDown(event, itemId);
  };
  const createLabelHandleDoubleClick = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onDoubleClick) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    interactions.toggleItemEditing();
  };
  const createContentHandleClick = (otherHandlers) => (event) => {
    var _a, _b;
    (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    instance.handleItemClick(event, itemId);
    if (event.defaultMuiPrevented || ((_b = checkboxRef.current) == null ? void 0 : _b.contains(event.target))) {
      return;
    }
    if (selectorItemExpansionTrigger(store.value) === "content") {
      interactions.handleExpansion(event);
    }
    if (!isCheckboxSelectionEnabled) {
      interactions.handleSelection(event);
    }
  };
  const createContentHandleMouseDown = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onMouseDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.shiftKey || event.ctrlKey || event.metaKey || status.disabled) {
      event.preventDefault();
    }
  };
  const createIconContainerHandleClick = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (selectorItemExpansionTrigger(store.value) === "iconContainer") {
      interactions.handleExpansion(event);
    }
  };
  const getContextProviderProps = () => ({
    itemId,
    id
  });
  const getRootProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = _extends({}, extractEventHandlers_default(parameters), extractEventHandlers_default(externalProps));
    let ariaSelected;
    if (status.selected) {
      ariaSelected = true;
    } else if (!isSelectionEnabledForItem) {
      ariaSelected = void 0;
    } else {
      ariaSelected = false;
    }
    const props = _extends({}, externalEventHandlers, {
      ref: handleRootRef,
      role: "treeitem",
      tabIndex: shouldBeAccessibleWithTab ? 0 : -1,
      id: idAttribute,
      "aria-expanded": status.expandable ? status.expanded : void 0,
      "aria-selected": ariaSelected,
      "aria-disabled": status.disabled || void 0
    }, externalProps, {
      style: _extends({}, externalProps.style ?? {}, {
        "--TreeView-itemDepth": depth
      }),
      onFocus: createRootHandleFocus(externalEventHandlers),
      onBlur: createRootHandleBlur(externalEventHandlers),
      onKeyDown: createRootHandleKeyDown(externalEventHandlers)
    });
    const enhancedRootProps = ((_a = propsEnhancers.root) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, props, enhancedRootProps);
  };
  const getContentProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const props = _extends({}, externalEventHandlers, externalProps, {
      ref: handleContentRef,
      onClick: createContentHandleClick(externalEventHandlers),
      onMouseDown: createContentHandleMouseDown(externalEventHandlers),
      status
    });
    ["expanded", "selected", "focused", "disabled", "editing", "editable"].forEach((key) => {
      if (status[key]) {
        props[`data-${key}`] = "";
      }
    });
    const enhancedContentProps = ((_a = propsEnhancers.content) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, props, enhancedContentProps);
  };
  const getCheckboxProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const props = _extends({}, externalEventHandlers, {
      ref: checkboxRef
    }, externalProps);
    const enhancedCheckboxProps = ((_a = propsEnhancers.checkbox) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, props, enhancedCheckboxProps);
  };
  const getLabelProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = _extends({}, extractEventHandlers_default(externalProps));
    const props = _extends({}, externalEventHandlers, {
      children: label
    }, externalProps, {
      onDoubleClick: createLabelHandleDoubleClick(externalEventHandlers)
    });
    const enhancedLabelProps = ((_a = propsEnhancers.label) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, enhancedLabelProps, props);
  };
  const getLabelInputProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const enhancedLabelInputProps = ((_a = propsEnhancers.labelInput) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, externalProps, enhancedLabelInputProps);
  };
  const getIconContainerProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    return _extends({}, externalEventHandlers, externalProps, {
      onClick: createIconContainerHandleClick(externalEventHandlers)
    });
  };
  const getErrorContainerProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    return _extends({}, externalEventHandlers, externalProps);
  };
  const getLoadingContainerProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    return _extends({
      size: "12px",
      thickness: 6
    }, externalEventHandlers, externalProps);
  };
  const getGroupTransitionProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const response = _extends({}, externalEventHandlers, {
      unmountOnExit: true,
      component: "ul",
      role: "group",
      in: status.expanded,
      children
    }, externalProps);
    return response;
  };
  const getDragAndDropOverlayProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const enhancedDragAndDropOverlayProps = ((_a = propsEnhancers.dragAndDropOverlay) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, externalProps, enhancedDragAndDropOverlayProps);
  };
  return {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getGroupTransitionProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getLabelInputProps,
    getDragAndDropOverlayProps,
    getErrorContainerProps,
    getLoadingContainerProps,
    rootRef: handleRootRef,
    status,
    publicAPI
  };
};

// node_modules/@mui/x-tree-view/esm/TreeItem/treeItemClasses.js
function getTreeItemUtilityClass(slot) {
  return generateUtilityClass("MuiTreeItem", slot);
}
var treeItemClasses = generateUtilityClasses("MuiTreeItem", [
  "root",
  "content",
  "groupTransition",
  "iconContainer",
  "label",
  "checkbox",
  "labelInput",
  "dragAndDropOverlay",
  "errorIcon",
  "loadingIcon",
  // State classes, will be replaced by data-attrs in the next major
  "expanded",
  "selected",
  "focused",
  "disabled",
  "editable",
  "editing"
]);

// node_modules/@mui/x-tree-view/esm/TreeItemIcon/TreeItemIcon.js
var React3 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-tree-view/esm/icons/icons.js
var React2 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var TreeViewExpandIcon = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "TreeViewExpandIcon");
var TreeViewCollapseIcon = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "TreeViewCollapseIcon");

// node_modules/@mui/x-tree-view/esm/TreeItemIcon/TreeItemIcon.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function TreeItemIcon(props) {
  const {
    slots: slotsFromTreeItem,
    slotProps: slotPropsFromTreeItem,
    status
  } = props;
  const {
    slots: slotsFromTreeView,
    slotProps: slotPropsFromTreeView
  } = useTreeViewStyleContext();
  const slots = {
    collapseIcon: (slotsFromTreeItem == null ? void 0 : slotsFromTreeItem.collapseIcon) ?? slotsFromTreeView.collapseIcon ?? TreeViewCollapseIcon,
    expandIcon: (slotsFromTreeItem == null ? void 0 : slotsFromTreeItem.expandIcon) ?? slotsFromTreeView.expandIcon ?? TreeViewExpandIcon,
    endIcon: (slotsFromTreeItem == null ? void 0 : slotsFromTreeItem.endIcon) ?? slotsFromTreeView.endIcon,
    icon: slotsFromTreeItem == null ? void 0 : slotsFromTreeItem.icon
  };
  let iconName;
  if (slots == null ? void 0 : slots.icon) {
    iconName = "icon";
  } else if (status.expandable) {
    if (status.expanded) {
      iconName = "collapseIcon";
    } else {
      iconName = "expandIcon";
    }
  } else {
    iconName = "endIcon";
  }
  const Icon = slots[iconName];
  const iconProps = useSlotProps_default({
    elementType: Icon,
    externalSlotProps: (tempOwnerState) => _extends({}, resolveComponentProps_default(slotPropsFromTreeView[iconName], tempOwnerState), resolveComponentProps_default(slotPropsFromTreeItem == null ? void 0 : slotPropsFromTreeItem[iconName], tempOwnerState)),
    // TODO: Add proper ownerState
    ownerState: {}
  });
  if (!Icon) {
    return null;
  }
  return (0, import_jsx_runtime2.jsx)(Icon, _extends({}, iconProps));
}
true ? TreeItemIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types.default.object,
  status: import_prop_types.default.shape({
    disabled: import_prop_types.default.bool.isRequired,
    editable: import_prop_types.default.bool.isRequired,
    editing: import_prop_types.default.bool.isRequired,
    error: import_prop_types.default.bool.isRequired,
    expandable: import_prop_types.default.bool.isRequired,
    expanded: import_prop_types.default.bool.isRequired,
    focused: import_prop_types.default.bool.isRequired,
    loading: import_prop_types.default.bool.isRequired,
    selected: import_prop_types.default.bool.isRequired
  }).isRequired
} : void 0;

// node_modules/@mui/x-tree-view/esm/TreeItemDragAndDropOverlay/TreeItemDragAndDropOverlay.js
var React4 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var TreeItemDragAndDropOverlayRoot = styled_default("div", {
  name: "MuiTreeItemDragAndDropOverlay",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "action"
})(({
  theme
}) => ({
  position: "absolute",
  left: 0,
  display: "flex",
  top: 0,
  bottom: 0,
  right: 0,
  pointerEvents: "none",
  variants: [{
    props: {
      action: "make-child"
    },
    style: {
      marginLeft: "calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.darkChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.dark, theme.palette.action.focusOpacity)
    }
  }, {
    props: {
      action: "reorder-above"
    },
    style: {
      marginLeft: "calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))",
      borderTop: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }, {
    props: {
      action: "reorder-below"
    },
    style: {
      marginLeft: "calc(var(--TreeView-indentMultiplier) * var(--TreeView-itemDepth))",
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }, {
    props: {
      action: "move-to-parent"
    },
    style: {
      marginLeft: "calc(var(--TreeView-indentMultiplier) * calc(var(--TreeView-itemDepth) - 1))",
      borderBottom: `1px solid ${(theme.vars || theme).palette.action.active}`
    }
  }]
}));
function TreeItemDragAndDropOverlay(props) {
  if (props.action == null) {
    return null;
  }
  return (0, import_jsx_runtime3.jsx)(TreeItemDragAndDropOverlayRoot, _extends({}, props));
}
true ? TreeItemDragAndDropOverlay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  action: import_prop_types2.default.oneOf(["make-child", "move-to-parent", "reorder-above", "reorder-below"]),
  style: import_prop_types2.default.object
} : void 0;

// node_modules/@mui/x-tree-view/esm/TreeItemProvider/TreeItemProvider.js
var React5 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function TreeItemProvider(props) {
  const {
    children,
    itemId,
    id
  } = props;
  const {
    wrapItem,
    instance,
    store
  } = useTreeViewContext();
  const treeId = useSelector(store, selectorTreeViewId);
  const idAttribute = generateTreeItemIdAttribute({
    itemId,
    treeId,
    id
  });
  return (0, import_jsx_runtime4.jsx)(React5.Fragment, {
    children: wrapItem({
      children,
      itemId,
      instance,
      idAttribute
    })
  });
}
true ? TreeItemProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types3.default.node,
  id: import_prop_types3.default.string,
  itemId: import_prop_types3.default.string.isRequired
} : void 0;

// node_modules/@mui/x-tree-view/esm/TreeItemLabelInput/TreeItemLabelInput.js
var TreeItemLabelInput = styled_default("input", {
  name: "MuiTreeItem",
  slot: "LabelInput"
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  width: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: "none",
  padding: "0 2px",
  boxSizing: "border-box",
  "&:focus": {
    outline: `1px solid ${(theme.vars || theme).palette.primary.main}`
  }
}));

// node_modules/@mui/x-tree-view/esm/TreeItem/TreeItem.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded = ["visible"];
var _excluded2 = ["id", "itemId", "label", "disabled", "children", "slots", "slotProps", "classes"];
var useThemeProps = createUseThemeProps("MuiTreeItem");
var TreeItemRoot = styled_default("li", {
  name: "MuiTreeItem",
  slot: "Root"
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0
});
var TreeItemContent = styled_default("div", {
  name: "MuiTreeItem",
  slot: "Content",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "status"
})(({
  theme
}) => ({
  padding: theme.spacing(0.5, 1),
  paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  boxSizing: "border-box",
  // prevent width + padding to overflow
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  "&[data-disabled]": {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
    backgroundColor: "transparent"
  },
  "&[data-focused]": {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  "&[data-selected]": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    "&:hover": {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  },
  "&[data-selected][data-focused]": {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }
}));
var TreeItemLabel = styled_default("div", {
  name: "MuiTreeItem",
  slot: "Label",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "editable"
})(({
  theme
}) => _extends({
  width: "100%",
  boxSizing: "border-box",
  // prevent width + padding to overflow
  // fixes overflow - see https://github.com/mui/material-ui/issues/27372
  minWidth: 0,
  position: "relative",
  overflow: "hidden"
}, theme.typography.body1, {
  variants: [{
    props: ({
      editable
    }) => editable,
    style: {
      paddingLeft: "2px"
    }
  }]
}));
var TreeItemIconContainer = styled_default("div", {
  name: "MuiTreeItem",
  slot: "IconContainer"
})({
  width: 16,
  display: "flex",
  flexShrink: 0,
  justifyContent: "center",
  position: "relative",
  "& svg": {
    fontSize: 18
  }
});
var TreeItemGroupTransition = styled_default(Collapse_default, {
  name: "MuiTreeItem",
  slot: "GroupTransition",
  overridesResolver: (props, styles) => styles.groupTransition
})({
  margin: 0,
  padding: 0
});
var TreeItemErrorContainer = styled_default("div", {
  name: "MuiTreeItem",
  slot: "ErrorIcon"
})({
  position: "absolute",
  right: -3,
  width: 7,
  height: 7,
  borderRadius: "50%",
  backgroundColor: "red"
});
var TreeItemLoadingContainer = styled_default(CircularProgress_default, {
  name: "MuiTreeItem",
  slot: "LoadingIcon"
})({
  color: "text.primary"
});
var TreeItemCheckbox = styled_default(React6.forwardRef((props, ref) => {
  const {
    visible
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  if (!visible) {
    return null;
  }
  return (0, import_jsx_runtime5.jsx)(Checkbox_default, _extends({}, other, {
    ref
  }));
}), {
  name: "MuiTreeItem",
  slot: "Checkbox"
})({
  padding: 0
});
var useUtilityClasses = (classesProp) => {
  const {
    classes: classesFromTreeView
  } = useTreeViewStyleContext();
  const classes = _extends({}, classesProp, {
    root: clsx_default(classesProp == null ? void 0 : classesProp.root, classesFromTreeView.root),
    content: clsx_default(classesProp == null ? void 0 : classesProp.content, classesFromTreeView.itemContent),
    iconContainer: clsx_default(classesProp == null ? void 0 : classesProp.iconContainer, classesFromTreeView.itemIconContainer),
    checkbox: clsx_default(classesProp == null ? void 0 : classesProp.checkbox, classesFromTreeView.itemCheckbox),
    label: clsx_default(classesProp == null ? void 0 : classesProp.label, classesFromTreeView.itemLabel),
    groupTransition: clsx_default(classesProp == null ? void 0 : classesProp.groupTransition, classesFromTreeView.itemGroupTransition),
    labelInput: clsx_default(classesProp == null ? void 0 : classesProp.labelInput, classesFromTreeView.itemLabelInput),
    dragAndDropOverlay: clsx_default(classesProp == null ? void 0 : classesProp.dragAndDropOverlay, classesFromTreeView.itemDragAndDropOverlay),
    errorIcon: clsx_default(classesProp == null ? void 0 : classesProp.errorIcon, classesFromTreeView.itemErrorIcon),
    loadingIcon: clsx_default(classesProp == null ? void 0 : classesProp.loadingIcon, classesFromTreeView.itemLoadingIcon)
  });
  const slots = {
    root: ["root"],
    content: ["content"],
    iconContainer: ["iconContainer"],
    checkbox: ["checkbox"],
    label: ["label"],
    groupTransition: ["groupTransition"],
    labelInput: ["labelInput"],
    dragAndDropOverlay: ["dragAndDropOverlay"],
    errorIcon: ["errorIcon"],
    loadingIcon: ["loadingIcon"],
    expanded: ["expanded"],
    editing: ["editing"],
    editable: ["editable"],
    selected: ["selected"],
    focused: ["focused"],
    disabled: ["disabled"]
  };
  return composeClasses(slots, getTreeItemUtilityClass, classes);
};
var TreeItem = React6.forwardRef(function TreeItem2(inProps, forwardedRef) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeItem"
  });
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    slots = {},
    slotProps = {},
    classes: classesProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getLabelInputProps,
    getDragAndDropOverlayProps,
    getErrorContainerProps,
    getLoadingContainerProps,
    status
  } = useTreeItem({
    id,
    itemId,
    children,
    label,
    disabled
  });
  const classes = useUtilityClasses(classesProp);
  const Root = slots.root ?? TreeItemRoot;
  const rootProps = useSlotProps_default({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: {},
    className: classes.root
  });
  const Content = slots.content ?? TreeItemContent;
  const contentProps = useSlotProps_default({
    elementType: Content,
    getSlotProps: getContentProps,
    externalSlotProps: slotProps.content,
    ownerState: {},
    className: clsx_default(classes.content, status.expanded && classes.expanded, status.selected && classes.selected, status.focused && classes.focused, status.disabled && classes.disabled, status.editing && classes.editing, status.editable && classes.editable)
  });
  const IconContainer = slots.iconContainer ?? TreeItemIconContainer;
  const iconContainerProps = useSlotProps_default({
    elementType: IconContainer,
    getSlotProps: getIconContainerProps,
    externalSlotProps: slotProps.iconContainer,
    ownerState: {},
    className: classes.iconContainer
  });
  const Label = slots.label ?? TreeItemLabel;
  const labelProps = useSlotProps_default({
    elementType: Label,
    getSlotProps: getLabelProps,
    externalSlotProps: slotProps.label,
    ownerState: {},
    className: classes.label
  });
  const Checkbox = slots.checkbox ?? TreeItemCheckbox;
  const checkboxProps = useSlotProps_default({
    elementType: Checkbox,
    getSlotProps: getCheckboxProps,
    externalSlotProps: slotProps.checkbox,
    ownerState: {},
    className: classes.checkbox
  });
  const GroupTransition = slots.groupTransition ?? void 0;
  const groupTransitionProps = useSlotProps_default({
    elementType: GroupTransition,
    getSlotProps: getGroupTransitionProps,
    externalSlotProps: slotProps.groupTransition,
    ownerState: {},
    className: classes.groupTransition
  });
  const LabelInput = slots.labelInput ?? TreeItemLabelInput;
  const labelInputProps = useSlotProps_default({
    elementType: LabelInput,
    getSlotProps: getLabelInputProps,
    externalSlotProps: slotProps.labelInput,
    ownerState: {},
    className: classes.labelInput
  });
  const DragAndDropOverlay = slots.dragAndDropOverlay ?? TreeItemDragAndDropOverlay;
  const dragAndDropOverlayProps = useSlotProps_default({
    elementType: DragAndDropOverlay,
    getSlotProps: getDragAndDropOverlayProps,
    externalSlotProps: slotProps.dragAndDropOverlay,
    ownerState: {},
    className: classes.dragAndDropOverlay
  });
  const ErrorIcon = slots.errorIcon ?? TreeItemErrorContainer;
  const errorContainerProps = useSlotProps_default({
    elementType: ErrorIcon,
    getSlotProps: getErrorContainerProps,
    externalSlotProps: slotProps.errorIcon,
    ownerState: {},
    className: classes.errorIcon
  });
  const LoadingIcon = slots.loadingIcon ?? TreeItemLoadingContainer;
  const loadingContainerProps = useSlotProps_default({
    elementType: LoadingIcon,
    getSlotProps: getLoadingContainerProps,
    externalSlotProps: slotProps.loadingIcon,
    ownerState: {},
    className: classes.loadingIcon
  });
  return (0, import_jsx_runtime5.jsx)(TreeItemProvider, _extends({}, getContextProviderProps(), {
    children: (0, import_jsx_runtime5.jsxs)(Root, _extends({}, rootProps, {
      children: [(0, import_jsx_runtime5.jsxs)(Content, _extends({}, contentProps, {
        children: [(0, import_jsx_runtime5.jsxs)(IconContainer, _extends({}, iconContainerProps, {
          children: [status.error && (0, import_jsx_runtime5.jsx)(ErrorIcon, _extends({}, errorContainerProps)), status.loading ? (0, import_jsx_runtime5.jsx)(LoadingIcon, _extends({}, loadingContainerProps)) : (0, import_jsx_runtime5.jsx)(TreeItemIcon, {
            status,
            slots,
            slotProps
          })]
        })), (0, import_jsx_runtime5.jsx)(Checkbox, _extends({}, checkboxProps)), status.editing ? (0, import_jsx_runtime5.jsx)(LabelInput, _extends({}, labelInputProps)) : (0, import_jsx_runtime5.jsx)(Label, _extends({}, labelProps)), (0, import_jsx_runtime5.jsx)(DragAndDropOverlay, _extends({}, dragAndDropOverlayProps))]
      })), children && (0, import_jsx_runtime5.jsx)(TreeItemGroupTransition, _extends({
        as: GroupTransition
      }, groupTransitionProps))]
    }))
  }));
});
true ? TreeItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types4.default.any,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types4.default.object,
  className: import_prop_types4.default.string,
  /**
   * If `true`, the item is disabled.
   * @default false
   */
  disabled: import_prop_types4.default.bool,
  /**
   * The id attribute of the item. If not provided, it will be generated.
   */
  id: import_prop_types4.default.string,
  /**
   * The id of the item.
   * Must be unique.
   */
  itemId: import_prop_types4.default.string.isRequired,
  /**
   * The label of the item.
   */
  label: import_prop_types4.default.node,
  /**
   * Callback fired when the item root is blurred.
   */
  onBlur: import_prop_types4.default.func,
  /**
   * This prop isn't supported.
   * Use the `onItemFocus` callback on the tree if you need to monitor an item's focus.
   */
  onFocus: unsupportedProp,
  /**
   * Callback fired when a key is pressed on the keyboard and the tree is in focus.
   */
  onKeyDown: import_prop_types4.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types4.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types4.default.object
} : void 0;
export {
  TreeItem,
  TreeItemCheckbox,
  TreeItemContent,
  TreeItemGroupTransition,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemRoot,
  getTreeItemUtilityClass,
  treeItemClasses
};
//# sourceMappingURL=@mui_x-tree-view_TreeItem.js.map
