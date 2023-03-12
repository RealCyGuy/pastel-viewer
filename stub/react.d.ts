// https://github.com/vuejs/language-tools/discussions/592#discussioncomment-2570488
import { AriaAttributes, DOMAttributes } from "~~/stub/react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    class?: string;
  }
}
