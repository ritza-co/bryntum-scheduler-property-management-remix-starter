import styles from "~/styles/App.css";

export default function Index() {
  return <div>Index route</div>;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
