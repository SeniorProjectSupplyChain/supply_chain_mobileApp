export function titleCase(str: string): string {
  return !str
    ? ""
    : str
        .toLowerCase()
        .split(" ")
        .map(function (word: string): string {
          return word && word.length > 0
            ? word.replace(word[0], word[0].toUpperCase())
            : "";
        })
        .join(" ");
}
