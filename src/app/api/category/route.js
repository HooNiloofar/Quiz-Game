const { readFileSync } = require("fs");

export async function GET(request) {
  const data = readFileSync("./data/category.json");

  var list = JSON.parse(data);

  list = list
    .filter((x) => x.deactivated != true)
    .sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });

  await sleep(1000);
  return Response.json({ list });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
