import type { BryntumSchedulerProps } from "@bryntum/scheduler-react";

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
