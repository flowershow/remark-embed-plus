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
          ...node,
          type: 'element',
           data: {
             hProperties: {
               style: "position:relative;padding-bottom:56.25%",
             },
           },
          children: [{
            ...textNode,
            type: 'element',
            tagName: 'iframe',
            data: {
              hName: 'iframe',
              hProperties: {
                src: iframeUrl,
                frameborder:"0",
                allow:"accelerometer; autoplay; encrypted-media; gyroscope;",
                style:"position:absolute;top:0;left:0;width:100%;height:100%;"
              }
            }
          }]
        });
      }
    });
  });
}

function attacher() {
  return transformer;
}

export default attacher;
