import { rulesExtended } from "discord-markdown-parser";
import SimpleMarkdown from "simple-markdown";

const rules = {
  ...rulesExtended,
  everyone: {
    order: SimpleMarkdown.defaultRules.strong.order,
    match: (source: string) => /^@everyone/.exec(source),
    parse: function () {
      return {};
    },
  },
  here: {
    order: SimpleMarkdown.defaultRules.strong.order,
    match: (source: string) => /^@here/.exec(source),
    parse: function () {
      return {};
    },
  },
};

const parser = SimpleMarkdown.parserFor(rules);
export default function (text: string): SimpleMarkdown.SingleASTNode[] {
  return parser(text, { inline: true });
}
