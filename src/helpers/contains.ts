export function contains(selector: string, text: string, className: string) {
  var elements = document.querySelectorAll(selector);
  if (elements)
    return [].filter.call(elements, function (element: any) {
      if (element.innerText.startsWith(text)) {
        element.className = className;
        element.innerText = element.innerText.substring(1);
      }
    });
}

export const isHackerNewsLink = (url: string) => {
  return url.startsWith("item?id");
};
