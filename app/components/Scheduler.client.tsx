import { useCallback, useRef, useState } from "react";
import { BryntumButton, BryntumScheduler } from "@bryntum/scheduler-react";
import type { Scheduler, EventModel } from "@bryntum/scheduler";
import { schedulerConfig } from "~/schedulerConfig";
import { Toast } from "@bryntum/scheduler";

export default function SchedulerApp() {
  const schedulerRef = useRef<BryntumScheduler>(null);
  const schedulerInstance = () => schedulerRef.current?.instance as Scheduler;
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);

  const onEventSelectionChange = useCallback(
    ({ selected }: { selected: EventModel[] }) => {
      setSelectedEvent(selected.length > 0 ? selected[0] : null);
    },
    []
  );

  const addEvent = useCallback(() => {
    const scheduler = schedulerInstance();
    const startDate = new Date(scheduler.startDate.getTime());
    const endDate = new Date(startDate.getTime() + 2 * 86400000);
    const resource = scheduler.resourceStore.first;

    if (!resource) {
      Toast.show("There is no resource available");
      return;
    }

    endDate.setHours(endDate.getHours() + 2);

    scheduler.eventStore.add({
      resourceId: resource.id,
      startDate: startDate,
      endDate: endDate,
      name: "New booking",
      eventType: "Booking",
    });
  }, []);

  const removeEvent = useCallback(() => {
    selectedEvent?.remove();
    setSelectedEvent(null);
  }, [selectedEvent]);

  return (
    <>
      <div className="demo-toolbar align-right">
        {(() => {
          return selectedEvent ? (
            <div className="selected-event">
              <span>Selected reservation: </span>
              <span>{selectedEvent.name}</span>
            </div>
          ) : (
            ""
          );
        })()}
        <BryntumButton icon="b-fa-plus" cls="b-green" onClick={addEvent} />
        <BryntumButton
          icon="b-fa-trash"
          cls="b-red"
          onClick={removeEvent}
          disabled={!selectedEvent}
        />
      </div>
      <BryntumScheduler
        ref={schedulerRef}
        {...schedulerConfig}
        onEventSelectionChange={onEventSelectionChange}
      />
    </>
  );
}
