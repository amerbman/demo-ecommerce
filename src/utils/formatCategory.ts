export function formatCategory(category: string): string {
    return category
      .toLowerCase()                     // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "_")        // Replace non-alphanumeric characters with underscores
      .replace(/_+$/, "");                // Remove trailing underscores
  }
  