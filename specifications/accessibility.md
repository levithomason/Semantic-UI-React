# Accessibility

## Why

* Stardust is a flexible UI library that allows composition of components. Accessibility patterns are much more restrictive. We need a way of applying the restrictive patterns to the flexible UI components
* Stardust should provide accessibility by default, but the developer using Stardust should be able to modify/override the behavior to fit his specific needs
* All components need to be semantically correct
* RTL has impact on keyboard navigation as it siwtches right/left arrow key functionality

## What is accessibility

* sufficient contrast in standard themes
* high contrast theme
* zoom
* keyboard navigation / focus handling / focus highlighting
* screen reader support for virtual cursor and narration

Accessibility in HTML is achieved by:

* semantically correct HTML
* proper use of aria-* attirbutes and tabindex attributes
* keyboard handling implemented in javascript

TODO: Define Accessibility Grades (B/C)

Supported client/screen reader combinations

* Win/Desktop - JAWS
* Win/Chrome - JAWS
* Win/Edge - Narrator
* Win/Firefox - NVDA
* Mac/Desktop - VoiceOver

> Accessibility requirements and patterns are descirbed in [Stardust UI Accessibility repo](https://github.com/stardust-ui/accessibility)

## Proposal

### Goal

**Component** uses **behavior** to apply event handlers and aria properties to **HTML elements**.

The **behavior** of a component is intially determined by the component type and properties.
User of the component (developer) can **override** this default behavior by providing a different behavior type in the properties of the component.

There are two parts of accessibility, which should be encapsulated in the behaviors:

* aria atributes - specifies the set of attributes neccessary for correct narrating by screen readers.
* keyboard navigation - the way how to use application without mouse, whenever user navigates with keyboard he/she should be able to see where the focus is. The focus can be traped in some areas (e.g. modal dialogs).

Elements respond to HTML keyboard events by calling corresponding methods specified by the behavior.

Behavior can execute an action (for example move focus to the next child component), and/or create an **intent** and propagate this intent to the parent component behavior.

Parent component behavior can react to this intent by executing an action and/or propagating the intent to its parent component behavior.

Intent propagation is explicit (as opposed to HTML event propagation). Behavior needs to explicitly send the intent to the parent behavior.

For HTML events, once the element responds to an event by calling behavior method, the event propagation should be stopped.

There should be only one place to handle kayboard navigation, it will be FocusManager. The behaviors define methods how to handle navigation, but only FocusManager is responible to do the actual job.

### Glossary

**Component** - Stardust (react) component
**Behavior** - Javascript function,object or class that defines the behavior of a component
**Element** - HTML element rendered by the component
**Event** - HTML event (for example keydown)
**Intent** - operation to be performed. Behaviors understand intents.

### Examples

#### Single line vertical menu

React structure:

```HTML
<Menu>
  <MenuItem>Menu item 1</MenuItem>
  <MenuItem>Menu item 2</MenuItem>
  <MenuItem>Menu item 3</MenuItem>
</Menu>
```

||||
|---|---|---|
| Menu item 1|**Menu item 2**|Menu item 3|

The whole table represents a menu component, the table cell represents a menu-item component.

Menu component renders ``<ul>`` element. As it is a horizontal menu, it will use horizontal-menu behavior by default. MenuItem components render ``<li><div /></li>`` elements and use menu-item behavior by default. The behavior starts listening on the ``keydown`` events of the ``<div>`` element.

In this example, focus is initially on the second menu item element.

User presses **Left Arrow** key.

Menu-item behavior catches the event and does not execute any action, it creates **MOVE_PREV** intent and propagates it to the parent behavior.

Menu behavior maintains the list of its children. It recieves the **MOVE_PREV** intent, determines which component/element preceeds the sender component/element and set focus to it.

#### Horizontal + Vertical menu

React structure:

```HTML
<Menu direction="horizontal">
  <MenuItem>Menu item 1</MenuItem>
  <MenuItem>Menu item 2
    <Menu vertical>
      <MenuItem>Menu item 2A</MenuItem>
      <MenuItem>Menu item 2B</MenuItem>
      <MenuItem>Menu item 2C</MenuItem>
    </Menu>
  </MenuItem>
  <MenuItem>Menu item 3</MenuItem>
</Menu>
```

||||
|---|---|---|
| Menu item 1|Menu item 2|Menu item 3|
||||
||Menu item 2A||
||**Menu item 2B**||
||Menu item 2C||

First row of the table represents a horizontal menu, the second column represents a vertical menu. Cells represent menu items.

In this example, focus is initially on the Menu item 2B element.
User presses **Left Arrow** key.

Menu-item behavior of the 2B catches the event and does not execute any action, it creates **MOVE_PREV** intent and propagates it to the parent behavior (of the vertical menu).

Vertical menu recieves this intent and propagates the **MOVE_PREV** intent to the parent (Menu item 2)

Menu item 2 closes the child component and propagates the **MOVE_PREV** intent to the parent (Horizontal menu).

Horizontal Menu behavior maintains the list of its children. It recieves the **MOVE_PREV** intent, determines which component/element preceeds the sender component/element and set focus to it.

#### Other usecases

Similarly this approach can be used for selectable list, selectable list wrapped in accordion or for focus zones (chat-pane accessibility)

### Proposed intents

|Name|Description|
|---|---|
|MOVE_PREV|Moves focus to the previous sibling (typically executed on left-arrow, but RTL can change that|
|MOVE_NEXT|Moves focus to the next sibling (typically executed on left-arrow, but RTL can change that|
|MOVE_UP|Moves focus to the previous vertical sibling|
|MOVE_DOWN|Moves focus to the next vertical sibling|
|ENTER|Executes an action|
|ESC|Closes current container and moves focus to the parent|
|STOP_INTERACTION|Closes all parents (for example menu and all submenus are closed when the user executes an action)|

### Behaviors

Typical behaviors are:
* **DropDown** - to handle drop down lists and popups accessibility.
* **List** and **ListItem** - behaviors to handle accessibility of lists
* **Menu** and **MenuItem** - behaviors to handle accessibility of menu and menu items
* **Grid** and **GridCell** - behaviors to handle accessibility of grids, tables and cells
* **Notification** - to handle alerts and notifications

In most cases, behaviors are applied to visual components, however there might be cases where behaviors will be applied on non-visual components (wrappers):

* **TabOrderProvider** - wrapper that knows about its direct children, their (customized) tab order and how to handle navigation between them
* **FocusZone** - zone wich can trap the focus if needed. Useful for dialogs or editor
* **Dialog** - extended FocusZone, handles dialog accessibility

##### Wrapper component examples

If developer needs to change the sequence of components or group them, he/she can do it with `TabOrderProvider`:

```HTML
<TabOrderProvider>
  <Component1 order="1" />
  <Component2 order="3" />
  <Component3 order="4" />
  <Component4 order="2"  />
</TabOrderProvider>
```

The `FocusZone` can be nested, in this case use Enter (can be configurable) to go to the nested provider and Esc (can be configurable) to return back to the parrent:

```HTML
<FocusZone>
  <Component1 />
  <Component2>
    <FocusZone>
      <Component1 />
      <Component2 />
      <Component3 />
    </FocusZone>
  </Component2>
  <Component3 />
</FocusZone>
```