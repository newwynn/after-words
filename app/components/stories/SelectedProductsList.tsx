import React from "react";
import { Card, Text, ResourceList, ResourceItem, Avatar } from "@shopify/polaris";
import type { Product } from "../../types/story";

interface SelectedProductsListProps {
  products: Product[];
}

const SelectedProductsList: React.FC<SelectedProductsListProps> = ({ products }) => {
  if (!products.length) return null;
  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Selected Products
      </Text>
      <ResourceList
        resourceName={{ singular: "product", plural: "products" }}
        items={products.map((product) => ({
          id: product.id,
          url: product.handle ? `/products/${product.handle}` : undefined,
          avatarSource:
            product.images && product.images.length > 0
              ? product.images[0].url || product.images[0].src
              : undefined,
          name: product.title,
          price:
            product.variants && product.variants.length > 0
              ? product.variants[0].price
              : "",
          description: product.descriptionHtml,
        }))}
        renderItem={(item) => {
          const { id, url, avatarSource, name, price } = item;
          return (
            <ResourceItem
              verticalAlignment="center"
              id={id}
              url={url}
              media={
                avatarSource ? (
                  <Avatar size="md" name={name} source={avatarSource} />
                ) : (
                  <Avatar size="md" name={name} />
                )
              }
              accessibilityLabel={`View details for ${name}`}
              name={name}
              onClick={() => console.log("Selected Resource: ", item)}
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {name}
              </Text>
              <div>
                <Text variant="bodySm" as="span">
                  {price}
                </Text>
              </div>
              {/* <div
                style={{ marginTop: 4 }}
                dangerouslySetInnerHTML={{ __html: description }}
              /> */}
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
};

export default SelectedProductsList;
