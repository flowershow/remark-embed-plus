import { visit } from "unist-util-visit";

function transformer(tree) {
  visit(tree, "paragraph", (node) => {
    visit(node, "text", (textNode) => {
      if (
        textNode.value.includes("https://www.youtube.com") &&
        !textNode.value.includes("\n")
      ) {
        const urlSplit = textNode.value.split(/[=&]+/);
        const iframeUrl = `https://www.youtube.com/embed/${urlSplit[1]}`;
        Object.assign(node, {
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: [
            { type: "mdxJsxAttribute", name: "className", value: "relative" },
          ],
          children: [
            {
              type: "mdxJsxFlowElement",
              name: "iframe",
              attributes: [
                { type: "mdxJsxAttribute", name: "src", value: iframeUrl },
                { type: "mdxJsxAttribute", name: "allow", value: "fullscreen" },
                { type: "mdxJsxAttribute", name: "width", value: "100%" },
                { type: "mdxJsxAttribute", name: "height", value: "100%" },
              ],
              children: [],
              position: { ...textNode.position },
            },
          ],
        });
      }
    });
  });
}

function attacher() {
  return transformer;
}

export default attacher;
