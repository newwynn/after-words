import React from "react";
import { Card, BlockStack, Text, TextField, Button, Icon } from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

interface ProductPickerProps {
  onSearch: () => void;
  onBrowse: () => void;
}

const ProductPicker: React.FC<ProductPickerProps> = ({ onSearch, onBrowse }) => (
  <Card roundedAbove="sm">
    <BlockStack gap="200">
      <Text as="h2" variant="headingSm">
        Products
      </Text>
      <TextField
        label="Products"
        labelHidden
        onChange={onSearch}
        autoComplete="off"
        placeholder="Search products"
        prefix={<Icon source={SearchIcon} />}
        connectedRight={<Button onClick={onBrowse}>Browse products</Button>}
      />
    </BlockStack>
  </Card>
);

export default ProductPicker;
