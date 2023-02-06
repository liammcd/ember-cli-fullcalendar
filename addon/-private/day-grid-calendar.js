import CalendarComponent from "./calendar";

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { getWithDefault } from '@ember/object';

function noOp () {}

function identity (value) {
  return value => value;
}

export default class DayGridCalendarComponent extends CalendarComponent {
  // Toolbar
  get headerToolbar () {
    return getWithDefault (this.args, 'headerToolbar', {
      start: 'title',
      center: '',
      end: 'today prev,next'
    });
  }

  get footerToolbar () {
    return getWithDefault (this.args, 'footerToolbar', false);
  }

  get titleFormat () {
    return getWithDefault (this.args, 'titleFormat', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get titleRangeSeparator () {
    return getWithDefault (this.args, 'titleRangeSeparator', ' \u2013 ');
  }

  get buttonText () {
    return getWithDefault (this.args, 'buttonText', {
      today: 'today',
      month: 'month',
      week: 'week',
      day: 'day',
      list: 'list'
    });
  }

  get buttonIcons () {
    return getWithDefault (this.args, 'buttonIcons', {
      prev: 'chevron-left',
      next: 'chevron-right',
      prevYear: 'chevrons-left',
      nextYear: 'chevrons-right'
    });
  }

  // Date & Time Display

  get weekends () {
    return getWithDefault (this.args, 'weekends', true);
  }

  get hiddenDays () {
    return getWithDefault (this.args, 'hiddenDays', []);
  }

  get dayHeaders () {
    return getWithDefault (this.args, 'dayHeaders', true);
  }

  get dayHeaderClassNames () {
    return this.args.dayHeaderClassNames;
  }

  get dayHeaderContent () {
    return this.args.dayHeaderContent;
  }

  get dayHeaderFormat () {
    return this.args.dayHeaderFormat;
  }

  get dayMinWidth () {
    return this.args.dayMinWidth;
  }

  get dayCellClassNames () {
    return this.args.dayCellClassNames;
  }

  get dayCellContent () {
    return this.args.dayCellContent;
  }

  // Sizing

  get height () {
    return this.args.height;
  }

  get aspectRatio () {
    return getWithDefault (this.args, 'aspectRatio', 1.35);
  }

  get expandRows () {
    return getWithDefault (this.args, 'expandRows', false);
  }

  get handleWindowResize () {
    return getWithDefault (this.args, 'handleWindowResize', true);
  }

  get windowResizeDelay () {
    return getWithDefault (this.args, 'windowResizeDelay', 100);
  }

  get stickyHeaderDates () {
    return getWithDefault (this.args, 'stickyHeaderDates', 'auto');
  }

  get stickyFooterScrollbar () {
    return getWithDefault (this.args, 'stickyFooterScrollbar', 'auto');
  }

  // Week Numbers

  get weekNumbers () {
    return getWithDefault (this.args, 'weekends', false);
  }

  get weekNumberCalculation () {
    return getWithDefault (this.args, 'weekNumberCalculation', 'local');
  }

  get weekText () {
    return getWithDefault (this.args, 'weekText', 'W');
  }

  get weekNumberFormat () {
    return getWithDefault (this.args, 'weekNumberFormat',  { week: 'narrow' });
  }

  // interactions
  get selectable () {
    return getWithDefault (this.args, 'selectable',  false);
  }

  get selectMirror () {
    return getWithDefault (this.args, 'selectMirror',  false);
  }

  get unselectAuto () {
    return getWithDefault (this.args, 'unselectAuto',  true);
  }

  get unselectCancel () {
    return getWithDefault (this.args, 'unselectCancel',  '');
  }

  get selectOverlap () {
    return getWithDefault (this.args, 'selectOverlap',  true);
  }

  get selectConstraint () {
    return this.args.selectConstraint;
  }

  get firstDay () {
    return getWithDefault (this.args, 'firstDay', 0);
  }

  get initialDate () {
    return this.args.initialDate;
  }

  get events () {
    return this.args.events;
  }

  get eventOrder () {
    return this.args.eventOrder;
  }

  doPrepareOptions (options) {
    options = super.doPrepareOptions (options);
    options.plugins.push (dayGridPlugin, interactionPlugin);

    Object.assign (options, {
      headerToolbar: this.headerToolbar,
      footerToolbar: this.footerToolbar,
      titleFormat: this.titleFormat,
      titleRangeSeparator: this.titleRangeSeparator,
      buttonText: this.buttonText,
      buttonIcons: this.buttonIcons,

      initialDate: this.initialDate,

      height: this.height,
      aspectRatio: this.aspectRatio,
      expandRows: this.expandRows,
      handleWindowResize: this.handleWindowResize,
      windowResizeDelay: this.windowResizeDelay,
      stickyHeaderDates: this.stickyHeaderDates,
      stickyFooterScrollbar: this.stickyFooterScrollbar,

      weekends: this.weekends,
      hiddenDays: this.hiddenDays,
      dayHeaders: this.dayHeaders,
      dayHeaderFormat: this.dayHeaderFormat,
      dayHeaderClassNames: this.dayHeaderClassNames,
      dayHeaderContent: this.dayHeaderContent,

      dayMinWidth: this.dayMinWidth,
      dayCellClassNames: this.dayCellClassNames,
      dayCellContent: this.dayCellContent,

      weekNumbers: this.weekNumbers,
      weekNumberCalculation: this.weekNumberCalculation,
      weekText: this.weekNumbers,
      weekNumberFormat: this.weekNumberFormat,

      firstDay: this.firstDay,

      //selectable: this.selectable,
      //selectMirror: this.selectMirror,
      //unselectAuto: this.unselectAuto,
      //unselectCancel: this.unselectCancel,
      //selectOverlap: this.selectOverlap,
      //selectConstraint: this.selectConstraint,
      dayCellDidMount: this.dayCellDidMount.bind (this),
      dayCellWillUnmount: this.dayCellWillUnmount.bind (this),
      slotLabelDidMount: this.slotLabelDidMount.bind (this),
      slotLabelWillUnmount: this.slotLabelWillUnmount.bind (this),
      slotLaneDidMount: this.slotLaneDidMount.bind (this),
      slotLaneWillUnmount: this.slotLaneWillUnmount.bind (this),

      datesSet: this.datesSet.bind (this),
      dateClick: this.dateClick.bind (this),

      events: this.events,
      eventOrder: this.eventOrder,
      eventClick: this.click.bind (this),
      eventDragStop: this.eventDragStop.bind (this),
      eventDrop: this.eventDrop.bind (this),
      eventDidMount: this.eventDidMount.bind (this),
      progressiveEventRendering: true,
      eventResize: this.eventResize.bind (this),
      dayMaxEvents: this.args.dayMaxEvents
    })

    return options;
  }

  click (ev) {
    (this.args.click || noOp) (ev);
  }

  eventDragStop (ev) {
    (this.args.eventDragStop || noOp) (ev);
  }

  eventDrop (ev) {
    (this.args.eventDrop || noOp) (ev);
  }

  eventResize (ev) {
    (this.args.eventResize || noOp) (ev);
  }

  eventDidMount (ev) {
    (this.args.eventDidMount || noOp) (ev);
  }

  select (ev) {
    (this.args.select || noOp) (ev);
  }

  unselect () {
    (this.args.unselect || noOp) (...arguments);
  }

  dayCellDidMount ( ) {
    (this.args.dayCellDidMount || noOp) (...arguments);
  }

  dayCellWillUnmount () {
    (this.args.dayCellWillUnmount || noOp) (...arguments);
  }

  slotLabelDidMount () {
    (this.args.slotLabelDidMount || noOp) (...arguments);
  }

  slotLabelWillUnmount () {
    (this.args.slotLabelWillUnmount || noOp) (...arguments);
  }

  slotLaneDidMount ( ) {
    (this.args.slotLaneDidMount || noOp) (...arguments);
  }

  slotLaneWillUnmount () {
    (this.args.slotLaneWillUnmount || noOp) (...arguments);
  }

  datesSet () {
    (this.args.datesSet || noOp) (...arguments);
  }

  dateClick () {
    (this.args.dateClick || noOp) (...arguments);
  }

}
