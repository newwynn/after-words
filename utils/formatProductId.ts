/**
 * Strips the Shopify product GID prefix from a productId string, returning only the numeric ID.
 * Example: 'gid://shopify/Product/123456789' => '123456789'
 */
export function formatProductId(productId: string): string {
  return productId.replace("gid://shopify/Product/", "");
}
