export function decodeText(text) {
  if (!text) return "";

  return text
    .replace(/&#8211;|–/g, "-")
    .replace(/&#8212;|—/g, "—")
    .replace(/&#8216;|‘/g, "'")
    .replace(/&#8217;|’/g, "'")
    .replace(/&#8220;|“/g, '"')
    .replace(/&#8221;|”/g, '"')
    .replace(/&#038;|&/g, "&")
    .replace(/&amp;/g, "&");
}