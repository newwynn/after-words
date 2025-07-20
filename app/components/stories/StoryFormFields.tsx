import React from "react";
import { Card, BlockStack, Text, FormLayout, TextField } from "@shopify/polaris";
import type { StoryPayload } from "../../types/story";

interface StoryFormFieldsProps {
  storyPayload: StoryPayload;
  onFieldChange: (field: keyof StoryPayload, value: string) => void;
}

const StoryFormFields: React.FC<StoryFormFieldsProps> = ({ storyPayload, onFieldChange }) => (
  <Card>
    <BlockStack gap="200">
      <Text as="h2" variant="headingSm">
        Story
      </Text>
      <FormLayout>
        <TextField
          label="Story Title"
          value={storyPayload.title}
          onChange={(value) => onFieldChange("title", value)}
          autoComplete="off"
          placeholder="e.g: My Product Story"
        />
        <TextField
          label="Story Content"
          value={storyPayload.content}
          onChange={(value) => onFieldChange("content", value)}
          autoComplete="off"
          multiline={8}
          placeholder="Enter your story content"
        />
      </FormLayout>
    </BlockStack>
  </Card>
);

export default StoryFormFields;
