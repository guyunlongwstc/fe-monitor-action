/**
 * plugin声明文件
 *
 * @file plugin.d.ts
 * @author guyunlong
 */

import {
  Avatar as SuiAvatar,
  Badge as SuiBadge,
  Button as SuiButton,
  BreadcrumbItem as SuiBreadcrumbItem,
  Breadcrumb as SuiBreadcrumb,
  Cascader as SuiCascader,
  Card as SuiCard,
  CheckboxGroup as SuiCheckboxGroup,
  Checkbox as SuiCheckbox,
  ColorPicker as SuiColorPicker,
  CollapsePanel as SuiCollapsePanel,
  Collapse as SuiCollapse,
  Dialog as SuiDialog,
  Dropdown as SuiDropdown,
  FormItem as SuiFormItem,
  Form as SuiForm,
  InputNumber as SuiInputNumber,
  Input as SuiInput,
  Icon as SuiIcon,
  Link as SuiLink,
  List as SuiList,
  Message as SuiMessage,
  Menu as SuiMenu,
  Notification as SuiNotification,
  OptionGroup as SuiOptionGroup,
  Option as SuiOption,
  Page as SuiPage,
  Pagination as SuiPagination,
  Popover as SuiPopover,
  Popup as SuiPopup,
  Radio as SuiRadio,
  Rate as SuiRate,
  RadioGroup as SuiRadioGroup,
  Select as SuiSelect,
  Slider as SuiSlider,
  ScrollBar as SuiScrollBar,
  Step as SuiStep,
  Steps as SuiSteps,
  Switch as SuiSwitch,
  TabPane as SuiTabPane,
  Table as SuiTable,
  Tabs as SuiTabs,
  TimeLine as SuiTimeLine,
  TimeLineItem as SuiTimeLineItem,
  TimePicker as SuiTimePicker,
  Tooltip as SuiTooltip,
  Transfer as SuiTransfer,
  Trigger as SuiTrigger,
  WebUploader as SuiWebUploader,
} from "@baidu/sui";

import {
  // @ts-ignore
  AppSidebar as SuiBizSidebar
} from "@baidu/sui-biz";


import { SanEventListener } from "san";

declare namespace Plugin {
  interface SuiTrack {
    activate(sui: Sui): void;
  }

  interface TableFilter {
    filter: any;
    field: any;
  }

  interface Listener {
    (e: TableFilter): void;
  }

  class Avatar extends SuiAvatar {
    id: number;
  }

  class Badge extends SuiBadge {
    id: number;
  }

  class Button extends SuiButton {
    id: number;
  }

  class BreadcrumbItem extends SuiBreadcrumbItem {
    id: number;
  }

  class Breadcrumb extends SuiBreadcrumb {
    id: number;
  }

  class Cascader extends SuiCascader {
    id: number;
  }

  class Card extends SuiCard {
    id: number;
  }

  class CheckboxGroup extends SuiCheckboxGroup {
    id: number;
  }

  class Checkbox extends SuiCheckbox {
    id: number;
  }

  class ColorPicker extends SuiColorPicker {
    id: number;
  }

  class CollapsePanel extends SuiCollapsePanel {
    id: number;
  }

  class Collapse extends SuiCollapse {
    id: number;
  }

  class Dialog extends SuiDialog {
    id: number;
    __openTime: number;
  }

  class Dropdown extends SuiDropdown {
    id: number;
  }

  class FormItem extends SuiFormItem {
    id: number;
  }

  class Form extends SuiForm {
    id: number;
  }

  class InputNumber extends SuiInputNumber {
    id: number;
    __focusTime: number;
  }

  class Input extends SuiInput {
    id: number;
    __focusTime: number;
  }

  class Icon extends SuiIcon {
    id: number;
  }

  class Link extends SuiLink {
    id: number;
  }

  class List extends SuiList {
    id: number;
  }

  class Message extends SuiMessage {
    id: number;
  }

  class Menu extends SuiMenu {
    id: number;
  }

  class Notification extends SuiNotification {
    id: number;
  }

  class OptionGroup extends SuiOptionGroup {
    id: number;
  }

  class Option extends SuiOption {
    id: number;
  }

  class Page extends SuiPage {
    id: number;
  }

  class Pagination extends SuiPagination {
    id: number;
  }

  class Popover extends SuiPopover {
    id: number;
  }

  class Popup extends SuiPopup {
    id: number;
  }

  class Radio extends SuiRadio {
    id: number;
  }

  class Rate extends SuiRate {
    id: number;
  }

  class RadioGroup extends SuiRadioGroup {
    id: number;
  }

  class Select extends SuiSelect {
    id: number;
    __focusTime: number;
  }

  class Slider extends SuiSlider {
    id: number;
  }

  class ScrollBar extends SuiScrollBar {
    id: number;
  }

  class Step extends SuiStep {
    id: number;
  }

  class Steps extends SuiSteps {
    id: number;
  }

  class Switch extends SuiSwitch {
    id: number;
  }

  class TabPane extends SuiTabPane {
    id: number;
  }

