import { useCallback, useRef } from "react";
import { BryntumButton, BryntumScheduler } from "@bryntum/scheduler-react";
import type { Scheduler } from "@bryntum/scheduler";
import { schedulerConfig } from "~/schedulerConfig";
import { Toast } from "@bryntum/scheduler";

export default function SchedulerApp() {
  const schedulerRef = useRef<BryntumScheduler>(null);
  const schedulerInstance = () => schedulerRef.current?.instance as Scheduler;

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

  return (
    <>
      <div className="demo-toolbar align-right">
        <BryntumButton icon="b-fa-plus" cls="b-green" onClick={addEvent} />
      </div>
      <BryntumScheduler ref={schedulerRef} {...schedulerConfig} />
    </>
  );
}
