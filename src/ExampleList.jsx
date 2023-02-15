import { AppLink } from "./shared/AppLink";

export default function ExampleList({ list }) {
  return (
    <ul>
      {list.map((example, i) => (
        <AppLink key={i} to={example.path}>
          {example.label}
        </AppLink>
      ))}
    </ul>
  );
}
