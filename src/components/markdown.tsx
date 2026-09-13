import type { ReactNode } from "react";

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] };

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      nodes.push(
        <a key={key++} href={match[2]} className="underline decoration-rule">
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<em key={key++}>{match[4]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      const parts: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith("> ")) {
        parts.push((lines[i] ?? "").slice(2));
        i += 1;
      }
      blocks.push({ type: "quote", text: parts.join(" ") });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith("- ")) {
        items.push((lines[i] ?? "").slice(2));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    const parts: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() &&
      !(lines[i] ?? "").startsWith("## ") &&
      !(lines[i] ?? "").startsWith("### ") &&
      !(lines[i] ?? "").startsWith("> ") &&
      !(lines[i] ?? "").startsWith("- ")
    ) {
      parts.push(lines[i] ?? "");
      i += 1;
    }
    blocks.push({ type: "p", text: parts.join(" ") });
  }
  return blocks;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-4 font-display text-2xl">
              {inline(block.text)}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="pt-2 font-display text-xl">
              {inline(block.text)}
            </h3>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-[3px] border-ink pl-5 text-[1.05rem] leading-8 text-ink-soft"
            >
              {inline(block.text)}
            </blockquote>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 leading-7">
              {block.items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[1.0625rem] leading-8">
            {inline(block.text)}
          </p>
        );
      })}
    </div>
  );
}
