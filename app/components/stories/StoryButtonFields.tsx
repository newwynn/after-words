import React from "react";
import { Card, BlockStack, Text, LegacyStack, TextField } from "@shopify/polaris";
import type { StoryPayload } from "../../types/story";

interface StoryButtonFieldsProps {
  storyPayload: StoryPayload;
  onFieldChange: (field: keyof StoryPayload, value: string) => void;
}

const StoryButtonFields: React.FC<StoryButtonFieldsProps> = ({ storyPayload, onFieldChange }) => (
  <Card>
    <BlockStack gap="200">
      <Text variant="headingMd" as="h6">
        Button
      </Text>
      <LegacyStack vertical>
        <TextField
          label="Button Label"
          value={storyPayload.buttonLabel}
          onChange={(value) => onFieldChange("buttonLabel", value)}
          autoComplete="off"
          placeholder="e.g: Read More"
        />
        <TextField
          label="Button Link"
          value={storyPayload.buttonLink}
          onChange={(value) => onFieldChange("buttonLink", value)}
          autoComplete="off"
          placeholder="e.g: https://example.com"
        />
      </LegacyStack>
    </BlockStack>
  </Card>
);

export default StoryButtonFields;
