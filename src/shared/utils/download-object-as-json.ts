export function downloadObjectAsJson(
  exportStringifiedObj: string,
  exportName: string
) {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(exportStringifiedObj);
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
