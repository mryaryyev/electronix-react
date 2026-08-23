export const NEW_PRODUCT_DAYS = 14

export function isNewProduct(createdAt: Date): boolean {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_PRODUCT_DAYS
}

export function formatBrandOrCategory(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase()
}
