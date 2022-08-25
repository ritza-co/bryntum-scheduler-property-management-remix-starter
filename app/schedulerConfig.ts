import type { EventModel, EventModelConfig } from "@bryntum/scheduler";
import { StringHelper } from "@bryntum/scheduler";
import type { BryntumSchedulerProps } from "@bryntum/scheduler-react";
import { dayDiff } from "./helpers/helperFunctions";

const schedulerConfig: BryntumSchedulerProps = {
  resourceImagePath: "/accommodation/",
  // zero indexed month
  startDate: new Date(2022, 8, 7, 8),
  endDate: new Date(2022, 8, 26, 22),

  viewPreset: {
    tickWidth: 50,
    base: "dayAndWeek",
    timeResolution: {
      unit: "day",
      increment: 1,
    },
  },
  snap: true,

  crudManager: {
    transport: {
      load: {
        url: "/data/data.json",
      },
    },
    autoLoad: true,
  },

  timeRangesFeature: {
    narrowThreshold: 10,
    showCurrentTimeLine: true,
  },

  eventEditFeature: {
    items: {
      // Merged with provided config of the resource field
      resourceField: {
        label: "Property",
      },
      people: {
        type: "number",
        // name will be used to link to a field in the event record when loading and saving in the editor
        name: "people",
        label: "Number of guests",
        min: 1,
        required: true,
      },
      price: {
        type: "number",
        name: "price",
        label: "Price for total stay (USD)",
        min: 1,
        required: true,
      },
    },
  },

  listeners: {
    beforeEventEditShow({
      eventEdit,
      resourceRecord,
    }: {
      eventEdit: any;
      resourceRecord: any;
    }) {
      // modify editor field here
      eventEdit.people.max = resourceRecord.data.maxPeople;
    },
  },

  eventRenderer({
    eventRecord,
    renderData,
  }: {
    eventRecord: any;
    renderData: any;
  }) {
    renderData.style = "color:white"; // You can use inline styles too.

    const days = dayDiff(eventRecord.startDate, eventRecord.endDate);
    return StringHelper.xss`${eventRecord.name}, ${
      eventRecord.people
    } ppl, ${days} day${days === 1 ? "" : "s"}`;
  },

  summaryFeature: {
    renderer: ({
      events: bookings,
    }: {
      events: EventModel[] | object[] | Partial<EventModelConfig>[];
    }) => {
      var result = "";
      result = bookings.length.toString();
      result = result || "";
      return StringHelper.xss`${result}`;
    },
  },

  columns: [
    {
      type: "resourceInfo",
      text: "Property",
      showImage: true,
      width: 240,
      showRole: true,
      showEventCount: false,
    },
  ],
};

export { schedulerConfig };
