function addCommas(num: number) {
  const val = String(num);
  return val
    .split("")
    .reverse()
    .reduce((res, c, i, arr) => {
      res.push(c);
      if ((i + 1) % 3 === 0 && i + 1 < arr.length) {
        res.push(",");
      }
      return res;
    }, [] as string[])
    .reverse()
    .join("");
}

export { addCommas };
