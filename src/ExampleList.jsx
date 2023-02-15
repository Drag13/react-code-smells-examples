import { AppLink } from "./shared/AppLink";

export default function ExampleList({ list }) {
  return (
    <ul>
      {list.map((example, i) => (
        <li key={i}>
          <AppLink to={example.path}>{example.label}</AppLink>
        </li>
      ))}
    </ul>
  );
}