  class Tabs extends SuiTabs {
    id: number;
    on(
      eventName: "change",
      listener: SanEventListener<
        {},
        { key: string; label: string; closable: boolean; disabled: boolean }
      >
    ): void;
  }

  class TimeLine extends SuiTimeLine {
    id: number;
  }

  class TimeLineItem extends SuiTimeLineItem {
    id: number;
  }

  class TimePicker extends SuiTimePicker {
    id: number;
  }

  class Table extends SuiTable {
    id: number;
    on(
      eventName: "sort",
      listener: SanEventListener<{}, { order: string; orderBy: string }>
    ): void;
    on(eventName: "filter", listener: any): void;
  }

  class Tooltip extends SuiTooltip {
    id: number;
  }

  class Transfer extends SuiTransfer {
    id: number;
  }

  class Trigger extends SuiTrigger {
    id: number;
  }

  class WebUploader extends SuiWebUploader {
    id: number;
  }

  // sui-biz
  class AppSidebar extends SuiBizSidebar {
    id : number;
  }

  class AppSidebarItem extends SuiBizSidebar.Item {
    id : number;
  }

  interface SuiConstructor<T> {
    new (option?: { data?: Partial<any> }): T;
    [key: string]: any;
  }

  interface SuBiziConstructor<T> {
    new (option?: { data?: Partial<any> }): T;
    [key: string]: any;
  }

  interface Sui {
    Avatar: SuiConstructor<Avatar>;
    Badge: SuiConstructor<Badge>;
    Button: SuiConstructor<Button>;
    BreadcrumbItem: SuiConstructor<BreadcrumbItem>;
    Breadcrumb: SuiConstructor<Breadcrumb>;
    Cascader: SuiConstructor<Cascader>;
    Card: SuiConstructor<Card>;
    CheckboxGroup: SuiConstructor<CheckboxGroup>;
    Checkbox: SuiConstructor<Checkbox>;
    ColorPicker: SuiConstructor<ColorPicker>;
    CollapsePanel: SuiConstructor<CollapsePanel>;
    Collapse: SuiConstructor<Collapse>;
    Dialog: SuiConstructor<Dialog>;
    Dropdown: SuiConstructor<Dropdown>;
    FormItem: SuiConstructor<FormItem>;
    Form: SuiConstructor<Form>;
    InputNumber: SuiConstructor<InputNumber>;
    Input: SuiConstructor<Input>;
    Icon: SuiConstructor<Icon>;
    Link: SuiConstructor<Link>;
    List: SuiConstructor<List>;
    Message: SuiConstructor<Message>;
    Menu: SuiConstructor<Menu>;
    Notification: SuiConstructor<Notification>;
    OptionGroup: SuiConstructor<OptionGroup>;
    Option: SuiConstructor<Option>;
    Page: SuiConstructor<Page>;
    Pagination: SuiConstructor<Pagination>;
    Popover: SuiConstructor<Popover>;
    Popup: SuiConstructor<Popup>;
    Radio: SuiConstructor<Radio>;
    Rate: SuiConstructor<Rate>;
    Select: SuiConstructor<Select>;
    Slider: SuiConstructor<Slider>;
    ScrollBar: SuiConstructor<ScrollBar>;
    Step: SuiConstructor<Step>;
    Steps: SuiConstructor<Steps>;
    Switch: SuiConstructor<Switch>;
    TabPane: SuiConstructor<TabPane>;
    Table: SuiConstructor<Table>;
    Tabs: SuiConstructor<Tabs>;
    TimeLine: SuiConstructor<TimeLine>;
    TimeLineItem: SuiConstructor<TimeLineItem>;
    TimePicker: SuiConstructor<TimePicker>;
    Tooltip: SuiConstructor<Tooltip>;
    Transfer: SuiConstructor<Transfer>;
    Trigger: SuiConstructor<Trigger>;
    WebUploader: SuiConstructor<WebUploader>;
  }

  interface SuiBiz {
    AppSidebar: SuBiziConstructor<AppSidebar>
  }

  type SuiTarget = Avatar | Badge;

  type SuiType =
    | "Avatar"
    | "Badge"
    | "Button"
    | "BreadcrumbItem"
    | "Breadcrumb"
    | "Cascader"
    | "Card"
    | "CheckboxGroup"
    | "Checkbox"
    | "ColorPicker"
    | "CollapsePanel"
    | "Collapse"
    | "Dialog"
    | "Dropdown"
    | "FormItem"
    | "Form"
    | "InputNumber"
    | "Input"
    | "Icon"
    | "Link"
    | "List"
    | "Message"
    | "Menu"
    | "Notification"
    | "OptionGroup"
    | "Option"
    | "Page"
    | "Pagination"
    | "Popover"
    | "Popup"
    | "Radio"
    | "Rate"
    | "Select"
    | "Slider"
    | "ScrollBar"
    | "Step"
    | "Steps"
    | "Switch"
    | "TabPane"
    | "Table"
    | "Tabs"
    | "TimeLine"
    | "TimeLineItem"
    | "TimePicker"
    | "Tooltip"
    | "Transfer"
    | "Trigger"
    | "WebUploader";

  type SuiBizType = 
    | "AppSidebar"
}

export = Plugin;
