import { ClientOnly } from "remix-utils";
import SchedulerApp from "~/components/Scheduler.client";
import styles from "~/styles/App.css";

export default function Index() {
  return (
    <>
      <ClientOnly
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <p>Loading...</p>
          </div>
        }
      >
        {() => <SchedulerApp />}
      </ClientOnly>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
