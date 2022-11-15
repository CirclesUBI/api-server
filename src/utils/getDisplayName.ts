export function getDisplayName(row: any): string {
  let displayName = row.firstName;
  if (row.lastName && row.lastName.trim() != "") {
    displayName += ` ${row.lastName}`;
  }
  return displayName;
}