import { useRef } from "react";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import type { Scheduler } from "@bryntum/scheduler";
import { schedulerConfig } from "~/schedulerConfig";

export default function SchedulerApp() {
  const schedulerRef = useRef<BryntumScheduler>(null);
  const schedulerInstance = () => schedulerRef.current?.instance as Scheduler;
  return (
    <>
      <BryntumScheduler ref={schedulerRef} {...schedulerConfig} />
    </>
  );
}
