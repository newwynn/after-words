import React from "react";
import { Card, BlockStack, Text, LegacyStack, RadioButton } from "@shopify/polaris";
import type { StoryPayload } from "../../types/story";

interface VisibilitySelectorProps {
  visibility: StoryPayload["visibility"];
  onChange: (value: StoryPayload["visibility"]) => void;
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({ visibility, onChange }) => (
  <Card>
    <BlockStack gap="200">
      <Text variant="headingMd" as="h6">
        Visibility
      </Text>
      <LegacyStack vertical>
        <RadioButton
          label="Active"
          helpText="Story will be visible to customers."
          checked={visibility === "Active"}
          id="Active"
          name="accounts"
          onChange={() => onChange("Active")}
        />
        <RadioButton
          label="Inactive"
          helpText="Story will not be visible to customers."
          id="Inactive"
          name="accounts"
          checked={visibility === "Inactive"}
          onChange={() => onChange("Inactive")}
        />
      </LegacyStack>
    </BlockStack>
  </Card>
);

export default VisibilitySelector;
